const pg = require('pg');

exports.handler = async event => {
  const body = JSON.parse(event.body);
  const { ingredients } = body;

  const pool = new pg.Pool({
    connectionString:
      'postgres://lwstubhd:xUWDf62nGsqN8WZ0nG2N3hZ73eDg5JdG@drona.db.elephantsql.com/lwstubhd',
  });

  const client = await pool.connect();

  if (!ingredients || !Array.isArray(ingredients))
    return JSON.stringify({ err: 'Not an array' });

  let sqlIn = '';

  ingredients.forEach(v => {
    sqlIn += `'${v}',`;
  });

  sqlIn = sqlIn.slice(0, -1);

  const sql = `
  select  r.id, r.name, r.websiteurl, r.imagepath, r.headline, r.description,
          r.category, r.difficulty, r.calories, r.preptime, r.totaltime,
          r.favoritescount, r.averagerating, 
          row_number() over(partition by r.name order by r.favoritescount desc) as rn
  from    ingredients i
  join    recipe_ingredients ri on i.id = ri.ingredient_id
  join    recipes r on ri.recipe_id = r.id
  where   i.name in (${sqlIn}) and i.pantry = FALSE
  group by r.id, r.name, r.websiteUrl, r.imagePath, r.headline, r.description,
          r.category, r.difficulty, r.calories, r.prepTime, r.totalTime,
          r.favoritesCount, r.averageRating
  having  r.totalingredients = count(*)
  order by r.favoritesCount desc, ratingsCount desc, averageRating desc;`;

  const results = await client.query(sql);

  const ingredientsSql = `
    select  b.name, b.imagepath, c.amount, c.unit
    from    recipe_ingredients a
    join    ingredients b on a.ingredient_id = b.id
    left join recipe_yields c on a.recipe_id = c.recipe_id and a.ingredient_id = c.ingredient_id
    where   a.recipe_id = $1;
  `;

  const cuisinesSql =
    'select cuisine from recipe_cuisines where recipe_id = $1 order by cuisine';

  const stepsSql =
    'select step, ingredients, instructions from recipe_steps where recipe_id = $1 order by step';

  if (!results.length) {
    return {
      statusCode: 401,
      body: JSON.stringify({ err: 'No recipes found' }),
    };
  }

  // for (const recipe of results) {
  //   try {
  //     const data = await Promise.allSettled([
  //       client.query(cuisinesSql, [recipe.id]),
  //       client.query(ingredientsSql, [recipe.id]),
  //       client.query(stepsSql, [recipe.id]),
  //     ]);

  //     recipe.cuisines =
  //       data[0].status === 'fulfilled' && data[0].value !== 'Failed'
  //         ? data[0].value.rows
  //         : [];
  //     recipe.ingredients =
  //       data[1].status === 'fulfilled' && data[1].value !== 'Failed'
  //         ? data[1].value.rows
  //         : [];
  //     recipe.steps =
  //       data[2].status === 'fulfilled' && data[2].value !== 'Failed'
  //         ? data[2].value.rows
  //         : [];
  //     recipe.tags = [];
  //   } catch (e) {
  //     return {
  //       statusCode: 402,
  //       body: JSON.stringify({ err: 'Error getting data' }),
  //     };
  //   }
  // }

  for (const recipe of results) {
    const data = await Promise.allSettled([
      client.query(cuisinesSql, [recipe.id]),
      client.query(ingredientsSql, [recipe.id]),
      client.query(stepsSql, [recipe.id]),
    ]);

    recipe.cuisines = data[0].value.rows;
    recipe.ingredients = data[1].value.rows;
    recipe.steps = data[2].value.rows;
    recipe.tags = [];
  }

  client.release();
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(results.rows),
  };
  return response;
};

const pg = require('pg');

exports.handler = async event => {
  const pool = new pg.Pool({
    connectionString:
      'postgres://lwstubhd:xUWDf62nGsqN8WZ0nG2N3hZ73eDg5JdG@drona.db.elephantsql.com/lwstubhd',
  });

  const client = await pool.connect();

  const sql = `
        select  name, max(imagepath) imagepath, sum(recipe_count) recipe_count
        from    ingredients
        group by name
        order by recipe_count desc
      `;

  const results = await client.query(sql);

  client.release();
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(results.rows),
  };
  return response;
};

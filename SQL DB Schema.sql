create table recipes (
    id varchar primary key,
    name varchar,
    websiteUrl varchar,
    imagePath varchar,
    headline varchar,
    description varchar,
    category varchar,
    difficulty smallint,
    calories smallint,
    prepTime varchar,
    totalTime varchar,
    favoritesCount int,
    ratingsCount int,
    averageRating real,
    totalIngredients smallint
);

create table ingredients (
    id varchar primary key,
    name varchar,
    imagePath varchar,
    family varchar,
    pantry boolean,
    recipe_count
);

create table recipe_ingredients (
    recipe_id varchar,
    ingredient_id varchar,
    primary key (recipe_id, ingredient_id),
    foreign key (recipe_id) references recipes(id),
    foreign key (ingredient_id) references ingredients(id)
);

create table recipe_yields (
    recipe_id varchar,
    ingredient_id varchar,
    amount real,
    unit varchar,
    primary key (recipe_id, ingredient_id),
    foreign key (recipe_id) references recipes(id),
    foreign key (ingredient_id) references ingredients(id)
);

create table recipe_steps (
    recipe_id varchar,
    step smallint,
    ingredients varchar,
    instructions varchar,
    primary key (recipe_id, step),
    foreign key (recipe_id) references recipes(id)
);

create table recipe_cuisines (
    recipe_id varchar,
    cuisine varchar,
    primary key (recipe_id, cuisine),
    foreign key (recipe_id) references recipes(id)
);

create table recipe_tags (
    recipe_id varchar,
    tag varchar,
    primary key (recipe_id, tag),
    foreign key (recipe_id) references recipes(id)
);

create table users (
    email varchar primary key,
    token varchar
)

create table user_ingredients (
    email varchar,
    ingredient varchar,
    imagepath varchar
)

update recipes
set totalIngredients = t.ct
from (
    select recipe_id, count(*) ct 
    from recipe_ingredients t 
    join ingredients u on t.ingredient_id = u.id
    where u.pantry = FALSE
    group by recipe_id) t
where recipes.id = t.recipe_id;

update ingredients
set recipe_count = ct
from (
    select ingredient_id, count(*) as ct
    from recipe_ingredients
    group by ingredient_id
) t
where id = t.ingredient_id

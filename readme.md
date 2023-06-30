# Demo

This demo page doesn't have login function.

https://hellofresh-search.pages.dev

# Problem

HelloFresh's search engine let's you search for recipes by name or ingredient. Often times you open a recipe then realize you don't have every ingredient available.

# Solution

I want to create an application that shows you the recipes you can make given the ingredients you have.

## Functionalities

### The minimum functionalities to implement are

1. Allow a user to add and remove ingredients
2. Display the entered ingredients on the page
3. Display the recipes where every ingredient in the recipe is in the user's ingredients
4. Implement autocomplete as the user is typing
5. Implement login to allow the user to save their input

## Entering and saving user input

- The app should have an input box
- User inputs are saved a SQL database

### Autocomplete input

As it's more performant to do exact searches, autocomplete is required to let the user enter the correct data.

### Saving the input

To reduce rerendering, the input should be saved to the state. For data persistence, it should be saved to a database with each update on the state.

## Login

### Creating login

In order to link the data to a client, the user needs an account. This app will implement passwordless sign. The user will provide an email and receive an access code that expires in 10 minutes. To send the code via email, I will use Amazon SES. The verification is done using JWT.

Create a login page for the user to enter an email. Then redirect the user to the authenticate page to enter the access code. If the incorrect code was entered, show an error and allow the user to stay on the page to re-enter the code.

### Persist login sessions

We will use JWT to persist a user's login session. When the user logs in, a token will be sent back as a cookie. The next time the user requests data that requires authentication, the server will first check the cookie.

## Query the HelloFresh database for matching recipes

The HelloFresh API returns recipe objects where all the details of a recipe are nested inside the object.

To improve the efficiency on searching so that the app doesn't have to iterate through all the recipe records with each request, I normalized the data into a SQL database. The search will be completed using SQL queries.

### Normalizing the data

There are two steps

1. Pull the data from the HelloFresh API, which comes in a JSON format.
2. Parse the data and structure them into a SQL database.

### Querying the data

The input is an array of ingredients. The API should return a list of recipes that can be made with those ingredients, not accounting for pantry items and common spices.

## Display the matching recipes to the page

After retrieving the recipe details from the HelloFresh API, the app will redirect to the results component displaying the recipes. Each recipe is a card. When clicked on anywhere in the card, an image and additional details are displayed.

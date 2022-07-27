# Issues-tracker

## Get started

1 - Fork and clone the repo to your computer
2 - CD into fronted and run npm install to install the dependencies the npm satrt to lunch the project in your browser
3 - CD into server and run npm install to install the dependencies then node index.js or nodemon

## Configurations

Create a file named .env in the server folder and set the values for these variables:

PORT= default 8000
MONGODB_URI="" paste in mongodb string
jwtPrivateKey=""

## API endpoints

1 - To create a new user, send a POST req to http://localhost:8000/api/users
2 - To Login, send a POST req to http://localhost:8000/api/authn
3- Get a user (Protected route, requies authentication and authorization) http://localhost:8000/api/users/me

# myFlix-client
 
## Overview
myFlix is a project for a web application built with the MERN tech stack. The purpose is to build the client-side for the app based on its existing server-side code, which is a REST API and database.

Link to live app: https://myflix-cf.netlify.app
Link to API repository: https://github.com/thompson-stephen113/movie_api

## Key Features
* Single page application (SPA)
* Fetches data from external API
* Fixed navbar, which allows users to navigate between views
* Login view for existing users to login to the app
* Signup view for new users to create an account
* View displaying all movies using React Bootstrap's Card component, each displaying movie title, director, and View and Favorite buttons, as well as a input field to filter movies by title, director, or genre
* Movie view displaying all information for a selected movie, including title, description, genre (and description), director (and brief bio), and whether the movie is featured or not
* Profile view displaying currently signed in user's username and email, a form to update the user's credentials, a button to delete the user account, and a list displaying the user's favorited movies
* Logout button in the navbar

## Dependencies
* Bootstrap (v. 5.3.2)
* Prop-Types (v.15.8.1)
* React (v. 18.2.0)
* React Bootstrap (v. 2.9.1)
* ReactDOM (v. 18.2.0)
* React Router (v. 6.18.0)
* React Router DOM (v. 6.18.0)

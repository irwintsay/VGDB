# VGDB
Video Game Database

http://vgdb.herokuapp.com

Welcome to VGDB, a full stack web application for discovering video game information and content. VGDB is built with Node.js/Express.js, MongoDB, AngularJS, and Semantic-UI.

The goal of VGDB was to create a web application for serving general information and dynamic YouTube and Twitch content for video game searches.


### Using VGDB

Using VGDB is really straightforward. You have the option to sign up for an account, but it is not required. You start by simply clicking on the search bar and typing in the name of a video game. VGDB will then submit the search query, make a few API calls to 3rd party services GiantBomb API, Twitch.tv and YouTube to gather content.

At this point VGDB will assemble the content and redirect you to the proper view. From here you'll see the Name of the game you searched for, an overview of the game, some additional game details on the left sidebar, a live Twitch stream of that game with the highest viewer count (if there is a stream available), and some related YouTube gameplay content. You'll also notice 'Popular Searches' underneath the search bar. These popular searches dynamically change as VGDB users continue making searches.

In the future I plan to do more with the Search database I created and hope to include Related Searches and also a statistics page where I might graph some interesting data about Searches that VGDB logs.


### Prototyping

Once the project was assigned, I spent the majority of the first day brainstorming and white boarding the ERD for what would eventually become the structure for my PostgreSQL database. This process actually required me to think about how my application would look and function, because it would have implications on how I would store and display data.

Once I had wrapped my mind around the ERD for my application, I started hand-drawing wireframes for what my application would eventually look like.

### User Stories

- As a user I want to be able to search for any video game and learn basic information about them.

- As a user I want to be able to watch gameplay videos related to my search.

- As a user I want to be able to watch a live stream of the game I searched for.

- As a user I want to see what games other people are searching for.

### Wireframes

#### Welcome/Login View
![Login](http://i.imgur.com/auZztyyl.jpg "Login")

#### User/Add Table View
![Profile Page](http://i.imgur.com/Dt6Gqtrl.jpg?1 "Profile")

#### Add Customer View
![Customer Page](http://i.imgur.com/h3fWJWcl.jpg?1 "Customers")

#### Add Menu Items View
![Menu Page](http://i.imgur.com/qmqi84pl.jpg?1 "Menu")


### ERD

![ERD](http://i.imgur.com/8NtyBsCl.png "ERD")


### Implementation

This project was implemented with HTML, CSS, JavaScript and Materialize for the front-end, Ruby on Rails for the back-end, and PostgreSQL for the database.

I created tables for:
* Users
* Tables
* Customers
* Items
* Orders


* Users (Servers) have a 1:Many relationship with Tables
* Tables have a 1:Many relationship with Customers
* Customers have a Many to Many relationship with Items through Orders.



### Installation

Heroku:   http://vgdb.herokuapp.com
GitHub:   https://github.com/irwintsay/VGDB

1.  Fork the VGDB repo
2.  npm install
3.  Create a .env file and set a JWT_SECRET variable with a random string
4.  Obtain API keys for GiantBomb API and YouTube API and store in .env
5.  Start mongod
6.  nodemon
7.  localhost:6969


### Still needs work

1. Search database, Search statistics, Search suggestions

2. Invalid form input handling

3. Refactor code

4. Comment out code

5. Improve mobile views

6. Edit profile page


### Summary

While my application is fairly barebones and simple looking, I'm really happy with how much I learned while building a full-stack Rails application and how much I grew as a developer. This application definitely required the most complicated database I had dealt with up to this point. Learning how to pull in the data I needed for each route was a struggle, but ultimately very rewarding. I know that I didn't exactly follow best practices for how I handled data, but I was proud to get everything more or less working the way I wanted it to.

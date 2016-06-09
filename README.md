# VGDB
### Video Game Database
VGDB v1.0 <br>
README v1.0

Heroku: http://vgdb.herokuapp.com <br>
GitHub: https://github.com/irwintsay/VGDB

Welcome to VGDB, a full stack web application for discovering video game information and content. VGDB is built with Node.js/Express.js, MongoDB, AngularJS, and Semantic-UI.

The goal of VGDB was to create a web application for serving general information and dynamic YouTube and Twitch content for video game searches.


### Using VGDB

Using VGDB is really straightforward. You have the option to sign up for an account, but it is not required. You start by simply clicking on the search bar and typing in the name of a video game. VGDB will then submit the search query, make a few API calls to 3rd party services GiantBomb API, Twitch.tv and YouTube to gather content.

At this point VGDB will assemble the content and redirect you to the proper view. From here you'll see the Name of the game you searched for, an overview of the game, some additional game details on the left sidebar, a live Twitch stream of that game with the highest viewer count (if there is a stream available), and some related YouTube gameplay content. You'll also notice 'Popular Searches' underneath the search bar. These popular searches dynamically change as VGDB users continue making searches.

In the future I plan to do more with the Search database I created and hope to include Related Searches and also a statistics page where I could graph some interesting data about Searches that VGDB logs.


### Prototyping

After settling on my project idea, I started searching for APIs that I could use to supply the content I was looking for. YouTube and Twitch were easy calls to make. Both YouTube and Twitch provided professional, robust APIs that made finding video game media very easy and straightforward. For detailed information about individual games, I came across a few options of varying quality, but I knew from the outset that I would likely use GiantBomb's API. GiantBomb is a funny video game website that produces game reviews and original video content, but they also happen to have the most comprehensive database for video games as well. Using GiantBomb's API was also very straightforward.

The next step involved brainstorming my own database and what I would information I wanted to store. I decided to create User accounts and authorization as well as a separate MongoDB collection for saving Search queries. The idea was that I wanted to save every unique Search query entered in my site. I wanted to save the number of times each term had been searched as well as an array of User IDs that had made those searches. This was the big feature that I didn't get working in time for my final project. In the future I plan to implement Search relations, related Searches, and Search statistics.

The view I had in mind was pretty basic so I didn't spend much time thinking about the wireframes for my project.


### User Stories

- As a user I want to be able to search for any video game and learn basic information about them.

- As a user I want to be able to watch gameplay videos related to my search.

- As a user I want to be able to watch a live stream of the game I searched for.

- As a user I want to see what games other people are searching for.

### Wireframes

##### Welcome/Login View
Coming soon!


### Implementation

This project was implemented with HTML, CSS, JavaScript and Materialize for the front-end, Ruby on Rails for the back-end, and PostgreSQL for the database.

##### Stack:

* Node.js
* Express.js
* MongoDB
* AngularJS
* Semantic-UI

##### Node Dependencies:

* express
* bcryptjs
* body-parser
* cookie-parser
* crypto
* dotenv
* ejs
* jsonwebtoken
* mongoose
* morgan
* passport
* passport-jwt
* passport-local
* path
* semantic-ui

##### MongoDB Collections

###### Users
* username (String)
* email (String)
* password (String)
* firstName (String)
* lastName (String)
* avatarUrl (String)
* timestamps (Date)

###### Searches
* queryString (String)
* count (Number)
* firstSearched (Date)
* lastSearched (Date)
* users [{ user: String, summary: String }]
* timestamps (Date)


### Installation

Heroku:   http://vgdb.herokuapp.com
GitHub:   https://github.com/irwintsay/VGDB

1.  Fork the VGDB repo
2.  Clone repo into a directory
3.  Find the directory in Terminal
4.  ``` npm install ```
5.  Create a .env file and set a JWT_SECRET variable with a random string
6.  Obtain API keys for GiantBomb API and YouTube API and store in .env
7.  Start mongod
8.  ```nodemon```
9.  Open a browser and direct it to localhost:6969


### Still needs work

1. Search database, Search statistics, Search suggestions

2. Invalid form input handling

3. Refactor code

4. Comment out code

5. Improve mobile views

6. Edit profile page

7. Credit GiantBomb, YouTube, and Twitch for their APIs.

8. Some Overview information has no spaces after periods.


### Summary

If you're not very interested in video games, then my project will probably seem kind of useless. That's ok! I'm actually fairly proud of what I was able to produce in one week. I think this is definitely one of the better looking websites that I've ever created. I expanded on what I've made in the past and learned even more about back-end development.

Many of the big, time-killing hurdles that I encountered during this project involved User authorization, the Search database, and the Angular routing. Most of these roadblocks involve aspects of the project that a User will never see or notice and so in that respect it is kind of sad to think about how much time I lost to solving them. On the other hand I am happy with the way the UI came out and I think I'm providing some useful, pertinent information related to every search.

In the future I plan to get my Search database completely functional and do some fun things with the data I'm saving.

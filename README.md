# SpotSwap - Discover and share hidden gems across Ireland!

### SETU Full Stack Web Development 1: Assignment 2
### Svelte Frontend to Hapi API


## Table of Contents
- [About the project](#about-the-project)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installing the project locally](#installing-the-project-locally)
- [Remote Deployments](#remote-deployments)
- [Using the app](#using-the-app)
- [Credits](#credits)

## About the project

SpotSwap is a web application which helps users discover and share hidden gems across Ireland. Whether a secluded beach, a hidden piece of history, or a scenic hiking trail, SpotSwap allows users to explore and contribute to a growing database of unique locations. The platform allows users to add their own spots with locations and descriptions, upload images, and view other locations.

This repository contains the frontend code for SpotSwap, which was built using Svelte. It fetches data from a backend API written using Node.js and Hapi, which interacts with a MongoDB database. The frontend is designed to dynamically update as users add or modify spots and collections.
The tech stack includes Svelte, Leaflet, Axios, and Bulma for styling.

## Features

- Users can create collections and then add spots to them. When adding a collection, users specify the county where the spots are found.
- Users select the coordinates of a spot and can then upload images for that location.
- Users can see analytics both for their own collections and for the entire site.

## Dependencies

Node.js and npm are required. Package dependencies are found in package.json.

## Installing the project locally.

Begin by creating a .env file with the required value for the backend Hapi API. A .env.example file has been provided. Next...

```bash
# Clone the repo
git clone https://github.com/bit-of-a-git/spot-swap.git

# Navigate to the project directory
cd spot-swap

# Install dependencies
npm install

# Copy example .env file 
cp .env.example .env

# Populate .env file
# ...

# Start the project
npm start
```

## Remote Deployments

This project has been deployed on Netlify.

- https://spot-swap-svelte.netlify.app

## Using the app

Whether running locally or using the deployed links, click "Sign Up" to set up an account and log in. You may now add collections by entering a name and selecting an associated county.

Next, click the blue icon under your collection to go to the collection view. Here you can add associated spots by inputting name, description, category, latitude, and longitude. Alternatively, you can press "Use my current location" to populate the latitude and longitude with your current location. After adding a spot, you can upload associated images, and delete them if desired by clicking the red icon in the upper right hand side of the image.

Users can delete spots by clicking the red button at the top right of each listed spot.

## Credits

Much of the code here was taken from SETU's Full Stack Web Development 1 course, particularly the Donation application developed over the course of a series of labs.

Other sources referenced:
- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
- https://blog.yuki-dev.com/blogs/x2lxp2szm


Images were taken from the following sources:
- https://unsplash.com/photos/blue-green-and-yellow-abstract-painting-znhEe1cbbQE
- https://unsplash.com/photos/assorted-hot-air-balloons-flying-at-high-altitude-during-daytime-hpTH5b6mo2s
- https://www.discoverireland.ie/sligo/queen-maeve-trail
- https://sligowalks.ie/walks/qmt/
- https://markrode.ie/thw-quiet-man-statue/
- https://www.titanicbelfast.com/
- https://www.irelandhighlights.com/sight/titanic-belfast/
- https://en.wikipedia.org/wiki/Titanic_Belfast
- https://en.wikipedia.org/wiki/Connemara_National_Park
- https://national-parks.org/ireland/connemara
- https://eyresquarecentre.com/esc-stores/pizza-point/
- https://galwaynationalparkcity.com/circle-of-life-quincentennial-park/
- https://venuesearch.ie/listing/coughlans-bar/
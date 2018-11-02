# Rick and Morty API Search

A small app that acts as a front-end to the [Rick and Morty API](https://rickandmortyapi.com/)
characters endpoint.

This project uses React and TypeScript and was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## How to Start

In the project directory, first run `npm install` to install the dependencies. Then you can run:

### `npm start`

Runs the app in the development mode. Should automatically open
[http://localhost:3000](http://localhost:3000) for viewing in the browser.

Alternatively, you can follow the directions below to build and run a production-optimized version.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode
and optimizes the build for the best performance.

Once this is done, you can easily serve it with a static server by running `npx serve build`.

## Discussion

This was a fun little project to build. Some things to note:

### Create React App & TypeScript

[Create React App](https://github.com/facebook/create-react-app) just released version 2.1 a few
days ago as of this writing (1 Nov 2018). It now has built-in support for generating TypeScript
projects. I decided to try it out.

I made the [compiler settings](tsconfig.json) a bit stricter and added
[TSLint](https://palantir.github.io/tslint/).

### API Wrapper

I built a [small wrapper around the API](src/lib/api.ts). It uses `axios` for network requests and
uses `node-cache` to cache API responses for 10 minutes.

It is also [tested using Jest](src/lib/api.test.ts). Note that the tests are set to skip by default
since they hit the live API.

### Styling

I used [styled-components](https://www.styled-components.com/) for styling because it's awesome.

### Errors

The API returns a 404 when a search term does not yield any results. This is bad behavior and is
kind of annoying; even though errors are caught/handled, you will still see red in the developer
console even when the app is working as expected. Oh well.

### Possible Next Steps

I had to knock off, but some possible next steps (which I may end up implementing if I have time)
include:

* Support for filtering characters by criteria
* Support for locations and episodes
* Routing for show pages and navigation
* Pagination (results are currently limited to the first 20)
* Autocompletion for search

## Etc

Feel free to use this project for whatever you'd like. Feedback and contributions are totally welcome!
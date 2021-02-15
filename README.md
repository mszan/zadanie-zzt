# Recruitment task - Zwolnieni z Teorii
## Table of contents
* [General info](#general-info)
* [Live demo](#live-demo)
* [Project structure](#project-structure)

## General info
This is a website built with Webpack along with [John Resig's Micro-Templating](https://johnresig.com/blog/javascript-micro-templating/) and [Joakim Carlstein's router](https://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html).
![](https://i.imgur.com/0yKkkrA.png)

## Live demo
Live demo is available at [netlify](https://mszan-zadanie-zzt.netlify.app).

## Project structure

- `dist` - distribution files
  - `index.html` - generated from `src/index.html` main template by [HtmlWebPackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
  - `bundle.js` 
- `src` - source files
    - `css` - styles
        - `main.scss`
    - `templates` - routes templates
        - `404.html`
        - `home.html`
        - `success.html`
    - `app.js` - entry script; contains routes and login-related functions
    - `engine.js` - slightly modified John Resig's templating engine
    - `router.js` - slightly modified Joakim Carlstein router
    - `index.html` - output entry HTML template; the only template outside `template` directory
- `functions` - netlify functions
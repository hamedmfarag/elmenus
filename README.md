# Getting Started with El-Menus Mini App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Semantic UI React Components.

## Available Scripts

In the project directory, you can run:

### 1 `npm run prelocalApi`

Generate `db.json` file from `tools/apiServer/mockData.js` for json-server.

### 2 `npm run localApi`

Run Mocking fake REST APIs server on [http://localhost:5000](http://localhost:5000)

### 3 `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## File Structure

```
| .env.development
| .env.production
+---public
+---src
| | App.js
| | i18n.js
| | index.js
| | routes.js
| | userContext.js
| +---apis
| +---components
| +---config
| +---containers
| | +---404
| | +---Admin
| | +---Home
| | +---SignIn
| +---layouts
| | +---Auth
| | +---Private
| | +---Public
| +---mappers
| +---resources
| +---services
| | +---errorBuilder
| | +---handleAsync
| | +---requester
| \---translations
\---tools
\---apiServer
```

## Known bugs

1. Sort Menu Items not supported for Categories and Category Items.
2. Delete Category Item not handled.
3. Edit Category Item not handled.
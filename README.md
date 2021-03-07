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
| .env.development          # contains all need variables for development environment
| .env.production           # contains all env variables for production environment
+---public                  # contains html file as page template.
+---src 
| | App.js                  # the application file, contains toaster setup and routes reference.
| | i18n.js                 # setup file for i18n framework.
| | index.js                # the entry point for react app.
| | routes.js               # all routes needed in the application. (contains the linking between layouts and containers).
| | userContext.js          # store logged in user via React Context API.
| +---apis                  # contains all functions needed to handle the api calls.
| +---components            # contains all shared components that will be used in containers and layouts.              
| +---containers            # contains the pages for this app (Home, Sign In and Admin Pages).
| | +---404
| | +---Admin
| | +---Home
| | +---SignIn
| +---layouts               # containes all layouts (parent components for containers).
| | +---Auth                # layout for sign in page.
| | +---Private             # layout for Admin page.
| | +---Public              # layout for Home Page (Menu).
| +---mappers               # format the shape of object that returned from api calls (used in apis folder).
| +---resources             # contains enum to avoid any static strings.
| +---services              # contains utilities and helpers.
| | +---errorBuilder        # function to check for message code to return the suitable message.
| | +---handleAsync         # simplify promise objects to use easily later.
| | +---requester           # the core function for calling api (bases on axios)
| \---translations          # contains the language files (en and ar).
+---tools
| +---apiServer             # the api server
```

## Used Packages

1. Semantic React UI
2. axios
3. i18next & react-i18next
4. immutability-helper
5. loglevel
6. query-string
7. react-toastify

## Known bugs

1. Sort Menu Items not supported for Categories and Category Items.
2. Delete Category Item not handled.
3. Edit Category Item not handled.
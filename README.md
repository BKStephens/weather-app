# Weather App

## Setup

Get an (OpenWeather API key)[https://home.openweathermap.org/users/sign_up] and
add it to your .env

```
cp .env.template .env
```

## Run

Start both the client (`yarn client:start`) and the server (`yarn server:start`)
and then navigate to [http://localhost:3000](http://localhsot:3000)

## Available Scripts

In the project directory, you can run:

### `yarn server:start`

Runs the server.

### `yarn client:start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn client:test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn client:build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

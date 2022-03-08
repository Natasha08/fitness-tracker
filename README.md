## Fitness Tracker

![CircleCI](https://circleci.com/gh/RadialDevGroup/react-redux-example.svg?style=shield&circle-token=9b0aef35f3156387509aa72ea4a8ba23b3e0f864)

### Major Dependencies
- [Create React App](https://create-react-app.dev/docs/getting-started)
- [Redux](https://redux.js.org/api/api-reference)
- [Nutritionix API](https://developer.nutritionix.com/)

### Setup
`cp .env.example .env`

#### Nutritionix
- Go to the [Nutritionix API](https://developer.nutritionix.com/) and generate an app id and an api key and add themm to your `.env`

#### Install Dependenices
```
nvm use
npm i
```

### Local Server

`npm start`

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

Default login:
`radial@example.com`
`password`

### Testing
`npm test`

### Linter
`npm run lint`

### Production Build
`npm run build`

`npm run install -g serve`
`npm run serve`


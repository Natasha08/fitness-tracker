## Fitness Tracker (rewrite)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7d0e5044-5970-4640-9ed5-7c3fffddc7c8/deploy-status)](https://app.netlify.com/sites/natasha-fitness-tracker/deploys)
![CircleCI](https://circleci.com/gh/Natasha08/fitness-tracker.svg?style=shield&circle-token=80e31fa37d9166471df47398d203d0e5f06f999d)

[Staging site](https://natasha-fitness-tracker.netlify.app/)


### Major Dependencies
- [Nutritionix API](https://developer.nutritionix.com/)
- [Create React App](https://create-react-app.dev/docs/getting-started)
- [Redux](https://redux.js.org/api/api-reference)
- [Fitness API](https://github.com/Natasha08/fitness-api)

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
`natasha@example.com`
`password`

### Testing
`npm test`

### Linter
`npm run lint`

### Production Build
`npm run build`

`npm run install -g serve`
`npm run serve`


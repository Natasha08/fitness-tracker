export const LOGIN_ENDPOINT = process.env.REACT_APP_API_BASE;
export const LOGIN_URL = 'login';
export const LOGIN_REQUIRED_KEYS = ['email', 'password'];

export const INSTANT_SEARCH_ENDPOINT = process.env.REACT_APP_NUTRITIONIX_API_BASE;
export const INSTANT_SEARCH_URL = 'search/instant';
export const NATURAL_SEARCH_ENDPOINT = INSTANT_SEARCH_ENDPOINT;
export const NATURAL_SEARCH_URL = 'natural/nutrients';
export const INSTANT_SEARCH_REQUIRED_KEYS = [];

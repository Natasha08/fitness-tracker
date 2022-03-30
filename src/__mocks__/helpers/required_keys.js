export const LOGIN_ENDPOINT = process.env.REACT_APP_API_BASE;
export const LOGIN_PATH = 'login';
export const LOGIN_REQUIRED_KEYS = ['email', 'password'];

export const INSTANT_SEARCH_ENDPOINT = process.env.REACT_APP_NUTRITIONIX_API_BASE;
export const INSTANT_SEARCH_PATH = 'search/instant';
export const INSTANT_SEARCH_REQUIRED_KEYS = [];

export const NATURAL_SEARCH_ENDPOINT = INSTANT_SEARCH_ENDPOINT;
export const NATURAL_SEARCH_PATH = 'natural/nutrients';
export const NATURAL_SEARCH_REQUIRED_KEYS = ['query'];

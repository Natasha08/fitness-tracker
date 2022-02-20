import login from './login';

const mockFitnessAPI = (responses={}) => {
  const {loginResponse={}} = responses;

  beforeEach(() => {
    login(loginResponse);
  });
};

export default mockFitnessAPI;

import apiCaller from '.';

export const Auth = {
  LOGIN: 'api/auth/signin',
  SIGNUP: 'api/auth/signup',
};

const Login = async (body: any) => {
  return await apiCaller('post', Auth.LOGIN, body, undefined, false);
};

const Signup = async (body: any) => {
  return await apiCaller('post', Auth.SIGNUP, body, undefined, false);
};

export { Login, Signup };

import apiCaller from '.';

export const Auth = {
  LOGIN: 'auth/signin',
  SIGNUP: 'auth/signup',
  GET_PROFILE: 'user/profile',
  UPDATE_PROFILE: 'user/profile',
  GET_PREFERENCES: 'user/preferences',
  UPDATE_PREFERENCES: 'user/preferences',
  FILE_UPLOAD: 'file/upload',
  REJISTER_VOLUNTEER: 'volunteer/register',
  GET_VOLUNTEER: 'volunteer',
};

const Login = async (body: any) => {
  return await apiCaller('post', Auth.LOGIN, body, undefined, false);
};

const Signup = async (body: any) => {
  return await apiCaller('post', Auth.SIGNUP, body, undefined, false);
};

const GetProfile = async () => {
  return await apiCaller('get', Auth.GET_PROFILE, undefined, undefined, false);
};

const UpdateProfile = async (body: any) => {
  return await apiCaller('post', Auth.UPDATE_PROFILE, body, undefined, false);
};

const GetPreferences = async () => {
  return await apiCaller(
    'get',
    Auth.GET_PREFERENCES,
    undefined,
    undefined,
    false,
  );
};

const UpdatePreferences = async (body: any) => {
  return await apiCaller(
    'post',
    Auth.UPDATE_PREFERENCES,
    body,
    undefined,
    false,
  );
};

const FileUpload = async (body: any) => {
  return await apiCaller('post', Auth.FILE_UPLOAD, body, undefined, true);
};

const GetVolunteer = async () => {
  return await apiCaller(
    'get',
    Auth.GET_VOLUNTEER,
    undefined,
    undefined,
    false,
  );
};

const RejisterVolunteer = async (body: any) => {
  return await apiCaller(
    'post',
    Auth.REJISTER_VOLUNTEER,
    body,
    undefined,
    false,
  );
};

export {
  Login,
  Signup,
  GetProfile,
  UpdateProfile,
  GetPreferences,
  UpdatePreferences,
  FileUpload,
  RejisterVolunteer,
  GetVolunteer,
};

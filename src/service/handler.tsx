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
  Add_CAUSES: 'causes',
  GET_CAUSES: 'causes',
  DONATE_ZAKAT: 'donation/zakat',
  DONATE_FITRAH: 'donation/fitrah',
  DONATE_SADAQAH: 'donation/sadaqah',
  DONATE: 'donation',
  GET_DONATIONS: 'donation',
  GET_DONATION_BY_ID: 'donation',
  HELP_REQUEST: 'help-request',
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

const GetCauses = async () => {
  return await apiCaller('get', Auth.GET_CAUSES, undefined, undefined, false);
};

const AddCauses = async (body: any) => {
  return await apiCaller('post', Auth.Add_CAUSES, body, undefined, false);
};

const DonateZakat = async (body: any) => {
  return await apiCaller('post', Auth.DONATE_ZAKAT, body, undefined, false);
};

const DonateFitrah = async (body: any) => {
  return await apiCaller('post', Auth.DONATE_FITRAH, body, undefined, false);
};

const DonateSadaqah = async (body: any) => {
  return await apiCaller('post', Auth.DONATE_SADAQAH, body, undefined, false);
};

const Donate = async (body: any) => {
  return await apiCaller('post', Auth.DONATE, body, undefined, false);
};

const GetDonations = async () => {
  return await apiCaller(
    'get',
    Auth.GET_DONATIONS,
    undefined,
    undefined,
    false,
  );
};

const GetDonationById = async (id: string) => {
  return await apiCaller(
    'get',
    Auth.GET_DONATION_BY_ID + '/' + id,
    undefined,
    undefined,
    false,
  );
};

const SubmitHelpRequest = async (body: any) => {
  return await apiCaller('post', Auth.HELP_REQUEST, body, undefined, false);
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
  AddCauses,
  GetCauses,
  DonateZakat,
  DonateFitrah,
  DonateSadaqah,
  Donate,
  GetDonations,
  GetDonationById,
  SubmitHelpRequest,
};

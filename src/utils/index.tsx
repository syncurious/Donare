import {
  UpdateProfile as _UpdateProfile,
  FileUpload,
} from '../service/handler';

type UpdateProfilePayload = {
  email: string;
  full_name: string;
  phone: string;
  profile_picture:
    | string
    | { uri: string; name?: string; type?: string }
    | null;
};

export const UploadFile = async (file: any) => {
  return await FileUpload(file);
};

const buildFormData = (file: { uri: string; name?: string; type?: string }) => {
  const formData = new FormData();
  const fileName = file.name || file.uri.split('/').pop() || 'upload.jpg';
  const mimeType = file.type || 'image/jpeg';
  formData.append('file', {
    // @ts-ignore React Native FormData file type
    uri: file.uri,
    name: fileName,
    type: mimeType,
  });
  return formData;
};

const extractUploadedUrl = (res: any): string | null => {
  if (!res) return null;
  // Try common locations
  if (typeof res === 'string') return res;
  if (res.url) return res.url;
  if (res.data?.url) return res.data.url;
  if (res.data?.path) return res.data.path;
  if (res.path) return res.path;
  if (res.location) return res.location;
  return null;
};

export const UpdateProfile = async (payload: UpdateProfilePayload) => {
  let profilePictureUrl: string | null = null;

  if (payload?.profile_picture && typeof payload.profile_picture !== 'string') {
    const formData = buildFormData(payload.profile_picture);
    const uploadRes = await UploadFile(formData);
    profilePictureUrl = extractUploadedUrl(uploadRes);
  } else if (typeof payload.profile_picture === 'string') {
    profilePictureUrl = payload.profile_picture;
  }

  const body = {
    email: payload.email,
    full_name: payload.full_name,
    phone: payload.phone,
    profile_picture: profilePictureUrl || '',
  };

  return await _UpdateProfile(body);
};

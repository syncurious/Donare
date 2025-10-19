import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { store } from '../store';

export const baseURL = 'http://54.255.168.207:3001/api/';

interface ApiHandlerConfig {
  isMultipart?: boolean;
}

const ApiHandler = ({
  isMultipart = false,
}: ApiHandlerConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = store.getState()?.profile?.profile?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      console.error('Request error:', error);
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    error => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized - 401:', error.response);
        // Handle token expiration or unauthorized access here
      }
      console.error('Response error:', error);
      return Promise.reject(error.response || error);
    },
  );

  return instance;
};

const apiCaller = async <T,>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  endpoint: string,
  body?: any,
  params?: any,
  isMultipart: boolean = false,
): Promise<T> => {
  try {
    const apiInstance = ApiHandler({ isMultipart });
    const response = await apiInstance.request({
      method,
      url: endpoint,
      data: body,
      params,
    });
    console.log(
      `API Call Success [${method.toUpperCase()} ${endpoint}]`,
      response.data,
    );
    return response.data;
  } catch (error) {
    console.error(
      `API Call Error [${method.toUpperCase()} ${endpoint}]`,
      error,
    );
    throw error;
  }
};

export default apiCaller;

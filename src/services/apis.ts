import axios from 'axios';
import env from '../../env.json';

const API = axios.create({
  baseURL: env.api,
  timeout: 10000,
});

type Params = Record<string, any>;
type Data = Record<string, any>;
type ApiOptions = {
  isAdmin?: boolean;
  userId?: string;
};

// Helper để thêm header x-admin nếu cần
const getHeaders = (options?: ApiOptions) =>
  options?.isAdmin
    ? { 'x-admin': 'true' }
    : options?.userId
      ? { 'x-user-id': options.userId }
      : undefined;
const get = async (endpoint: string, params?: Params, options?: ApiOptions) => {
  try {
    const res = await API.get(endpoint, {
      params,
      headers: getHeaders(options),
    });
    return res;
  } catch (error) {
    if (error.response.status === 404) {
      return error.response;
    }
    console.error('API GET error:', error);
    throw error;
  }
};

const post = async (endpoint: string, data?: Data, options?: ApiOptions) => {
  try {
    const res = await API.post(endpoint, data, {
      headers: getHeaders(options),
    });
    return res;
  } catch (error) {
    if (error.response.status === 404) {
      return error.response;
    }
    console.error('API POST error:', error);
    throw error;
  }
};

const put = async (endpoint: string, data?: Data, options?: ApiOptions) => {
  try {
    const res = await API.put(endpoint, data, {
      headers: getHeaders(options),
    });
    return res;
  } catch (error) {
    if (error.response.status === 404) {
      return error.response;
    }
    console.error('API PUT error:', error);
    throw error;
  }
};

const del = async (endpoint: string, params?: Params, options?: ApiOptions) => {
  try {
    const res = await API.delete(endpoint, {
      params,
      headers: getHeaders(options),
    });
    return res;
  } catch (error) {
    if (error.response.status === 404) {
      return error.response;
    }
    console.error('API DELETE error:', error);
    throw error;
  }
};

const api = {
  get,
  post,
  put,
  delete: del,
};

export default api;

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

// Thêm header tùy theo userId hoặc admin
const getHeaders = (options?: ApiOptions) =>
  options?.isAdmin
    ? { 'x-admin': 'true' }
    : options?.userId
      ? { 'x-user-id': options.userId }
      : undefined;

// Hàm xử lý request chung
const handleRequest = async (
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  payload?: any,
  options?: ApiOptions
) => {
  try {
    const config = {
      headers: getHeaders(options),
      ...(method === 'get' || method === 'delete' ? { params: payload } : {}),
    };

    const res = await API[method](
      endpoint,
      method === 'get' || method === 'delete' ? config : payload,
      config
    );
    return {
      status: res.status,
      data: res.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status ?? 500,
      data: error.response?.data ?? { message: 'Unknown error' },
    };
  }
};

// Các method gọn gàng
const api = {
  get: (endpoint: string, params?: Params, options?: ApiOptions) =>
    handleRequest('get', endpoint, params, options),
  post: (endpoint: string, data?: Data, options?: ApiOptions) =>
    handleRequest('post', endpoint, data, options),
  put: (endpoint: string, data?: Data, options?: ApiOptions) =>
    handleRequest('put', endpoint, data, options),
  delete: (endpoint: string, params?: Params, options?: ApiOptions) =>
    handleRequest('delete', endpoint, params, options),
};

export default api;

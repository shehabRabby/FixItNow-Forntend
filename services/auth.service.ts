import { axiosInstance } from '@/lib/axiosInstance';
import { ApiResponse, IUser } from '@/types';
import Cookies from 'js-cookie';

// Login Payload Interface
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  accessToken: string;
  user: IUser;
}

export const authService = {
  async login(payload: LoginPayload) {
    const response = await axiosInstance.post<ApiResponse<LoginResponseData>>(
      '/auth/login',
      payload
    );

    if (response.data.data?.accessToken) {
      Cookies.set('accessToken', response.data.data.accessToken, { expires: 7 });
      Cookies.set('user', JSON.stringify(response.data.data.user), { expires: 7 });
    }

    return response.data;
  },

  logout() {
    Cookies.remove('accessToken');
    Cookies.remove('user');
  },
};
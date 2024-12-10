import { http } from '@/config';
import { IUser } from '@/types';

interface IUserDto {
  id: string;
  username: string;
  email: string;
}

export const verifyToken = async (token: string): Promise<IUser | null> => {
  try {
    const response = await http.post<IUserDto>('/auth/verify', { token });
    return response.data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

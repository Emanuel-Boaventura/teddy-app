import api from '@/utils/api';
import { IClient } from './getAllUsers';

export async function getUserById(id: number) {
  const { data } = await api.get<IClient>(`/users/${id}`);

  return data;
}

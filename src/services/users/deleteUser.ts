import api from '@/utils/api';

export async function deleteUser(id: number) {
  await api.delete(`/users/${id}`);
}

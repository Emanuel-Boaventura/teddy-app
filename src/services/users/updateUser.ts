import api from '@/utils/api';

type TUpdateUserDTO = {
  name: string;
  salary: number;
  companyValuation: number;
};

export async function updateUser(id: number, user: TUpdateUserDTO) {
  await api.patch(`/users/${id}`, user);
}

import api from '@/utils/api';

type TCreateUserDTO = {
  name: string;
  salary: number;
  companyValuation: number;
};

export async function createUser(user: TCreateUserDTO) {
  await api.post(`/users`, user);
}

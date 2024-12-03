import api from '@/utils/api';

export interface IClient {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  updatedAt: string;
  createdAt: string;
}

interface IGetAllUsersResponse {
  clients: IClient[];
  currentPage: number;
  totalPages: number;
}

interface IParams {
  page: number;
  limit: number;
}

export async function getAllUsers(params: IParams) {
  const { data } = await api.get<IGetAllUsersResponse>('/users', { params });

  return data;
}

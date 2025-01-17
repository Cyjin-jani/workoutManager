import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string | null;
  profileUrl: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  gender: string | null;
  createdAt: string;
  updatedAt: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>('/api/users');
  return data;
};

function usersOptions(options?: Partial<UseQueryOptions<User[], AxiosError>>) {
  return queryOptions({
    queryKey: ['users'],
    queryFn: fetchUsers,
    ...options,
  });
}

const useUsers = (): UseQueryResult<User[], AxiosError> => {
  return useQuery<User[], AxiosError>(usersOptions());
};

export default useUsers;

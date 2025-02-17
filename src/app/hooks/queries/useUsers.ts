import type { User } from '@prisma/client';
import { queryOptions, useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import type { AxiosError } from 'axios';

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

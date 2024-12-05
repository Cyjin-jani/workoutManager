import { useQuery, QueryFunction } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUsers: QueryFunction<User[]> = async () => {
  const { data } = await axios.get<User[]>('/api/users');
  return data;
};

const useUsers = () => {
  return useQuery<User[], Error>({ queryKey: ['users'], queryFn: fetchUsers });
};

export default useUsers;

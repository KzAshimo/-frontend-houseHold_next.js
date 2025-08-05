import useSWR from 'swr';
import axios from '@/lib/axios';

export const useAuth = () => {
  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios.get('/api/user').then(res => res.data)
  );

  const isLoading = !user && !error;

  return {
    user,
    isLoading,
    mutate,
  };
};
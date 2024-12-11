import { useMutation, useQueryClient } from 'react-query';

import { QUERY_KEY } from '@/constants';
import { createEvent } from '@/services';

export const useEventCreate = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: loading } = useMutation(createEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.events);
      queryClient.invalidateQueries(QUERY_KEY.plans);
    },
    onError: (error) => {
      console.error('Error creating event: ', error);
    },
  });

  return { createEvent: mutate, loading };
};

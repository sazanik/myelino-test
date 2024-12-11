import { useMutation, useQueryClient } from 'react-query';

import { QUERY_KEY } from '@/constants';
import { createEvent, deleteEvent } from '@/services';

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

export const useEventDelete = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading: loading } = useMutation(deleteEvent, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.events);
      queryClient.invalidateQueries(QUERY_KEY.plans);
    },
    onError: (error) => {
      console.error('Error deleting event: ', error);
    },
  });

  return { deleteEvent: mutate, loading };
};

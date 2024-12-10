import qs from 'qs';

import { http } from '@/config';
import { IEvent, IPlan } from '@/types';

type PlansParams = {
  userId: string;
};

interface IPlanDto {
  id: string;
  userId: string;
  name: string;
}

interface IEventDto {
  id: string;
  userId: string;
  planId: string;
  name: string;
  dtStart: number;
  dtEnd: number;
  invitedPersonsCount: number;
  cost: number;
  imageUrl: string;
}

export const getPlans = async (params: PlansParams): Promise<IPlan[]> => {
  const query = qs.stringify(params);

  const { data: plans } = (await http.get<IPlanDto[]>(`/plans?${query}`)) || {};

  const preparedPlans = await Promise.all(
    plans.map(async (plan) => {
      const { data: events } = await http.get<IEventDto[]>(`/plans/${plan.id}/events?${query}`);
      return {
        ...plan,
        title: plan.name,
        events: (events ?? []).map<IEvent>((item) => ({ ...item, title: item.name })),
      };
    })
  );

  return preparedPlans;
};

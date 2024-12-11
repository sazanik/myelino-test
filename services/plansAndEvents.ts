import { http } from '@/config';
import { IEvent, IPlan } from '@/types';

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

export interface IEventCreateDto {
  planId: string;
  name: string;
  dtStart: number;
  dtEnd: number;
  invitedPersonsCount: number;
  cost: number;
}

export interface IEventDeleteParams {
  planId: string;
  id: string;
}

export const getPlans = async (): Promise<IPlan[]> => {
  const { data: plans } = (await http.get<IPlanDto[]>(`/plans`)) ?? {};

  const preparedPlans = await Promise.all(
    plans.map(async (plan) => {
      const { data: events } = await http.get<IEventDto[]>(`/plans/${plan.id}/events`);
      return {
        id: plan.id,
        title: plan.name,
        events: (events ?? []).map<IEvent>((item) => ({ ...item, title: item.name })),
      };
    })
  );

  return preparedPlans;
};

export const createEvent = async (item: IEventCreateDto): Promise<IEvent> => {
  const { data: event } = (await http.post<IEventDto>(`/plans/${item.planId}/events`, item)) ?? {};

  const preparedEvent = { ...event, title: event.name };

  return preparedEvent;
};

export const deleteEvent = async ({ planId, id }: IEventDeleteParams): Promise<void> => {
  await http.delete(`/plans/${planId}/events/${id}`);
};

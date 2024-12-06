import { useEffect, useMemo, useState } from 'react';

import { MOCK_EVENTS, MOCK_EVENTS_PLANS, QUICK_PLANS } from '@/constants';
import { IEvent, IEventPlan } from '@/types';

const getMonthName = (date: Date | number) =>
  new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date));

export const useEventsData = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventsPlans, setEventsPlans] = useState<IEventPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const plansByMonths = useMemo(
    () =>
      eventsPlans.reduce(
        (acc, plan) => {
          const filteredPlan = {
            ...plan,
            events: plan.events.filter((event) => Date.now() < Number(event.dtEnd)),
          };

          if (!filteredPlan.events.length) {
            return acc;
          }

          const currentMonth = new Date().getMonth();
          const planMonth = new Date(filteredPlan.events[0].dtStart).getMonth();

          if (currentMonth === planMonth) {
            acc[QUICK_PLANS] = acc[QUICK_PLANS] ? [...acc[QUICK_PLANS], plan] : [plan];

            return acc;
          }

          const monthName = getMonthName(filteredPlan.events[0].dtStart);
          acc[monthName] = acc[monthName] ? [...acc[monthName], plan] : [plan];

          return acc;
        },
        {} as Record<string, IEventPlan[]>
      ),
    [eventsPlans]
  );

  const fetchData = () => {
    setTimeout(() => {
      setEventsPlans(MOCK_EVENTS_PLANS);
      setEvents(MOCK_EVENTS);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setLoading(false);
    };
  }, []);

  return { events, eventsPlans, plansByMonths, loading };
};

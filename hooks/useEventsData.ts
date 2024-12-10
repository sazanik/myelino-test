import { useEffect, useMemo, useState } from 'react';

import { ALL_SAVED_EVENTS_PLAN_OPTION, CURRENT_MONTH_OPTION, MOCK_EVENTS_PLANS } from '@/constants';
import { IPlan } from '@/types';

export const useEventsData = () => {
  const [eventsPlans, setEventsPlans] = useState<IPlan[]>([]);
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
            acc[CURRENT_MONTH_OPTION.key] = acc[CURRENT_MONTH_OPTION.key]
              ? [...acc[CURRENT_MONTH_OPTION.key], plan]
              : [plan];

            return acc;
          }

          acc[planMonth] = acc[planMonth] ? [...acc[planMonth], plan] : [plan];

          return acc;
        },
        {} as Record<string, IPlan[]>
      ),
    [eventsPlans]
  );

  const allSavedEventsPlan: IPlan = useMemo(
    () =>
      eventsPlans.reduce(
        (acc, plan) => {
          acc.events = [...acc.events, ...plan.events];

          return acc;
        },
        {
          id: ALL_SAVED_EVENTS_PLAN_OPTION.key,
          title: ALL_SAVED_EVENTS_PLAN_OPTION.label,
          events: [],
        }
      ),
    [eventsPlans]
  );

  const fetchData = () => {
    setTimeout(() => {
      setEventsPlans(MOCK_EVENTS_PLANS);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setLoading(false);
    };
  }, []);

  return { allSavedEventsPlan, eventsPlans, plansByMonths, loading };
};

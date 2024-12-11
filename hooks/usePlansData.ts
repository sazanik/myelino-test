import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { ALL_SAVED_EVENTS_PLAN_OPTION, CURRENT_MONTH_OPTION, QUERY_KEY } from '@/constants';
import { getPlans } from '@/services';
import { IPlan } from '@/types';

export const usePlansData = () => {
  const { data: plans = [], isLoading } = useQuery(QUERY_KEY.plans, getPlans);

  const plansByMonths = useMemo(
    () =>
      plans.reduce(
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
    [plans]
  );

  const allSavedEventsPlan: IPlan = useMemo(
    () =>
      plans.reduce(
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
    [plans]
  );

  return { allSavedEventsPlan, plans, plansByMonths, loading: isLoading };
};

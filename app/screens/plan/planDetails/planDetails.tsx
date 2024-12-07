import { useCallback, useMemo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import { EventList, Header } from '@/components';
import { ROUTE, SCREEN_PADDING } from '@/constants';
import { useTheme, useTypedNavigation } from '@/hooks';
import { CreateStylesFn, IEvent, RouteParams } from '@/types';

const createStyles: CreateStylesFn = ({ insets }) => ({
  header: {
    paddingTop: (insets.top || SCREEN_PADDING.TOP) + SCREEN_PADDING.TOP,
  },
});

type DetailsScreenParams = RouteProp<RouteParams, typeof ROUTE.plan.details>;

const PlanDetailsScreen = () => {
  const { goBack } = useTypedNavigation();
  const { params } = useRoute<DetailsScreenParams>();

  const { styles } = useTheme(createStyles);

  const eventsByExpiresDays = useMemo(
    () =>
      params?.plan?.events?.reduce<Record<string, IEvent[]>>((acc, event) => {
        const daysDifference = Math.round(
          (Number(event.dtEnd) - Date.now()) / (1000 * 60 * 60 * 24)
        ).toString();

        acc[daysDifference] = acc[daysDifference] ? [...acc[daysDifference], event] : [event];

        return acc;
      }, {}),
    [params?.plan?.events]
  );

  const sections = useMemo(
    () =>
      Object.entries(eventsByExpiresDays).map(([days, events], index) => ({
        title: `Expires in ${days} days`,
        data: events,
        index,
      })),
    [eventsByExpiresDays]
  );

  const ListHeaderComponent = useMemo(
    () => <Header style={styles.header} title={params.plan.title} onBackPress={goBack} />,
    [goBack, params.plan.title, styles.header]
  );

  const handleEventPress = useCallback((event: IEvent) => {
    console.log(event);
  }, []);

  return (
    <EventList.Extended
      style={styles.container}
      contentStyle={styles.contentContainer}
      ListHeaderComponent={ListHeaderComponent}
      onItemPress={handleEventPress}
      sections={sections}
    />
  );
};

export default PlanDetailsScreen;

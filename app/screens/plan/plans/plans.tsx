import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import {
  DateGreeting,
  EventList,
  FilterPanel,
  Header,
  Loader,
  PlanCard,
  SearchInput,
  TimelineCheckpoint,
  TimelineList,
} from '@/components';
import { CURRENT_MONTH_OPTION, MONTHS_MAP, SCREEN_PADDING } from '@/constants';
import { useEventsData, useTheme, useTypedNavigation } from '@/hooks';
import { CreateStylesFn, IEvent, IEventPlan, IOption } from '@/types';

const createStyles: CreateStylesFn = ({ colors, insets }) => ({
  container: {
    flex: 1,
    paddingTop: insets.top || SCREEN_PADDING.TOP,
    backgroundColor: colors.common.screenBackground,
  },
  contentContainer: {
    paddingHorizontal: SCREEN_PADDING.HORIZONTAL,
    paddingBottom: (insets.top || SCREEN_PADDING.BOTTOM_M) + SCREEN_PADDING.BOTTOM_XL,
    backgroundColor: colors.common.screenBackground,
  },
  header: {
    marginTop: 20,
  },
  dateGreeting: {
    marginTop: 20,
  },
  searchInput: {
    marginTop: 16,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.common.text.primary,
    alignSelf: 'flex-start',
  },
  filterPanelContent: {
    // padding to see top shadow
    paddingVertical: 8,
  },
  allSavedEventsPlan: {
    marginTop: 16,
  },
  topTimelineCheckpoint: {
    marginLeft: -10,
    marginTop: 40,
  },
  eventList: {
    marginTop: 16,
  },
  eventListContent: {
    columnGap: 4,
  },
  timeline: {
    marginTop: 40,
    backgroundColor: colors.common.screenBackground,
  },
});

const PlansScreen = () => {
  const { goBack } = useTypedNavigation();
  const { styles } = useTheme(createStyles);

  const { plansByMonths, allSavedEventsPlan, loading } = useEventsData();
  const [selectedFilterItem, setSelectedFilterItem] = useState<undefined | IOption>();
  const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);

  const planFilters = useMemo(
    () =>
      Object.entries(plansByMonths)
        .map(([key, plans]) => ({
          key,
          label:
            key === CURRENT_MONTH_OPTION.key
              ? CURRENT_MONTH_OPTION.label
              : `${MONTHS_MAP[key].slice(0, 3)} (${plans.length})`,
        }))
        .sort((a, b) => {
          if (a.key === CURRENT_MONTH_OPTION.key) {
            return -1;
          }
          if (b.key === CURRENT_MONTH_OPTION.key) {
            return 1;
          }
          return 0;
        }),
    [plansByMonths]
  );

  const currentMonthEvents = useMemo(
    () => plansByMonths[CURRENT_MONTH_OPTION.key]?.flatMap((plan) => [...plan.events]),
    [plansByMonths]
  );

  const topTimelineCheckpointTitle = useMemo(
    () =>
      `Expires in ${Math.round((Number((selectedEvents ?? [])[0]?.dtEnd ?? Date.now()) - Date.now()) / (1000 * 60 * 60 * 24))} days`,
    [selectedEvents]
  );

  const timelineSections = useMemo(
    () =>
      Object.entries(plansByMonths)
        .map(([key, plans], index) => ({
          title: MONTHS_MAP[key],
          data: plans,
          index,
        }))
        .filter(({ title }) => Boolean(title)),
    [plansByMonths]
  );

  const handleFilterItemPress = useCallback(
    (option: IOption) => {
      const selectedEvents = plansByMonths[option.key].flatMap((plan) => [...plan.events]);

      setSelectedFilterItem(option);
      setSelectedEvents(selectedEvents);
    },
    [plansByMonths]
  );

  const handleEventItemPress = useCallback((event: IEvent) => {
    console.log(event);
  }, []);

  const handleEventsCardPress = useCallback((plan: IEventPlan) => {
    console.log(plan);
  }, []);

  const renderListHeaderComponent = useCallback(
    () => (
      <View>
        <Header style={styles.header} title="Planner" onBackPress={goBack} />
        <DateGreeting style={styles.dateGreeting} />
        <SearchInput style={styles.searchInput} value="" onChangeText={() => {}} />
        <Text style={styles.title}>Plans</Text>

        <FilterPanel
          contentStyle={styles.filterPanelContent}
          data={planFilters}
          onItemPress={handleFilterItemPress}
          selectedItem={selectedFilterItem}
        />

        <PlanCard
          style={styles.allSavedEventsPlan}
          title="All events saved"
          plan={allSavedEventsPlan}
          onItemPress={handleEventsCardPress}
        />

        <TimelineCheckpoint
          style={styles.topTimelineCheckpoint}
          type="urgent"
          title={topTimelineCheckpointTitle}
        />

        <EventList
          style={styles.eventList}
          contentStyle={styles.eventListContent}
          horizontal
          data={selectedEvents}
          onItemPress={handleEventItemPress}
        />
      </View>
    ),
    [
      allSavedEventsPlan,
      goBack,
      handleEventItemPress,
      handleEventsCardPress,
      handleFilterItemPress,
      planFilters,
      selectedEvents,
      selectedFilterItem,
      styles,
      topTimelineCheckpointTitle,
    ]
  );

  useEffect(() => {
    if (planFilters) {
      setSelectedFilterItem(planFilters[0]);
      setSelectedEvents(currentMonthEvents);
    }
  }, [planFilters, currentMonthEvents]);

  if (loading) {
    return <Loader />;
  }

  return (
    <TimelineList
      style={styles.container}
      contentStyle={styles.contentContainer}
      ListHeaderComponent={renderListHeaderComponent}
      sections={timelineSections}
      onEventsCardPress={handleEventsCardPress}
    />
  );
};

export default PlansScreen;

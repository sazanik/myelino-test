import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import {
  DateGreeting,
  EventList,
  FilterPanel,
  Header,
  Loader,
  SearchInput,
  TimelineList,
} from '@/components';
import { QUICK_PLANS, SCREEN_PADDING } from '@/constants';
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
  eventList: {
    marginTop: 10,
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

  const { plansByMonths, loading } = useEventsData();

  const planFilters = useMemo(
    () =>
      Object.entries(plansByMonths).map(([filterName, plans]) => ({
        value: filterName,
        label:
          filterName === QUICK_PLANS ? filterName : `${filterName.slice(0, 3)} (${plans.length})`,
      })),
    [plansByMonths]
  );

  const quickPlanEvents = useMemo(
    () => plansByMonths[QUICK_PLANS]?.flatMap((plan) => [...plan.events]),
    [plansByMonths]
  );

  const timelineSections = useMemo(
    () =>
      Object.entries(plansByMonths).map(([filterName, plans]) => ({
        title: filterName,
        data: plans,
      })),
    [plansByMonths]
  );

  console.log(timelineSections);

  const [selectedFilterItem, setSelectedFilterItem] = useState<undefined | IOption>();
  const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);

  const handleFilterItemPress = useCallback(
    (option: IOption) => {
      const selectedEvents = plansByMonths[option.value].flatMap((plan) => [...plan.events]);

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
      goBack,
      handleEventItemPress,
      handleFilterItemPress,
      planFilters,
      selectedEvents,
      selectedFilterItem,
      styles,
    ]
  );

  useEffect(() => {
    if (planFilters) {
      setSelectedFilterItem(planFilters[0]);
      setSelectedEvents(quickPlanEvents);
    }
  }, [planFilters, quickPlanEvents]);

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

import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { DateGreeting, EventList, FilterPanel, Header, Loader, SearchInput } from '@/components';
import { QUICK_PLANS, SCREEN_PADDING } from '@/constants';
import { useEventsData, useTheme, useTypedNavigation } from '@/hooks';
import { CreateStylesFn, IEvent, IOption } from '@/types';

const createStyles: CreateStylesFn = ({ colors, insets }) => ({
  container: {
    flex: 1,
    paddingTop: insets.top || SCREEN_PADDING.TOP,
    paddingHorizontal: SCREEN_PADDING.HORIZONTAL,
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
    marginTop: 10,
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
});

const PlansDetailsScreen = () => {
  const { goBack } = useTypedNavigation();
  const { styles } = useTheme(createStyles);

  const { plansByMonths, loading } = useEventsData();

  console.log(plansByMonths);

  const planFilters = Object.entries(plansByMonths).map(([filterName, plans]) => ({
    value: filterName,
    label: filterName === QUICK_PLANS ? filterName : `${filterName.slice(0, 3)} (${plans.length})`,
  }));

  const [selectedItem, setSelectedItem] = useState<undefined | IOption>();

  const quickPlanEvents = useMemo(
    () => plansByMonths[QUICK_PLANS]?.flatMap((plan) => [...plan.events]),
    [plansByMonths]
  );

  const handleFilterItemPress = useCallback((option: IOption) => {
    setSelectedItem(option);
  }, []);

  const handleEventItemPress = useCallback((event: IEvent) => {
    console.log(event);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Header style={styles.header} title="Planner" onBackPress={goBack} />
      <DateGreeting style={styles.dateGreeting} />
      <SearchInput style={styles.searchInput} value="" onChangeText={() => {}} />
      <Text style={styles.title}>Plans</Text>
      <FilterPanel
        contentStyle={styles.filterPanelContent}
        data={planFilters}
        onItemPress={handleFilterItemPress}
        selectedItem={selectedItem}
      />
      <EventList
        style={styles.eventList}
        contentStyle={styles.eventListContent}
        horizontal
        data={quickPlanEvents}
        onItemPress={handleEventItemPress}
      />
    </View>
  );
};

export default PlansDetailsScreen;

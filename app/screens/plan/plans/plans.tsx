import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { CURRENT_MONTH_OPTION, MONTHS_MAP, ROUTE, SCREEN_PADDING } from '@/constants';
import { useEventsData, useForm, useTheme, useTypedNavigation } from '@/hooks';
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
  foundPlans: {
    marginTop: 20,
    rowGap: 20,
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
  const { goBack, navigate } = useTypedNavigation();
  const { styles } = useTheme(createStyles);

  const { plansByMonths, allSavedEventsPlan, eventsPlans, loading } = useEventsData();
  const [selectedFilterItem, setSelectedFilterItem] = useState<undefined | IOption>();
  const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { searchValue, onChange } = useForm({
    searchValue: '',
  });

  const handleChangeSearchValue = useCallback(
    (value: string) => {
      onChange(value, 'searchValue');
      setIsSearchActive(value.length > 2);
    },
    [onChange]
  );

  const foundPlans = useMemo(
    () =>
      eventsPlans.filter((plan) => plan.title.toLowerCase().includes(searchValue.toLowerCase())),
    [eventsPlans, searchValue]
  );

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
      `Expires in ${Math.round(
        (Number((selectedEvents ?? [])[0]?.dtEnd ?? Date.now()) - Date.now()) /
          (1000 * 60 * 60 * 24)
      )} days`,
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

  const handlePlanPress = useCallback(
    (plan: IEventPlan) => {
      navigate(ROUTE.plan.details, { plan });
    },
    [navigate]
  );

  const ListHeaderComponent = useMemo(
    () => (
      <View>
        <Header style={styles.header} title="Planner" onBackPress={goBack} />
        <DateGreeting style={styles.dateGreeting} />
        <SearchInput
          style={styles.searchInput}
          value={searchValue}
          onChangeText={handleChangeSearchValue}
        />
        <Text style={styles.title}>Plans</Text>

        {isSearchActive ? (
          <View style={styles.foundPlans}>
            {foundPlans.map((plan) => (
              <PlanCard key={plan.title} plan={plan} onItemPress={handlePlanPress} />
            ))}
          </View>
        ) : (
          <>
            <FilterPanel
              contentStyle={styles.filterPanelContent}
              data={planFilters}
              onItemPress={handleFilterItemPress}
              selectedItem={selectedFilterItem}
            />
            <PlanCard
              style={styles.allSavedEventsPlan}
              plan={allSavedEventsPlan}
              onItemPress={handlePlanPress}
            />
            <TimelineCheckpoint
              style={styles.topTimelineCheckpoint}
              type="urgent"
              title={topTimelineCheckpointTitle}
            />
            <EventList.Default
              style={styles.eventList}
              contentStyle={styles.eventListContent}
              horizontal
              data={selectedEvents}
              onItemPress={handleEventItemPress}
            />
          </>
        )}
      </View>
    ),
    [
      styles,
      goBack,
      searchValue,
      handleChangeSearchValue,
      isSearchActive,
      foundPlans,
      planFilters,
      handleFilterItemPress,
      selectedFilterItem,
      allSavedEventsPlan,
      handlePlanPress,
      topTimelineCheckpointTitle,
      selectedEvents,
      handleEventItemPress,
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
      ListHeaderComponent={ListHeaderComponent}
      sections={isSearchActive ? [] : timelineSections}
      onItemPress={handlePlanPress}
    />
  );
};

export default PlansScreen;

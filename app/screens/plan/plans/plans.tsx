import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
  CustomInput,
  DateGreeting,
  EventList,
  FilterPanel,
  Header,
  Loader,
  Modal,
  PlanCard,
  SearchInput,
  TimelineCheckpoint,
  TimelineList,
} from '@/components';
import { CURRENT_MONTH_OPTION, MONTHS_MAP, ROUTE, SCREEN_PADDING } from '@/constants';
import { useThemeContext } from '@/contexts/useThemeContext';
import { useUserContext } from '@/contexts/useUserContext';
import {
  useEventCreate,
  useEventDelete,
  useForm,
  usePlansData,
  useTheme,
  useTypedNavigation,
} from '@/hooks';
import { IEventCreateDto } from '@/services';
import { CreateStylesFn, IEvent, IOption, IPlan } from '@/types';

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
  selectPlanTitle: {
    marginTop: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: colors.common.text.brand,
  },
  selectablePlanList: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
  },
  selectedPlan: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: colors.common.button.primary.background,
  },

  dateButton: {
    marginTop: 20,
    width: '100%',
    padding: 6,
    backgroundColor: colors.common.button.secondary.background,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateButtonContent: {
    color: colors.common.button.secondary.content,
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.common.button.primary.background,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    color: colors.common.button.primary.content,
    fontSize: 14,
    fontWeight: '400',
  },
  eventField: {
    marginTop: 20,
  },
});

const PlansScreen = () => {
  const { navigate } = useTypedNavigation();
  const { styles } = useTheme(createStyles);

  const { switchTheme } = useThemeContext();
  const { logout } = useUserContext();

  const { plansByMonths, allSavedEventsPlan, plans, loading } = usePlansData();
  const { createEvent } = useEventCreate();
  const { deleteEvent } = useEventDelete();

  const [selectedFilterItem, setSelectedFilterItem] = useState<undefined | IOption>();
  const [selectedEvents, setSelectedEvents] = useState<IEvent[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [menuModalVisibility, setMenuModalVisibility] = useState(false);
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<undefined | string>(undefined);

  const { searchValue, onChange: onChangeSearchValue } = useForm({
    searchValue: '',
  });

  const {
    dtStart,
    invitedPersonsCount,
    cost,
    title,
    onChange: onChangeEventForm,
    form: eventForm,
    reset: resetEventForm,
  } = useForm({
    title: '',
    invitedPersonsCount: '',
    cost: '',
    dtStart: null,
  });

  const handleDtStartChange = useCallback(
    (__event: unknown, selectedDate?: Date) => {
      setDatePickerVisibility(false);

      if (selectedDate) {
        onChangeEventForm(selectedDate, 'dtStart');
      }
    },
    [onChangeEventForm]
  );

  const handleChangeSearchValue = useCallback(
    (value: string) => {
      onChangeSearchValue(value, 'searchValue');
      setIsSearchActive(value.length > 2);
    },
    [onChangeSearchValue]
  );

  const foundPlans = useMemo(
    () => plans.filter((plan) => plan.title.toLowerCase().includes(searchValue.toLowerCase())),
    [plans, searchValue]
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

  const handleEventItemPress = useCallback(
    (event: IEvent) => {
      Alert.alert(
        'Confirm Deletion', // Заголовок
        'Are you sure you want to delete this event?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteEvent({ planId: event.planId, id: event.id ?? '' }),
          },
        ],
        { cancelable: true }
      );
    },
    [deleteEvent]
  );

  const handlePlanPress = useCallback(
    (plan: IPlan) => {
      navigate(ROUTE.plan.details, { plan });
    },
    [navigate]
  );

  const handleSubmit = useCallback(() => {
    if (Object.values(eventForm).some((value) => !value) || !selectedPlanId) {
      return;
    }

    const event: IEventCreateDto = {
      name: eventForm.title,
      planId: selectedPlanId ?? '',
      cost: Number(eventForm.cost),
      invitedPersonsCount: Number(eventForm.invitedPersonsCount),
      dtStart: Number(eventForm.dtStart),
      dtEnd: Number(eventForm.dtStart),
    };

    createEvent(event);
    resetEventForm();
    setSelectedPlanId(undefined);
    setMenuModalVisibility(false);
  }, [createEvent, eventForm, resetEventForm, selectedPlanId]);

  const handleLogout = useCallback(() => {
    setMenuModalVisibility(false);

    logout();
  }, [logout]);

  const ListHeaderComponent = useMemo(
    () => (
      <>
        {/* TODO: for testing event creation and logout */}
        {/* logout on ios cause crash for now, need investigation */}
        <Modal.Children visible={menuModalVisibility} setVisibility={setMenuModalVisibility}>
          <Text>Create Event</Text>
          <CustomInput
            style={styles.eventField}
            value={title}
            onChangeText={(value) => onChangeEventForm(value, 'title')}
            placeholder="Title"
          />
          <CustomInput
            style={styles.eventField}
            keyboardType="numeric"
            value={invitedPersonsCount.toString()}
            onChangeText={(value) => onChangeEventForm(value, 'invitedPersonsCount')}
            placeholder="Invited persons count"
          />
          <CustomInput
            style={styles.eventField}
            keyboardType="numeric"
            value={cost.toString()}
            onChangeText={(value) => onChangeEventForm(value, 'cost')}
            placeholder="Cost"
          />
          <Text style={styles.selectPlanTitle}>Select plan below</Text>
          <View style={styles.selectablePlanList}>
            {plans.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={selectedPlanId === item.id && styles.selectedPlan}
                onPress={() => setSelectedPlanId(item.id)}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.dateButton} onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.dateButtonContent}>
              {dtStart ? new Date(dtStart).toDateString() : 'Select date'}
            </Text>
          </TouchableOpacity>
          {datePickerVisibility && (
            <DateTimePicker
              value={new Date(dtStart ?? Date.now())}
              mode="date"
              display="default"
              onChange={handleDtStartChange}
              minimumDate={new Date()}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonContent}>Create event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonContent}>Logout</Text>
          </TouchableOpacity>
        </Modal.Children>
        <Header
          style={styles.header}
          title="Planner"
          onSwitchTheme={switchTheme}
          onMenuPress={() => setMenuModalVisibility(true)}
        />
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
            {!!selectedEvents?.length && (
              <TimelineCheckpoint
                style={styles.topTimelineCheckpoint}
                type="urgent"
                title={topTimelineCheckpointTitle}
              />
            )}
            <EventList.Default
              style={styles.eventList}
              contentStyle={styles.eventListContent}
              horizontal
              data={selectedEvents}
              onItemPress={handleEventItemPress}
            />
          </>
        )}
      </>
    ),
    [
      menuModalVisibility,
      styles,
      title,
      invitedPersonsCount,
      cost,
      plans,
      dtStart,
      datePickerVisibility,
      handleDtStartChange,
      handleSubmit,
      handleLogout,
      switchTheme,
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
      onChangeEventForm,
      selectedPlanId,
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

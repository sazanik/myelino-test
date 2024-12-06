import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import { FilterPanel, Header } from '@/components';
import { EventList } from '@/components/Elements/EventList';
import { MOCK_EVENTS, MOCK_FILTER_PANEL_ITEMS } from '@/constants/mocks';
import { SCREEN_PADDING } from '@/constants/style';
import { useTheme, useTypedNavigation } from '@/hooks';
import { IEvent, IOption } from '@/types/components';
import { CreateStylesFn } from '@/types/styles';

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
  title: {
    marginTop: 10,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.common.text.primary,
    alignSelf: 'flex-start',
  },
  filterPanel: {
    // paddingTop to see top shadow
    paddingTop: 8,
  },
  eventList: {
    columnGap: 4,
  },
});

const PlansDetailsScreen = () => {
  const { goBack } = useTypedNavigation();

  const { styles } = useTheme(createStyles);

  const [selectedItem, setSelectedItem] = useState(MOCK_FILTER_PANEL_ITEMS[0]);

  const handleFilterItemPress = useCallback((option: IOption) => {
    setSelectedItem(option);
  }, []);

  const handleEventItemPress = useCallback((event: IEvent) => {
    console.log(event);
  }, []);

  return (
    <View style={styles.container}>
      <Header style={styles.header} title="Planner" onBackPress={goBack} />
      <Text style={styles.title}>Plans</Text>
      <FilterPanel
        contentStyle={styles.filterPanel}
        data={MOCK_FILTER_PANEL_ITEMS}
        onItemPress={handleFilterItemPress}
        selectedItem={selectedItem}
      />
      <EventList
        contentStyle={styles.eventList}
        horizontal
        data={MOCK_EVENTS}
        onItemPress={handleEventItemPress}
      />
    </View>
  );
};

export default PlansDetailsScreen;

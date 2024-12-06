import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import { FilterPanel, Header } from '@/components';
import { SCREEN_PADDING } from '@/constants/style';
import { useTheme, useTypedNavigation } from '@/hooks';
import { IOption } from '@/types/components';
import { CreateStylesFn } from '@/types/styles';

const createStyles: CreateStylesFn = ({ colors, insets }) => ({
  container: {
    flex: 1,
    paddingTop: insets.top || SCREEN_PADDING.TOP,
    paddingHorizontal: SCREEN_PADDING.HORIZONTAL,
    alignItems: 'center',
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
});

const MOCK_FILTER_PANEL_ITEMS: IOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
];

const PlansDetailsScreen = () => {
  const { goBack } = useTypedNavigation();

  const { styles } = useTheme(createStyles);

  const [selectedItem, setSelectedItem] = useState(MOCK_FILTER_PANEL_ITEMS[0]);

  const handleItemPress = useCallback((option: IOption) => {
    setSelectedItem(option);
  }, []);

  return (
    <View style={styles.container}>
      <Header style={styles.header} title="Planner" onBackPress={goBack} />
      <Text style={styles.title}>Plans</Text>
      <FilterPanel
        contentStyle={styles.filterPanel}
        data={MOCK_FILTER_PANEL_ITEMS}
        onItemPress={handleItemPress}
        selectedItem={selectedItem}
      />
    </View>
  );
};

export default PlansDetailsScreen;

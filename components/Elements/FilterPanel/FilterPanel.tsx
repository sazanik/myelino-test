import { FC } from 'react';
import { FlatList, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks';
import { IOption } from '@/types/components';
import { CreateStylesFn } from '@/types/styles';

import Item from './Item';

const createStyles: CreateStylesFn = () => ({
  container: {
    marginHorizontal: -20,
  },
  content: {
    paddingHorizontal: 20,
    columnGap: 10,
  },
});

interface Props {
  data: IOption[];
  onItemPress: (item: IOption) => unknown;
  selectedItem: IOption;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const FilterPanel: FC<Props> = ({ data, selectedItem, onItemPress, style, contentStyle }) => {
  const { styles } = useTheme(createStyles);

  const renderItem = ({ item }: { item: IOption }) => (
    <Item option={item} onPress={onItemPress} selected={selectedItem.value === item.value} />
  );

  return (
    <FlatList
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentStyle]}
      horizontal
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FilterPanel;

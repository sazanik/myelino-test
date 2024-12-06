import { FC } from 'react';
import { FlatList, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks';
import { IOption } from '@/types/components';
import { CreateStylesFn } from '@/types/styles';

import Item from './Item/Item';

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
  horizontal: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

const EventList: FC<Props> = ({
  data,
  onItemPress,
  horizontal = false,
  style = null,
  contentStyle = null,
}) => {
  const { styles } = useTheme(createStyles);
  const renderItem = ({ item }: { item: IOption }) => <Item option={item} onPress={onItemPress} />;

  return (
    <FlatList
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentStyle]}
      horizontal={horizontal}
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default EventList;

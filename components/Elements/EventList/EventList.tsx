import { FC } from 'react';
import { FlatList, StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks';
import { CreateStylesFn, IEvent } from '@/types';

import { Item } from './Item';

const createStyles: CreateStylesFn = () => ({
  container: {
    marginHorizontal: -20,
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

interface Props {
  data: IEvent[];
  onItemPress: (item: IEvent) => unknown;
  horizontal?: boolean;
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
  const renderItem = ({ item }: { item: IEvent }) => <Item event={item} onPress={onItemPress} />;

  return (
    <FlatList
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentStyle]}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      horizontal={horizontal}
      data={data}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default EventList;

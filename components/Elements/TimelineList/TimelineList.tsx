import { FC, useCallback } from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { EventsCard } from '@/components/Elements/EventsCard';
import { useTheme } from '@/hooks';
import { CreateStylesFn, IEventPlan } from '@/types';

const createStyles: CreateStylesFn = () => ({
  container: {},
  contentContainer: {},
});

interface ISectionData {
  title: string;
  data: IEventPlan[];
}

interface Props {
  ListHeaderComponent: FC;
  sections: ISectionData[];
  onEventsCardPress: (item: IEventPlan) => unknown;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  listHeaderComponentStyle?: StyleProp<ViewStyle>;
}

const TimelineList: FC<Props> = ({
  ListHeaderComponent,
  sections,
  onEventsCardPress,
  style = null,
  contentStyle = null,
  listHeaderComponentStyle = null,
}) => {
  const { styles } = useTheme(createStyles);

  const handleItemPress = useCallback(
    (plan: IEventPlan) => {
      onEventsCardPress(plan);
    },
    [onEventsCardPress]
  );

  const renderItem: SectionListRenderItem<IEventPlan, ISectionData> = useCallback(
    ({ item }) => (
      <EventsCard
        title={item.title}
        events={item.events}
        onItemPress={() => handleItemPress(item)}
      />
    ),
    [handleItemPress]
  );

  const renderSectionHeader = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ section }: { section: SectionListData<IEventPlan, ISectionData> }) => {
      return (
        <View>
          <Text>{section.title}</Text>
        </View>
      );
    },
    []
  );

  return (
    <SectionList
      style={[styles.container, style]}
      contentContainerStyle={[styles.contentContainer, contentStyle]}
      ListHeaderComponentStyle={listHeaderComponentStyle}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      nestedScrollEnabled
      sections={sections}
      keyExtractor={(item, idx) => item.id ?? idx.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export default TimelineList;

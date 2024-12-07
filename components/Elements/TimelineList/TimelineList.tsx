import { FC, ReactElement, useCallback } from 'react';
import {
  SectionList,
  SectionListData,
  SectionListRenderItem,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import PlanCard from '@/components/Elements/PlanCard';
import TimelineCheckpoint from '@/components/Elements/TimelineCheckpoint';
import { useTheme } from '@/hooks';
import { CreateStylesFn, IEventPlan } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  verticalLine: {
    position: 'absolute',
    height: '100%',
    width: 2,
    marginLeft: -4,
    backgroundColor: colors.timelineCheckpoint.divider.vertical,
  },
  monthCheckpoint: {
    zIndex: 2,
    marginTop: 50,
    marginLeft: -10,
  },
  planCheckpoint: {
    zIndex: 2,
    marginTop: 20,
    marginLeft: -10,
  },
  card: {
    marginLeft: 10,
    marginTop: 16,
  },
});

interface ISectionData {
  title: string;
  data: IEventPlan[];
  index: number;
}

interface Props {
  ListHeaderComponent?: ReactElement;
  sections: ISectionData[];
  onItemPress: (item: IEventPlan) => unknown;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  listHeaderComponentStyle?: StyleProp<ViewStyle>;
}

const TimelineList: FC<Props> = ({
  ListHeaderComponent,
  sections,
  onItemPress,
  style = null,
  contentStyle = null,
  listHeaderComponentStyle = null,
}) => {
  const { styles } = useTheme(createStyles);

  const renderItem: SectionListRenderItem<IEventPlan, ISectionData> = useCallback(
    ({ item, index }) => (
      <>
        <TimelineCheckpoint style={styles.planCheckpoint} type="plan" title={`Plan ${index + 1}`} />
        <PlanCard style={styles.card} plan={item} onItemPress={onItemPress} />
        <View style={styles.verticalLine} />
      </>
    ),
    [onItemPress, styles.card, styles.planCheckpoint, styles.verticalLine]
  );

  const renderSectionHeader = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ section }: { section: SectionListData<IEventPlan, ISectionData> }) => (
      <>
        {!!section.index && <View style={styles.verticalLine} />}
        <TimelineCheckpoint style={styles.monthCheckpoint} type="month" title={section.title} />
      </>
    ),
    [styles.monthCheckpoint, styles.verticalLine]
  );

  return (
    <SectionList
      style={style}
      contentContainerStyle={contentStyle}
      ListHeaderComponentStyle={listHeaderComponentStyle}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      nestedScrollEnabled
      sections={sections}
      keyExtractor={(item, idx) => item.id ?? idx.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
    />
  );
};

export default TimelineList;

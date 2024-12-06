import { FC, useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { ROUND_BORDER } from '@/constants/style';
import { useTheme } from '@/hooks';
import { IOption } from '@/types/components';
import { CreateStylesFn } from '@/types/styles';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    height: 40,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: ROUND_BORDER,
    backgroundColor: colors.eventList.item.label.background,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: colors.eventList.item.label.content,
  },
  icon: {},
});

interface Props {
  option: IOption;
  onPress: (option: IOption) => unknown;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
}

const Label: FC<Props> = ({ option, onPress, selected, style = {} }) => {
  const { styles } = useTheme(createStyles);

  const handlePress = useCallback(() => {
    onPress(option);
  }, [onPress, option]);

  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      <Text style={[styles.title, selected && styles.selectedTitle]}>{option.label}</Text>
    </TouchableOpacity>
  );
};

export default Label;

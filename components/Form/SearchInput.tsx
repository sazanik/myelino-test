import { FC } from 'react';
import { Platform, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: colors.common.componentBackground,
    borderRadius: 12,
    flexDirection: 'row',
    columnGap: 10,
    paddingHorizontal: 10,
  },
  input: {
    // because lineHeight on Android is not configured
    paddingVertical: Platform.select({ ios: 16, android: 10 }),
    flex: 1,
    fontSize: 14,
    // it works only for iOS
    lineHeight: 16,
    alignSelf: 'center',
    color: colors.common.text.primary,
  },
  shadow: {
    shadowColor: colors.common.shadow.secondary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  placeholder: {
    color: colors.common.text.placeholder,
  },
});

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

const SearchInput: FC<Props> = ({ value, onChangeText, style = {} }) => {
  const { styles, colors } = useTheme(createStyles);

  return (
    <View style={[styles.container, styles.shadow, style]}>
      <Ionicons name="search-outline" size={16} color={colors.common.text.primary} />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.common.text.placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="web-search"
        placeholder="Search for the plans"
        cursorColor={colors.common.text.brand}
      />
    </View>
  );
};

export default SearchInput;

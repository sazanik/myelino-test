import { FC, useState } from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  Pressable,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
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
  type?: 'email' | 'password' | 'default';
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
}

const CustomInput: FC<Props> = ({
  value,
  onChangeText = () => {},
  placeholder = '',
  type = 'default',
  keyboardType = 'default',
  style = {},
}: Props) => {
  const { styles, colors } = useTheme(createStyles);

  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, styles.shadow, style]}>
      {type !== 'default' && (
        <Ionicons
          name={type === 'email' ? 'mail-outline' : 'lock-closed-outline'}
          size={18}
          color={colors.common.text.primary}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.common.text.placeholder}
        value={value}
        keyboardType={keyboardType ?? (type === 'email' ? 'email-address' : 'default')}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' && !visible}
        placeholder={placeholder ?? (type === 'email' ? 'Email Address/Username' : 'Password')}
      />
      {type === 'password' && (
        <Pressable onPress={() => setVisible(!visible)}>
          <Ionicons
            color={colors.common.text.primary}
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={18}
          />
        </Pressable>
      )}
    </View>
  );
};

export default CustomInput;

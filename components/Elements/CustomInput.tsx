import React, { useState } from 'react';
import { Pressable, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/hooks';
import { CreateStylesFn } from '@/types/styles';

const createStyles: CreateStylesFn = ({ colors }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: colors.common.componentBackground,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  input: {
    flex: 1,
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
  type?: 'email' | 'password';
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
}

const CustomInput = ({ type = 'email', value, onChangeText = () => {}, style = {} }: Props) => {
  const { styles, colors } = useTheme(createStyles);

  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.container, styles.shadow, style]}>
      <Ionicons name={type === 'email' ? 'mail-outline' : 'lock-closed-outline'} size={18} />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.common.text.placeholder}
        value={value}
        keyboardType={type === 'email' ? 'email-address' : 'default'}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password' && !visible}
        placeholder={type === 'email' ? 'Email Address/Username' : 'Password'}
      />
      {type === 'password' && (
        <Pressable onPress={() => setVisible(!visible)}>
          <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} size={18} />
        </Pressable>
      )}
    </View>
  );
};

export default CustomInput;

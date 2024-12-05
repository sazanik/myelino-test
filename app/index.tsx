import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomInput } from '@/components/CustomInput';
import { axiosClient } from '@/config/axiosClient';
import { errorHandler } from '@/helpers/errorHandler';
import { useForm } from '@/hooks/useForm';
import Logo from '../assets/images/logo.png';

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const { identifier, password, onChange, reset } = useForm({
    identifier: '',
    password: '',
  });
  const navigation = useNavigation();

  const onPress = async () => {
    if ([identifier, password].includes('')) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      await axiosClient.post('/auth/sign-in', { identifier, password });

      reset();
      navigation.reset({
        index: 0,
        routes: [{ name: 'screens/planner' as never }],
      });
    } catch (error: any) {
      const errorMessage = errorHandler(error);

      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <Image source={Logo} style={styles.logo} />
      <CustomInput
        value={identifier}
        onChangeText={(value) => onChange(value, 'identifier')}
      />
      <CustomInput
        type="password"
        value={password}
        onChangeText={(value) => onChange(value, 'password')}
        style={{ marginVertical: 15 }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.6}
      >
        <Text style={styles.textButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    flex: 1,
  },
  logo: {
    aspectRatio: 0.8,
    height: 150,
    alignSelf: 'center',
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#008080',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  textButton: {
    color: '#FFF',
    fontFamily: 'RobotoBold',
    fontSize: 18,
  },
});

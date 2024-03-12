import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles.tsx';
import Sheets from './Sheets.tsx';
import Notes from './Notes.tsx';
import Groups from './Groups.tsx';

const Stack = createStackNavigator();

const Settings: React.FC = () => {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

      </View>
  );
};

export default Settings;

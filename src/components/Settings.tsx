import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles.tsx';
import Sheets from './Sheets/Sheets.tsx';
import Notes from './Notes/Notes.tsx';
import Groups from './Groups/Groups.tsx';

const Settings: React.FC = () => {
  const settingsOptions = [
    {title: 'Theme', subTitle: 'Change the app colour scheme.', onPress: () => {}}
  ];

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        
      </View>
  );
};

export default Settings;

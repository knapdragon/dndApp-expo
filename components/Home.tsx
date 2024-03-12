import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles.tsx';
import Sheets from './Sheets.tsx';
import Notes from './Notes.tsx';
import Groups from './Groups.tsx';

const Stack = createNativeStackNavigator();

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
      <View style={styles.container}>
        
      </View>
  );
};

export default Home;

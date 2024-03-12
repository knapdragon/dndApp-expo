import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import styles from '../styles.tsx';
import Home from './Home.tsx';
import Sheets from './Sheets.tsx';
import Groups from './Groups.tsx';

const Stack = createNativeStackNavigator();

const Notes: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

        <Stack.Navigator initialRouteName='Notes'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sheets" component={Sheets} />
          <Stack.Screen name="Groups" component={Groups} />
        </Stack.Navigator>
    </View>
  );
};

export default Notes;

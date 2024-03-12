import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles.tsx';
import Home from '../components/Home.tsx';
import Sheets from '../components/Sheets.tsx';
import Groups from '../components/Groups.tsx';

const Stack = createStackNavigator();

const Notes: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Notes</Text>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Notes'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sheets" component={Sheets} />
          <Stack.Screen name="Groups" component={Groups} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Notes;

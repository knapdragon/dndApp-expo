import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles.tsx';
import Sheets from '../components/Sheets.tsx';
import Notes from '../components/Notes.tsx';
import Groups from '../components/Groups.tsx';

const Stack = createStackNavigator();

const Home: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.title}>Home</Text>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Sheets} />
          <Stack.Screen name="Sheets" component={Notes} />
          <Stack.Screen name="Groups" component={Groups} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Home;

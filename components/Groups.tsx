import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import exampleData from '../userdata/data.js';
import styles from '../styles.tsx';
import Home from '../components/Home.tsx';
import Sheets from '../components/Sheets.tsx';
import Notes from '../components/Notes.tsx';

const Stack = createStackNavigator();

const Groups: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
      <Text style={styles.title}>Social Groups</Text>

      <FlatList 
        data={exampleData.groups}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            {item.image}
            <Text>{item.labels}</Text>
            <Text>{item.players}</Text>
            <Text>{item.description}</Text>
          </View>
          )}
          keyExtractor={(item) => item.id.toString()}/>

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Groups'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sheets" component={Sheets} />
          <Stack.Screen name="Groups" component={Notes} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Groups;

import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import exampleData from '../userdata/data.js';
import styles from '../styles.tsx';
import Home from './Home.tsx';
import Sheets from './Sheets.tsx';
import Notes from './Notes.tsx';

const Stack = createNativeStackNavigator();

const Groups: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

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

        <Stack.Navigator initialRouteName='Groups'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sheets" component={Sheets} />
          <Stack.Screen name="Groups" component={Notes} />
        </Stack.Navigator>
    </View>
  );
};

export default Groups;

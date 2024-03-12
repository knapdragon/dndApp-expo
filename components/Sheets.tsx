import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from '../styles.tsx';
import exampleData from '../userdata/data.js';
import Home from './Home.tsx';
import Notes from './Notes.tsx';
import Groups from './Groups.tsx';

const Stack = createNativeStackNavigator();

const Sheets: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <FlatList 
        data={exampleData.sheets}
        renderItem={({item}) => (
          <View>
            <Text>{item.title}</Text>
            {item.image}
            <Text>{item.race}</Text>
            <Text>{item.class}</Text>
          </View>
          )}
          keyExtractor={(item) => item.id.toString()}/>
      
        <Stack.Navigator initialRouteName='Sheets'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sheets" component={Notes} />
          <Stack.Screen name="Groups" component={Groups} />
        </Stack.Navigator>
    </View>
  );
};

export default Sheets;

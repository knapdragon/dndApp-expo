import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../styles.tsx';
import exampleData from '../userdata/data.js';
import Home from '../components/Home.tsx';
import Notes from '../components/Notes.tsx';
import Groups from '../components/Groups.tsx';

const Stack = createStackNavigator();

const Sheets: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text style={styles.container}>Sheets</Text>

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
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Sheets'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Sheets" component={Notes} />
          <Stack.Screen name="Groups" component={Groups} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Sheets;

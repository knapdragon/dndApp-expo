import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'

// Styling
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styles from './src/styles.tsx';

// Data
import Home from './src/components/Home.tsx';
import Sheets from './src/components/Sheets/SheetsMain.tsx';
import Notes from './src/components/Notes/NotesMain.tsx';
import Groups from './src/components/Groups/GroupsMain.tsx';
import DiceRoller from './src/components/DiceRoller/DiceRoller.tsx';

const Tab = createMaterialBottomTabNavigator();

export default function App() {


  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <Tab.Navigator
              barStyle={[{backgroundColor: '#ccc'}, {borderTopWidth: 3}, {borderTopColor: 'grey'}]}
              initialRouteName='Home' 
              backBehavior={'history'}
              shifting={false}>
              <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                  tabBarColor: '#ccc',
                  tabBarIcon: ({}) => (<Icon name="home" color={'black'} size={30}/>)}}/>

              <Tab.Screen 
                name="Sheets" 
                component={Sheets}
                options={{
                  tabBarColor: '#fab',
                  tabBarIcon: ({}) => (<Icon name="notebook" color={'red'} size={30}/>)}}/>

              <Tab.Screen 
                name="Notes" 
                component={Notes}
                options={{
                  tabBarColor: '#bfb',
                  tabBarIcon: ({}) => (<Icon name="note-text" color={'green'} size={30}/>)}}/>

              <Tab.Screen 
                name="Groups" 
                component={Groups}
                options={{
                  tabBarColor: '#bbf',
                  tabBarIcon: ({}) => (<Icon name="account-group" color={'blue'} size={30}/>)}}/>
              
              <Tab.Screen
                name="Dice"
                component={DiceRoller}
                options={{
                  tabBarColor: '#fbf',
                  tabBarIcon: ({}) => (<Icon name="dice-d20" color={'purple'} size={30}/>)}}/>
            </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

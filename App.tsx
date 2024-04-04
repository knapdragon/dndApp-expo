import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useColorScheme } from 'react-native';
import { PaperProvider, useTheme, MD3LightTheme as DefaultTheme, MD3DarkTheme, Appbar } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import styles from './src/styles.tsx';
import Home from './src/components/Home.tsx';
import Sheets from './src/components/Sheets/SheetsMain.tsx';
import Notes from './src/components/Notes/NotesMain.tsx';
import Groups from './src/components/Groups/GroupsMain.tsx';

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  const colorScheme = useColorScheme();
  const appTheme = colorScheme === 'dark'
    ? {...MD3DarkTheme}
    : {...DefaultTheme};

  return (
    <PaperProvider theme={appTheme}>
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
            </Tab.Navigator>

        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
}

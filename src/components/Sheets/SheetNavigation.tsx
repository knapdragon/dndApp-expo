import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// styling
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import { Character } from './CharacterSheet';
import { Actions } from './CharacterSheet';
import { Inventory } from './CharacterSheet';

interface Props {
  navigation: any
  characterId: string | undefined
}

const Tab = createMaterialTopTabNavigator();

export const SheetNavigation: React.FC<Props> = ({ navigation, characterId }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        style={{padding: -30, borderBottomWidth: 1, borderBottomColor: 'silver'}}
        initialRouteName='Character' 
        backBehavior={'history'}>
        <Tab.Screen 
          name="Character"
          component={Character}
          initialParams={{characterId: characterId}}
          options={{
            lazy: true,
            tabBarPressColor: '#ccf',
            tabBarIcon: ({}) => (<Icon name="account" color={'blue'} size={20}/>)}}/>

        <Tab.Screen 
          name="Actions"
          component={Actions}
          initialParams={{characterId: characterId}}
          options={{
            lazy: true,
            tabBarPressColor: '#fcc',
            tabBarIndicatorStyle: {backgroundColor: '#f00'},
            tabBarIcon: ({}) => (<Icon name="sword-cross" color={'red'} size={20}/>)}}/>

        <Tab.Screen 
          name="Inventory"
          component={Inventory}
          initialParams={{characterId: characterId}}
          options={{
            lazy: true,
            tabBarPressColor: '#cfc',
            tabBarIndicatorStyle: {backgroundColor: '#090'},
            tabBarIcon: ({}) => (<Icon name="sack" color={'green'} size={20}/>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
import React, { useState, useContext } from 'react';

// styling
import { Appbar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import { sheetsContext } from '../context_Index';

const Tab = createMaterialTopTabNavigator();

interface Props {
    navigation: any,
  }

const CharacterSheet: React.FC<Props> = ({ navigation }) => {
    const sheet = useContext(sheetsContext);
    const [sheetTitle, setSheetTitle] = useState("");
    
    return (
      <sheetsContext.Provider value={sheet}>
        <Appbar.Header>
          <Appbar.Content title={sheetTitle} />
        </Appbar.Header>
        {/*
        <Tab.Navigator
              style={[{backgroundColor: '#ccc'}, {borderTopWidth: 3}, {borderTopColor: 'grey'}]}
              initialRouteName='Character' 
              backBehavior={'history'}>
              <Tab.Screen 
                name="Character" 
                component={Character} 
                options={{
                  tabBarPressColor: '#cfc',
                  tabBarActiveTintColor: '#cfc',
                  tabBarInactiveTintColor: '#fff',
                  tabBarIcon: ({}) => (<Icon name="account" color={'black'} size={30}/>)}}/>

              <Tab.Screen 
                name="Actions" 
                component={Actions}
                options={{
                  tabBarPressColor: '#fab',
                  tabBarActiveTintColor: '#fab',
                  tabBarInactiveTintColor: '#fff',
                  tabBarIcon: ({}) => (<Icon name="sword-cross" color={'red'} size={30}/>)}}/>

              <Tab.Screen 
                name="Inventory" 
                component={Inventory}
                options={{
                  tabBarPressColor: '#ccf',
                  tabBarActiveTintColor: '#ccf',
                  tabBarInactiveTintColor: '#fff',
                  tabBarIcon: ({}) => (<Icon name="tool-box" color={'green'} size={30}/>)}}/>
        </Tab.Navigator>
        */}
      </sheetsContext.Provider>
    );
};

export default CharacterSheet;
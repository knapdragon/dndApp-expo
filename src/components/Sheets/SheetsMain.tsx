import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Image, Pressable, TouchableNativeFeedback } from 'react-native';

// Styling
import styles from '../../styles.tsx';
import { Appbar, Menu as PaperMenu, Button, Dialog, PaperProvider, Portal } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Data
import Settings from '../Settings.tsx';
import sheetsData from '../../userdata/sheetsData.json';
import SheetList from './SheetList.tsx';
import CharacterSheet from './CharacterSheet.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';

const Stack = createNativeStackNavigator();  

// Navigation
interface Props {
  navigation: any,
}

const tabOrigin = 'Sheets';

const Sheets: React.FC<Props> = ({ navigation }) => {
  {/* Appbar and related actions */}
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  function closeSettingsDialog(): void {
    setSettingsVisible(false);
  }
  const [newMenuVisible, setNewMenuVisible] = useState(false);

  function newSheet() {
    alert('Button pressed!');
  }

  // Sheets starts
  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={{backgroundColor: '#f55'}}>
          <Appbar.Content title="Sheets" titleStyle={{color: '#000'}}/>
              <NewMenu 
                tabOrigin={tabOrigin}
                enabled={newMenuVisible}
                setNewMenuVisible={setNewMenuVisible}
                newItem={newSheet}/>
              <MainMenu 
                tabOrigin={tabOrigin}
                enabled={mainMenuVisible}
                setSettingsVisible={setSettingsVisible}
                setMainMenuVisible={setMainMenuVisible}
                />
        </Appbar.Header>
      </View>
      
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Sheet" component={SheetList}/>
          {/*
          <FlatList 
            data={sheetsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}/>
            */}
        </Stack.Navigator>
      </View>

      <PaperProvider>
        <Portal>
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        </Portal>
      </PaperProvider>
    </View>
  );
};

export default Sheets;

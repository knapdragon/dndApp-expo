import React, { useState, useContext } from 'react';
import { View } from 'react-native';

// Styling
import styles from '../../styles.tsx';
import { Appbar } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Data
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';
import NewSheetForm from './NewSheetForm.tsx';
import sheetsData from '../../userdata/sheetsData.json';
import SheetList from './SheetList.tsx';

const Stack = createNativeStackNavigator();  
const tabOrigin = 'Sheets';

// Navigation
interface Props {
  navigation: any,
}

const Sheets: React.FC<Props> = ({ navigation }) => {
  {/* Appbar and related actions */}
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  function closeSettingsDialog(): void {
    setSettingsVisible(false);
  }
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  const [newSheetFormVisible, setNewSheetFormVisible] = useState(false);
  function openNewSheetForm(): void {
    setNewSheetFormVisible(true);
    setNewMenuVisible(false);
    setFormTab(1);
  }
  function closeNewSheetForm(): void {
    setNewSheetFormVisible(false);
  }
  const [formTab, setFormTab] = useState<number>(1);

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
                newItem={openNewSheetForm}/>
              <MainMenu 
                tabOrigin={tabOrigin}
                enabled={mainMenuVisible}
                setSettingsVisible={setSettingsVisible}
                setMainMenuVisible={setMainMenuVisible}
                />
        </Appbar.Header>
      </View>

      <NewSheetForm 
        enabled={newSheetFormVisible}
        data={sheetsData}
        closeForm={closeNewSheetForm}
        formTab={formTab}
        setFormTab={setFormTab}/>
      
      <View style={styles.container}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Sheet" component={SheetList}/>
        </Stack.Navigator>
      </View>

      <View style={{flex: 0}}>
        {settingsVisible ? 
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        : null}
      </View>
    </View>
  );
};

export default Sheets;

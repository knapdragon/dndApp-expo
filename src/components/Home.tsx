import React, { useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';

// styling
import styles from '../styles.tsx';
import { Appbar, PaperProvider, Portal } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import Settings from './Settings.tsx';
import MainMenu from './MainMenu.tsx';

interface Props {
  navigation: any,
}

const Home: React.FC<Props> = ({ navigation }) => {
  const tabOrigin = 'Home';

  // State variables for the main menu
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  function closeSettingsDialog(): void {
    setSettingsVisible(false);
  }
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
      <View style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#ccc'}}>
          <Appbar.Content title="Home"/>
              <MainMenu 
                tabOrigin={tabOrigin}
                enabled={mainMenuVisible}
                setSettingsVisible={setSettingsVisible}
                setMainMenuVisible={setMainMenuVisible}
                />
        </Appbar.Header>

        <View style={[styles.container, {flexDirection: 'column', justifyContent: 'space-evenly'}]}>
          <Text style={[styles.titleAlt,{margin: 20}]}>What's available</Text>
          <View style={{flex: 1, backgroundColor: '#f55'}}>
            <Text style={[styles.title, {marginTop: 10}]}>Sheets</Text>
            <Text style={{top: 10, paddingHorizontal: 15}}>
              Create new characters, edit existing ones, and organize them.
            </Text>
          </View>

          <View style={{flex: 1, backgroundColor: '#4a4'}}>
            <Text style={[styles.title, {marginTop: 10}]}>Notes</Text>
            <Text style={{top: 10, paddingHorizontal: 15}}>
              Take notes about anything. {"\n \n"}
              Organise your notes into folders and link them {"\n"}
              to other notes, character sheets, or to groups.
            </Text>
          </View>

          <View style={{flex: 1, backgroundColor: '#6496e8'}}>
            <Text style={[styles.title, {marginTop: 10}]}>Groups</Text>
            <Text style={{top: 10, paddingHorizontal: 15}}>
              Find a group to play with that matches
              your style. {"\n \n"}
              Or you can create a group yourself.
            </Text>
          </View>

          <View style={{flex: 1, backgroundColor: '#ff70ff'}}>
            <Text style={[styles.title, {marginTop: 10}]}>Dice</Text>
            <Text style={{top: 10, paddingHorizontal: 15}}>
              Roll any number of dice from the classic array. {"\n \n"}
              You can also make your own custom types.
            </Text>
            <View style={styles.diceColumn}>
              <Icon name="dice-d4" size={35}/>
              <Icon name="dice-d6" size={35}/>
              <Icon name="dice-d8" size={35}/>
            </View>
            <View style={styles.diceColumn2}>
              <Icon name="dice-d10" size={35}/>
              <Icon name="dice-d12" size={35}/>
              <Icon name="dice-d20" size={35}/>
            </View>
          </View>
        </View>
        
        <View style={{flex: 0}}>
          {settingsVisible ? 
            <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
          : null}
        </View>

      </View>

        
  );
};

export default Home;

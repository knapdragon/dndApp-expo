import React, { useState } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import { Appbar, PaperProvider, Portal } from 'react-native-paper';
import styles from '../styles.tsx';
import MainMenu from './MainMenu.tsx';
import Settings from './Settings.tsx';

interface Props {
  navigation: any,
}

const Home: React.FC<Props> = ({ navigation }) => {
  const [tabOrigin, setTabOrigin] = useState('Home');
  const closeSettingsDialog = () => {
    setSettingsVisible(false);
  }
  // State variables for the main menu
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
      <View style={styles.container}>
        <Appbar.Header style={{backgroundColor: '#ccc'}}>
          <Appbar.Content title="Home" titleStyle={{color: '#000'}}/>
              <MainMenu 
                tabOrigin={tabOrigin}
                enabled={mainMenuVisible}
                setSettingsVisible={() => setSettingsVisible}
                setMainMenuVisible={() => setMainMenuVisible}
                />
        </Appbar.Header>

        <View style={styles.HomeGrid}>
          <View style={styles.GridItem}>
            <Text>Visit Sheets to get started</Text>
          </View>
          <View style={styles.GridItem}>
            <Text>Visit Notes to jot something down</Text>
          </View>
          <View style={styles.GridItem}>
            <Text>Visit Groups to find other players</Text>
          </View>
        </View>

        <PaperProvider>
          <Portal>
            <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
          </Portal>
        </PaperProvider>
      </View>
  );
};

export default Home;

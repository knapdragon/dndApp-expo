import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu as PaperMenu } from 'react-native-paper';
import styles from '../styles';

interface Props {
  tabOrigin: string,
  enabled: boolean,
  setSettingsVisible: (val: boolean) => void,
  setMainMenuVisible: (val: boolean) => void,
}

const MainMenu: React.FC<Props> = ({ tabOrigin, enabled, setSettingsVisible, setMainMenuVisible }) => {
  const actionColor = tabOrigin === 'Groups' ? '#fff' : '#000';
  return (
    <View>
      {/* Settings menu */}
      <PaperMenu
      visible={enabled}
      onDismiss={() => setMainMenuVisible(false)}
      anchor={
        <Appbar.Action 
        color={actionColor}
        icon="dots-vertical" 
        onPress={() => setMainMenuVisible(true)}/>
      }>
      <PaperMenu.Item 
        title="Settings" 
        onPress={() => {setSettingsVisible(true); setMainMenuVisible(false)}}
        style={styles.menuItem}/>
    </PaperMenu>
    </View>
  );
};

export default MainMenu;

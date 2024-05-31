import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Menu as PaperMenu } from 'react-native-paper';
import styles from '../styles';

interface Props {
  tabOrigin: string,
  enabled: boolean,
  setNewMenuVisible: (val: boolean) => void,
  newItem: () => void,
}

const NewMenu: React.FC<Props> = (
    { tabOrigin, enabled,
      setNewMenuVisible, newItem }) => {
    
    const actionColor = tabOrigin === 'Groups' ? '#fff' : '#000';
    const [newItemTitle, setNewItemTitle] = useState('');
    switch (tabOrigin) {
        case 'Sheets':
            () => setNewItemTitle('Sheet');
            break;
        case 'Notes':
            () => setNewItemTitle('Note');
            break;
        case 'Groups':
            () => setNewItemTitle('Group');
            break;
    }
  return (
    <View>
      <PaperMenu
        visible={enabled}
        onDismiss={() => setNewMenuVisible(false)}
        anchor={
        <Appbar.Action 
          color={actionColor}
          icon="plus-outline" 
          onPress={() => setNewMenuVisible(true)}
          />
        }>
        <PaperMenu.Item 
          title={'Group'}
          onPress={() => newItem}
          style={styles.menuItem}/>
      </PaperMenu>
    </View>
  );
};

export default NewMenu;

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// styling
import styles from '../../../src/styles.tsx';
import { Appbar, Menu as PaperMenu, Portal, Modal, PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import groupsData from '../../../src/userdata/groupsData.json';
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';

interface Props {
  navigation: any,
}

const Groups: React.FC<Props> = ({ navigation }) => {
  type ItemData = {
    id: string,
    title: string,
    labels: Array<String>,
    currentPlayers: number,
    maxPlayers: number,
    tagline: string,
    description: string,
    };

  type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
    setModalContents: () => void;
  };

  const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
      <TouchableOpacity onPress={onPress} style={[styles.listItem, {backgroundColor}]}>
        <Text style={[styles.text, {color: textColor}]}>
          <Icon name="account" size={20}/> {item.currentPlayers}/{item.maxPlayers} | {item.title}
        </Text>
        <Text style={[styles.text, {color: textColor}, {fontSize: 13}, {paddingBottom: 5}]}>
          {item.labels.join(", ")}
        </Text>
        <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
          {item.tagline}
        </Text>
      </TouchableOpacity>
  );

  // State variables
  const [tabOrigin, setTabOrigin] = useState('Groups');

  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [newMenuVisible, setNewMenuVisible] = useState(false);

  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState<Array<any>>()

  const [selectedId, setSelectedId] = useState<string>("1");
  const handleItemSelect = (item: ItemData) => {
    setSelectedId(item.id.toString());
    setGroupModalVisible(true);
  }

  const closeSettingsDialog = () => {
    setSettingsVisible(false);
  }

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id.toString() === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id.toString() === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => handleItemSelect(item)}
        backgroundColor={backgroundColor}
        textColor={color}
        setModalContents={() => setModalInfo([
          item.title,
          item.labels,
          item.maxPlayers,
          item.currentPlayers,
          item.tagline,
          item.description,
        ])}
      />
    );
  };

  const createGroup = () => {
    const existingGroups = groupsData.length;
    const availableId = existingGroups + 1;

    const newGroupId = availableId;
    const newGroup = groupsData[newGroupId];

    newGroup.id = newGroupId.toString();
    // alert(groupsData[availableId])
  }
  
  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#55a'}}>
        <Appbar.Content title="Groups" titleStyle={{color: '#fff'}}/>
            <NewMenu 
              tabOrigin={tabOrigin}
              enabled={newMenuVisible}
              setNewMenuVisible={setNewMenuVisible}
              newItem={createGroup}/>
            <MainMenu 
              tabOrigin={tabOrigin}
              enabled={mainMenuVisible}
              setSettingsVisible={setSettingsVisible}
              setMainMenuVisible={setMainMenuVisible}
              />
        </Appbar.Header>

      <PaperProvider>
        <FlatList 
          data={groupsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}/>
         
        <Portal>
          <Modal
            visible={groupModalVisible} 
            onDismiss={() => setGroupModalVisible(false)}
            contentContainerStyle={styles.container}>
              <View>
                <Text></Text>
                <TouchableOpacity
                  style={styles.modalText} 
                  onPress={() => setGroupModalVisible(false)}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
          </Modal>
        </Portal>
      </PaperProvider>
      
      <PaperProvider>
        <Portal>
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        </Portal>
      </PaperProvider>

    </View>
  );
};

export default Groups;

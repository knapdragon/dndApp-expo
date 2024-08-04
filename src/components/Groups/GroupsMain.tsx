import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// styling
import styles, { Colors } from '../../../src/styles.tsx';
import { Appbar, Portal, Modal, PaperProvider, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// data
import groupsData from '../../../src/userdata/groupsData.json';
import NewGroupForm from './NewGroupForm.tsx';
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';
import { FAB } from '@rneui/themed';

interface Props {
  navigation: any,
}

const tabOrigin = 'Groups';

const Groups: React.FC<Props> = ({ navigation }) => {
  type ItemData = {
    id: string,
    title: string,
    labels: Array<String>,
    currentPlayers: number,
    maxPlayers: number,
    tagline: string,
    description: string,
    author: string,
    };

  type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
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

  {/* Appbar and related actions */}
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  function closeSettingsDialog(): void {
    setSettingsVisible(false);
  }
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  const [newGroupFormVisible, setNewGroupFormVisible] = useState(false);
  function openNewGroupForm(): void {
    setNewGroupFormVisible(true);
    setNewMenuVisible(false);
  }
  function closeNewGroupForm(): void {
    setNewGroupFormVisible(false);
  }

  const [searchVisible, setSearchVisible] = useState(false);

  // Groups-specific states
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Array<any>>([]);
  const [userAuthor, setUserAuthor] = useState<{ name: string | undefined; isAuthor: boolean }>({
    name: '',         // stores name of user who created group
    isAuthor: false,  // used to check if user is the author of a selected group
  }); 

  const [selectedId, setSelectedId] = useState<string | undefined>("");
  
  function handleItemSelect(item: ItemData) {
    setSelectedId(item.id);
    updateGroup(item.id)
  };

  function updateGroup(groupId: string): void {
    const groupData = groupsData.find(item => item.id == groupId);
    const allGroupData = [
      groupData?.title,
      groupData?.labels,
      groupData?.currentPlayers,
      groupData?.maxPlayers,
      groupData?.tagline,
      groupData?.description,
      groupData?.author,
    ];
    if (groupData?.author === userAuthor["name"]) {
      setUserAuthor({name: groupData?.author, isAuthor: true});
      // if current user is author of selected group, show delete button
    } else {
      setUserAuthor({name: userAuthor["name"], isAuthor: false});
    }
    setModalData(allGroupData);
    setGroupModalVisible(true);
  };

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id.toString() === selectedId ? '#777' : '#eee';
    const color = item.id.toString() === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => handleItemSelect(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  function deleteGroup(): void {
    if (selectedId != undefined) {
      groupsData.splice(parseInt(selectedId) - 1, 1);
    } else {
      alert('Selected group to delete is undefined!\nIf you are encountering this error with the modal open, please close it and try again.');
    }
    setGroupModalVisible(false);
  }
  
  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#6496e8'}}>
        <Appbar.Content title="Groups"/>
            <NewMenu 
              tabOrigin={tabOrigin}
              enabled={newMenuVisible}
              setNewMenuVisible={setNewMenuVisible}
              newItem={openNewGroupForm}
              />
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

        <NewGroupForm 
          enabled={newGroupFormVisible}
          data={groupsData}
          setAuthorName={setUserAuthor}
          closeForm={closeNewGroupForm}/>

        <Portal>
          <Modal
            visible={groupModalVisible} 
            onDismiss={() => setGroupModalVisible(false)}
            contentContainerStyle={[styles.container, {backgroundColor: '#eee'}]}>
              <View>
                <View style={styles.modalTitle}>
                  <Text id='modal-title' style={styles.title}>
                    {modalData[0]}
                  </Text>
                </View>

                <View style={styles.modalPlayers}>
                  <Text id='modal-currentplayers' style={[styles.modalText, {fontSize: 18}]}>
                      Players: {modalData[2]}/{modalData[3]}
                  </Text>
                </View>

                <View style={styles.modalLabels}>
                  <Text id='modal-labels' style={styles.modalText}>
                    {modalData[1]}
                  </Text>
                </View>
                
                <View style={styles.modalDescription}>
                  <Text id='modal-description' style={styles.modalText}>
                    {modalData[5]}
                  </Text>
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', gap: 40}}>
                  <TouchableOpacity
                    style={styles.modalButton} 
                    onPress={() => setGroupModalVisible(false)}>
                    <Text style={{textAlign: 'center'}}>Close</Text>
                  </TouchableOpacity>

                  {userAuthor["isAuthor"] ? // If the author of the group is the current user
                    <TouchableOpacity
                      style={[styles.modalButton, {backgroundColor: '#f55', paddingHorizontal: 5}]}
                      onPress={deleteGroup}>
                      <Text style={{textAlign: 'center'}}>Delete</Text>
                    </TouchableOpacity>
                  : null}
                </View>
              </View>
          </Modal>
        </Portal>
      </PaperProvider>

      <FAB
        visible={!newGroupFormVisible}
        color={Colors.groups.primary}
        placement='right'
        icon={{name: 'magnify', type: 'material-community', color: 'black'}}
        onPress={() => setSearchVisible(!searchVisible)}/>
      {searchVisible &&
        <Text style={{fontSize: 16, textAlign: 'right', right: 100, bottom: 35}}>
          This is a work in progress
        </Text>
      }

      <View style={{flex: 0}}>
        {settingsVisible ? 
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        : null}
      </View>
    </View>
  );
};

export default Groups;

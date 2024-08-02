import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal as RNModal } from 'react-native';
import { Appbar, Card, PaperProvider, Portal, Modal, Dialog, Button } from 'react-native-paper';

// styling
import styles from '../../styles.tsx';

// data
import Note from './Note.tsx';
import notesData from '../../userdata/notesData.json';
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';
import NewNoteForm from './NewNoteForm.tsx';

// Navigation
interface Props {
  navigation: any,
}

const tabOrigin = 'Notes';

const Notes: React.FC<Props> = ({ navigation }) => {
  // Rendering FlatList items
  type ItemData = {
    id: number,
    title: string,
    content: string,
    colour: string,
    };

  type ItemProps = {
    item: ItemData;
    onPress: () => void;
  };

  const Item = ({item}: ItemProps) => (
    <View style={[styles.container, {justifyContent: 'space-between'}]}>
      <Card mode='contained' style={styles.card}>
        <TouchableOpacity
          onPress={() => handleItemSelect(item)}>
          <Card.Title title={item.title}
            titleStyle={[styles.title, {fontSize: 18}, {marginTop: 20}, {marginLeft: 0}, {alignItems: 'flex-start'}]}
            style={[{borderBottomColor: 'silver'}, {borderBottomWidth: 1}]}/>

          <Card.Content style={[{marginTop: 10}, {marginBottom: 20}]}>
            <Text>
              {item.content.length > 192 ?        // if greater than 192 characters
              item.content.slice(0, 192) + '...'  // truncate to 192 characters
              : item.content}                     {/* otherwise display full content */}
            </Text>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    </View>
  );

  {/* Appbar and related actions */}
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  function closeSettingsDialog(): void {
    setSettingsVisible(false);
  }
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  const [newNoteFormVisible, setNewNoteFormVisible] = useState(false);
  function openNewNoteForm (): void {
    setNewNoteFormVisible(true);
    setNewMenuVisible(false);
  }
  function closeNewNoteForm(): void {
    setNewNoteFormVisible(false);
  }

  const [noteVisible, setNoteVisible] = useState(false);
  const [noteData, setNoteData] = useState<Array<any>>([]);

  // Rendering FlatList items
  const [selectedId, setSelectedId] = useState<string>('1');
  function handleItemSelect(item: ItemData) {
    setSelectedId(item.id.toString())
    setNoteVisible(true);

    const noteData = notesData.find(item => item.id.toString() == selectedId);
    const allNoteData = [
      noteData?.title,
      noteData?.content,
      noteData?.colour,
    ];
    setNoteData(allNoteData);
  }

  const renderItem = ({item}: {item: ItemData}) => {
    return (  <Item item={item} onPress={() => handleItemSelect(item)}/>  );
  };

  /**
   * Saves the contents of a note. 
   * */
  function saveNote() {
    alert('Button pressed!');
    setNoteVisible(false);
  }

  /** 
   * Delete a note with the given id. 
   * */
  function deleteNote(): void {
    if (selectedId != undefined) {
      notesData.splice(parseInt(selectedId) - 1, 1);
    } else {
      alert('Selected note to delete is undefined!\nIf you are encountering this error with a note open, please close it and try again.');
    }
    setNoteVisible(false);
  }

  // Notes begins
  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#4a4'}}>
        <Appbar.Content title="Notes" titleStyle={{color: '#000'}}/>
            <NewMenu 
              tabOrigin={tabOrigin}
              enabled={newMenuVisible}
              setNewMenuVisible={setNewMenuVisible}
              newItem={openNewNoteForm}
              />
            <MainMenu 
              tabOrigin={tabOrigin}
              enabled={mainMenuVisible}
              setSettingsVisible={setSettingsVisible}
              setMainMenuVisible={setMainMenuVisible}
              />
      </Appbar.Header>

      {/* Main content starts here */}
      <FlatList 
        data={notesData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
        renderItem={renderItem}/>

      <NewNoteForm 
        enabled={newNoteFormVisible}
        data={notesData}
        closeForm={closeNewNoteForm}/>

      {/* Overlays — should not be flexible */}
      <View style={{flex: 0}}>
        {noteVisible ? 
        <Note enabled={noteVisible} data={noteData} saveNote={() => saveNote()} closeNote={() => setNoteVisible(false)} deleteNote={() => deleteNote()} />
        : null}

        {settingsVisible ? 
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        : null}
      </View>

    </View>
  );
};

export default Notes;

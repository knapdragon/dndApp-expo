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
              {item.content.length > 192 ? 
              item.content.slice(0, 192) + '...' : item.content}
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
   * Create a new note with the given data. 
   * */
  function newNote() {
    alert('Button pressed!');
    const newNoteId = notesData.length + 1;
    const newNote = {
      id: newNoteId,
      title: 'New Note ' + newNoteId,
      content: '',
      colour: 'default',
    };

    notesData.push(newNote);
  }

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
  function deleteNote() {
    let dialogVisible = true;
    return (
      <Dialog visible={dialogVisible}>
        <Dialog.Title>Really delete this note?</Dialog.Title>
        <Dialog.Actions>
          <TouchableOpacity onPress={() => deleteConfirmed()} style={[styles.dialogButton, {backgroundColor: '#f55'}]}>
            <Text>Yes, delete</Text>
          </TouchableOpacity>
          <Button onPress={() => dialogVisible = false}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    )
  }

  function deleteConfirmed(): void {
    alert('Note id: ' + selectedId);
    // notesData.splice(parseInt(selectedId));
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
              newItem={newNote}
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

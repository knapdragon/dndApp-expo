import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Card, PaperProvider, Portal } from 'react-native-paper';

// styling
import styles from '../../styles.tsx';

// data
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
    <View style={[styles.container, {justifyContent: 'space-around'}]}>
      <Card mode='contained' style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Note', selectedId)}>
          <Card.Title title={item.title}
            titleStyle={[styles.title, {fontSize: 18}, {marginTop: 20}, {marginLeft: 0}, {alignItems: 'flex-start'}]}
            style={[{borderBottomColor: 'silver'}, {borderBottomWidth: 1}]}/>

          <Card.Content style={[{marginTop: 10}, {marginBottom: (item.content.length / 10 + 20)}]}>
            <Text>
              {item.content.length > 64 ? 
              item.content.slice(0, 64) + '...' : item.content}
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

  // Rendering FlatList items
  const [selectedId, setSelectedId] = useState<string>();
  function handleItemSelect(item: ItemData) {
    setSelectedId(item.id.toString())
    navigation.navigate("Note", {noteId: selectedId})
  }

  const renderItem = ({item}: {item: ItemData}) => {
    return (  <Item item={item} onPress={() => handleItemSelect(item)}/>  );
  };
  
  /**
   * Create a new note with the given data. 
   * */
  function newNote() {
    alert('Button pressed!');
  }

  /** 
   * Delete a note with the given id. 
   * */
  function deleteNote() {
    alert('Button pressed!');
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

      <PaperProvider>
        <Portal>
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        </Portal>
      </PaperProvider>
    </View>
  );
};

export default Notes;

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Card, Button, Dialog, PaperProvider, Portal } from 'react-native-paper';

// styling
import styles from '../../styles.tsx';

// data
import notesData from '../../userdata/notesData.json';
import Settings from '../Settings.tsx';
import MainMenu from '../MainMenu.tsx';
import NewMenu from '../NewMenu.tsx';

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
  backgroundColor: string;
	textColor: string;
};

const Item = ({item, textColor}: ItemProps) => (
	<TouchableOpacity style={[styles.listItem, {backgroundColor: item.colour}]}>
		<Text style={[styles.text, {color: textColor}]}>
      {item.title}
    </Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
      {item.content}
    </Text>
	</TouchableOpacity>
);

// Navigation
interface Props {
  navigation: any,
}

const Notes: React.FC<Props> = ({ navigation }) => {
  const [tabOrigin, setTabOrigin] = useState('Notes');

  // Appbar handler
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const closeSettingsDialog = () => {
    setSettingsVisible(!settingsVisible);
  }

  const [newMenuVisible, setNewMenuVisible] = useState(false);

  // Rendering FlatList items
  const [selectedId, setSelectedId] = useState<string>();
  const handleItemSelect = (item: ItemData) => {
    setSelectedId(item.id.toString())
    navigation.navigate("Note")
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
      />
    );
  };
  
  /**
   * Create a new note with the given data. 
   * */
  const newNote = () => {

  }

  /** 
   * Delete a note with the given id. 
   * */
  const deleteNote = () => {
    
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
        renderItem={(item) => {
          return (
            <View style={[styles.container, {justifyContent: 'space-around'}]}>
              <Card mode='contained' style={styles.card}>
                <Card.Title title={item.item.title}
                  style={styles.title}/>

                <Card.Content>
                  <Text>{item.item.content}</Text>
                </Card.Content>

                <Card.Actions>
                  <Button onPress={() => navigation.navigate('Note')}>Edit</Button>
                  <Button onPress={() => deleteNote}>Delete</Button>
                </Card.Actions>
              </Card>
            </View>
          )
        }}/>

      <PaperProvider>
        <Portal>
          <Settings tabOrigin={tabOrigin} enabled={settingsVisible} closeDialog={closeSettingsDialog}/>
        </Portal>
      </PaperProvider>
    </View>
  );
};

export default Notes;

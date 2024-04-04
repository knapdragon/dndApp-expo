import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Menu as PaperMenu, Card, Button } from 'react-native-paper';
import styles from '../../styles.tsx';
import notesData from '../../userdata/notesData.json';

// Rendering FlatList items
type ItemData = {
	id: number,
  title: string,
  cover: string,
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
  // Appbar handler
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  const openNewMenu = () => setNewMenuVisible(true);
  const closeNewMenu = () => setNewMenuVisible(false);

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
  
    // Note deletion
  const deleteNote = () => {

  }

  // Notes begins
  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#f55'}}>
          <Appbar.Content title="Sheets" titleStyle={{color: '#000'}} />
          <PaperMenu
            visible={newMenuVisible}
            onDismiss={closeNewMenu}
            anchor={
            <Appbar.Action
              color='black'
              icon="plus-outline" 
              onPress={() => openNewMenu}/>
            }>
            <PaperMenu.Item title="Note"/>
            <PaperMenu.Item title="Folder" />
          </PaperMenu>
          <Appbar.Action color='black' icon="menu" onPress={() => navigation.navigate('Settings')}/>
        </Appbar.Header> 

      {/* Main content starts here */}
      <FlatList 
        data={notesData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => {
          return (
          <Card>
            <Card.Title title={item.item.title}/>
            <Card.Content>
              <Text style={styles.title}>{item.item.title}</Text>
              <Text>{item.item.content}</Text>
            </Card.Content>
            <Card.Cover source={{uri: item.item.cover}} />  {/* optional image (uses url) */}
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Note')}>Edit</Button>
              <Button onPress={() => deleteNote}>Delete</Button>
            </Card.Actions>
          </Card>
          )
        }}
		    extraData={selectedId}
        />

    </View>
  );
};

export default Notes;

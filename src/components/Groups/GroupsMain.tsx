import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Menu as PaperMenu } from 'react-native-paper';
import styles from '../../styles.tsx';
import groupsData from '../../userdata/groupsData.tsx';

type ItemData = {
	id: number,
  title: string,
  image: Image,
  labels: Array<String>,
  currentPlayers: number,
  maxPlayers: number,
  description: string,
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
      {item.title} {item.currentPlayers}/{item.maxPlayers}
    </Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 13}, {paddingBottom: 5}]}>
      {item.labels.join(", ")}
    </Text>
    <Text style={[styles.text, {color: textColor}, {fontSize: 14}]}>
      {item.description}
    </Text>
	</TouchableOpacity>
);

interface Props {
  navigation: any,
}

const Groups: React.FC<Props> = ({ navigation }) => {
  const [newMenuVisible, setNewMenuVisible] = useState(false);
  const openNewMenu = () => setNewMenuVisible(true);
  const closeNewMenu = () => setNewMenuVisible(false);

  const [selectedId, setSelectedId] = useState<string>();
  const handleItemSelect = (item: ItemData) => {
    setSelectedId(item.id.toString())
    navigation.navigate("Group")
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
  
  return (
    <View style={styles.container}>
      <View> 
        <Appbar.Header style={{backgroundColor: '#55a'}}>
            <Appbar.Content title="Groups" titleStyle={{color: '#fff'}}/>
            <PaperMenu
              visible={newMenuVisible}
              onDismiss={closeNewMenu}
              anchor={
              <Appbar.Action 
                color='white' 
                icon="plus-outline" 
                onPress={() => openNewMenu}
                />
              }>
              <PaperMenu.Item title="Group" />
            </PaperMenu>
            <Appbar.Action color='white' icon="menu" onPress={() => navigation.navigate('Settings')}/>
          </Appbar.Header> 
      </View>

      <FlatList 
        data={groupsData.groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
		    extraData={selectedId}/>
    </View>
  );
};

export default Groups;

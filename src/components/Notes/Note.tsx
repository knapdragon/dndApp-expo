import React, { useState } from 'react';
import { Text, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';

interface Props {
  navigation: any,
}

const Note: React.FC<Props> = ({ navigation }) => {
  const [noteTitle,  setNoteTitle] = useState("");
  
    return (
        <Appbar.Header>
          <Appbar.Content title={noteTitle} />
        </Appbar.Header>
    );
};

export default Note;
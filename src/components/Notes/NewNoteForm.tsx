import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';

// styling
import styles, { Colors } from '../../../src/styles.tsx';
import { Portal, Dialog, TextInput } from 'react-native-paper';
import { Divider } from '@rneui/themed';

interface Props {
  enabled: boolean,
  data: any,
  closeForm: () => void,
}

const NewNoteForm: React.FC<Props> = ({enabled, data, closeForm}) => {
  const notesData = data;
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [colour, setColour] = useState<string>('');

  /**
   * Sets state to the input based on type
   * @param type The property type of the note, e.g. title or content
   * @param input The text of the input, e.g. 'This is a test note'
   */
  function handleFormInput(type: string, input: string): void {
    switch (type) {
      case 'title':
        setTitle(input);
        break;
      case 'content':
        setContent(input);
        break;
      case 'colour':
        setColour(input);
        break;
    }
  }

  /**
   * Creates a new note in the notesData array with the form inputs.
   * @param title The note title
   * @param content The content of the note
   * @param colour The note colour
   */
  function newNote(title: string, content: string, colour: string): void {
    const newNoteId = notesData.length + 1;

    const newNote = {
      id: newNoteId.toString(),
      title: title,
      content: content,
      colour: colour,
    };

    const newTestNote = {
      id: newNoteId.toString(),
      title: 'Test Note ' + newNoteId,
      content: 'This object is for developer testing.',
      colour: 'dev',
    };

    notesData.push(newNote);
    closeForm();
  }

  return (
    <Portal>
      <Dialog visible={enabled} style={styles.newNoteContainer}>
        <Dialog.Title style={styles.newNoteTitle}>
          <View style={{flex: 0}}>
            <Text style={{fontSize: 20}}>Note Name</Text>
            <TextInput id='note-name' style={styles.formInputs}
              mode={'outlined'}
              autoFocus={true}
              onEndEditing={(e) => handleFormInput('title', e.nativeEvent.text)}/>
          </View>
        </Dialog.Title>

        <Divider inset={true} insetType={'middle'} color={'#555'} style={{marginVertical: 5}}/>

        <Dialog.Content style={styles.newNoteContent}>
          <View style={{flex: 0}}>
            <Text style={{fontSize: 14}}>Content</Text>
            <TextInput id='note-content' 
              style={[styles.formInputs, {height: 320}]}
              mode={'outlined'}
              multiline={true}
              numberOfLines={5}
              onEndEditing={(e) => handleFormInput('content', e.nativeEvent.text)}/>
          </View>
        </Dialog.Content>

        <Dialog.Actions>
          <View style={{flexDirection: 'row', justifyContent: 'center', gap: 40}}>
            <TouchableOpacity
              style={[styles.newNoteButton, {paddingHorizontal: 10, backgroundColor: Colors.common.buttonApplyCreate}]} 
              onPress={() => newNote(title, content, colour)}>
              <Text style={{textAlign: 'center'}}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.newNoteButton} 
              onPress={closeForm}>
              <Text style={{textAlign: 'center'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default NewNoteForm;
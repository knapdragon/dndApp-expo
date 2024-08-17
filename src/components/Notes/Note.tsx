import React, { useState, useRef } from 'react';
import { View, Text, Modal as RNModal, ScrollView, TouchableOpacity } from 'react-native';

// styling
import styles, { Colors } from '../../styles.tsx';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { PaperProvider, Portal, Modal, Dialog, Button, TextInput } from 'react-native-paper';

interface NoteProps {
  enabled: boolean;
  data: Array<any>;
  saveNote: () => void;
  closeNote: () => void;
  deleteNote: () => void;
}

const Note: React.FC<NoteProps> = ({ enabled, data, saveNote, closeNote, deleteNote }) => {
  let noteHeight = 100;
  if (data[1] !== undefined) {
    noteHeight = data[1].length > 100 ? 500 : data[1].length + 10;
  }

  const [editingTitle, setEditingTitle] = useState(false);
  let newTitle: string;
  const [editingContent, setEditingContent] = useState(false);
  let newContent: string;

  function saveTitle(bool: boolean): void {
    if (bool) {
      data[0] = newTitle;
      setEditingTitle(false);
    } else {
      setEditingTitle(false);
    }
  }

  function saveContent(bool: boolean): void {
    if (bool) {
      data[1] = newContent;
      setEditingContent(false);
    } else {
      setEditingContent(false);
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Modal visible={true}>
            <RNModal transparent={true}>
              <Dialog visible={enabled} onDismiss={() => closeNote} style={styles.dialog}>
                <Dialog.Title>
                  {editingTitle ? 
                    <TextInput
                      style={{backgroundColor: 'transparent'}}
                      outlineColor='transparent'
                      activeOutlineColor='transparent'
                      cursorColor='black'
                      mode="outlined"
                      contentStyle={{left: -17, top: -12, width: 150, fontSize: 24}}
                      defaultValue={data[0]}
                      onEndEditing={(e) => newTitle = e.nativeEvent.text}/>
                    : 
                  <>
                    {data[0]} <Icon name={'pencil'} size={20} color='#555' onPress={() => setEditingTitle(true)}/>
                  </>}
                </Dialog.Title>

                <Dialog.Content>
                  <Dialog.ScrollArea style={{height: (data[1].length > 100 ? 500 : data[1].length + 10)}}>
                    <ScrollView style={{marginHorizontal: -15, marginBottom: -40}}>
                      {editingContent ? 
                        <TextInput
                          style={{backgroundColor: 'transparent', fontSize: 13, left: -10}}
                          outlineColor='transparent'
                          activeOutlineColor='transparent'
                          cursorColor='black'
                          mode="outlined"
                          multiline={true}
                          defaultValue={data[1]}
                          onEndEditing={(e) => newContent = e.nativeEvent.text}/>
                        : 
                      <>
                        <Text>{data[1]}</Text>
                      </>}
                      
                    </ScrollView>
                  </Dialog.ScrollArea>
                </Dialog.Content>

                <Dialog.Actions>
                  <TouchableOpacity onPress={deleteNote} style={[styles.dialogButton, {backgroundColor: '#f55', marginRight: 150}]}>
                    <Icon name={'trash-can-outline'} size={18} style={{marginRight: 5}}/>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  {editingContent ?
                  <TouchableOpacity onPress={() => saveContent(true)} style={[styles.dialogButton, {backgroundColor: '#3b3'}]}>
                    <Text>Apply</Text>
                  </TouchableOpacity>
                    :
                  <TouchableOpacity onPress={() => setEditingContent(true)} style={[styles.dialogButton, {backgroundColor: '#3b3'}]}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  }
                  <Button onPress={closeNote}>Close</Button>
                </Dialog.Actions>
              </Dialog>
            </RNModal>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
    );
};

export default Note;
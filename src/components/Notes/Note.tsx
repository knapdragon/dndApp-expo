import React, { useState } from 'react';
import { View, Text, Modal as RNModal, ScrollView, TouchableOpacity } from 'react-native';

// styling
import styles from '../../styles.tsx';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { PaperProvider, Portal, Modal, Dialog, Button } from 'react-native-paper';

interface NoteProps {
  enabled: boolean;
  data: Array<any>;
  saveNote: () => void;
  closeNote: () => void;
  deleteNote: () => void;
}

const Note: React.FC<NoteProps> = ({ enabled, data, saveNote, closeNote, deleteNote }) => {
  
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Modal visible={true}>
            <RNModal transparent={true}>
              <Dialog visible={enabled} onDismiss={() => closeNote} style={styles.dialog}>
                <Dialog.Title>{data[0]}</Dialog.Title>

                <Dialog.Content>
                  <Dialog.ScrollArea style={{height: (data[1].length > 100 ? 500 : data[1].length + 10)}}>
                    <ScrollView style={{marginHorizontal: -15, marginBottom: -40}}>
                      <Text>{data[1]}</Text>
                    </ScrollView>
                  </Dialog.ScrollArea>
                </Dialog.Content>

                <Dialog.Actions>
                  <TouchableOpacity onPress={deleteNote} style={[styles.dialogButton, {backgroundColor: '#f55', marginRight: 150}]}>
                    <Icon name={'trash-can-outline'} size={18} style={{marginRight: 5}}/>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={closeNote} style={[styles.dialogButton, {backgroundColor: '#3b3'}]}>
                    <Text>Apply</Text>
                  </TouchableOpacity>
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
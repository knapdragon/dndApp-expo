import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';

// styling
import styles from '../../../src/styles.tsx';
import { Portal, Modal, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface Props {
  enabled: boolean,
  data: any,
  setAuthorName: React.Dispatch<React.SetStateAction<{
    name: string | undefined;
    isAuthor: boolean;
  }>>,
  closeForm: () => void,
}

const NewGroupForm: React.FC<Props> = ({enabled, data, setAuthorName, closeForm}) => {
  const groupsData = data;
  const [title, setTitle] = useState<string>('');
  const [labels, setLabels] = useState<string>('');
  const [currentPlayers, setCurrentPlayers] = useState<number>(1);
  const [maxPlayers, setMaxPlayers] = useState<number>(4);
  const [tagline, setTagline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const authorRef = useRef<any>(null);

  /**
   * Sets state to the input based on type
   * @param type The property type of the group, e.g. title or description
   * @param input The text of the input, e.g. 'This is a test group'
   */
  function handleFormInput(type: string, input: string): void {
    switch (type) {
      case 'title':
        setTitle(input);
        break;
      case 'labels':
        setLabels(input);
        break;
      case 'currentPlayers':
        setCurrentPlayers(parseInt(input));
      case 'maxPlayers':
        setMaxPlayers(parseInt(input));
        break;
      case 'tagline':
        setTagline(input);
        break;
      case 'description':
        setDescription(input);
        break;
      case 'author':
        console.log(input)
        setAuthor(input);
        setAuthorName({name: input, isAuthor: false}); // arg2 unnecessary, will be set in parent
        break;
    }
  }

  function handleFormSubmit(): void {
    authorRef?.current?.blur()
    newGroup(title, labels, currentPlayers, maxPlayers, tagline, description, author)
  }

  /**
   * Creates a new group in the groupsData array with the form inputs.
   * @param title The group title
   * @param labels The group's labels
   * @param currentPlayers The players currently considered part of the group 
   * @param maxPlayers The maximum number allowed
   * @param tagline A short tagline
   * @param description A longer description
   * @param author The group creator
   */
  function newGroup(title: string, labels: string, currentPlayers: number,  maxPlayers: number,  tagline: string,  description: string, author: string): void {
    const newGroupId = groupsData.length + 1;
    const labelsList = labels.split(',');

    const newGroup = {
      id: newGroupId.toString(),
      title: title,
      labels: labelsList,
      currentPlayers: currentPlayers,
      maxPlayers: maxPlayers,
      tagline: tagline,
      description: description,
      author: author,
    };

    const newTestGroup = {
      id: newGroupId.toString(),
      title: 'Test Group ' + newGroupId,
      labels: ['DevTest'],
      currentPlayers: 1,
      maxPlayers: 5,
      tagline: 'Test group, please ignore',
      description: 'This object is for developer testing.',
      author: 'dev',
    };

    groupsData.push(newGroup);
    closeForm();
  }

  return (
    <Portal>
      <Modal
        visible={enabled}
        contentContainerStyle={styles.newGroupContainer}>
          <View>
            <View style={styles.newGroupTitle}>
              <Text style={{fontSize: 20}}>Group Name</Text>
              <TextInput id='group-name' style={styles.formInputs}
                mode={'outlined'}
                autoFocus={true}

                onEndEditing={(e) => handleFormInput('title', e.nativeEvent.text)}/>
            </View>

            <View style={styles.newGroupLabels}>
              <Text style={{fontSize: 20}}>Labels</Text>
              <Text style={{fontStyle: 'italic'}}>How would you label this group? (Separate with commas)</Text>
              <TextInput id='group-labels' style={styles.formInputs}
                mode={'outlined'}
                onEndEditing={(e) => handleFormInput('labels', e.nativeEvent.text)}/>
            </View>

            <View style={styles.newGroupPlayers}>
              <Text style={{fontSize: 20}}>Size</Text>
              <Text style={{fontStyle: 'italic'}}>How many players do you have, and are allowed?</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput id='group-currentPlayers' 
                  style={[styles.formInputs, {maxWidth: 50, textAlign: 'center'}]}
                  mode={'outlined'}
                  keyboardType={'numeric'}
                  onEndEditing={(e) => handleFormInput('currentPlayers', e.nativeEvent.text)}/>
                <Text style={{paddingHorizontal: 10}}>current</Text>
                <TextInput id='group-maxPlayers' 
                  style={[styles.formInputs, {maxWidth: 50, textAlign: 'center'}]}
                  mode={'outlined'}
                  keyboardType={'numeric'}
                  onEndEditing={(e) => handleFormInput('maxPlayers', e.nativeEvent.text)}/>
                <Text style={{paddingHorizontal: 10}}>maximum</Text>
              </View>
            </View>

            <View style={styles.newGroupTagline}>
              <Text style={{fontSize: 20}}>Tagline</Text>
              <Text style={{fontStyle: 'italic'}}>Write a short tagline.</Text>
              <TextInput id='group-tagline' style={styles.formInputs}
                mode={'outlined'}
                onEndEditing={(e) => handleFormInput('tagline', e.nativeEvent.text)}/>
            </View>
            
            <View style={styles.newGroupDescription}>
              <Text style={{fontSize: 20}}>Description</Text>
              <Text style={{fontStyle: 'italic'}}>Write a description. If you have them, put links here!</Text>
              <TextInput id='group-description' style={styles.formInputs}
                mode={'outlined'}
                onEndEditing={(e) => handleFormInput('description', e.nativeEvent.text)}/>
            </View>

            <View style={styles.newGroupAuthor}>
              <Text style={{fontSize: 20}}>Author</Text>
              <Text style={{fontStyle: 'italic'}}>Who's creating this group?</Text>
              <TextInput id='group-author' style={styles.formInputs}
                mode={'outlined'}
                ref={authorRef}
                onEndEditing={(e) => handleFormInput('author', e.nativeEvent.text)}/>
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 40}}>
              <TouchableOpacity
                style={[styles.newGroupButton, {paddingHorizontal: 5, backgroundColor: '#3b3'}]} 
                onPress={() => handleFormSubmit()}>
                <Text style={{textAlign: 'center'}}>Create</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.newGroupButton} 
                onPress={closeForm}>
                <Text style={{textAlign: 'center'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </Portal>
  )
}


export default NewGroupForm;
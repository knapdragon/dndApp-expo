import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { Appbar, Menu as PaperMenu, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles.tsx';
import sheetsData from '../../userdata/sheetsData.js';
import racesSRD from './../../assets/srd_compendium/JSON/5e-SRD-Races.json';
import racesCustom from './../../userdata/compendium_custom/races_custom.js';
import classesSRD from './../../assets/srd_compendium/JSON/5e-SRD-Classes.json';
import classesCustom from './../../userdata/compendium_custom/classes_custom.js';

interface Props {
  navigation: any
}

const NewSheetForm: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [mainClass, setMainClass] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Appbar.Header style={{backgroundColor: '#fab'}}>
          <Appbar.BackAction onPress={() => navigation.navigate('Sheets')}/>
          <Appbar.Content title="New Sheet" titleStyle={{color: '#000'}} />
        </Appbar.Header>
      </View>

      <View id="form">
        {/* User chooses a name */}
        <Text style={styles.text}>Character Name</Text>
        <TextInput onBlur={(text) => this.setName(text)}
        />  

        {/* User selects a race */}
        <Text style={styles.text}>Choose a race</Text>
        <Picker selectedValue={race} onValueChange={selectedRace => setRace(selectedRace)}>
          {racesSRD.map((item => (
            <Picker.Item label={item.index} value={item.name} />
          )))}
        </Picker>
        {/* Display race, description, & basic stats */}
        <Text style={styles.text}>{race}</Text>
        <View>
          <Text>{racesSRD[racesSRD.indexOf(racesSRD.find((r) => r.name === race))]}</Text>
        </View>

        {/* User selects a class */}
        <Text style={styles.text}>Choose a class</Text>
        <Picker selectedValue={mainClass} onValueChange={selectedClass => setMainClass(selectedClass)}>
          {classesSRD.map((item => (
            <Picker.Item label={item.index} value={item.name} />
          )))}
        </Picker>
        {/* Display class, description, & basic stats */}
        <Text style={styles.text}>{mainClass}</Text>
        <View>
          <Text>{classesSRD.find((c) => c.name === mainClass)}</Text>
        </View>
      </View>
    </View>
  );
};

export default NewSheetForm;

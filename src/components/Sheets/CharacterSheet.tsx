import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';

interface Props {
    navigation: any,
  }

const CharacterSheet: React.FC<Props> = ({ navigation }) => {
    const [sheetTitle, setSheetTitle] = useState("");
    
    return (
        <Appbar.Header>
          <Appbar.Content title={sheetTitle} />
        </Appbar.Header>
    );
};

export default CharacterSheet;
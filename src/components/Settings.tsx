import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text, Switch } from 'react-native-paper';
import styles from '../styles.tsx';

interface Props {
  tabOrigin: string;
  enabled: boolean;
  closeDialog: () => void;
}

const Settings: React.FC<Props> = ({ tabOrigin, enabled, closeDialog }) => {
  const [sheetsSettings, setSheetsSettings] = useState(false);
  const [notesSettings, setNotesSettings] = useState(false);
  const [groupsSettings, setGroupsSettings] = useState(false);

  switch (tabOrigin) {
    case 'Sheets':
      () => setSheetsSettings(true);
    case 'Notes':
      () => setNotesSettings(true);
    case 'Groups':
      () => setGroupsSettings(true);
  }

  const [devTest, toggleDevTest] = useState(false); // tests if switch works
  const settingsOptions = [devTest]

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Dialog visible={enabled} onDismiss={() => closeDialog} style={styles.dialog}>
            <Dialog.Title>Settings</Dialog.Title>

            <Dialog.Content>
              <View style={[{display: 'flex'}, {flexDirection: 'row'}, {flexWrap: 'wrap'}]}>
                <Text>Test Switch</Text>
                <Switch value={devTest} onValueChange={() => toggleDevTest(!devTest)} /> 
                {/* onValueChange: toggle the switch */}
                
                {sheetsSettings ? (
                  <Text>Sheets Settings</Text>
                ) : (null)}
                {notesSettings ? (
                  <Text>Notes Settings</Text>
                ) : (null)}
                {groupsSettings ? (
                  <Text>Groups Settings</Text>
                ) : (null)}
              </View>
            </Dialog.Content>

            <Dialog.Actions>
              <Button onPress={closeDialog}>Close</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default Settings;

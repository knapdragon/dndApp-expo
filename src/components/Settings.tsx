import React, { useState } from 'react';
import { View, Modal as RNModal } from 'react-native';
import { Button, Dialog, Modal, Portal, PaperProvider, Text, Switch } from 'react-native-paper';
import styles from '../styles.tsx';

interface Props {
  tabOrigin: string;
  enabled: boolean;
  closeDialog: () => void;
}

const Settings: React.FC<Props> = ({ tabOrigin, enabled, closeDialog }) => {
  const additionalSettingsType = tabOrigin;

  const [devTest, toggleDevTest] = useState(false); // tests if switch works
  const settingsOptions = [devTest];

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Portal>
          <Modal visible={true}>
            <RNModal transparent={true}>
              <Dialog visible={enabled} onDismiss={() => closeDialog} style={styles.dialog}>
                <Dialog.Title>Settings</Dialog.Title>

                <Dialog.Content>
                  <View style={[{display: 'flex'}, {flexDirection: 'row'}, {flexWrap: 'wrap'}, ]}>
                    <Text>Test Switch</Text>
                    <Switch value={devTest} onValueChange={() => toggleDevTest(!devTest)} /> 
                    {/* onValueChange: toggle the switch */}
                  </View>
                </Dialog.Content>

                <Dialog.Actions>
                  <Button onPress={closeDialog}>Close</Button>
                </Dialog.Actions>
              </Dialog>
            </RNModal>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default Settings;

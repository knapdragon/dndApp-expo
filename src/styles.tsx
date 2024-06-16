import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // General purpose
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  frame: {
    marginTop: -10,
  },

  title: {
    marginTop: 28,
    marginLeft: 15,
    textAlign: 'left',
    fontSize: 24,
    color: "#000",
  },

  text: {
    fontSize: 20,
  },

  menu: {
    left: 330,
    top: -30,
    alignItems: 'center',
    backgroundColor: '#ddd',
    width: 60,
  },

  menuItem: {
    textAlign: 'center', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainMenu: {
    top: -49,
    left: 310,
  },

  dialog: {
    justifyContent: 'center',
  },

  newMenu: {
    left: 230,
  },

  // Home
  HomeGrid: {
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'center',
  },

  GridItem: {
    backgroundColor: '#ccc',
    padding: 10,
    margin: 30,
    flex: 1,
    justifyContent: 'center',
  },

  // Sheets
  listItem: {
    padding: 15,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  // Notes
  card: {
    backgroundColor: '#eee',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 0,
  },

  // Groups
  modalText: {
      flex: 0,
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
    },

  // DiceRoller.tsx
  item: {
    flex: 1,
    alignItems: 'center'
  },

  button: {
    padding: 10,
    borderRadius: 10,
  },

});

export default styles;
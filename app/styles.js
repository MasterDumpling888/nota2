import { StyleSheet, Dimensions } from 'react-native';
import { getFontSize } from './responsiveFont';

const PAGE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    gap: 10
  },
  subcontainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 25,
    marginTop: 50,
  },
  nav: {
    headerShown: false,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: getFontSize(18),
    },
  },

  cell: {
    color: 'black',
    backgroundColor: '#181818',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    height: PAGE_WIDTH / 3,
    marginBottom: 15,
  },
  textCell: {
    color: 'black',
    width: '100%',
    padding: getFontSize(5),
    backgroundColor: '#FFED63',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: getFontSize(18),
    flexDirection: 'row',
  },
  img: {
    overflow: 'hidden',
    width: '100%',
    height: PAGE_WIDTH / 3,
    resizeMode: 'cover',
    position: 'absolute',
    borderRadius: 10,
  },
  h1Text: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
  body: {
    fontSize: getFontSize(12),
    color: 'black',
  },
  bodyBold: {
    fontSize: getFontSize(12),
    fontWeight: 'bold',
    color: 'black',
  },
  bodySmall: {
    fontSize: getFontSize(10),
    color: 'black',
  },
  menuHeader: {
    position: 'relative',
    width: '100%',
    height: PAGE_WIDTH / 2,
  },
  menuHeaderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  menuCategory: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#FFED63',
  },
  menuButton: {
    padding: 10,
    borderRadius: 5,
  },
  menuButtonSelected: {
    backgroundColor: '#434343a0',
  },
  menuButtonText: {
    color: '#434343',
    fontSize: getFontSize(14),
  },
  menuButtonTextSelected: {
    color: '#FFED63',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 24,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  noteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noteTitle: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: getFontSize(14),
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  questionContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#32FB0A',
    borderRadius: 5,
  },
  answerInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#32FB0A',
    borderRadius: 5,
  },
  revealButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#32FB0A',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  revealButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  answerText: {
    marginTop: 10,
    color: 'black',
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#32FB0A',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;

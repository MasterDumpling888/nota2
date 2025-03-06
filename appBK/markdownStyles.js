import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getFontSize } from './responsiveFont';

const markdownStyles = {
  body: {
    color: 'white',
    fontSize: getFontSize(16),
    textAlign: 'auto',
  },
  strong: {
    color: 'white',
    fontFamily: 'Raleway-Bold',
    textAlign: 'left',
  },
  em: {
    color: 'white',
    fontFamily: 'Raleway-Italic',
    textAlign: 'left',
  },
  heading1: {
    color: 'white',
    fontSize: getFontSize(24),
    fontFamily: 'Raleway-Bold',
  },
  heading2: {
    color: 'white',
    fontSize: getFontSize(20),
    fontFamily: 'Raleway-Bold',
  },
  heading3: {
    color: 'white',
    fontSize: getFontSize(18),
    fontFamily: 'Raleway-Bold',
  },
  heading4: {
    color: 'white',
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-Bold',
  },
  heading5: {
    color: 'white',
    fontSize: getFontSize(14),
    fontFamily: 'Raleway-Bold',
  },
  heading6: {
    color: 'white',
    fontSize: getFontSize(12),
    fontFamily: 'Raleway-Bold',
  },
  paragraph: {
    color: 'white',
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-Regular',
  },
  link: {
    color: '#33FD0A',
  },

  list_item: {
    color: 'white',
    fontSize: getFontSize(14),
    fontFamily: 'Raleway-Regular',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bullet_list_icon: {
    marginLeft: getFontSize(3),
    marginRight: getFontSize(3),
  },
  ordered_list_icon: {
    marginLeft: getFontSize(3),
    marginRight: getFontSize(3),
  },
  blockquote: {
    color: 'white',
    fontSize: getFontSize(16),
    fontFamily: 'Raleway-Italic',
    backgroundColor: '#646464',
    borderLeftWidth: 4,
    borderLeftColor: '#33FD0A',
    paddingLeft: 10,
    marginVertical: 10,
    textAlign: 'left',
  },
  fence: {
    backgroundColor: '#646464',
    color: '#33FD0A',
    fontSize: getFontSize(16),
    fontFamily: 'Courier',
    padding: 10,
    borderRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#33FD0A',
    borderColor: '#33FD0A',
    marginVertical: 10,
  },
  code_inline: {
    backgroundColor: '#646464',
    color: '#33FD0A',
    fontSize: getFontSize(16),
    fontFamily: 'Courier',
  },
  table: {
    borderWidth: 1,
    borderColor: '#33FD0A',
    borderRadius: 3,
    marginVertical: 10,
  },
  thead: {
    backgroundColor: '#33FD0A',
    color: 'black',
  },
  tbody: {
    fontSize: getFontSize(12),
    fontFamily: 'Raleway-Regular',
  },
  th: {
    flex: 1,
    padding: 5,
    color: 'white',
    fontFamily: 'Raleway-Bold',
    borderWidth: 1,
    borderColor: '#33FD0A',
  },
  tr: {
    borderBottomWidth: 1,
    borderColor: '#33FD0A',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 5,
    color: 'white',
    fontFamily: 'Raleway-Regular',
    borderWidth: 1,
    borderColor: '#33FD0A',
  },
};

export default markdownStyles;

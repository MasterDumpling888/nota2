import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import Markdown from 'react-native-markdown-display';

const markdownGuideContent = `
# Markdown Guide

## Headers
# H1
## H2
### H3
#### H4
##### H5
###### H6

## Emphasis
*Italic*  
**Bold**  
***Bold Italic***

## Lists
### Unordered
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

### Ordered
1. Item 1
2. Item 2
   1. Subitem 1
   2. Subitem 2

## Links
[Google](https://www.google.com)

## Images
![Alt text](https://via.placeholder.com/150)

## Blockquotes
> This is a blockquote.

## Code
\`Inline code\`

\`\`\`
Block code
\`\`\`

## Tables
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;

function MarkdownGuide({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageBox title="Markdown Guide" onClose={() => navigation.goBack()}>
        <ScrollView style={styles.container}>
          <Markdown>{markdownGuideContent}</Markdown>
        </ScrollView>
      </PageBox>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default MarkdownGuide;

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageBox from '../components/PageBox';
import MarkdownCard from '../components/MarkdownCard';

const markdownGuides = [
  {
    title: 'Headers',
    markdown: `
# H1
## H2
### H3
#### H4
##### H5
###### H6
    `,
  },
  {
    title: 'Emphasis & Strong',
    markdown: `
*Italic*
**Bold**
***Bold Italic***
`,
  },
  {
    title: 'Lists',
    markdown: `
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
`,
  },
  {
    title: 'Links',
    markdown: `
[Google](https://www.google.com)
    `,
  },
  {
    title: 'Images',
    markdown: `
![Alt text](https://via.placeholder.com/150)
    `,
  },
  {
    title: 'Blockquotes',
    markdown: `
> This is a blockquote.
    `,
  },
  {
    title: 'Code',
    markdown: `
\`Inline code\`

\`\`\`
Block code
\`\`\`
    `,
  },
  {
    title: 'Tables',
    markdown: `
| Month    | Savings |
|----------|---------|
| January  | $250    |
| February | $80     |
| March    | $420    |
    `,
  },
];

function MarkdownGuide({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <PageBox title="Markdown Guide" onClose={() => navigation.goBack()}>
        <ScrollView>
          {markdownGuides.map((guide, index) => (
            <MarkdownCard key={index} title={guide.title} markdown={guide.markdown} />
          ))}
        </ScrollView>
      </PageBox>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
  },
});

export default MarkdownGuide;

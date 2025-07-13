import React, { useState } from 'react';
import {
  Text,
  Heading,
  Paragraph,
  Button,
  Input,
  Container,
  Loader,
  Divider,
} from './index';

const BaseComponentsExample: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonPress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container scrollable padding="medium" keyboardAvoidingView={true} keyboardAvoidingViewBehavior='padding'>
      {/* Headings */}
      <Heading level={1} color="primary">Base Components Example</Heading>
      <Heading level={2} color="secondary">Typography</Heading>
      
      {/* Text Examples */}
      <Text variant="body1" color="primary">
        This is a body1 text with primary color.
      </Text>
      <Text variant="body2" color="secondary">
        This is a body2 text with secondary color.
      </Text>
      <Text variant="caption" color="tertiary">
        This is a caption text with tertiary color.
      </Text>
      
      <Divider margin="medium" />
      
      {/* Paragraph with see more */}
      <Heading level={3}>Paragraph with See More</Heading>
      <Paragraph
        variant="body1"
        showSeeMore
        numberOfLines={2}
      >
        This is a long paragraph that demonstrates the see more functionality. 
        It will be truncated after two lines and show a "See more" button. 
        When clicked, it will expand to show the full text and change to "See less".
        This is useful for displaying long content in a compact way.
      </Paragraph>
      
      <Divider margin="medium" />
      
      {/* Buttons */}
      <Heading level={3}>Buttons</Heading>
      <Button
        variant="contained"
        color="primary"
        onPress={handleButtonPress}
        style={{ marginBottom: 12 }}
      >
        Contained Primary Button
      </Button>
      
      <Button
        variant="outlined"
        color="secondary"
        onPress={() => {}}
        style={{ marginBottom: 12 }}
      >
        Outlined Secondary Button
      </Button>
      
      <Button
        variant="text"
        color="success"
        onPress={() => {}}
        style={{ marginBottom: 12 }}
      >
        Text Success Button
      </Button>
      
      <Button
        variant="contained"
        color="primary"
        loading={loading}
        onPress={handleButtonPress}
        style={{ marginBottom: 12 }}
      >
        Loading Button
      </Button>
      
      <Divider margin="medium" />
      
      {/* Inputs */}
      <Heading level={3}>Inputs</Heading>
      <Input
        label="Outlined Input"
        placeholder="Enter text here"
        value={inputValue}
        onChangeText={setInputValue}
        variant="outlined"
        style={{ marginBottom: 12 }}
      />
      
      <Input
        label="Filled Input with Error"
        placeholder="This input has an error"
        variant="filled"
        error="This field is required"
        style={{ marginBottom: 12 }}
      />
      
      <Input
        label="Standard Input"
        placeholder="Standard variant"
        variant="standard"
        helperText="This is helper text"
        style={{ marginBottom: 12 }}
      />
      
      <Divider margin="medium" />
      
      {/* Loaders */}
      <Heading level={3}>Loaders</Heading>
      <Container variant="card" padding="medium" style={{ marginBottom: 12 }}>
        <Loader size="small" color="primary" text="Loading..." />
      </Container>
      
      <Container variant="card" padding="medium" style={{ marginBottom: 12 }}>
        <Loader size="large" color="secondary" text="Processing..." />
      </Container>
      
      <Divider margin="medium" />
      
      {/* Dividers */}
      <Heading level={3}>Dividers</Heading>
      <Text variant="body2">Above the divider</Text>
      <Divider variant="solid" margin="small" />
      <Text variant="body2">Below the divider</Text>
      
      <Divider variant="dashed" margin="medium" />
      
      <Divider
        variant="solid"
        margin="medium"
        text="Or"
        textPosition="center"
      />
      
      <Divider margin="medium" />
      
      {/* Container Variants */}
      <Heading level={3}>Container Variants</Heading>
      <Container variant="card" padding="medium" style={{ marginBottom: 12 }}>
        <Text variant="body2">Card Container</Text>
      </Container>
      
      <Container variant="elevated" padding="medium" style={{ marginBottom: 12 }}>
        <Text variant="body2">Elevated Container</Text>
      </Container>
      
      <Container variant="outlined" padding="medium" style={{ marginBottom: 12 }}>
        <Text variant="body2">Outlined Container</Text>
      </Container>
    </Container>
  );
};

export default BaseComponentsExample; 
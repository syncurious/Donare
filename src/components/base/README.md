# Base Components

This directory contains the foundational components for the Donare app. All components are built with proper TypeScript support, theme integration, and follow consistent design patterns.

## Components Overview

### 1. Text
The base text component that extends React Native's Text with theme integration and typography variants.

```tsx
import { Text } from '../base';

<Text variant="body1" color="primary">
  Hello World
</Text>
```

**Props:**
- `variant`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'button' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2' | 'inherit'
- `color`: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'success' | 'warning' | 'error' | 'muted' | 'disabled'
- `style`: Custom styles
- All React Native Text props

### 2. Heading
A specialized text component for headings that uses the Text component internally.

```tsx
import { Heading } from '../base';

<Heading level={1} color="primary">
  Main Title
</Heading>
```

**Props:**
- `level`: 1 | 2 | 3 | 4 | 5 | 6
- `color`: TextColor
- `style`: Custom styles
- `numberOfLines`: Number of lines to show
- All React Native Text props

### 3. Paragraph
A text component with built-in "see more" functionality.

```tsx
import { Paragraph } from '../base';

<Paragraph
  variant="body1"
  showSeeMore
  numberOfLines={2}
>
  Long text content...
</Paragraph>
```

**Props:**
- `variant`: TextVariant
- `color`: TextColor
- `showSeeMore`: boolean
- `numberOfLines`: number (default: 2)
- `seeMoreText`: string (default: "See more")
- `seeLessText`: string (default: "See less")
- All React Native Text props

### 4. Button
A versatile button component with multiple variants and states.

```tsx
import { Button } from '../base';

<Button
  variant="contained"
  color="primary"
  onPress={() => {}}
  loading={false}
>
  Click Me
</Button>
```

**Props:**
- `variant`: 'contained' | 'outlined' | 'text'
- `size`: 'small' | 'medium' | 'large'
- `color`: TextColor
- `loading`: boolean
- `disabled`: boolean
- `prefixIcon`: ImageSourcePropType
- `suffixIcon`: ImageSourcePropType
- `iconPosition`: 'left' | 'right'
- `fullWidth`: boolean
- `onPress`: () => void
- All TouchableOpacity props

### 5. Input
A comprehensive input component with validation, icons, and multiple variants.

```tsx
import { Input } from '../base';

<Input
  label="Email"
  placeholder="Enter your email"
  variant="outlined"
  error="Invalid email"
  onChangeText={setEmail}
/>
```

**Props:**
- `variant`: 'outlined' | 'filled' | 'standard'
- `size`: 'small' | 'medium' | 'large'
- `color`: TextColor
- `label`: string
- `placeholder`: string
- `error`: string
- `helperText`: string
- `prefixIcon`: ImageSourcePropType
- `suffixIcon`: ImageSourcePropType
- `iconPosition`: 'left' | 'right'
- `required`: boolean
- `disabled`: boolean
- `multiline`: boolean
- `secureTextEntry`: boolean
- All TextInput props

### 6. Container
A flexible container component that can be scrollable and has multiple variants.

```tsx
import { Container } from '../base';

<Container
  variant="card"
  scrollable
  padding="medium"
  refreshControl
  onRefresh={handleRefresh}
>
  Content here
</Container>
```

**Props:**
- `variant`: 'default' | 'card' | 'elevated' | 'outlined'
- `scrollable`: boolean
- `horizontal`: boolean
- `refreshControl`: boolean
- `onRefresh`: () => void
- `refreshing`: boolean
- `padding`: number | 'none' | 'small' | 'medium' | 'large'
- `margin`: number | 'none' | 'small' | 'medium' | 'large'
- `backgroundColor`: string
- `borderRadius`: number
- `elevation`: number
- All View/ScrollView props

### 7. Loader
A loading indicator component with multiple variants.

```tsx
import { Loader } from '../base';

<Loader
  size="large"
  variant="overlay"
  color="primary"
  text="Loading..."
/>
```

**Props:**
- `size`: 'small' | 'large'
- `variant`: 'default' | 'overlay' | 'inline'
- `color`: TextColor
- `text`: string
- `textColor`: TextColor
- `overlayColor`: string
- `overlayOpacity`: number
- All ActivityIndicator props

### 8. Divider
A divider component with multiple styles and text support.

```tsx
import { Divider } from '../base';

<Divider
  variant="solid"
  orientation="horizontal"
  text="Or"
  margin="medium"
/>
```

**Props:**
- `variant`: 'solid' | 'dashed' | 'dotted'
- `orientation`: 'horizontal' | 'vertical'
- `color`: string
- `thickness`: number
- `margin`: number | 'none' | 'small' | 'medium' | 'large'
- `text`: string
- `textPosition`: 'left' | 'center' | 'right'
- All View props

## Usage Examples

### Basic Form
```tsx
import {
  Container,
  Heading,
  Input,
  Button,
  Divider,
} from '../base';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container padding="large">
      <Heading level={1}>Login</Heading>
      
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        variant="contained"
        color="primary"
        onPress={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
};
```

### Card Layout
```tsx
import {
  Container,
  Heading,
  Text,
  Button,
  Divider,
} from '../base';

const ProductCard = ({ product }) => {
  return (
    <Container variant="card" padding="medium">
      <Heading level={3}>{product.name}</Heading>
      <Text variant="body2" color="secondary">
        {product.description}
      </Text>
      
      <Divider margin="small" />
      
      <Text variant="h4" color="primary">
        ${product.price}
      </Text>
      
      <Button
        variant="contained"
        color="primary"
        onPress={() => handleAddToCart(product)}
      >
        Add to Cart
      </Button>
    </Container>
  );
};
```

## Theme Integration

All components automatically use the app's theme system. Colors, spacing, and typography are consistent across the entire application.

## TypeScript Support

All components include full TypeScript support with proper type definitions for props and variants.

## Best Practices

1. **Use semantic variants**: Choose appropriate text variants (h1-h6 for headings, body1/body2 for content)
2. **Consistent spacing**: Use the predefined spacing values ('small', 'medium', 'large')
3. **Color consistency**: Use theme colors instead of hardcoded values
4. **Accessibility**: All components support accessibility props from React Native
5. **Performance**: Components are optimized for performance with proper memoization where needed

## Extending Components

When creating new components, follow these patterns:
- Use the base Text component for all text rendering
- Extend React Native components with proper prop spreading
- Integrate with the theme system
- Provide TypeScript types for all props
- Include proper default values
- Support all relevant React Native props 
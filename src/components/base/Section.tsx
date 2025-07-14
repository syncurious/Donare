import React, { ReactElement, ReactNode } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Heading from './Heading';
import Text from './Text';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode[];
  autoCarousel?: boolean;
  style?: any;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  autoCarousel = false,
  style,
}) => {
  // Normalize children to an array of ReactElements
  const childArray = React.Children.toArray(children).filter(Boolean) as ReactElement[];

  return (
    <View style={[styles.container, style]}>
      {title ? <Heading level={4} style={styles.title}>{title}</Heading> : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {autoCarousel ? (
        <FlatList
          data={childArray}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => {
            if (React.isValidElement(item) && 'style' in (item.props as any)) {
              const el = item as React.ReactElement<any>;
              return React.cloneElement(el, {
                style: [
                  el.props.style,
                  { marginRight: index === childArray.length - 1 ? 0 : 12 },
                ],
              });
            }
            if (React.isValidElement(item)) {
              return React.cloneElement(item, {});
            }
            return null;
          }}
          contentContainerStyle={styles.carousel}
        />
      ) : (
        <View style={styles.children}>{childArray}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  title: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
    color: '#888',
  },
  carousel: {
    paddingVertical: 8,
    paddingRight: 12,
  },
  children: {
    gap: 12,
  },
});

export default Section;

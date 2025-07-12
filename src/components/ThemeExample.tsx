import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme, getResponsiveFontSize, getResponsiveSpacing } from '../config/theme';

const ThemeExample: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Theme System Demo
        </Text>
        <TouchableOpacity 
          style={[styles.themeToggle, { backgroundColor: theme.colors.primary[500] }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.themeToggleText, { color: theme.colors.text.inverse }]}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Color Palette */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Color Palette
        </Text>
        
        {/* Primary Colors */}
        <View style={styles.colorRow}>
          <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
            Primary:
          </Text>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primary[500] }]} />
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primary[600] }]} />
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.primary[700] }]} />
        </View>

        {/* Success Colors */}
        <View style={styles.colorRow}>
          <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
            Success:
          </Text>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.success[500] }]} />
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.success[600] }]} />
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.success[700] }]} />
        </View>

        {/* Error Colors */}
        <View style={styles.colorRow}>
          <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
            Error:
          </Text>
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.error[500] }]} />
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.error[600] }]} />
          <View style={[styles.colorSwatch, { backgroundColor: theme.colors.error[700] }]} />
        </View>
      </View>

      {/* Typography */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Typography
        </Text>
        
        <Text style={[styles.textExample, { 
          fontSize: getResponsiveFontSize('xs'),
          color: theme.colors.text.tertiary 
        }]}>
          Extra Small Text (xs)
        </Text>
        
        <Text style={[styles.textExample, { 
          fontSize: getResponsiveFontSize('sm'),
          color: theme.colors.text.secondary 
        }]}>
          Small Text (sm)
        </Text>
        
        <Text style={[styles.textExample, { 
          fontSize: getResponsiveFontSize('base'),
          color: theme.colors.text.primary 
        }]}>
          Base Text (base)
        </Text>
        
        <Text style={[styles.textExample, { 
          fontSize: getResponsiveFontSize('lg'),
          color: theme.colors.text.primary 
        }]}>
          Large Text (lg)
        </Text>
        
        <Text style={[styles.textExample, { 
          fontSize: getResponsiveFontSize('xl'),
          color: theme.colors.text.primary 
        }]}>
          Extra Large Text (xl)
        </Text>
        
        <Text style={[styles.textExample, { 
          fontSize: getResponsiveFontSize('2xl'),
          color: theme.colors.text.primary 
        }]}>
          Heading 2XL (2xl)
        </Text>
      </View>

      {/* Spacing */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Spacing Examples
        </Text>
        
        <View style={[styles.spacingExample, { 
          marginVertical: getResponsiveSpacing(2),
          padding: getResponsiveSpacing(4),
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.primary,
        }]}>
          <Text style={[styles.spacingText, { color: theme.colors.text.secondary }]}>
            Spacing 2 (margin) + 4 (padding)
          </Text>
        </View>
        
        <View style={[styles.spacingExample, { 
          marginVertical: getResponsiveSpacing(4),
          padding: getResponsiveSpacing(6),
          backgroundColor: theme.colors.background.tertiary,
          borderColor: theme.colors.border.secondary,
        }]}>
          <Text style={[styles.spacingText, { color: theme.colors.text.secondary }]}>
            Spacing 4 (margin) + 6 (padding)
          </Text>
        </View>
      </View>

      {/* Border Radius */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Border Radius Examples
        </Text>
        
        <View style={styles.borderRadiusRow}>
          <View style={[styles.borderRadiusExample, { 
            borderRadius: theme.borderRadius.sm,
            backgroundColor: theme.colors.primary[500] 
          }]}>
            <Text style={[styles.borderRadiusText, { color: theme.colors.text.inverse }]}>
              sm
            </Text>
          </View>
          
          <View style={[styles.borderRadiusExample, { 
            borderRadius: theme.borderRadius.base,
            backgroundColor: theme.colors.success[500] 
          }]}>
            <Text style={[styles.borderRadiusText, { color: theme.colors.text.inverse }]}>
              base
            </Text>
          </View>
          
          <View style={[styles.borderRadiusExample, { 
            borderRadius: theme.borderRadius.lg,
            backgroundColor: theme.colors.warning[500] 
          }]}>
            <Text style={[styles.borderRadiusText, { color: theme.colors.text.inverse }]}>
              lg
            </Text>
          </View>
          
          <View style={[styles.borderRadiusExample, { 
            borderRadius: theme.borderRadius.xl,
            backgroundColor: theme.colors.error[500] 
          }]}>
            <Text style={[styles.borderRadiusText, { color: theme.colors.text.inverse }]}>
              xl
            </Text>
          </View>
        </View>
      </View>

      {/* Device Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Device Information
        </Text>
        
        <Text style={[styles.deviceInfo, { color: theme.colors.text.secondary }]}>
          Screen Width: {theme.screenDimensions.width}px
        </Text>
        <Text style={[styles.deviceInfo, { color: theme.colors.text.secondary }]}>
          Screen Height: {theme.screenDimensions.height}px
        </Text>
        <Text style={[styles.deviceInfo, { color: theme.colors.text.secondary }]}>
          Device Type: {
            theme.screenDimensions.isSmallDevice ? 'Small' :
            theme.screenDimensions.isMediumDevice ? 'Medium' : 'Large'
          }
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeToggle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorLabel: {
    fontSize: 14,
    width: 60,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 4,
    marginRight: 8,
  },
  textExample: {
    marginBottom: 8,
    fontFamily: 'System',
  },
  spacingExample: {
    borderWidth: 1,
    borderRadius: 8,
  },
  spacingText: {
    fontSize: 14,
    textAlign: 'center',
  },
  borderRadiusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  borderRadiusExample: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRadiusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deviceInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default ThemeExample; 
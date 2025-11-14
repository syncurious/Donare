import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Container from '../base/Container';
import Input from '../base/Input';
import Button from '../base/Button';
import Heading from '../base/Heading';
import Paragraph from '../base/Paragraph';
import CheckBox from '../base/CheckBox';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RejisterVolunteer } from '../../service/handler';
import { showToast } from '../../utils/toast';
import theme from '../../config/theme';

interface VolunteerFormProps {
  onSubmit?: (data: {
    full_name: string;
    email: string;
    phone: string;
    on_week_days: string;
    on_week_ends: string;
    skills: string;
    message: string;
  }) => void;
}

const VolunteerForm = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    on_week_days: '',
    on_week_ends: '',
    skills: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.full_name ||
      !form.email ||
      !form.phone ||
      !form.on_week_days ||
      !form.on_week_ends
    ) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const response = (await RejisterVolunteer(form)) as any;

      if (response?.data?.message) {
        showToast('success', 'Volunteer application submitted successfully!');
        setTimeout(() => {
          navigation.navigate('BottomTabs');
        }, 1500);
      } else {
        showToast(
          'error',
          response?.data?.message ||
            'Failed to submit volunteer application. Please try again.',
        );
      }
    } catch (err: any) {
      showToast(
        'error',
        err?.data?.error?.message ||
          'Network error. Please check your connection and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container scrollable contentContainerStyle={styles.root} padding="small">
      <Heading level={2} style={styles.heading}>
        Volunteer Application
      </Heading>
      <Paragraph color="secondary" style={styles.subheading}>
        Fill out the form below to apply for our volunteer program. We will
        contact you soon!
      </Paragraph>
      <View style={styles.formContainer}>
        <Input
          label="Full Name"
          placeholder="Enter your name"
          value={form.full_name}
          onChangeText={value => handleChange('full_name', value)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
          autoCapitalize="words"
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={value => handleChange('email', value)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Phone Number"
          placeholder="Enter your phone number"
          value={form.phone}
          onChangeText={value => handleChange('phone', value)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
          keyboardType="phone-pad"
          maxLength={11}
        />
        <View style={styles.radioGroup}>
          <Paragraph
            variant="caption"
            color="secondary"
            style={styles.radioGroupLabel}
          >
            Week Days Availability *
          </Paragraph>
          <View style={styles.radioOptions}>
            <CheckBox
              checked={form.on_week_days === 'AVAILABLE'}
              onPress={() => handleChange('on_week_days', 'AVAILABLE')}
              label="Available"
              style={styles.radioOption}
            />
            <CheckBox
              checked={form.on_week_days === 'NOT_AVAILABLE'}
              onPress={() => handleChange('on_week_days', 'NOT_AVAILABLE')}
              label="Not Available"
              style={styles.radioOption}
            />
          </View>
        </View>

        <View style={styles.radioGroup}>
          <Paragraph
            variant="caption"
            color="secondary"
            style={styles.radioGroupLabel}
          >
            Weekends Availability *
          </Paragraph>
          <View style={styles.radioOptions}>
            <CheckBox
              checked={form.on_week_ends === 'AVAILABLE'}
              onPress={() => handleChange('on_week_ends', 'AVAILABLE')}
              label="Available"
              style={styles.radioOption}
            />
            <CheckBox
              checked={form.on_week_ends === 'NOT_AVAILABLE'}
              onPress={() => handleChange('on_week_ends', 'NOT_AVAILABLE')}
              label="Not Available"
              style={styles.radioOption}
            />
          </View>
        </View>

        <Input
          label="Skills / Interests"
          placeholder="e.g. Teaching, Fundraising, Medical, etc."
          value={form.skills}
          onChangeText={value => handleChange('skills', value)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
        />
        <Input
          label="Message"
          placeholder="Tell us why you want to volunteer"
          value={form.message}
          onChangeText={value => handleChange('message', value)}
          variant="outlined"
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
          multiline
          numberOfLines={4}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          style={styles.submitButton}
          onPress={handleSubmit}
          loading={loading}
        >
          Submit Application
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 36,
    marginTop: 12,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  subheading: {
    marginBottom: 24,
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: theme.colors.text.secondary,
  },
  formContainer: {
    width: '100%',
    gap: 12,
  },
  input: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
  },
  radioGroup: {
    marginBottom: 16,
  },
  radioGroupLabel: {
    marginBottom: 8,
    fontWeight: '600',
    color: theme.colors.text.secondary,
  },
  radioOptions: {
    flexDirection: 'row',
    gap: 24,
  },
  radioOption: {
    flex: 1,
  },
  submitButton: {
    width: '100%',
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: theme.colors.primary[500],
  },
});

export default VolunteerForm;

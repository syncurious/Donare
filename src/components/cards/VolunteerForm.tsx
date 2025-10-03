import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Container from '../base/Container';
import Input from '../base/Input';
import Button from '../base/Button';
import Heading from '../base/Heading';
import Paragraph from '../base/Paragraph';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface VolunteerFormProps {
  onSubmit?: (data: {
    name: string;
    email: string;
    phone: string;
    skills: string;
    message: string;
  }) => void;
}

const VolunteerForm: React.FC<VolunteerFormProps> = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setError('');
    setSuccess(false);
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onSubmit?.(form);
      navigation.navigate('BottomTabs');
    }, 1200);
  };

  return (
    <Container scrollable padding="large" style={styles.container}>
      <Heading level={2} style={styles.heading}>
        Volunteer Application
      </Heading>
      <Paragraph color="muted" style={styles.subheading}>
        Fill out the form below to apply for our volunteer program. We will
        contact you soon!
      </Paragraph>
      <Input
        label="Full Name"
        placeholder="Enter your name"
        value={form.name}
        onChangeText={value => handleChange('name', value)}
        required
        style={styles.input}
      />
      <Input
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        onChangeText={value => handleChange('email', value)}
        keyboardType="email-address"
        required
        style={styles.input}
      />
      <Input
        label="Phone Number"
        placeholder="Enter your phone number"
        value={form.phone}
        onChangeText={value => handleChange('phone', value)}
        keyboardType="phone-pad"
        required
        style={styles.input}
      />
      <Input
        label="Skills / Interests"
        placeholder="e.g. Teaching, Fundraising, Medical, etc."
        value={form.skills}
        onChangeText={value => handleChange('skills', value)}
        style={styles.input}
      />
      <Input
        label="Message"
        placeholder="Tell us why you want to volunteer"
        value={form.message}
        onChangeText={value => handleChange('message', value)}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      {error ? (
        <Paragraph color="error" style={styles.error}>
          {error}
        </Paragraph>
      ) : null}
      {success ? (
        <Paragraph color="success" style={styles.success}>
          Thank you for applying! We will be in touch soon.
        </Paragraph>
      ) : null}
      <Button onPress={handleSubmit} loading={loading} style={styles.button}>
        Submit Application
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  heading: {
    marginBottom: 8,
    textAlign: 'left',
  },
  subheading: {
    marginBottom: 16,
    textAlign: 'left',
  },
  input: {
    marginBottom: 14,
  },
  button: {
    marginTop: 16,
    borderRadius: 30,
  },
  error: {
    marginBottom: 8,
  },
  success: {
    marginBottom: 8,
  },
});

export default VolunteerForm;

import React, { useState } from 'react';
import Container from '../../components/base/Container';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';

const RequestHelp = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    details: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setError('');
    setSuccess(false);
    if (!form.name || !form.contact || !form.address || !form.details) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', contact: '', address: '', details: '' });
    }, 1200);
  };

  return (
    <Container scrollable padding="large" style={{ flex: 1, borderRadius: 16, backgroundColor: '#fff' }}>
      <Heading level={2} style={{ marginBottom: 8, textAlign: 'center' }}>
        Request Help
      </Heading>
      <Paragraph color="muted" style={{ marginBottom: 16, textAlign: 'center' }}>
        Submit Your Request
      </Paragraph>
      <Paragraph color="muted" style={{ marginBottom: 24, textAlign: 'center' }}>
        Please provide detailed information about your situation. A volunteer will contact you personally to discuss your request.
      </Paragraph>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={value => handleChange('name', value)}
        required
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Contact Number"
        placeholder="Enter your contact number"
        value={form.contact}
        onChangeText={value => handleChange('contact', value)}
        required
        keyboardType="phone-pad"
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Address"
        placeholder="Enter your address"
        value={form.address}
        onChangeText={value => handleChange('address', value)}
        required
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Detailed Request"
        placeholder="Describe your situation in detail"
        value={form.details}
        onChangeText={value => handleChange('details', value)}
        required
        multiline
        numberOfLines={4}
        style={{ marginBottom: 14 }}
      />
      {error ? (
        <Paragraph color="error" style={{ marginBottom: 8 }}>
          {error}
        </Paragraph>
      ) : null}
      {success ? (
        <Paragraph color="success" style={{ marginBottom: 8 }}>
          Thank you for your request! A volunteer will contact you soon.
        </Paragraph>
      ) : null}
      <Button onPress={handleSubmit} loading={loading} style={{ marginTop: 16, borderRadius: 30 }}>
        Submit Request
      </Button>
    </Container>
  );
};

export default RequestHelp; 
import React, { useState } from 'react';
import Container from '../../components/base/Container';
import Input from '../../components/base/Input';
import Button from '../../components/base/Button';
import Heading from '../../components/base/Heading';
import Paragraph from '../../components/base/Paragraph';
import { SubmitHelpRequest } from '../../service/handler';
import { showToast } from '../../utils/toast';

const RequestHelp = () => {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Pakistan',
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess(false);

    // Validate required fields
    if (
      !form.full_name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.description
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await SubmitHelpRequest(form);
      setSuccess(true);
      showToast('success', 'Help request submitted successfully!');
      // Reset form
      setForm({
        full_name: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'Pakistan',
        description: '',
      });
    } catch (error: any) {
      console.error('Help request error:', error);
      setError(
        error?.data?.error?.message ||
          'Failed to submit request. Please try again.',
      );
      showToast(
        'error',
        error?.data?.error?.message ||
          'Failed to submit request. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      scrollable
      padding="medium"
      style={{
        flex: 1,
        borderRadius: 16,
        backgroundColor: '#fff',
      }}
    >
      <Paragraph
        color="muted"
        style={{ marginBottom: 24, textAlign: 'center' }}
      >
        Please provide detailed information about your situation. A volunteer
        will contact you personally to discuss your request.
      </Paragraph>
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={form.full_name}
        onChangeText={value => handleChange('full_name', value)}
        required
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Phone Number"
        placeholder="+92 300 1234567"
        value={form.phone}
        onChangeText={value => handleChange('phone', value)}
        required
        keyboardType="phone-pad"
        style={{ marginBottom: 14 }}
        maxLength={12}
      />
      <Input
        label="Address"
        placeholder="House/Street address"
        value={form.address}
        onChangeText={value => handleChange('address', value)}
        required
        style={{ marginBottom: 14 }}
      />
      <Input
        label="City"
        placeholder="Enter your city"
        value={form.city}
        onChangeText={value => handleChange('city', value)}
        required
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Zip Code (Optional)"
        placeholder="Enter zip code"
        value={form.zipCode}
        onChangeText={value => handleChange('zipCode', value)}
        keyboardType="numeric"
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Country"
        placeholder="Enter country"
        value={form.country}
        onChangeText={value => handleChange('country', value)}
        required
        style={{ marginBottom: 14 }}
      />
      <Input
        label="Description of Need"
        placeholder="Describe your situation in detail"
        value={form.description}
        onChangeText={value => handleChange('description', value)}
        required
        multiline
        numberOfLines={4}
        style={{ marginBottom: 14 }}
      />
      {success ? (
        <Paragraph color="success" style={{ marginBottom: 8 }}>
          Thank you for your request! A volunteer will contact you soon.
        </Paragraph>
      ) : null}
      <Button
        onPress={handleSubmit}
        loading={loading}
        style={{ borderRadius: 30, marginBottom: 40 }}
      >
        Submit Request
      </Button>
    </Container>
  );
};

export default RequestHelp;

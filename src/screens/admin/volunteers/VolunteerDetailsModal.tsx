import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Container from '../../../components/base/Container';
import Heading from '../../../components/base/Heading';
import Text from '../../../components/base/Text';
import Button from '../../../components/base/Button';

interface VolunteerDetails {
  name: string;
  email: string;
  phone: string;
  joined: string;
  skills: string[];
  availability: { label: string; value: string }[];
}

interface VolunteerDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  volunteer: VolunteerDetails | null;
  onApprove: () => void;
  onReject: () => void;
}

const VolunteerDetailsModal: React.FC<VolunteerDetailsModalProps> = ({
  visible,
  onClose,
  volunteer,
  onApprove,
  onReject,
}) => {
  if (!volunteer) return null;
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Container variant="card" style={styles.modal}>
          <Heading level={3} style={styles.title}>Volunteer Details</Heading>
          <Text variant="h5" style={styles.name}>{volunteer.name}</Text>
          <Text variant="body2" color="secondary" style={styles.joined}>{volunteer.joined}</Text>

          <Heading level={5} style={styles.sectionTitle}>Skills</Heading>
          <View style={styles.skillsRow}>
            {volunteer.skills.map(skill => (
              <View key={skill} style={styles.skillBadge}>
                <Text variant="body2">{skill}</Text>
              </View>
            ))}
          </View>

          <Heading level={5} style={styles.sectionTitle}>Availability</Heading>
          <View style={styles.availabilityRow}>
            {volunteer.availability.map(avail => (
              <View key={avail.label} style={styles.availCol}>
                <Text variant="body2" color="secondary">{avail.label}</Text>
                <Text variant="body2">{avail.value}</Text>
              </View>
            ))}
          </View>

          <Heading level={5} style={styles.sectionTitle}>Contact Information</Heading>
          <View style={styles.contactRow}>
            <View style={styles.contactCol}>
              <Text variant="body2" color="secondary">Phone</Text>
              <Text variant="body2">{volunteer.phone}</Text>
            </View>
            <View style={styles.contactCol}>
              <Text variant="body2" color="secondary">Email</Text>
              <Text variant="body2">{volunteer.email}</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <Button style={styles.approveBtn} onPress={onApprove}>Approve</Button>
            <Button variant="outlined" style={styles.rejectBtn} onPress={onReject}>Reject</Button>
          </View>
          <Button variant="text" onPress={onClose} style={styles.closeBtn}>Close</Button>
        </Container>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 2,
    textAlign: 'center',
  },
  joined: {
    fontSize: 16,
    color: '#6B7582',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 4,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  skillBadge: {
    backgroundColor: '#F2F2F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  availabilityRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 8,
  },
  availCol: {
    alignItems: 'center',
    minWidth: 80,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  contactCol: {
    minWidth: 120,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  approveBtn: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#B2CCE5',
  },
  rejectBtn: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F5',
  },
  closeBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
});

export default VolunteerDetailsModal; 
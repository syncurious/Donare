import apiCaller from '.';

// Admin API endpoints
export const AdminEndpoints = {
  DASHBOARD: 'admin/dashboard',
  VOLUNTEERS: 'admin/volunteers',
  HELP_REQUESTS: 'admin/help-requests',
  DONATIONS: 'admin/donations',
  USERS: 'admin/users',
  APPROVE_VOLUNTEER: 'admin/volunteers/approve',
  REJECT_VOLUNTEER: 'admin/volunteers/reject',
  RESOLVE_HELP_REQUEST: 'admin/help-requests/resolve',
};

// TypeScript interfaces for admin API responses
export interface DonationAmountStats {
  totalAmount: number;
  averageAmount: number;
  minAmount: number;
  maxAmount: number;
}

export interface DonationByType {
  type: string;
  count: number;
  amount: number;
}

export interface RecentActivity {
  donations_last_7_days: number;
  volunteers_last_7_days: number;
  help_requests_last_7_days: number;
}

export interface AdminDashboardStats {
  total_donations_today: number;
  total_donations_all_time: number;
  volunteer_pending_count: number;
  volunteer_approved_count: number;
  help_request_pending_count: number;
  help_request_resolved_count: number;
  total_users: number;
  total_volunteers: number;
  total_help_requests: number;
  donations_amount_stats: DonationAmountStats;
  donations_by_type: DonationByType[];
  recent_activity: RecentActivity;
}

export interface AdminDashboardResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    stats: AdminDashboardStats;
  };
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
  skills?: string[];
  experience?: string;
}

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'rejected';
  requestDate: string;
  requesterName: string;
  requesterEmail: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

// Admin API functions
const GetDashboardStats = async (): Promise<AdminDashboardResponse> => {
  return await apiCaller('get', AdminEndpoints.DASHBOARD, undefined, undefined, false);
};

const GetVolunteers = async (): Promise<{ status: boolean; data: Volunteer[] }> => {
  return await apiCaller('get', AdminEndpoints.VOLUNTEERS, undefined, undefined, false);
};

const GetHelpRequests = async (): Promise<{ status: boolean; data: HelpRequest[] }> => {
  return await apiCaller('get', AdminEndpoints.HELP_REQUESTS, undefined, undefined, false);
};

const GetDonations = async (): Promise<{ status: boolean; data: any[] }> => {
  return await apiCaller('get', AdminEndpoints.DONATIONS, undefined, undefined, false);
};

const GetUsers = async (): Promise<{ status: boolean; data: any[] }> => {
  return await apiCaller('get', AdminEndpoints.USERS, undefined, undefined, false);
};

const ApproveVolunteer = async (volunteerId: string): Promise<{ status: boolean; message: string }> => {
  return await apiCaller('post', `${AdminEndpoints.APPROVE_VOLUNTEER}/${volunteerId}`, undefined, undefined, false);
};

const RejectVolunteer = async (volunteerId: string): Promise<{ status: boolean; message: string }> => {
  return await apiCaller('post', `${AdminEndpoints.REJECT_VOLUNTEER}/${volunteerId}`, undefined, undefined, false);
};

const ResolveHelpRequest = async (requestId: string): Promise<{ status: boolean; message: string }> => {
  return await apiCaller('post', `${AdminEndpoints.RESOLVE_HELP_REQUEST}/${requestId}`, undefined, undefined, false);
};

export {
  GetDashboardStats,
  GetVolunteers,
  GetHelpRequests,
  GetDonations,
  GetUsers,
  ApproveVolunteer,
  RejectVolunteer,
  ResolveHelpRequest,
};

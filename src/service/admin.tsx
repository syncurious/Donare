import apiCaller from '.';

// Admin API endpoints
export const AdminEndpoints = {
  DASHBOARD: 'admin/dashboard',
  VOLUNTEERS: 'admin/volunteer',
  HELP_REQUESTS: 'admin/help-requests',
  DONATIONS: 'admin/donations',
  USERS: 'admin/users',
  UPDATE_VOLUNTEER_STATUS: 'admin/volunteer',
  RESOLVE_HELP_REQUEST: 'admin/help-requests/resolve',
  UPDATE_HELP_REQUEST_STATUS: 'help-request/admin',
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
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  on_week_days: 'AVAILABLE' | 'NOT_AVAILABLE';
  on_week_ends: 'AVAILABLE' | 'NOT_AVAILABLE';
  skills: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

export interface VolunteersResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    volunteers: Volunteer[];
    total: number;
  };
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

const GetVolunteers = async (): Promise<VolunteersResponse> => {
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

const UpdateVolunteerStatus = async (
  volunteerId: string, 
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED'
): Promise<{ status: boolean; message: string }> => {
  return await apiCaller('patch', `${AdminEndpoints.UPDATE_VOLUNTEER_STATUS}/${volunteerId}`, { status }, undefined, false);
};

const ResolveHelpRequest = async (requestId: string): Promise<{ status: boolean; message: string }> => {
  return await apiCaller('post', `${AdminEndpoints.RESOLVE_HELP_REQUEST}/${requestId}`, undefined, undefined, false);
};

const UpdateHelpRequestStatus = async (
  requestId: string,
  status: 'APPROVED' | 'REJECTED'
): Promise<{ status: boolean; message: string }> => {
  return await apiCaller('post', `${AdminEndpoints.UPDATE_HELP_REQUEST_STATUS}/${requestId}`, { status }, undefined, false);
};

export {
  GetDashboardStats,
  GetVolunteers,
  GetHelpRequests,
  GetDonations,
  GetUsers,
  UpdateVolunteerStatus,
  ResolveHelpRequest,
  UpdateHelpRequestStatus,
};

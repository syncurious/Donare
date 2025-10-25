import apiCaller from './index';

export interface HelpRequest {
  id: string;
  status: 'PENDING' | 'RESOLVED';
  full_name: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  description: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export interface HelpRequestResponse {
  status: boolean;
  code: number;
  message: string;
  data: {
    help_requests: HelpRequest[];
    total: number;
  };
}

export interface HelpRequestDetailResponse {
  status: boolean;
  code: number;
  message: string;
  data: HelpRequest;
}

/**
 * Get all help requests
 */
export const getHelpRequests = async (): Promise<HelpRequestResponse> => {
  return apiCaller<HelpRequestResponse>('get', 'help-request');
};

/**
 * Get a single help request by ID
 */
export const getHelpRequestById = async (
  id: string,
): Promise<HelpRequestDetailResponse> => {
  return apiCaller<HelpRequestDetailResponse>('get', `help-request/${id}`);
};

/**
 * Create a new help request
 */
export const createHelpRequest = async (
  data: Partial<HelpRequest>,
): Promise<HelpRequestDetailResponse> => {
  return apiCaller<HelpRequestDetailResponse>('post', 'help-request', data);
};

/**
 * Update help request status
 */
export const updateHelpRequestStatus = async (
  id: string,
  status: 'PENDING' | 'RESOLVED',
): Promise<HelpRequestDetailResponse> => {
  return apiCaller<HelpRequestDetailResponse>('patch', `help-request/${id}`, {
    status,
  });
};

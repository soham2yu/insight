import { auth } from './firebase';

// Helper function to get Firebase ID token
async function getIdToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T | null; error: string | null }> {
  try {
    const token = await getIdToken();
    if (!token) {
      return { data: null, error: 'No authentication token available' };
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL || ''}/api${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { data: null, error: result.error || 'Request failed' };
    }

    return { data: result.data, error: null };
  } catch (error) {
    console.error('API request error:', error);
    return { data: null, error: 'Network error' };
  }
}

// User API functions
export const userApi = {
  getProfile: () => apiRequest('/users'),
  updateProfile: (data: any) => apiRequest('/users', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  createProfile: (data: any) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Properties API functions
export const propertiesApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const queryString = searchParams.toString();
    return apiRequest(`/properties${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/properties/${id}`),
  create: (data: any) => apiRequest('/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/properties/${id}`, {
    method: 'DELETE',
  }),
};

// Tenants API functions
export const tenantsApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);

    const queryString = searchParams.toString();
    return apiRequest(`/tenants${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/tenants/${id}`),
  create: (data: any) => apiRequest('/tenants', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/tenants/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/tenants/${id}`, {
    method: 'DELETE',
  }),
};

// Leases API functions
export const leasesApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: string; status?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (params?.status) searchParams.set('status', params.status);

    const queryString = searchParams.toString();
    return apiRequest(`/leases${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/leases/${id}`),
  create: (data: any) => apiRequest('/leases', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/leases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/leases/${id}`, {
    method: 'DELETE',
  }),
};

// Maintenance API functions
export const maintenanceApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: string; status?: string; priority?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.priority) searchParams.set('priority', params.priority);

    const queryString = searchParams.toString();
    return apiRequest(`/maintenance${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id: string) => apiRequest(`/maintenance/${id}`),
  create: (data: any) => apiRequest('/maintenance', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest(`/maintenance/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest(`/maintenance/${id}`, {
    method: 'DELETE',
  }),
};

// Analytics API functions
export const analyticsApi = {
  getDashboardData: () => apiRequest('/analytics'),
};

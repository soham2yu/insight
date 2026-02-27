export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  user_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial';
  units: number;
  total_area_sqft?: number;
  year_built?: number;
  created_at: string;
  updated_at: string;
}

export interface Tenant {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  ssn?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  current_address?: string;
  employment_status?: 'employed' | 'self-employed' | 'unemployed' | 'student' | 'retired';
  monthly_income?: number;
  created_at: string;
  updated_at: string;
}

export interface Lease {
  id: string;
  user_id: string;
  tenant_id: string;
  property_id: string;
  unit_number?: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  security_deposit: number;
  pet_deposit?: number;
  status: 'active' | 'expired' | 'terminated' | 'draft';
  lease_terms?: string;
  created_at: string;
  updated_at: string;
}

export interface Maintenance {
  id: string;
  user_id: string;
  property_id: string;
  tenant_id?: string;
  title: string;
  description?: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'pest_control' | 'cleaning' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  reported_date: string;
  scheduled_date?: string;
  completed_date?: string;
  estimated_cost?: number;
  actual_cost?: number;
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalTenants: number;
  activeLeases: number;
  openMaintenance: number;
  monthlyRevenue: number;
  occupancyRate: number;
}

export interface AnalyticsData {
  tenantTrend: Array<{ month: string; count: number }>;
  maintenanceData: Array<{ category: string; count: number }>;
  leaseStatusData: Array<{ status: string; count: number }>;
  revenueData: Array<{ month: string; revenue: number }>;
}

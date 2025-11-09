import { z } from 'zod';

// User validation schemas
export const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
});

export const userUpdateSchema = userSchema.partial();

// Property validation schemas
export const propertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip_code: z.string().min(5, 'ZIP code must be at least 5 characters'),
  property_type: z.enum(['apartment', 'house', 'condo', 'townhouse', 'commercial']),
  units: z.number().int().min(1, 'Must have at least 1 unit'),
  total_area_sqft: z.number().int().positive().optional(),
  year_built: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
});

export const propertyUpdateSchema = propertySchema.partial();

// Tenant validation schemas
export const tenantSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().optional(),
  date_of_birth: z.string().optional(),
  ssn: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  current_address: z.string().optional(),
  employment_status: z.enum(['employed', 'self-employed', 'unemployed', 'student', 'retired']).optional(),
  monthly_income: z.number().positive().optional(),
});

export const tenantUpdateSchema = tenantSchema.partial();

// Lease validation schemas
export const leaseSchema = z.object({
  tenant_id: z.string().uuid('Invalid tenant ID'),
  property_id: z.string().uuid('Invalid property ID'),
  unit_number: z.string().optional(),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid start date'),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid end date'),
  monthly_rent: z.number().positive('Monthly rent must be positive'),
  security_deposit: z.number().min(0, 'Security deposit cannot be negative'),
  pet_deposit: z.number().min(0, 'Pet deposit cannot be negative').optional(),
  status: z.enum(['active', 'expired', 'terminated', 'draft']).default('draft'),
  lease_terms: z.string().optional(),
}).refine((data) => new Date(data.end_date) > new Date(data.start_date), {
  message: 'End date must be after start date',
  path: ['end_date'],
});

export const leaseUpdateSchema = leaseSchema.partial();

// Maintenance validation schemas
export const maintenanceSchema = z.object({
  property_id: z.string().uuid('Invalid property ID'),
  tenant_id: z.string().uuid('Invalid tenant ID').optional().or(z.literal('')),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'pest_control', 'cleaning', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  status: z.enum(['open', 'in_progress', 'completed', 'cancelled']).default('open'),
  scheduled_date: z.string().optional(),
  estimated_cost: z.number().positive().optional(),
  actual_cost: z.number().positive().optional(),
  assigned_to: z.string().optional(),
  notes: z.string().optional(),
});

export const maintenanceUpdateSchema = maintenanceSchema.partial();

// API response validation
export const apiResponseSchema = z.object({
  data: z.any(),
  error: z.string().nullable(),
});

export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  count: z.number(),
  page: z.number(),
  limit: z.number(),
});

// Query parameter validations
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val)).refine(val => val > 0, 'Page must be positive').optional(),
  limit: z.string().transform(val => parseInt(val)).refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100').optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
export type PropertyUpdateInput = z.infer<typeof propertyUpdateSchema>;
export type TenantInput = z.infer<typeof tenantSchema>;
export type TenantUpdateInput = z.infer<typeof tenantUpdateSchema>;
export type LeaseInput = z.infer<typeof leaseSchema>;
export type LeaseUpdateInput = z.infer<typeof leaseUpdateSchema>;
export type MaintenanceInput = z.infer<typeof maintenanceSchema>;
export type MaintenanceUpdateInput = z.infer<typeof maintenanceUpdateSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;

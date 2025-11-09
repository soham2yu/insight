import { supabase } from './supabase'

// Tenants
export const getTenants = async () => {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createTenant = async (tenant: any) => {
  const { data, error } = await supabase
    .from('tenants')
    .insert([tenant])
    .select()

  if (error) throw error
  return data[0]
}

export const updateTenant = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('tenants')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export const deleteTenant = async (id: string) => {
  const { error } = await supabase
    .from('tenants')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Leases
export const getLeases = async () => {
  const { data, error } = await supabase
    .from('leases')
    .select(`
      *,
      tenants (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createLease = async (lease: any) => {
  const { data, error } = await supabase
    .from('leases')
    .insert([lease])
    .select()

  if (error) throw error
  return data[0]
}

export const updateLease = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('leases')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export const deleteLease = async (id: string) => {
  const { error } = await supabase
    .from('leases')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Maintenance
export const getMaintenanceRequests = async () => {
  const { data, error } = await supabase
    .from('maintenance')
    .select(`
      *,
      tenants (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createMaintenanceRequest = async (request: any) => {
  const { data, error } = await supabase
    .from('maintenance')
    .insert([request])
    .select()

  if (error) throw error
  return data[0]
}

export const updateMaintenanceRequest = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('maintenance')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

export const deleteMaintenanceRequest = async (id: string) => {
  const { error } = await supabase
    .from('maintenance')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Analytics
export const getAnalyticsData = async () => {
  // Get tenant trends
  const { data: tenants, error: tenantsError } = await supabase
    .from('tenants')
    .select('created_at, status')

  if (tenantsError) throw tenantsError

  // Get maintenance stats
  const { data: maintenance, error: maintenanceError } = await supabase
    .from('maintenance')
    .select('status')

  if (maintenanceError) throw maintenanceError

  // Get lease activity
  const { data: leases, error: leasesError } = await supabase
    .from('leases')
    .select('start_date, end_date')

  if (leasesError) throw leasesError

  return {
    tenants,
    maintenance,
    leases
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import type { DashboardStats, AnalyticsData } from '@/lib/types';

// Initialize Firebase Admin SDK
let firebaseAdminApp;
try {
  firebaseAdminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
} catch (error) {
  // App already initialized
  firebaseAdminApp = initializeApp();
}

const adminAuth = getAuth(firebaseAdminApp);

// Helper function to verify Firebase token
async function verifyToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// GET /api/analytics - Get dashboard analytics data
export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = decodedToken.uid;

    // Get dashboard stats
    const [propertiesResult, tenantsResult, leasesResult, maintenanceResult, revenueResult] = await Promise.all([
      // Total properties
      supabase
        .from('properties')
        .select('id', { count: 'exact' })
        .eq('user_id', userId),

      // Total tenants
      supabase
        .from('tenants')
        .select('id', { count: 'exact' })
        .eq('user_id', userId),

      // Active leases
      supabase
        .from('leases')
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .eq('status', 'active'),

      // Open maintenance requests
      supabase
        .from('maintenance')
        .select('id', { count: 'exact' })
        .eq('user_id', userId)
        .in('status', ['open', 'in_progress']),

      // Monthly revenue (sum of active leases)
      supabase
        .from('leases')
        .select('monthly_rent')
        .eq('user_id', userId)
        .eq('status', 'active')
    ]);

    const totalProperties = propertiesResult.count || 0;
    const totalTenants = tenantsResult.count || 0;
    const activeLeases = leasesResult.count || 0;
    const openMaintenance = maintenanceResult.count || 0;
    const monthlyRevenue = revenueResult.data?.reduce((sum, lease) => sum + (lease.monthly_rent || 0), 0) || 0;

    // Calculate occupancy rate
    const occupancyRate = totalProperties > 0 ? (activeLeases / totalProperties) * 100 : 0;

    const dashboardStats: DashboardStats = {
      totalProperties,
      totalTenants,
      activeLeases,
      openMaintenance,
      monthlyRevenue,
      occupancyRate: Math.round(occupancyRate * 100) / 100
    };

    // Get tenant trend data (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const { data: tenantTrend } = await supabase
      .from('tenants')
      .select('created_at')
      .eq('user_id', userId)
      .gte('created_at', twelveMonthsAgo.toISOString())
      .order('created_at');

    // Process tenant trend data
    const tenantTrendData = processMonthlyData(tenantTrend || [], 'created_at');

    // Get maintenance data by category
    const { data: maintenanceData } = await supabase
      .from('maintenance')
      .select('category')
      .eq('user_id', userId);

    const maintenanceCategoryData = processCategoryData(maintenanceData || [], 'category');

    // Get lease status data
    const { data: leaseStatusData } = await supabase
      .from('leases')
      .select('status')
      .eq('user_id', userId);

    const leaseStatusProcessed = processCategoryData(leaseStatusData || [], 'status');

    // Get revenue data (last 12 months)
    const { data: revenueData } = await supabase
      .from('leases')
      .select('created_at, monthly_rent')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gte('created_at', twelveMonthsAgo.toISOString())
      .order('created_at');

    const revenueTrendData = processRevenueData(revenueData || []);

    const analyticsData: AnalyticsData = {
      tenantTrend: tenantTrendData,
      maintenanceData: maintenanceCategoryData,
      leaseStatusData: leaseStatusProcessed,
      revenueData: revenueTrendData
    };

    return NextResponse.json({
      dashboardStats,
      analyticsData,
      error: null
    });
  } catch (error) {
    console.error('GET /api/analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to process monthly data
function processMonthlyData(data: any[], dateField: string) {
  const monthlyCounts: { [key: string]: number } = {};

  // Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    monthlyCounts[key] = 0;
  }

  // Count items per month
  data.forEach(item => {
    const date = new Date(item[dateField]);
    const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    if (monthlyCounts[key] !== undefined) {
      monthlyCounts[key]++;
    }
  });

  return Object.entries(monthlyCounts).map(([month, count]) => ({
    month,
    count
  }));
}

// Helper function to process category data
function processCategoryData(data: any[], categoryField: string) {
  const categoryCounts: { [key: string]: number } = {};

  data.forEach(item => {
    const category = item[categoryField];
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  return Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    count
  }));
}

// Helper function to process revenue data
function processRevenueData(data: any[]) {
  const monthlyRevenue: { [key: string]: number } = {};

  // Initialize last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    monthlyRevenue[key] = 0;
  }

  // Sum revenue per month
  data.forEach(item => {
    const date = new Date(item.created_at);
    const key = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    if (monthlyRevenue[key] !== undefined) {
      monthlyRevenue[key] += item.monthly_rent || 0;
    }
  });

  return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    month,
    revenue
  }));
}

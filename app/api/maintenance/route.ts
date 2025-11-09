import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import { maintenanceSchema, maintenanceUpdateSchema, paginationSchema } from '@/lib/validations';

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

// GET /api/maintenance - Get user's maintenance requests with pagination
export async function GET(request: NextRequest) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let query = supabase
      .from('maintenance')
      .select(`
        *,
        property:properties(name, address),
        tenant:tenants(first_name, last_name)
      `, { count: 'exact' })
      .eq('user_id', decodedToken.uid);

    // Add filters
    if (status) {
      query = query.eq('status', status);
    }
    if (priority) {
      query = query.eq('priority', priority);
    }

    // Add search functionality
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Add sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching maintenance:', error);
      return NextResponse.json({ error: 'Failed to fetch maintenance requests' }, { status: 500 });
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      error: null
    });
  } catch (error) {
    console.error('GET /api/maintenance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/maintenance - Create new maintenance request
export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = maintenanceSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const maintenanceData = {
      user_id: decodedToken.uid,
      ...validationResult.data,
    };

    const { data, error } = await supabase
      .from('maintenance')
      .insert(maintenanceData)
      .select(`
        *,
        property:properties(name, address),
        tenant:tenants(first_name, last_name)
      `)
      .single();

    if (error) {
      console.error('Error creating maintenance request:', error);
      return NextResponse.json({ error: 'Failed to create maintenance request' }, { status: 500 });
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('POST /api/maintenance error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/maintenance/[id] - Update maintenance request
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = maintenanceUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('maintenance')
      .update(validationResult.data)
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid)
      .select(`
        *,
        property:properties(name, address),
        tenant:tenants(first_name, last_name)
      `)
      .single();

    if (error) {
      console.error('Error updating maintenance request:', error);
      return NextResponse.json({ error: 'Failed to update maintenance request' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Maintenance request not found' }, { status: 404 });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('PUT /api/maintenance/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/maintenance/[id] - Delete maintenance request
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('maintenance')
      .delete()
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid);

    if (error) {
      console.error('Error deleting maintenance request:', error);
      return NextResponse.json({ error: 'Failed to delete maintenance request' }, { status: 500 });
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error('DELETE /api/maintenance/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

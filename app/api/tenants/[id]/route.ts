import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';

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

// GET /api/tenants/[id] - Get specific tenant
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid)
      .single();

    if (error) {
      console.error('Error fetching tenant:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch tenant' }, { status: 500 });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('GET /api/tenants/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/tenants/[id] - Update tenant
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { tenantUpdateSchema } = await import('@/lib/validations');
    const validationResult = tenantUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('tenants')
      .update(validationResult.data)
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid)
      .select()
      .single();

    if (error) {
      console.error('Error updating tenant:', error);
      return NextResponse.json({ error: 'Failed to update tenant' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('PUT /api/tenants/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/tenants/[id] - Delete tenant
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('tenants')
      .delete()
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid);

    if (error) {
      console.error('Error deleting tenant:', error);
      return NextResponse.json({ error: 'Failed to delete tenant' }, { status: 500 });
    }

    return NextResponse.json({ error: null });
  } catch (error) {
    console.error('DELETE /api/tenants/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

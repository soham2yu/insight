import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import { propertyUpdateSchema } from '@/lib/validations';

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

// GET /api/properties/[id] - Get specific property
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      console.error('Error fetching property:', error);
      return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('GET /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/properties/[id] - Update specific property
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = propertyUpdateSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('properties')
      .update(validationResult.data)
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 });
      }
      console.error('Error updating property:', error);
      return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('PUT /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/properties/[id] - Delete specific property
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', params.id)
      .eq('user_id', decodedToken.uid);

    if (error) {
      console.error('Error deleting property:', error);
      return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Property deleted successfully', error: null });
  } catch (error) {
    console.error('DELETE /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

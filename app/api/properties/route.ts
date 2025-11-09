import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, cert } from 'firebase-admin/app';
import { propertySchema, propertyUpdateSchema, paginationSchema } from '@/lib/validations';
import type { Property } from '@/lib/types';

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

// GET /api/properties - Get user's properties with pagination
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

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .eq('user_id', decodedToken.uid);

    // Add search functionality
    if (search) {
      query = query.or(`name.ilike.%${search}%,address.ilike.%${search}%,city.ilike.%${search}%`);
    }

    // Add sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Add pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching properties:', error);
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
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
    console.error('GET /api/properties error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyToken(request);
    if (!decodedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validationResult = propertySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues
      }, { status: 400 });
    }

    const propertyData = {
      user_id: decodedToken.uid,
      ...validationResult.data,
    };

    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (error) {
      console.error('Error creating property:', error);
      return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
    }

    return NextResponse.json({ data, error: null }, { status: 201 });
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables not set',
        supabaseUrl: supabaseUrl ? 'Set' : 'NOT SET',
        supabaseKey: supabaseKey ? 'Set' : 'NOT SET',
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test connection by trying to read from the table
    const { data, error } = await supabase
      .from('telesales_applications')
      .select('id')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error,
      }, { status: 500 });
    }

    // Test insert
    const { data: insertData, error: insertError } = await supabase
      .from('telesales_applications')
      .insert([{
        job_title: 'test-connection',
        full_name: 'Test Connection',
        email: 'test-connection@test.com',
        phone: '0000000000',
        city: 'Test',
        country: 'Test',
      }])
      .select('id');

    if (insertError) {
      return NextResponse.json({
        success: false,
        error: 'Insert failed',
        message: insertError.message,
        code: insertError.code,
        details: insertError,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      testInsertId: insertData?.[0]?.id,
      canRead: !!data,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

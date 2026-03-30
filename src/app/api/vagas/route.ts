import { NextResponse } from 'next/server';
import { parseVagas } from '@/services/vagas.service';

export async function GET() {
  const data = parseVagas();
  
  if (!data) {
    return NextResponse.json({ error: 'Failed to read or parse data file.' }, { status: 500 });
  }

  return NextResponse.json(data);
}

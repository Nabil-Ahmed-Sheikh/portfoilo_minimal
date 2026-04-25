import { NextResponse } from 'next/server';
import { fetchPortfolio } from '@/lib/portfolio';

export async function GET() {
  const data = await fetchPortfolio();
  return NextResponse.json(data);
}

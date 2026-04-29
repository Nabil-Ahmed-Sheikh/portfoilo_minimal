import fs from 'fs/promises';
import path from 'path';
import type { PortfolioOverride } from '@/types';

const OVERRIDE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio-override.json');

export async function readOverride(): Promise<PortfolioOverride> {
  try {
    const raw = await fs.readFile(OVERRIDE_PATH, 'utf-8');
    return JSON.parse(raw) as PortfolioOverride;
  } catch {
    return {};
  }
}

// FUTURE: Replace with db.portfolio.findFirst() / db.portfolio.update()
export async function writeOverride(data: PortfolioOverride): Promise<void> {
  await fs.writeFile(OVERRIDE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

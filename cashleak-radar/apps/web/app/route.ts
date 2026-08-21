export const runtime = 'nodejs'

export async function GET() {
  return new Response('CashLeak Radar web app', { status: 200 })
}

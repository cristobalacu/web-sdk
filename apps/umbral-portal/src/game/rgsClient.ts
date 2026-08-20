const RGS_URL = 'http://localhost:8787';

type Balance = { amount: number; currency: string };
type RoundEvent = Record<string, unknown>;

type PlayResult = {
  balance: Balance;
  round: { mode: string; events: RoundEvent[]; payoutMultiplier: number };
};

export async function authenticate(sessionID: string) {
  const res = await fetch(`${RGS_URL}/wallet/authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionID }),
  });
  if (!res.ok) throw new Error(`authenticate failed: ${res.status}`);
  return res.json() as Promise<{ balance: Balance; config: unknown }>;
}

export async function play(sessionID: string, amount: number): Promise<PlayResult> {
  const res = await fetch(`${RGS_URL}/wallet/play`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionID, amount, mode: 'base' }),
  });
  if (!res.ok) throw new Error(`play failed: ${res.status}`);
  return res.json() as Promise<PlayResult>;
}

export async function endRound(sessionID: string) {
  const res = await fetch(`${RGS_URL}/wallet/end-round`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionID }),
  });
  if (!res.ok) throw new Error(`end-round failed: ${res.status}`);
  return res.json() as Promise<{ balance: Balance }>;
}

export async function playRound(sessionID: string, amount: number) {
  await authenticate(sessionID);
  const playResult = await play(sessionID, amount);
  const endResult = await endRound(sessionID);
  return { events: playResult.round.events, payoutMultiplier: playResult.round.payoutMultiplier, finalBalance: endResult.balance };
}

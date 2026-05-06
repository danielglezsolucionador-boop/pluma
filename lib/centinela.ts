const CENTINELA_URL = 'https://centinela-backend-kzwk.onrender.com';
const CENTINELA_USER = 'daniel';
const CENTINELA_PASS = 'Centinela24';

let _token: string | null = null;
let _tokenExp: number = 0;

async function getToken(): Promise<string> {
  if (_token && Date.now() < _tokenExp) return _token;
  try {
    const res = await fetch(`${CENTINELA_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: CENTINELA_USER, password: CENTINELA_PASS }),
    });
    const data = await res.json();
    _token = data.access_token;
    _tokenExp = Date.now() + 25 * 60 * 1000;
    return _token!;
  } catch(e) {
    return '';
  }
}

export async function sendPromptToCentinela(params: {
  prompt: string;
  agent: string;
  user?: string;
  model?: string;
}): Promise<{ blocked: boolean; risk_score: number; action: string } | null> {
  try {
    const token = await getToken();
    const res = await fetch(`${CENTINELA_URL}/api/v1/prompt/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        prompt: params.prompt,
        agent: params.agent,
        user: params.user || 'daniel',
        model: params.model || 'claude-sonnet',
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      blocked: data?.policy?.blocked === true,
      risk_score: data?.risk?.score || 0,
      action: data?.policy?.action || 'ALLOW',
    };
  } catch(e) {
    return null;
  }
}
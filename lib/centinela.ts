const CENTINELA_URL = 'https://centinela-backend-kzwk.onrender.com';
const CENTINELA_USER = 'daniel';
const CENTINELA_PASS = 'Centinela24';

let _token: string | null = null;
let _tokenExp: number = 0;

async function getToken(): Promise<string> {
  if (_token && Date.now() < _tokenExp) return _token!;
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

export type CentinelaEvent = {
  prompt: string;
  agent: string;
  user?: string;
  model?: string;
  event_type?: string;
  app_name?: string;
  prompt_length?: number;
  latency_ms?: number;
  metadata?: Record<string, unknown>;
};

export type CentinelaResult = {
  blocked: boolean;
  risk_score: number;
  action: string;
  incident_id?: string;
  threat_types?: string[];
};

export async function sendPromptToCentinela(
  params: CentinelaEvent
): Promise<CentinelaResult | null> {
  const start = Date.now();
  try {
    const token = await getToken();
    const payload = {
      prompt: params.prompt,
      agent: params.agent,
      user: params.user || 'daniel',
      model: params.model || 'claude-sonnet',
      app_name: params.app_name || 'PLUMA',
      event_type: params.event_type || 'prompt.submitted',
      prompt_length: params.prompt_length || params.prompt.length,
      latency_ms: params.latency_ms || 0,
      metadata: params.metadata || {},
    };

    const res = await fetch(`${CENTINELA_URL}/api/v1/prompt/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return null;
    const data = await res.json();

    return {
      blocked: data?.policy?.blocked === true,
      risk_score: data?.risk?.score || 0,
      action: data?.policy?.action || 'ALLOW',
      incident_id: data?.incident?.id || undefined,
      threat_types: data?.detection?.threat_types || [],
    };
  } catch(e) {
    return null;
  }
}

// Helper para eventos de seguridad específicos
export async function reportSecurityEvent(
  type: 'injection.detected' | 'jailbreak.detected' | 'pii.detected' | 'tool.abuse' | 'suspicious.pattern',
  prompt: string,
  agent: string
): Promise<CentinelaResult | null> {
  return sendPromptToCentinela({
    prompt,
    agent,
    event_type: type,
    app_name: 'PLUMA',
    metadata: { security_event: type, auto_detected: true },
  });
}

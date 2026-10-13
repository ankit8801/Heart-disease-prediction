const API_URL = 'http://127.0.0.1:5000/predict';

export async function requestPrediction(features) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ features }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.error || 'The prediction service could not process this request.');
  }
  return payload;
}

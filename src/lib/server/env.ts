const requiredProductionEnv = [
  "APP_URL",
  "AUTH_SECRET",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "AUTH_APPLE_ID",
  "AUTH_APPLE_SECRET",
  "BREVO_API_KEY",
  "EMAIL_FROM",
  "MIDTRANS_SERVER_KEY",
  "MIDTRANS_CLIENT_KEY",
  "MIDTRANS_IS_PRODUCTION",
] as const;

export function getAppUrl() {
  return process.env.APP_URL || "http://localhost:3000";
}

export function hasEnv(name: string) {
  return Boolean(process.env[name]?.trim());
}

export function assertProductionEnv() {
  if (process.env.NODE_ENV !== "production") return;

  const missing = requiredProductionEnv.filter((name) => !hasEnv(name));

  if (missing.length > 0) {
    throw new Error(`Missing required production env: ${missing.join(", ")}`);
  }
}

export function hasGoogleOAuthEnv() {
  return hasEnv("AUTH_GOOGLE_ID") && hasEnv("AUTH_GOOGLE_SECRET");
}

export function hasAppleOAuthEnv() {
  return hasEnv("AUTH_APPLE_ID") && hasEnv("AUTH_APPLE_SECRET");
}

export function hasBrevoEnv() {
  return hasEnv("BREVO_API_KEY") && hasEnv("EMAIL_FROM");
}

export function hasMidtransEnv() {
  return hasEnv("MIDTRANS_SERVER_KEY") && hasEnv("MIDTRANS_CLIENT_KEY");
}

export function isMidtransProduction() {
  return process.env.MIDTRANS_IS_PRODUCTION === "true";
}

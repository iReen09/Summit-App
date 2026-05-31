import { createHash, randomBytes } from "node:crypto";

export function generatePublicToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function addHours(hours: number) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

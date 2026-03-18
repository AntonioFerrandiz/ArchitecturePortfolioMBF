/**
 * Returns the TENANT_SLUG env var.
 * Throws at runtime if not set — catches misconfigured deployments early.
 */
export function getTenantSlug(): string {
  const slug = process.env.TENANT_SLUG;
  if (!slug) throw new Error("TENANT_SLUG environment variable is not set");
  return slug;
}

/**
 * Safe variant — returns "default" when TENANT_SLUG is missing.
 * Use only in contexts where a missing slug should gracefully fall back
 * to static data rather than hard-crash (e.g. build fallback).
 */
export function getTenantSlugSafe(): string {
  return process.env.TENANT_SLUG ?? "default";
}

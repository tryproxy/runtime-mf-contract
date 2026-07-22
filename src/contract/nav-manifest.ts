/** Pre-mount nav metadata emitted by remotes (shell chrome). PoC schema. */

export type NavManifestLabel = {
  en: string;
  ru: string;
};

export type NavManifestPage = {
  id: string;
  /** Relative to shell-owned basename; `""` = index. No leading slash. */
  segment: string;
  label: NavManifestLabel;
};

export type NavManifest = {
  contractVersion: 1;
  /** Descriptive cross-check only — not authoritative. */
  moduleId: string;
  pages: NavManifestPage[];
};

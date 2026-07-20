/**
 * Public API for `@platform/runtime-mf-contract`.
 *
 * Layout:
 * - `contract/` — HostBridge + mount + telemetry types (PoC surface)
 * - `mock/` — in-memory bridge for standalone remotes / tests
 * - `version/` — REMOTE_CONTRACT_VERSION
 * - `conformance/` — reserved (validators / fixtures later)
 * - `auth/` — reserved (auth.http transport types later)
 */
export { REMOTE_CONTRACT_VERSION } from './version';
export type {
  ThemeMode,
  AppLocale,
  TelemetryProps,
  HostTelemetry,
  HostBridge,
  RemoteAppInstance,
  MountRemoteApp,
} from './contract';
export {
  createMockHostBridge,
  type MockHostBridgeOptions,
} from './mock';

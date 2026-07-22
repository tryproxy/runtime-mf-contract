# @platform/runtime-mf-contract

Shared TypeScript surface between **shell** and **remotes**. No runtime framework deps — types (+ a small mock bridge for standalone/dev).

Install in consumers:

```bash
pnpm add github:tryproxy/runtime-mf-contract
# refresh after contract pushes:
pnpm update @platform/runtime-mf-contract
```

Current package version: see `package.json` (`REMOTE_CONTRACT_VERSION` is exported for optional runtime checks).

---

## What this package is for

| Role | Notes |
| --- | --- |
| Mount seam | `MountRemoteApp` / `RemoteAppInstance` — what remotes expose, what the shell calls |
| HostBridge | Faceted host stores remotes may read (`theme`, `i18n`, `auth`, `navigation`, `telemetry`) |
| Auth transport | `HostAuthHttp` — remotes get tokens via the bridge, not storage |
| Nav manifest | `NavManifest` — optional pre-mount `nav.json` schema for shell chrome |
| Mock | `createMockHostBridge` — standalone remotes / tests without a real shell |

**Not** in this package: shell UI (`RemoteSlot`), federation config, or remote page implementations.

---

## Who owns what

| Party | Must |
| --- | --- |
| **Shell** | Implement a real `HostBridge`; call `mount` / `unmount`; may await `ready`; may fetch `nav.json` |
| **Remote** | Export `./mount` matching `MountRemoteApp`; subscribe to bridge; stay under `basename`; optionally emit `nav.json` |
| **Contract** | Versioned types only — bump + publish/push when the shape changes |

---

## Public surface (key types)

| Export | Purpose |
| --- | --- |
| `HostBridge` | Theme, i18n, auth (+ `auth.http`), navigation, telemetry |
| `MountRemoteApp` | `( { container, bridge, basename } ) => RemoteAppInstance` |
| `RemoteAppInstance` | `unmount()`; optional `ready?: Promise<void>` for async bootstrap |
| `HostAuthHttp` | `bearer` \| `cookie` + optional `getAccessToken()` |
| `NavManifest` / `NavManifestPage` | `contractVersion: 1`, `moduleId`, `pages[]` |
| `createMockHostBridge` | In-memory bridge for local remote runs |
| `REMOTE_CONTRACT_VERSION` | Package-aligned version string |

---

## Key files

| Path | Why it matters |
| --- | --- |
| `src/index.ts` | Public API barrel |
| `src/contract/host-bridge.ts` | HostBridge Design C shape |
| `src/contract/mount.ts` | Mount / instance types |
| `src/contract/nav-manifest.ts` | `nav.json` schema |
| `src/contract/telemetry.ts` | Host telemetry facet |
| `src/auth/host-auth-http.ts` | Auth HTTP transport types |
| `src/mock/create-mock-host-bridge.ts` | Standalone / test mock |
| `src/version/index.ts` | `REMOTE_CONTRACT_VERSION` |
| `package.json` | Version + `exports` → `dist` |

---

## Local / release

```bash
pnpm install
pnpm build          # dist + .d.ts (also runs on prepare)
pnpm types          # tsc --noEmit
pnpm release        # bumpp — then push so consumers can update
```

Consumers should depend on **GitHub**, not a `file:` path, unless deliberately hacking locally.

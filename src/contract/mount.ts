import type { HostBridge } from './host-bridge';

export type RemoteAppInstance = {
  unmount(): void;
  /**
   * Optional: resolves when the remote UI is actually mounted.
   * Async frameworks (e.g. Angular `createApplication`) should provide this
   * so the shell does not flip to "ready" before first paint.
   * Rejects on bootstrap failure; resolves as no-op if unmounted mid-bootstrap.
   */
  ready?: Promise<void>;
};

export type MountRemoteApp = (params: {
  container: HTMLElement;
  bridge: HostBridge;
  basename: string;
}) => RemoteAppInstance;

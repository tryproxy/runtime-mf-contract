import type { HostBridge } from './host-bridge';

export type RemoteAppInstance = {
  unmount(): void;
};

export type MountRemoteApp = (params: {
  container: HTMLElement;
  bridge: HostBridge;
  basename: string;
}) => RemoteAppInstance;

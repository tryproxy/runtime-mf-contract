import type { HostTelemetry } from './telemetry';
import type { HostAuthHttp } from '../auth';

export type ThemeMode = 'light' | 'dark';
export type AppLocale = 'en' | 'ru';

export type HostSession = {
  userId: string;
  displayName?: string;
  roles: string[];
};

export type HostLocation = {
  pathname: string;
  search: string;
  hash: string;
};

/**
 * Faceted external-store HostBridge (Design C).
 * Every host-owned store uses getSnapshot + subscribe.
 */
export type HostBridge = {
  theme: {
    getSnapshot(): { mode: ThemeMode };
    subscribe(listener: () => void): () => void;
  };

  i18n: {
    getSnapshot(): { locale: AppLocale };
    subscribe(listener: () => void): () => void;
  };

  auth: {
    getSnapshot(): HostSession | null;
    subscribe(listener: () => void): () => void;
    /** Credential transport — remotes use this; never localStorage. */
    http: HostAuthHttp;
  };

  navigation: {
    getSnapshot(): HostLocation;
    subscribe(listener: () => void): () => void;
    navigate(path: string): void;
    replace(path: string): void;
  };

  /** Platform analytics / errors. Host may no-op. */
  telemetry: HostTelemetry;
};

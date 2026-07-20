import type { AppLocale, HostBridge, ThemeMode } from '../contract';

type Listener = () => void;

export type MockHostBridgeOptions = {
  theme?: ThemeMode;
  locale?: AppLocale;
};

/** In-memory HostBridge for standalone remotes / tests (no real shell). */
export function createMockHostBridge(
  options: MockHostBridgeOptions = {}
): HostBridge {
  const theme: ThemeMode = options.theme ?? 'light';
  const locale: AppLocale = options.locale ?? 'en';
  const themeListeners = new Set<Listener>();
  const localeListeners = new Set<Listener>();
  const authListeners = new Set<Listener>();
  const navigationListeners = new Set<Listener>();

  const subscribe = (set: Set<Listener>, listener: Listener) => {
    set.add(listener);
    return () => {
      set.delete(listener);
    };
  };

  return {
    theme: {
      getSnapshot: () => ({ mode: theme }),
      subscribe: (listener) => subscribe(themeListeners, listener),
    },
    i18n: {
      getSnapshot: () => ({ locale }),
      subscribe: (listener) => subscribe(localeListeners, listener),
    },
    auth: {
      getSnapshot: () => ({
        userId: 'mock-user',
        displayName: 'Mock User',
        roles: ['admin'],
      }),
      subscribe: (listener) => subscribe(authListeners, listener),
    },
    navigation: {
      getSnapshot: () => ({
        pathname: '/',
        search: '',
        hash: '',
      }),
      subscribe: (listener) => subscribe(navigationListeners, listener),
      navigate: () => {},
      replace: () => {},
    },
    telemetry: {
      track: () => {},
      captureException: () => {},
      captureMessage: () => {},
    },
  };
}

import type { AppLocale, HostBridge, ThemeMode } from '../contract';

type Listener = () => void;

export type MockHostBridgeOptions = {
  theme?: ThemeMode;
  locale?: AppLocale;
  /** Mock bearer token for standalone remotes / tests. */
  accessToken?: string | null;
};

/** In-memory HostBridge for standalone remotes / tests (no real shell). */
export function createMockHostBridge(
  options: MockHostBridgeOptions = {}
): HostBridge {
  const theme: ThemeMode = options.theme ?? 'light';
  const locale: AppLocale = options.locale ?? 'en';
  const accessToken = options.accessToken ?? 'mock-access-token';
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
      getSnapshot: () =>
        accessToken
          ? {
              userId: 'mock-user',
              displayName: 'Mock User',
              roles: ['admin'],
            }
          : null,
      subscribe: (listener) => subscribe(authListeners, listener),
      http: {
        mode: 'bearer',
        getAccessToken: async () => accessToken,
      },
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

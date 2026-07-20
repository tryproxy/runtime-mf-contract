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

  return {
    theme: {
      getSnapshot: () => ({ mode: theme }),
      subscribe: (listener) => {
        themeListeners.add(listener);
        return () => {
          themeListeners.delete(listener);
        };
      },
    },
    i18n: {
      getLocale: () => locale,
      subscribe: (listener) => {
        localeListeners.add(listener);
        return () => {
          localeListeners.delete(listener);
        };
      },
    },
    auth: {
      getSession: () => ({
        userId: 'mock-user',
        displayName: 'Mock User',
        roles: ['admin'],
      }),
    },
    navigation: {
      getLocation: () => ({
        pathname: '/',
        search: '',
        hash: '',
      }),
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

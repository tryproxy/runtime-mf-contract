/**
 * How remotes authenticate HTTP to their backends.
 * Shell owns storage (LS / cookie); remotes never read token storage directly.
 */
export type HostAuthHttpMode = 'bearer' | 'cookie';

export type HostAuthHttp = {
  /**
   * - `bearer` — remote attaches Authorization via `getAccessToken()`
   * - `cookie` — remote uses `credentials: 'include'`; token not available to JS
   */
  mode: HostAuthHttpMode;

  /**
   * Present when `mode === 'bearer'`. Call per request; shell may refresh.
   * Remotes must not persist the returned string.
   */
  getAccessToken?(): Promise<string | null>;
};

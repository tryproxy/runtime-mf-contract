export type TelemetryProps = Record<
  string,
  string | number | boolean | null | undefined
>;

export type HostTelemetry = {
  track(event: string, props?: TelemetryProps): void;
  captureException(error: unknown, props?: TelemetryProps): void;
  captureMessage(
    message: string,
    level?: 'info' | 'warning' | 'error',
    props?: TelemetryProps
  ): void;
};

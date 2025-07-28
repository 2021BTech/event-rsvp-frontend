import type { Method } from "axios";

export interface ApiCallProps<T = unknown> {
  Url: string;
  Method: Method;
  Data?: T;
  timeoutOverride?: number;
  silent?: boolean;
  headers?: Record<string, string>;
}

import axios from "axios";
import type { ApiCallProps } from "../models/api/api.model";
import Constants from "./Constant";
import { showToast } from "./Toast";

type WithAuth<T> = T & { authorization?: string };

export default async function ApiCall<R = unknown, D = unknown>({
  Url,
  Method,
  Data,
  timeoutOverride,
  silent = false,
}: ApiCallProps<D>): Promise<R | null> {
  const token = sessionStorage.getItem("token");
  const tenantId = sessionStorage.getItem("tenantId");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (tenantId) headers["tenant"] = tenantId;

  const baseUrl = Constants.apiBaseUrl;

  try {
    const response = await axios<WithAuth<R>>({
      method: Method,
      url: baseUrl + Url.trim(),
      data: Data,
      timeout: timeoutOverride || Number(process.env.REACT_APP_REQUEST_TIMEOUT),
      headers,
      withCredentials: true,
    });

    if (response.data?.authorization) {
      sessionStorage.setItem("token", response.data.authorization);
    }

    return response.data;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as Record<string, unknown>).response === "object"
    ) {
      const errRes = (error as {
        response: {
          status: number;
          statusText?: string;
          data?: { message?: string } | string;
        };
      }).response;

      if (errRes.status === 401 || errRes.statusText === "Unauthorized") {
        sessionStorage.clear();
        window.location.href = "/";
        return null;
      }

      const message =
        typeof errRes.data === "string"
          ? errRes.data
          : errRes.data?.message || "Something went wrong.";

      if (errRes.status >= 400 && errRes.status < 500) {
        if (!silent) showToast("warning", message);
      } else if (errRes.status >= 500) {
        if (!silent) showToast("error", message);
      }

      return null;
    }

    if (!silent) {
      showToast("error", "Unexpected error occurred.");
    }
    return null;
  }
}

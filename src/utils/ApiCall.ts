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

  const isFormData =
    typeof FormData !== "undefined" && Data instanceof FormData;
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (tenantId) headers["tenant"] = tenantId;

  const baseUrl = Constants.apiBaseUrl;

  try {
    const response = await axios<WithAuth<R>>({
      method: Method,
      url: baseUrl + Url.trim(),
      data: Data,
      timeout:
        timeoutOverride || Number(import.meta.env.VITE_APP_REQUEST_TIMEOUT),
      headers: headers,
      withCredentials: true,
    });

    if (response.data?.authorization) {
      sessionStorage.setItem("token", response.data.authorization);
    }

    return response.data;
  } catch (error: unknown) {
    console.error("API Error:", error);

    if (axios.isAxiosError(error)) {
      const errRes = error.response;

      if (errRes) {
        const message =
          typeof errRes.data === "string"
            ? errRes.data
            : errRes.data?.message || "Something went wrong.";

        if (errRes.status === 401 || errRes.statusText === "Unauthorized") {
          sessionStorage.clear();
          window.location.href = "/";
          return null;
        }

        if (!silent) {
          if (errRes.status >= 400 && errRes.status < 500) {
            showToast("warning", message);
          } else if (errRes.status >= 500) {
            showToast("error", message);
          }
        }

        return null;
      }

      if (!silent) {
        showToast("error", error.message || "Unknown network error.");
      }
      return null;
    }

    if (!silent) {
      showToast("error", "Unexpected error occurred.");
    }
    return null;
  }
}

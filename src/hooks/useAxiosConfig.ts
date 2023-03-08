import { AxiosRequestConfig } from "axios";

export default (token: string | undefined): AxiosRequestConfig | undefined => {
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    return {
      headers: headers,
    };
  }
};

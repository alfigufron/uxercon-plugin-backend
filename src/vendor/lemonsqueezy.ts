import env from "@config/env";
import { ErrorHandler } from "@config/http";
import axios, { Axios, AxiosError } from "axios";

export type TResponseValidateLicense = {
  license: {
    status: string;
    key: string;
  };
  meta: {
    customer_name: string;
    customer_email: string;
  };
};

export default class LemonSqueezy {
  private service: Axios;

  constructor() {
    this.service = axios.create({
      baseURL: "https://api.lemonsqueezy.com",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${env.LEMONSQUEEZY.API_KEY}`,
      },
    });
  }

  validateLicenseKey = async (license_key: string) => {
    try {
      const response = await this.service.post("/v1/licenses/validate", {
        license_key,
      });

      const { license_key: license, meta } = response.data as {
        license_key: object;
        meta: object;
      };

      return { license, meta } as TResponseValidateLicense;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response.data) {
        const { error: message } = axiosError.response.data as {
          error: string;
        };

        if (message === "license_key not found.")
          throw new ErrorHandler(
            "The license key you entered is invalid. Please try again",
            null,
            400
          );
      }

      throw new ErrorHandler("Lemon Squeezy Error", { error: err }, 500);
    }
  };
}

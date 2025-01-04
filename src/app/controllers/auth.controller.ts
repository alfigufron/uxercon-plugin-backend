import CustomerRepository from "@app/repositories/customer.repository";
import { ErrorHandler, HttpResponse } from "@config/http";
import LemonSqueezy from "@vendor/lemonsqueezy";
import { NextFunction, Request, Response } from "express";

export default class AuthController {
  private lemonSqueezy: LemonSqueezy;
  private customerRepo: CustomerRepository;

  constructor() {
    this.lemonSqueezy = new LemonSqueezy();
    this.customerRepo = new CustomerRepository();
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { license_key } = req.body;

      if (!license_key)
        throw new ErrorHandler(
          "Please enter your license key to proceed",
          null,
          422
        );

      if (license_key && typeof license_key !== "string")
        throw new ErrorHandler(
          "License key should be a string of characters",
          null,
          422
        );

      let payload;
      const customer = await this.customerRepo.findOne({
        where: {
          license_key,
        },
      });

      if (!customer) {
        const data = await this.lemonSqueezy.validateLicenseKey(license_key);

        await this.customerRepo.insert({
          name: data.meta.customer_name,
          email: data.meta.customer_email,
          license_key: data.license.key,
        });

        payload = {
          name: data.meta.customer_name,
          email: data.meta.customer_email,
          license_key: data.license.key,
        };
      } else {
        payload = {
          name: customer.name,
          email: customer.email,
          license_key: customer.license_key,
        };
      }

      return HttpResponse.success(res, "Login Successfully!", payload);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };
}

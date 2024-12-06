import IconRepository from "@app/repositories/icon.repository";
import { ErrorHandler, HttpResponse } from "@config/http";
import { NextFunction, Request, Response } from "express";

export default class IconController {
  private repo: IconRepository;

  constructor() {
    this.repo = new IconRepository();
  }

  import = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return HttpResponse.success(res, "Import Icon Successfully!", null);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };
}

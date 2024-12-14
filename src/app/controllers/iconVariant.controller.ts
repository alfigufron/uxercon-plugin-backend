import IconVariantRepository from "@app/repositories/iconVariant.repository";
import { ErrorHandler, HttpResponse } from "@config/http";
import {
  TPaginationQuery,
  paginationQuerySchema,
} from "@global/constant/http.constant";
import { ValidationMiddleware } from "@global/middleware/validation.middleware";
import PaginationUtils from "@utilities/pagination";
import { NextFunction, Request, Response } from "express";

export default class IconVariantController {
  private repo: IconVariantRepository;

  constructor() {
    this.repo = new IconVariantRepository();
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page, all } =
        ValidationMiddleware.validateQuery<TPaginationQuery>(
          req.query,
          paginationQuerySchema
        );

      let data;
      if (all === "true") {
        const [result, total] = await this.repo.findAndCount();
        data = { result, total };
      } else {
        data = await this.repo.findAndPaginate(limit, page);
      }

      const paginateData = PaginationUtils.pagination(
        data,
        all ? 1 : page,
        all ? data.total : limit
      );

      return HttpResponse.success(res, "Get List Category", paginateData);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };
}

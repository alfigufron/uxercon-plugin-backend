import IconRepository from "@app/repositories/icon.repository";
import IconCategoryRepository from "@app/repositories/iconCategory.repository";
import { ErrorHandler, HttpResponse } from "@config/http";
import {
  TPaginationQuery,
  paginationQuerySchema,
} from "@global/constant/http.constant";
import { ValidationMiddleware } from "@global/middleware/validation.middleware";
import PaginationUtils from "@utilities/pagination";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

type TListQuery = Partial<{
  variant: string;
  category: string;
  q: string;
}> &
  TPaginationQuery;

export default class IconController {
  private repo: IconRepository;
  private iconCategoryRepo: IconCategoryRepository;

  constructor() {
    this.repo = new IconRepository();
    this.iconCategoryRepo = new IconCategoryRepository();
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationSchema = Joi.object()
        .concat(paginationQuerySchema)
        .concat(
          Joi.object({
            variant: Joi.string()
              .optional()
              .valid("line", "duocolor", "solid", "duotone", "gestalt"),
          })
        )
        .concat(
          Joi.object({
            category: Joi.string().optional(),
          })
        )
        .concat(
          Joi.object({
            q: Joi.string().optional(),
          })
        );

      let {
        limit,
        page,
        variant,
        category,
        q: search,
      } = ValidationMiddleware.validateQuery<TListQuery>(
        req.query,
        validationSchema
      );

      if (variant) variant = variant.charAt(0).toUpperCase() + variant.slice(1);

      if (category) {
        const categoryExist = await this.iconCategoryRepo.count({
          where: {
            name: category,
          },
        });

        if (!categoryExist)
          throw new ErrorHandler("Category value invalid", null, 422);
      }

      const data = await this.repo.findAndPaginate(limit, page, {
        variant,
        category,
        name: search,
      });

      const paginateData = PaginationUtils.pagination(data, page, limit);

      return HttpResponse.success(res, "List Icon", paginateData);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };

  import = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return HttpResponse.success(res, "Import Icon Successfully!", null);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  };
}

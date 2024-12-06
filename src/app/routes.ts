import { Request, Response, Router } from "express";

import IconCategoryController from "./controllers/iconCategory.controller";

export default class AppRouter {
  public router: Router;

  private controller: IconCategoryController;

  constructor() {
    this.router = Router();
    this.controller = new IconCategoryController();

    this.initialize();
  }

  private initialize(): void {
    this.router.get("/health", (_req: Request, res: Response) =>
      res.send("Service OK!")
    );

    this.router.get("/v1/category", this.controller.list);
  }
}

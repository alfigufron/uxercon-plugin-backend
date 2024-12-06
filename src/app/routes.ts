import { Request, Response, Router } from "express";

import IconCategoryController from "./controllers/iconCategory.controller";
import IconController from "./controllers/icon.controller";

export default class AppRouter {
  public router: Router;

  private iconController: IconController;
  private iconCategoryController: IconCategoryController;

  constructor() {
    this.router = Router();
    this.iconCategoryController = new IconCategoryController();
    this.iconController = new IconController();

    this.initialize();
  }

  private initialize(): void {
    this.router.get("/health", (_req: Request, res: Response) =>
      res.send("Service OK!")
    );

    this.router.get("/v1/category", this.iconCategoryController.list);
    this.router.post("/v1/icon/import", this.iconController.import);
  }
}

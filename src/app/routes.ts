import { Request, Response, Router } from "express";

import IconCategoryController from "./controllers/iconCategory.controller";
import IconController from "./controllers/icon.controller";
import IconVariantController from "./controllers/iconVariant.controller";

export default class AppRouter {
  public router: Router;

  private iconController: IconController;
  private iconCategoryController: IconCategoryController;
  private iconVariantController: IconVariantController;

  constructor() {
    this.router = Router();
    this.iconController = new IconController();
    this.iconCategoryController = new IconCategoryController();
    this.iconVariantController = new IconVariantController();

    this.initialize();
  }

  private initialize(): void {
    this.router.get("/health", (_req: Request, res: Response) =>
      res.send("Service OK!")
    );

    this.router.get("/v1/category", this.iconCategoryController.list);
    this.router.get("/v1/variant", this.iconVariantController.list);

    this.router.get("/v1/icon", this.iconController.list);
    this.router.post("/v1/icon/import", this.iconController.import);
  }
}

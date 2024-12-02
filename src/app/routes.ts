import { Request, Response, Router } from "express";

export default class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initialize();
  }

  private initialize(): void {
    this.router.get("/health", (_req: Request, res: Response) =>
      res.send("Service OK!")
    );
  }
}

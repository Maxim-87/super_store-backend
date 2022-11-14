import Router from "express";

// @ts-ignore
const testRouter = new Router();

testRouter.get("/", (req: any, res: any) => {
  res.json({ test: "good" });
});

export default testRouter;

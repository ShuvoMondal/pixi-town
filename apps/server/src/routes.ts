import { Router } from "express";

const router: Router = Router();

router.get("/me", (req, res) => {
  res.json({
    user: req.user,
    session: req.session,
  });
});

export default router;

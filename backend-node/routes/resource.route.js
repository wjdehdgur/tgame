// 📄 backend-node/routes/resource.route.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/resource.controller");
const validate = require("../middlewares/validate");
const validator = require("../validators/resource.validator");

// ✅ 자원 전체 조회
router.get("/", ctrl.getAllResources);

// ✅ 자원 생산
router.post("/produce", validate(validator.produce), ctrl.produceResource);

// ✅ 자원 소비
router.post("/use", validate(validator.use), ctrl.useResource);

// ✅ 자원 저장량 증가
router.patch(
  "/increase-capacity",
  validate(validator.updateCapacity),
  ctrl.increaseCapacity
);

// ✅ 자원 저장량 감소
router.patch(
  "/decrease-capacity",
  validate(validator.updateCapacity),
  ctrl.decreaseCapacity
);

module.exports = router;

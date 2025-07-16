const express = require("express");
const router = express.Router();
const Resource = require("../models/resource");

// 모든 자원 조회
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "자원 조회 실패" });
  }
});

// 자원 생산 (증가)
router.post("/produce", async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (amount <= 0)
      return res.status(400).json({ error: "amount는 양수여야 합니다." });

    const resource = await Resource.findOne({ name });
    if (!resource)
      return res.status(404).json({ error: "자원이 존재하지 않습니다." });

    // 생산으로 자원 증가, 최대 저장량 초과 방지
    resource.amount = Math.min(resource.amount + amount, resource.maxStorage);
    await resource.save();

    res.json({ success: true, resource });
  } catch (err) {
    res.status(500).json({ error: "자원 생산 실패" });
  }
});

// 자원 소비 (감소)
router.post("/use", async (req, res) => {
  try {
    const { name, amount } = req.body;
    if (amount <= 0)
      return res.status(400).json({ error: "amount는 양수여야 합니다." });

    const resource = await Resource.findOne({ name });
    if (!resource)
      return res.status(404).json({ error: "자원이 존재하지 않습니다." });

    if (resource.amount < amount)
      return res.status(400).json({ error: "자원 부족" });

    resource.amount -= amount;
    await resource.save();

    res.json({ success: true, resource });
  } catch (err) {
    res.status(500).json({ error: "자원 소비 실패" });
  }
});

// 저장량 확장
router.patch("/increase-capacity", async (req, res) => {
  try {
    const { name, increaseBy } = req.body;
    if (increaseBy <= 0)
      return res.status(400).json({ error: "increaseBy는 양수여야 합니다." });

    const resource = await Resource.findOne({ name });
    if (!resource)
      return res.status(404).json({ error: "자원이 존재하지 않습니다." });

    resource.maxStorage += increaseBy;
    await resource.save();

    res.json({ success: true, resource });
  } catch (err) {
    res.status(500).json({ error: "저장량 확장 실패" });
  }
});

module.exports = router;

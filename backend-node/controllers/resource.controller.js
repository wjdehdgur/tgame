// 📄 backend-node/controllers/resource.controller.js

const resourceService = require("../services/resource.service");

// ... existing code ...

/**
 * 자원 전체 조회
 */
exports.getAllResources = async (req, res, next) => {
  try {
    const resources = await resourceService.getAllResources();
    res.json({ success: true, resources });
  } catch (err) {
    next(err);
  }
};

/**
 * 자원 생산
 */
exports.produceResource = async (req, res, next) => {
  try {
    const { name, amount } = req.body;
    const result = await resourceService.produceResource(name, amount);
    res.json({ success: true, resource: result });
  } catch (err) {
    next(err);
  }
};

/**
 * 자원 소비
 */
exports.useResource = async (req, res, next) => {
  try {
    const { name, amount } = req.body;
    const result = await resourceService.useResource(name, amount);
    res.json({ success: true, resource: result });
  } catch (err) {
    next(err);
  }
};

/**
 * 자원 저장량 증가
 */
exports.increaseCapacity = async (req, res, next) => {
  try {
    const { name, amount } = req.body;
    const result = await resourceService.adjustCapacity(name, amount);
    res.json({ success: true, resource: result });
  } catch (err) {
    next(err);
  }
};

/**
 * 자원 저장량 감소
 */
exports.decreaseCapacity = async (req, res, next) => {
  try {
    const { name, amount } = req.body;
    const result = await resourceService.adjustCapacity(name, -amount); // 감소는 음수로 전달
    res.json({ success: true, resource: result });
  } catch (err) {
    next(err);
  }
};

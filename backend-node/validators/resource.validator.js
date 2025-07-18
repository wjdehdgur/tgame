// 📄 backend-node/validators/resource.validator.js

const Joi = require("joi");

// 생산 요청 검증
exports.produce = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

// 소비 요청 검증
exports.use = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

// 저장량 조정 요청 검증 (증가/감소 공통)
exports.updateCapacity = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

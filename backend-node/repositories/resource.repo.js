// 📄 위치: backend-node/repositories/resource.repo.js

const Resource = require("../models/resource.model");

// 이름으로 자원 조회
exports.findByName = (name) => Resource.findOne({ name });

// 전체 자원 조회
exports.findAll = () => Resource.find({});

// 자원 저장
exports.save = (resource) => resource.save();

// 자원 개수 조회
exports.count = () => Resource.countDocuments({});

// 여러 자원 한번에 삽입
exports.insertMany = (resources) => Resource.insertMany(resources);

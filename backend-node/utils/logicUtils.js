// 📄 위치: backend-node/utils/logicUtils.js

// 조건이 true면 에러를 던짐
exports.throwIf = (condition, message) => {
  if (condition) throw new Error(message);
};

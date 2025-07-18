// 📄 위치: backend-node/utils/apiResponse.js

exports.successResponse = (res, data) => {
  return res.status(200).json({ success: true, data });
};

exports.errorResponse = (res, error) => {
  return res.status(500).json({ success: false, error });
};

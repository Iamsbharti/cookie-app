const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const logger = require("../library/logger");
exports.generateTokens = async (userdata, cb) => {
  logger.debug("Generate token");
  try {
    let token = {
      jwtid: shortid.generate(),
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
      sub: "authToken",
      iss: "kanbanBoard",
      data: userdata,
    };
    let generatedToken = {
      authToken: jwt.sign(token, process.env.TOKEN_SECRET),
    };
    cb(null, generatedToken);
  } catch (error) {
    logger.debug(`Error: ${error}`);
    cb(error, null);
  }
};

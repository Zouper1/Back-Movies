const { haddleHttpError } = require('../utils/haddleError');
const { tokenVerify } = require('../utils/handleJwt');
const { usersModel } = require('../models');

const authMiddleware = async (req, res, next) =>{

  try {

    if(!req.headers.authorization){
      haddleHttpError(res, "NOT_TOKEN", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop()
    const dataToken = await tokenVerify(token);

    if(!dataToken._id){
      haddleHttpError(res, "ERROR_ID_TOKEN", 401);
      return;
    }

    const user = await usersModel.findById(dataToken._id);
    req.user = user;

    next();
    
  } catch (error) {
    haddleHttpError(res, "NOT_SESSION", 401);
    
  }
}

module.exports = authMiddleware;
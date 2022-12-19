const { haddleHttpError } = require("../utils/haddleError");

const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role; //TODO: [ "user"]
    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    ); //TODO: ["user", "admin"] => true
    if (!checkValueRol) {
      haddleHttpError(res, "USER_NOT_PERMISSION", 403);
      return;
    }
    next();
  } catch (error) {
    haddleHttpError(
      res,
      "ERROR_PERMISSON",
      "No tienes permisos para realizar esta acción",
      403
    );
  }
};

module.exports = { checkRol };

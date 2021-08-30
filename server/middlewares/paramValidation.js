const joi = require("@hapi/joi");
const { formatResponse } = require("../library/formatResponse");
let options = { abortEarly: false };
const logger = require("../library/logger");

const loginParamValidation = (req, res, next) => {
  logger.info("Login Param Validation--check");
  let loginSchema = joi.object({
    loginId: joi.string().required(),
    password: joi.string().optional(),
  });

  let { error } = loginSchema.validate(req.body, options);
  logger.debug("login validation error:", error);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};

const recoverPwdValidation = (req, res, next) => {
  logger.info("Recovery Password validation");
  let recoverySchema = joi.object({
    email: joi.string().email().min(5).required(),
  });
  let { error } = recoverySchema.validate(req.query);
  if (error)
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          "Input Param Not Valid",
          error.details[0].message
        )
      );

  next();
};
const resetPwdValidation = (req, res, next) => {
  logger.info("reset pwd validation");
  let resetPwdSchema = joi.object({
    recoveryCode: joi.string().min(6).required(),
    email: joi.string().email().min(6).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  let { error } = resetPwdSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};

const signupParamValidation = (req, res, next) => {
  logger.info("signupParamValidation");
  let signUpSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().min(5).email().required(),
    mobile: joi.number().min(10).required(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .required(),
  });

  let { error } = signUpSchema.validate(req.body, options);
  logger.info("validation error", error);
  if (error) {
    let errors = [];
    error.details.map((err) => errors.push(err.message.split("is")[0]));
    return res
      .status(400)
      .json(
        formatResponse(
          true,
          400,
          `${errors.toString()} ${errors.length > 1 ? "are" : "is"} required`,
          errors
        )
      );
  }
  next();
};
const createCategoryValidation = (req, res, next) => {
  logger.info("Create Category Validation");
  let categorySchema = joi.object({
    userId: joi.string().min(4).required(),
    name: joi.string().min(8).required(),
    description: joi.string().min(8).required(),
    authToken: joi.string().optional(),
  });

  let { error } = categorySchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getCategoryValidation = (req, res, next) => {
  logger.info("Get Category Validation");
  let categorySchema = joi.object({
    userId: joi.string().min(4).required(),
  });

  let { error } = categorySchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const updateCategoryValidation = (req, res, next) => {
  logger.info("Update categrory validations");
  let updateCategorySchema = joi.object({
    categoryId: joi.string().required(),
    updates: joi.object().required(),
    userId: joi.string().required(),
  });
  let { error } = updateCategorySchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const createProductValidation = (req, res, next) => {
  logger.info("Create Product Validation");
  logger.debug("body validation:", req.body);
  let productSchema = joi.object({
    name: joi.string().min(4).required(),
    category: joi.string().min(4).required(),
    price: joi.number().min(4).required(),
    inStock: joi.boolean().min(4).required(),
    discount: joi.number().min(4).required(),
    description: joi.string().min(4).required(),
    stockQuantity: joi.number().required(),
    seller: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });

  let { error } = productSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const allProductValidation = (req, res, next) => {
  logger.info("all Product Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const productByIdValidation = (req, res, next) => {
  logger.info("product by id Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
    productId: joi.string().min(4).required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const upadteProductValidation = (req, res, next) => {
  logger.info("update product  Validation");
  let productSchema = joi.object({
    productId: joi.string().min(4).required(),
    updateOptions: joi.object().required(),
  });
  let { error } = productSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const deleteProductValidation = (req, res, next) => {
  logger.info("delete product Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).required(),
    productId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const searchProductValidation = (req, res, next) => {
  logger.info("search product Validation");
  let productSchema = joi.object({
    userId: joi.string().min(4).optional(),
    search: joi.string().required(),
  });
  let { error } = productSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const saveCartDetailsValidation = (req, res, next) => {
  logger.info("save cart Validation");
  let userCartSchema = joi.object({
    userId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userCartSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getCartValidation = (req, res, next) => {
  logger.info("get cart Validation");
  let userCartSchema = joi.object({
    userId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userCartSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const removeCartItemsValidation = (req, res, next) => {
  logger.info("Remove cart Items Validation");
  let userCartSchema = joi.object({
    userId: joi.string().min(4).required(),
    productIds: joi.string().optional(),
    operation: joi.string().min(3).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userCartSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const updateUserValidation = (req, res, next) => {
  logger.info("Update user Validation");
  let userSchema = joi.object({
    userId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const updateUserCartValidation = (req, res, next) => {
  logger.info("Update user cart Validation");
  let userSchema = joi.object({
    userId: joi.string().min(4).required(),
    productId: joi.string().min(4).required(),
    addedQuantity: joi.number().required(),
    ops: joi.string().required(),
    authToken: joi.string().optional(),
  });
  let { error } = userSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const placeOrderValidation = (req, res, next) => {
  logger.info("place order Validation");
  let userSchema = joi.object({
    userId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const orderHistoryValidation = (req, res, next) => {
  logger.info("get user order history Validation");
  let orderSchema = joi.object({
    userId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = orderSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const saveWishListValidation = (req, res, next) => {
  logger.info("save wishlist Validation");
  let userWishlistSchema = joi.object({
    userId: joi.string().min(4).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userWishlistSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const removeWishlistValidation = (req, res, next) => {
  logger.info("Remove wishlist Items Validation");
  let userWishlistSchema = joi.object({
    userId: joi.string().min(4).required(),
    productId: joi.string().optional(),
    operation: joi.string().min(3).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userWishlistSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const updateAddressValidation = (req, res, next) => {
  logger.info("update user address Validation");
  let userAddressSchema = joi.object({
    userId: joi.string().min(4).required(),
    addressId: joi.string().required(),
    operation: joi.string().min(3).required(),
    authToken: joi.string().optional(),
  });
  let { error } = userAddressSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
// offers
const createOfferValidation = (req, res, next) => {
  logger.info(`Create offer validations ${req.query}`);
  let createOfferSchema = joi.object({
    userId: joi.string().required(),
    offerName: joi.string().required(),
    discount: joi.number().min(1).required(),
    description: joi.string().required(),
    display: joi.boolean().required(),
    startDate: joi.string().optional(),
    endDate: joi.string().optional(),
    authToken: joi.string().optional(),
  });
  let { error } = createOfferSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const updateOfferValidation = (req, res, next) => {
  logger.info("Update offer validations");
  let updateOfferSchema = joi.object({
    offerId: joi.string().required(),
    updates: joi.object().required(),
    userId: joi.string().required(),
  });
  let { error } = updateOfferSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getOfferValidation = (req, res, next) => {
  logger.info("Update offer validations");
  let getOfferSchema = joi.object({
    userId: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = getOfferSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const removeOfferValidation = (req, res, next) => {
  logger.info("Update offer validations");
  let removeOfferSchema = joi.object({
    userId: joi.string().required(),
    offerId: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = removeOfferSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const deleteProductImgValidation = (req, res, next) => {
  logger.info("delete product image validations");
  let removeProductImgSchema = joi.object({
    userId: joi.string().required(),
    fileid: joi.string().required(),
    authToken: joi.string().required(),
  });
  let { error } = removeProductImgSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const feedbackValidation = (req, res, next) => {
  logger.info("feedback validations");
  let feedbackschema = joi.object({
    email: joi.string().required(),
    message: joi.string().required(),
  });
  let { error } = feedbackschema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getUserDetailsValidation = (req, res, next) => {
  logger.info("get user details validations");
  let userDetailsSchema = joi.object({
    userId: joi.string().required(),
    authToken: joi.string().optional(),
  });
  let { error } = userDetailsSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getAllOrdersValidation = (req, res, next) => {
  logger.info("get orders details validations");
  let ordersSchema = joi.object({
    userId: joi.string().required(),
    authToken: joi.string().optional(),
  });
  let { error } = ordersSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const updateOrderValidation = (req, res, next) => {
  logger.info("update orders details validations");
  let ordersSchema = joi.object({
    orderId: joi.string().required(),
    updates: joi.object().required(),
    userId: joi.string().required(),
    authToken: joi.string().optional(),
  });
  let { error } = ordersSchema.validate(req.body, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const deleteOrderValidation = (req, res, next) => {
  logger.info("delete orders details validations");
  let ordersSchema = joi.object({
    userId: joi.string().required(),
    userInfo: joi.string().required(),
    orderId: joi.string().required(),
    authToken: joi.string().optional(),
  });
  let { error } = ordersSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const searchOrderValidation = (req, res, next) => {
  logger.info("search order Validation");
  let orderSchema = joi.object({
    userId: joi.string().min(4).optional(),
    search: joi.string().required(),
    authToken: joi.string().optional(),
  });
  let { error } = orderSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getAllUsersValidation = (req, res, next) => {
  logger.info("get all users Validation");
  let userSchema = joi.object({
    userId: joi.string().min(4).optional(),
    authToken: joi.string().optional(),
  });
  let { error } = userSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
const getInvoiceValidation = (req, res, next) => {
  logger.info("get invoice Validation");
  let invoiceSchema = joi.object({
    userId: joi.string().min(4).required(),
    orderId: joi.string().required(),
  });
  let { error } = invoiceSchema.validate(req.query, options);
  if (error) {
    let errorMessage = [];
    error.details.map((err) => errorMessage.push(err.message));
    return res.json(formatResponse(true, 400, "InValid Input", errorMessage));
  }
  next();
};
module.exports = {
  signupParamValidation,
  loginParamValidation,
  recoverPwdValidation,
  resetPwdValidation,
  createCategoryValidation,
  getCategoryValidation,
  updateCategoryValidation,
  createProductValidation,
  allProductValidation,
  productByIdValidation,
  upadteProductValidation,
  deleteProductValidation,
  searchProductValidation,
  saveCartDetailsValidation,
  getCartValidation,
  removeCartItemsValidation,
  updateUserValidation,
  updateUserCartValidation,
  placeOrderValidation,
  orderHistoryValidation,
  saveWishListValidation,
  removeWishlistValidation,
  updateAddressValidation,
  createOfferValidation,
  updateOfferValidation,
  getOfferValidation,
  removeOfferValidation,
  deleteProductImgValidation,
  feedbackValidation,
  getUserDetailsValidation,
  getAllOrdersValidation,
  updateOrderValidation,
  deleteOrderValidation,
  searchOrderValidation,
  getAllUsersValidation,
  getInvoiceValidation,
};

const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const shopController = require("../controllers/shop-controller");
const {body} = require("express-validator");
const router = new Router();
const authMiddleware = require("../middleware/auth-middleware");
const checkRoleMiddleware = require("../middleware/checkRole-middleware");


//Auth routes

router.post("/registration", 
  body("email").isEmail(),
  body("password").isLength({min: 3, max: 32}),
  userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware,  userController.getUsers);


// Shop routes

router.get("/type",  shopController.getTypes);
router.post("/type", shopController.createType);
router.get("/products",  shopController.getProducts);
router.post("/products",  shopController.getTypedProducts);
router.get("/product/:id",  shopController.getProduct);
router.post("/product", shopController.createProduct);

module.exports = router;

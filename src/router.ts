import { Router } from "express"
import { body, oneOf } from "express-validator"
import { handleInput } from "./modules/middleware"
import { createProduct, deleteProduct, getOneProduct, getProducts } from "./handlers/product"


const router = Router()

/**
 * Products
 */

router.get("/product", getProducts)
router.get("/product/:id", getOneProduct)
router.put("/product/:id", body("name").isString(), handleInput, () => {})
router.post("/product", createProduct)
router.delete("/product", deleteProduct)

/**
 * Updates
 */

router.get("/update", () => {})
router.get("/update/:id", () => {})
router.put("/update/:id", 
body("title").optional, 
body("body").optional, 
 
oneOf([
    body('status').custom(value => ['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'].includes(value))
  ]),  
body("version").optional,  
() => {}
 )
router.post("/update", 
body("title").exists().isString(), 
body("body").exists().isString(),
body("body").exists().isString(), 
() => {})
router.delete("/update", () => {})


/**
 * Update points
 */ 

router.get("/updatepoint", () => {})
router.get("/updatepoint/:id", () => {})
router.put("/updatepoint/:id", 
body("name").optional().isString(), 
body("description").optional().isString(), 
() => {}
)
router.post("/updatepoint", 
body("name").exists().isString(), 
body("description").exists().isString(),
body("updateId").exists().isString(),
() => {}
)
router.delete("/updatepoint", () => {})


export default router

import { Router } from "express"
import { body, oneOf } from "express-validator"
import { handleInput } from "./modules/middleware"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product"
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from "./handlers/update"


const router = Router()

/**
 * Products
 */

router.get("/product", getProducts)
router.get("/product/:id", getOneProduct)
router.put("/product/:id", body("name").isString(), handleInput, updateProduct)
router.post("/product", createProduct)
router.delete("/product/:id", deleteProduct)

/**
 * Updates
 */

router.get("/update", getUpdates)
router.get("/update/:id", getOneUpdate)
router.put("/update/:id", 
// body("title").optional, 
// body("body").optional, 
 
// oneOf([
//     body('status').custom(value => ['IN_PROGRESS', 'SHIPPED', 'DEPRECATED'].includes(value))
//   ]),  
// body("version").optional,  
updateUpdate
 )
router.post("/update", 
body("title").exists().isString(), 
body("body").exists().isString(),
body("body").exists().isString(), 
createUpdate
)
router.delete("/update/:id", deleteUpdate)


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
router.use((err, req, res, next) =>{
  console.log(err)
  res.json({message: "In router handler"})
})

export default router

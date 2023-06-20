import { Router } from "express";
import { delelteUser, editUser, exportCsv, getEdituser, getOneUser, getUsers, userRegister, userSearch } from "../controllers/controller.js";
import { imageMiddleware } from "../middleware/multer.js";

const router = Router();

router.post('/register',imageMiddleware.single('profile'),userRegister);
router.get('/user',getUsers)
router.delete('/deleteuser',delelteUser)
router.get('/getEdituser',getEdituser);
router.get('/search',userSearch);
router.post('/edit/:userId',imageMiddleware.single('profile'),editUser);
router.get('/export/csv',exportCsv)
router.get('/getOneuser',getOneUser)

export default router;
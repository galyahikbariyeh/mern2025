const express = require('express');

const {getAllUsers,createUsers,getUsersByname,updateUser,deleteUser,LoginUser,authriz,Adminauthriz}=require('../controllers/userController')
const router  = express.Router()

router.get('/user',Adminauthriz,getAllUsers)
router.post('/create',createUsers)
router.post('/user',getUsersByname)
router.put('/updateUser/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)
router.post('/LoginUser',LoginUser)
router.get('/authriz',authriz)
router.get('/Adminauthriz',Adminauthriz)

module.exports=router;
const {Router}=require('express');
const router=Router();
const {PostUser,GetallUser,GetUserid,DeleteUser,PutUser}=require('../Controller/Usercontroller.js');

router.post('/user',PostUser);
router.get('/user',GetallUser);
router.get('/user/:id',GetUserid);
router.delete('/user/:id',DeleteUser);
router.put('/user/:id',PutUser);




module.exports = router;
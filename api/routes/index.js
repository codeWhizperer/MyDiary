const router = require('express').Router();


const Authentication = require('../controllers/auth')
const Auth = require('../middleware/verifyToken')
const Diary = require('../controllers/diary')

// path
router.post('/users/signup', Authentication.signup);

router.post('/users/login', Authentication.login);

router.post('/user/new', Auth.verifyToken, Diary.create);

router.put('/user/profile/update/:id', Auth.verifyToken, Diary.updateProfile);

router.get('/user/entry', Auth.verifyToken, Diary.getAll);

router.get('/user/entry/:id', Auth.verifyToken, Diary.getOne)

router.get('/user/profile/:id', Auth.verifyToken, Diary.getUserProfile)

router.patch('/user/entry/modify/:id', Auth.verifyToken, Diary.updateOne);

router.delete('/user/entry/delete/:id', Auth.verifyToken, Diary.deleteOne);



module.exports = router



            



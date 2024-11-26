const express = require('express');
const router =express.Router();
const {signin,signup} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const {
    addStudents,
    updateStudent,
    getStudent,
    deleteStudent,
    getAllStudent,
} = require('../controllers/studentController')
const {updateUser,getUserDetails} = require('../controllers/userController')

//auth routes
router.post('/signin',signin);
router.post('/signup',signup);


//Student Routes
router.post('/add',authMiddleware,addStudents);
router.put('/update/:seatNumber',authMiddleware,updateStudent);
router.get('/getStudent/:seatNumber',authMiddleware,getStudent);
router.delete('/deleteStudent/:seatNumber',authMiddleware,deleteStudent);
router.get('/allStudent',authMiddleware,getAllStudent)

router.put('/user', authMiddleware, updateUser );
router.get('/userdetail',authMiddleware,getUserDetails)

module.exports = router;
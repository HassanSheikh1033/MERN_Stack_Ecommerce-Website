const { Router } =  require('express')

const { registerUser, loginUser, getUser, getAuthors } = 
require('../controllers/userControllers')


const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAuthors)



module.exports = router;
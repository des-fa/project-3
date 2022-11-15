import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
router.post('/api/auth/signup', (await import('./auth/signup.js')).default)
router.post('/api/auth/login', (await import('./auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./auth/logout.js')).default)

// WELCOME
// router.get('/', (await import('./controllers/welcome.js')).default)

export default router

import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
router.post('/api/auth/signup', (await import('./api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./api/auth/logout.js')).default)

// API | MY USER | AUTH REQUIRED
router.get('/api/my/user', authenticateUser('json'), (await import('./api/my/user/show.js')).default)
router.put('/api/my/user/settings', authenticateUser('json'), (await import('./api/my/user/settings/update.js')).default)

// API | MY PROFILE | AUTH REQUIRED
router.post('/api/my/profile', authenticateUser('json'), (await import('./api/my/profile/create.js')).default)
router.get('/api/my/profile', authenticateUser('json'), (await import('./api/my/profile/show.js')).default)
router.put('/api/my/profile', authenticateUser('json'), (await import('./api/my/profile/update.js')).default)

export default router

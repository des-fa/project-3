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

// API | MY POSTS | AUTH REQUIRED
router.post('/api/my/posts', authenticateUser('json'), (await import('./api/my/posts/create.js')).default)
router.get('/api/my/posts', authenticateUser('json'), (await import('./api/my/posts/index.js')).default)
router.get('/api/my/posts/:id', authenticateUser('json'), (await import('./api/my/posts/show.js')).default)
router.put('/api/my/posts/:id', authenticateUser('json'), (await import('./api/my/posts/update.js')).default)
router.delete('/api/my/posts/:id', authenticateUser('json'), (await import('./api/my/posts/destroy.js')).default)

// API | MY EXPERIENCE | AUTH REQUIRED
router.post('/api/my/experiences', authenticateUser('json'), (await import('./api/my/experiences/create.js')).default)
// router.get('/api/my/experiences', authenticateUser('json'), (await import('./api/my/experiences/index.js')).default)
// router.get('/api/my/experiences/:id', authenticateUser('json'), (await import('./api/my/experiences/show.js')).default)
// router.put('/api/my/experiences/:id', authenticateUser('json'), (await import('./api/my/experiences/update.js')).default)
// router.delete('/api/my/experiences/:id', authenticateUser('json'), (await import('./api/my/experiences/2destroy.js')).default)

export default router

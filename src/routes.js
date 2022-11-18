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
router.get('/api/my/experiences', authenticateUser('json'), (await import('./api/my/experiences/index.js')).default)
router.get('/api/my/experiences/:id', authenticateUser('json'), (await import('./api/my/experiences/show.js')).default)
router.put('/api/my/experiences/:id', authenticateUser('json'), (await import('./api/my/experiences/update.js')).default)
router.delete('/api/my/experiences/:id', authenticateUser('json'), (await import('./api/my/experiences/destroy.js')).default)

// API | MY EDUCATION | AUTH REQUIRED
router.post('/api/my/educations', authenticateUser('json'), (await import('./api/my/educations/create.js')).default)
router.get('/api/my/educations', authenticateUser('json'), (await import('./api/my/educations/index.js')).default)
router.get('/api/my/educations/:id', authenticateUser('json'), (await import('./api/my/educations/show.js')).default)
router.put('/api/my/educations/:id', authenticateUser('json'), (await import('./api/my/educations/update.js')).default)
router.delete('/api/my/educations/:id', authenticateUser('json'), (await import('./api/my/educations/destroy.js')).default)

// API | MY CONNECTIONS | AUTH REQUIRED
router.post('/api/my/connections/following/:id', authenticateUser('json'), (await import('./api/my/connections/following/create.js')).default)
router.delete('/api/my/connections/following/:id', authenticateUser('json'), (await import('./api/my/connections/following/destroy.js')).default)
router.get('/api/my/connections/following', authenticateUser('json'), (await import('./api/my/connections/following/index.js')).default)

router.get('/api/my/connections/following/posts', authenticateUser('json'), (await import('./api/my/connections/following/posts/index.js')).default)

router.get('/api/my/connections/followers', authenticateUser('json'), (await import('./api/my/connections/followers/index.js')).default)

// API | USERS | AUTH REQUIRED
router.get('/api/users', authenticateUser('json'), (await import('./api/users/index.js')).default)
router.get('/api/users/:id', authenticateUser('json'), (await import('./api/users/show.js')).default)

// API | NOT FOUND
router.use('/api', (await import('./api/not-found.js')).default)

export default router

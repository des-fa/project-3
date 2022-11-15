import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const ApiMyPostsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      userId
    }

    const totalMyPosts = await prisma.post.count({ where })
    const foundMyPosts = await prisma.post.findMany({
      take,
      skip,
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json({
      posts: foundMyPosts,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyPosts / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyPostsIndex

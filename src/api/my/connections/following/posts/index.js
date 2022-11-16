import prisma from '../../../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../../../controllers/_helpers/handle-errors.js'
// want to find all the people I follow and their posts

const ApiMyConnectionsFollowingPostsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      user: {
        followedBy: {
          some: {
            followerId: userId
          }
        }
      }
    }

    const totalMyFollowingPosts = await prisma.post.count({ where })
    const foundMyFollowingPosts = await prisma.post.findMany({
      take,
      skip,
      where,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            fullName: true,
            avatar: true
          }
        }
      }
    })

    return res.status(200).json({
      followingPosts: foundMyFollowingPosts,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyFollowingPosts / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyConnectionsFollowingPostsIndex

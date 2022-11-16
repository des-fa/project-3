import prisma from '../../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../../controllers/_helpers/handle-errors.js'

const ApiMyConnectionsFollowingIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Pagination
    const take = 10
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      followerId: userId
    }

    const totalMyFollowing = await prisma.follows.count({ where })
    const foundMyFollowing = await prisma.follows.findMany({
      take,
      skip,
      where,
      orderBy: {
        followingId: 'asc'
      },
      include: {
        following: {
          select: {
            id: true,
            fullName: true,
            avatar: true,
            profile: {
              select: {
                currentJob: true,
                highestEducation: true
              }
            }
          }
        }
      }
    })

    return res.status(200).json({
      following: foundMyFollowing,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyFollowing / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyConnectionsFollowingIndex

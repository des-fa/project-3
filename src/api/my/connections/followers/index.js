import prisma from '../../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../../controllers/_helpers/handle-errors.js'

const ApiMyConnectionsFollowersIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      followingId: userId
    }

    const totalMyFollowers = await prisma.follows.count({ where })
    const foundMyFollowers = await prisma.follows.findMany({
      take,
      skip,
      where,
      orderBy: {
        followerId: 'asc'
      },
      include: {
        follower: {
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
      followers: foundMyFollowers,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyFollowers / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyConnectionsFollowersIndex

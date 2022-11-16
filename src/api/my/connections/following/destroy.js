import prisma from '../../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../../controllers/_helpers/handle-errors.js'

const ApiMyConnectionsFollowingDestroy = async (req, res) => {
  try {
    const { params: { id }, session: { user: { id: userId } } } = req

    const deletedFollowing = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: Number(id)
        }
        // AND: [
        //   {
        //     followingId: Number(id)
        //   },
        //   {
        //     followerId: userId
        //   }
        // ]
      },
      include: {
        following: {
          select: {
            id: true,
            fullName: true
          }
        }
      }
    })

    return res.status(200).json(deletedFollowing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyConnectionsFollowingDestroy

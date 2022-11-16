import prisma from '../../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../../controllers/_helpers/handle-errors.js'

const ApiMyConnectionsFollowingCreate = async (req, res) => {
  try {
    const { params: { id }, session: { user: { id: userId } } } = req
    // id=user's profile page you're on
    // userId=current logged in user

    const newFollowing = await prisma.follows.create({
      data: {
        follower: {
          connect: {
            id: userId
          }
        },
        following: {
          connect: {
            id: Number(id)
          }
        }
      }
    })
    return res.status(201).json(newFollowing)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyConnectionsFollowingCreate

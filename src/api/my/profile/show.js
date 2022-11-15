import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const ApiMyProfileShow = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    const foundProfile = await prisma.profile.findUnique({
      where: {
        userId
      },
      include: {
        user: {
          select: {
            fullName: true,
            avatar: true
          }
        }
      },
      rejectOnNotFound: true })
    return res.status(200).json(foundProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyProfileShow

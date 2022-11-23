import _ from 'lodash'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const ApiMyUserShow = async (req, res) => {
  try {
    const { session: { user: { id } } } = req

    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        profile: true,
        following: true
      },
      rejectOnNotFound: true
    })
    return res.status(200).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyUserShow

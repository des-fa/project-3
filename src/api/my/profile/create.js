import yup from 'yup'
import _ from 'lodash'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const createSchema = yup.object({
  currentJob: yup.string().required(),
  highestEducation: yup.string().required(),
  about: yup.string().required()
})

const ApiMyProfileCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    // const userId = req.session.user.id
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })

    const foundProfile = await prisma.profile.findFirst({
      where: {
        userId
      }
    })

    const newProfile = foundProfile || await prisma.profile.create({
      data: {
        ...verifiedData,
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        user: true
      }
    })

    return res.status(201).json(_.omit(newProfile, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyProfileCreate

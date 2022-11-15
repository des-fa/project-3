import yup from 'yup'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const updateSchema = yup.object({
  currentJob: yup.string().required(),
  highestEducation: yup.string().required(),
  about: yup.string().required()
})

const ApiMyProfileUpdate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    // const foundPost = await prisma.post.findFirst({
    //   where: { entryId: Number(id) }
    // })
    const updatedProfile = await prisma.profile.update({
      where: { userId },
      data: {
        ...verifiedData
      }
    })
    return res.status(200).json(updatedProfile)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyProfileUpdate

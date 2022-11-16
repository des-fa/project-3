import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const ApiMyExperiencesDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedExperience = await prisma.experience.delete({
      where: { id: Number(id) }
    })
    return res.status(200).json(deletedExperience)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  ApiMyExperiencesDestroy
]

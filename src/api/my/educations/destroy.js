import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const ApiMyEducationsDestroy = async (req, res) => {
  try {
    const { params: { id } } = req
    const deletedEducation = await prisma.education.delete({
      where: { id: Number(id) }
    })
    return res.status(200).json(deletedEducation)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  ApiMyEducationsDestroy
]

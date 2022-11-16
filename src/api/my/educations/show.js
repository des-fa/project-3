import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const ApiMyEducationsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundEducation = await prisma.education.findUnique({ where: { id: Number(id) },
      rejectOnNotFound: true })
    return res.status(200).json(foundEducation)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  ApiMyEducationsShow
]

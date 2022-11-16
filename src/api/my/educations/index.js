import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const ApiMyEducationsIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      userId
    }

    const totalMyEducations = await prisma.education.count({ where })
    const foundMyEducations = await prisma.education.findMany({
      take,
      skip,
      where,
      orderBy: {
        startYear: 'desc'
      }
    })

    return res.status(200).json({
      educations: foundMyEducations,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyEducations / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyEducationsIndex

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const ApiMyExperiencesIndex = async (req, res) => {
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

    const totalMyExperiences = await prisma.experience.count({ where })
    const foundMyExperiences = await prisma.experience.findMany({
      take,
      skip,
      where,
      orderBy: {
        startYear: 'desc'
      }
    })

    return res.status(200).json({
      experiences: foundMyExperiences,
      meta: { currentPage: page, totalPages: Math.ceil(totalMyExperiences / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyExperiencesIndex

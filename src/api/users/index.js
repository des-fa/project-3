import prisma from '../../controllers/_helpers/prisma.js'
import handleErrors from '../../controllers/_helpers/handle-errors.js'

const ApiUsersIndex = async (req, res) => {
  try {
    const { session: { user: { id: userId } } } = req
    // Filters
    const q = req.query.q || ''

    // Pagination
    const take = 5
    const page = Number(req.query.page || '1')
    const skip = (page - 1) * take

    // Common Where Query
    const where = {
      NOT: {
        id: {
          equals: userId
        }
      },
      OR: [
        {
          fullName: {
            contains: q,
            mode: 'insensitive'
          }
        }, {
          profile: {
            currentJob: {
              contains: q,
              mode: 'insensitive'
            }

          }
        }, {
          profile: {
            highestEducation: {
              contains: q,
              mode: 'insensitive'
            }

          }
        }, {
          experiences: {
            some: {
              job: {
                contains: q,
                mode: 'insensitive'
              }
            }
          }
        }, {
          experiences: {
            some: {
              company: {
                contains: q,
                mode: 'insensitive'
              }
            }
          }
        }, {
          educations: {
            some: {
              school: {
                contains: q,
                mode: 'insensitive'
              }
            }
          }
        }, {
          educations: {
            some: {
              qualification: {
                contains: q,
                mode: 'insensitive'
              }
            }
          }
        }
      ]
    }
    // search  profile:current job
    const totalUsers = await prisma.user.count({ where })
    const foundUsers = await prisma.user.findMany({
      take,
      skip,
      where,
      orderBy: {
        id: 'asc'
      },
      select: {
        id: true,
        fullName: true,
        avatar: true,
        profile: {
          select: {
            currentJob: true,
            highestEducation: true
          }
        }
      }
    })

    return res.status(200).json({
      users: foundUsers,
      meta: { currentPage: page, totalPages: Math.ceil(totalUsers / take) }
    })
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiUsersIndex

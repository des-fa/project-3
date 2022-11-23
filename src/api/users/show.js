import prisma from '../../controllers/_helpers/prisma.js'
import handleErrors from '../../controllers/_helpers/handle-errors.js'

const ApiUsersShow = async (req, res) => {
  try {
    const { params: { id }, session: { user: { id: currentUserId } = {} } = {} } = req

    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatar: true,
        profile: {
          select: {
            currentJob: true,
            highestEducation: true,
            about: true
          }
        },
        posts: {
          select: {
            createdAt: true,
            content: true,
            image: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        experiences: {
          select: {
            job: true,
            company: true,
            startYear: true,
            endYear: true,
            description: true
          },
          orderBy: {
            startYear: 'desc'
          }
        },
        educations: {
          select: {
            school: true,
            qualification: true,
            startYear: true,
            endYear: true
          },
          orderBy: {
            startYear: 'desc'
          }
        },
        ...(currentUserId ? {
          followedBy: {
            where: {
              followerId: currentUserId
            }
          }
        } : {}),
        ...(currentUserId ? {
          following: {
            where: {
              followingId: currentUserId
            }
          }
        } : {})
      },
      rejectOnNotFound: true })
    return res.status(200).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiUsersShow

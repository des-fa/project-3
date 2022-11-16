import prisma from '../../controllers/_helpers/prisma.js'
import handleErrors from '../../controllers/_helpers/handle-errors.js'

const ApiUsersShow = async (req, res) => {
  try {
    const { params: { id } } = req

    const foundUser = await prisma.user.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
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
          }
        },
        experiences: {
          select: {
            job: true,
            company: true,
            startYear: true,
            endYear: true,
            description: true
          }
        },
        educations: {
          select: {
            school: true,
            qualification: true,
            startYear: true,
            endYear: true
          }
        }
      },
      rejectOnNotFound: true })
    return res.status(200).json(foundUser)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiUsersShow

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const ApiMyPostsShow = async (req, res) => {
  try {
    const { params: { id } } = req
    const foundPost = await prisma.post.findUnique({ where: { id: Number(id) },
      rejectOnNotFound: true })
    return res.status(200).json(foundPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  ApiMyPostsShow
]

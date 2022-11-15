import yup from 'yup'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'
import uploadFileAsync from '../../../controllers/_helpers/upload-file.js'

const updateSchema = yup.object({
  content: yup.string().required(),
  image: yup.mixed()
})

const ApiMyPostsUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })

    uploadFileAsync(verifiedData, req)

    const dataToSave = {
      content: verifiedData.content
    }

    if (verifiedData.image) {
      dataToSave.image = verifiedData.image
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...verifiedData
      }
    })
    return res.status(200).json(updatedPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  ApiMyPostsUpdate
]

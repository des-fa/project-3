import yup from 'yup'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import uploadFileAsync from '../../../controllers/_helpers/upload-file.js'

const createSchema = yup.object({
  content: yup.string().required(),
  image: yup.mixed()
  // .transform((value) => (value || ''))

})

const ApiMyPostsCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })

    await uploadFileAsync(verifiedData, req)

    const dataToSave = {
      content: verifiedData.content
    }

    if (verifiedData.image) {
      dataToSave.image = verifiedData.image
    }

    const newPost = await prisma.post.create({ data: { ...dataToSave, userId } })
    return res.status(201).json(newPost)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyPostsCreate

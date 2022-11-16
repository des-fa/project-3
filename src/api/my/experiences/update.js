import yup from 'yup'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'
import checkOwnership from './_check-ownership.js'

const updateSchema = yup.object({
  job: yup.string().required(),
  company: yup.string().required(),
  startYear: yup.number().integer().test('len', 'Must be exactly 4 numbers', (val) => val && val.toString().length === 4).required(),
  endYear: yup
    .number()
    .integer()
    .nullable(true)
    .transform((value) => (value || null))
    .test('len', 'Must be exactly 4 numbers', (val) => !val || val.toString().length === 4),
  description: yup.string().required()
})

const ApiMyExperiencesUpdate = async (req, res) => {
  try {
    const { params: { id }, body } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })

    const updatedExperience = await prisma.experience.update({
      where: { id: Number(id) },
      data: {
        ...verifiedData
      }
    })
    return res.status(200).json(updatedExperience)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default [
  checkOwnership,
  ApiMyExperiencesUpdate
]

import yup from 'yup'

import prisma from '../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../controllers/_helpers/handle-errors.js'

const createSchema = yup.object({
  job: yup.string().required(),
  company: yup.string().required(),
  startYear: yup.number().integer().test('len', 'Must be exactly 4 numbers', (val) => val && val.toString().length === 4).required(),
  endYear: yup.number().integer().test('len', 'Must be exactly 4 numbers', (val) => !val || val.toString().length === 4),
  description: yup.string().required()
})

const ApiMyExperiencesCreate = async (req, res) => {
  try {
    const { body, session: { user: { id: userId } } } = req
    const verifiedData = await createSchema.validate(body, { abortEarly: false, stripUnknown: true })

    const newExperience = await prisma.experience.create({
      data: {
        ...verifiedData,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
    return res.status(201).json(newExperience)
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyExperiencesCreate

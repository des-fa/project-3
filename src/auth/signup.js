import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../controllers/_helpers/prisma.js'
import handleErrors from '../controllers/_helpers/handle-errors.js'
import uploadFileAsync from '../controllers/_helpers/upload-file.js'

const signupSchema = yup.object({
  email: yup.string().email().required().test({
    message: () => 'Email already exists',
    test: async (value) => {
      try {
        await prisma.user.findUnique({ where: { email: value }, rejectOnNotFound: true })
        return false
      } catch (err) {
        return true
      }
    }
  }),
  fullName: yup.string()
    .min(6, 'Minimum 2 characters')
    .max(15, 'Maximum 15 characters')
    .required(),
  password: yup.string().min(6, 'Minimum 6 characters').required(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  avatar: yup.mixed().required()
})

const controllersApiAuthSignup = async (req, res) => {
  try {
    const { body } = req
    const verifiedData = await signupSchema.validate(body, { abortEarly: false, stripUnknown: true })

    uploadFileAsync(verifiedData, req)

    const dataToSave = {
      email: verifiedData.email,
      fullName: verifiedData.fullName,
      passwordHash: await bcrypt.hash(verifiedData.password, 10),
      avatar: verifiedData.avatar
    }
    const newUser = await prisma.user.create({ data: dataToSave })

    req.session.user = { id: newUser.id }
    await req.session.save()

    return res.status(201).json(_.omit(newUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default controllersApiAuthSignup

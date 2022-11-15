import yup from 'yup'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import prisma from '../../../../controllers/_helpers/prisma.js'
import handleErrors from '../../../../controllers/_helpers/handle-errors.js'
import uploadFileAsync from '../../../../controllers/_helpers/upload-file.js'

const updateSchema = yup.object({
  email: yup.string().email().test({
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
  fullName: yup.string().min(2, 'Minimum 2 characters').max(15, 'Maximum 15 characters'),
  password: yup.string().test(
    'empty-or-6-characters-check',
    'Password must be at least 6 characters',
    (password) => !password || password.length >= 6
  ),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  avatar: yup.mixed()
})

const ApiMyUserSettingsUpdate = async (req, res) => {
  try {
    const { body, session: { user: { id } } } = req
    const verifiedData = await updateSchema.validate(body, { abortEarly: false, stripUnknown: true })
    await uploadFileAsync(verifiedData, req)

    const dataToSave = {
    }

    if (verifiedData.email) {
      dataToSave.email = verifiedData.email
    }

    if (verifiedData.fullName) {
      dataToSave.fullName = verifiedData.fullName
    }

    if (verifiedData.password) {
      dataToSave.passwordHash = await bcrypt.hash(verifiedData.password, 10)
    }

    if (verifiedData.avatar) {
      dataToSave.avatar = verifiedData.avatar
    }

    const foundUser = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToSave
    })
    return res.status(200).json(_.omit(foundUser, ['passwordHash']))
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiMyUserSettingsUpdate

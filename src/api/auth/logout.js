import handleErrors from '../../controllers/_helpers/handle-errors.js'

const ApiAuth = async (req, res) => {
  try {
    await req.session.destroy()

    return res.status(200).json('Successfully Logged Out!')
  } catch (err) {
    return handleErrors(res, err)
  }
}

export default ApiAuth

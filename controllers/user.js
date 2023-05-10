const userModel = require('../models/userModel');
const { default: mongoose } = require('mongoose');

exports.resetPassword = async (req, res) => {
  let { username, newPassword, otp } = req.body

  let error_message = `please enter`

  if (!username) {
      error_message += `, email`
  }
  if (!newPassword) {
      error_message += `, password`
  }
  if (!otp) {
      error_message += `, otp`
  }

  if (error_message !== "please enter") {
      return res.json({
          success: false,
          message: error_message
      })
  }

  const isUserFound = await userModel.findOne({ email: username })
  console.log(isUserFound)
  if (!isUserFound) {
      return res.json({
          success: false,
          message: "user not registered please register"
      })
  }

  const isValidOtp = await otpModel.findOne({ email: username }).sort({ _id: -1 })
      .then(async (success) => {
          if (!success) {
              return res.json({
                  success: false,
                  message: `record not found`
              })
          }
          else {
              if (otp == success.otp && success.validTill > Date.now()) {
                  const hashedNewPassword = await bcrypt.hash(newPassword, 10)
                  console.log("hashedNewPassword ==>", hashedNewPassword)
                  console.log("newPassword ==>", newPassword)
                  console.log("Usrname ==>", username)
                  await userModel.findByIdAndUpdate({ _id: isUserFound._id },
                      {
                          $set: {
                              password: hashedNewPassword
                          }
                      })
                      .then((success) => {
                          console.log(success)
                          if (success) {
                              return res.json({
                                  success: true,
                                  message: "password changed successfully"
                              })
                          }
                          x
                      })
                      .catch((error) => {
                          return res.json({
                              success: false,
                              message: "error while changing password"
                          })
                      })
              }
              else if (otp == success.otp && success.validTill < Date.now()) {
                  return res.json({
                      success: false,
                      message: "otp expired"
                  })
              }
              else {
                  return res.json({
                      success: false,
                      message: "otp not matched"
                  })
              }
          }
      })
      .catch((error) => {
          return res.json({
              success: false,
              message: "something went wrong", error
          })
      })

  console.log(isValidOtp)

}

exports.isUserExist = async (req, res) => {
  let { username } = req.body

  let error_message = `please enter`

  if (!username) {
      error_message += `, email`
  }

  if (error_message !== "please enter") {
      return res.json({
          success: false,
          message: error_message
      })
  }

  const isUserFound = await userModel.findOne({ email: username })
  if (!isUserFound) {
      return res.json({
          success: false,
          message: "email not registered"
      })
  }
  else {
      return res.json({
          success: true,
          message: "user found"
      })
  }

}

exports.updateUser = async (req, res) => {
  const { userId } = req.params
  const updateUser = req.body

  if (!userId) {
      return res.json({
          success: false,
          message: `please provide userId`
      })
  }

  const isUserExist = await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
  if (!isUserExist) {
      return res.json({
          success: false,
          message: `please provide valid userId`
      })
  }

  await userModel.findOneAndUpdate({_id:mongoose.Types.ObjectId(userId)},
  {
      $set:updateUser
  },
  {returnOriginal:false})
  .then((success) => {
      return res.json({
          success: true,
          message: `user details updated`,
          data: success
      })
  })
  .catch((error) => {
      return res.json({
          success: false,
          message: "something went wrong", error
      })
  })
}

exports.getById = async (req, res) => {

  const { userId } = req.params

  if (!userId) {
      return res.json({
          success: false,
          message: `please provide userId`
      })
  }

  await userModel.findOne({ _id: mongoose.Types.ObjectId(userId) })
      .then((success) => {
          return res.json({
              success: true,
              message: `user details`,
              data: success
          })
      })
      .catch((error) => {
          return res.json({
              success: false,
              message: "something went wrong", error
          })
      })
}
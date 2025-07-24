import {
  testingService,
  registerUserService,
  loginUserService,
  sendOtpService,
  verifyOtpService,
  changePasswordService,
  getUserProfileService
} from "../services/AuthServices.js";

export const testing = async (req, res, next) => {
  try {
    const response = await testingService();
    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, nic, email, password } = req.body;

    const response = await registerUserService({
      name,
      nic,
      email,
      password,
    });

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const response = await loginUserService({
      email,
      password,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  try {
    const response = await sendOtpService(email);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;
  try {
    const response = await verifyOtpService({ email, otp });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const response = await changePasswordService({
      email,
      password,
      confirmPassword,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const _id = req.user.id; // Extract user ID from AuthMiddleware
    console.log("id:", _id);
    const response = await getUserProfileService(_id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
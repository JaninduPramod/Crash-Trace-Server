import { CustomError } from "../middlewares/ErrorMiddleware.js";
import User from "../models/User.js";
import OTP from "../models/Otp.js";
import { ApiResponse } from "../response/ApiResponse.js";
import { generateToken } from "../utilities/GenerateToken.js";
import sendMail from "../utilities/SendMail.js";
import generateOtp from "../utilities/GenerateOtp.js";

export const testingService = async () => {
  let responseType = "failed";

  if (responseType == "success") {
    return "Test successful ...";
  } else if (responseType == "failed") {
    throw new CustomError("Test failed !!!", 401);
  } else {
    throw new CustomError("Unknown Test Response", 500);
  }
};

export const registerUserService = async (data) => {
  if ((data.name && data.nic && data.email && data.password) == "") {
    throw new CustomError("fields must not be empty !!!", 401);
  }
  try {
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new CustomError("Email already registered!", 200);
    }
    // Create new user
    const user = new User({
      name: data.name,
      nic: data.nic,
      email: data.email,
      password: data.password,
    });
    const response = await user.save();
    return new ApiResponse(response, "User registered successfully", true);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError("Error Registering User !!!", 500);
  }
};

export const loginUserService = async (data) => {
  if (!data.email || !data.password) {
    throw new CustomError("fields must not be empty !!!", 200);
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new CustomError("Invalid email or password!", 200);
    }

    const isMatch = await user.matchPassword(data.password);
    if (!isMatch) {
      throw new CustomError("Invalid email or password!", 200);
    }
    // Generate token
    const token = generateToken(user._id);

    return new ApiResponse(
      { token, role: user.role },
      "Login successful",
      true
    );
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError("Error Login User !!!", 500);
  }
};

export const sendOtpService = async (email) => {
  if (email == "") {
    throw new CustomError("fields must not be empty !!!", 200);
  }
  try {
    const otp = generateOtp(4);
    const subject = "Your OTP Code";
    const html = `
    <p>Your OTP code is: <strong>${otp}</strong></p><br>
    <button>Verify</button>
    
    `;

    const ExistingOTP = await OTP.findOne({ email });
    const EmailExists = await User.findOne({ email });
    if (!EmailExists) {
      throw new CustomError("Email not registered!", 200);
    }

    if (!ExistingOTP) {
      await OTP.create({ email, otp });

      await sendMail({
        to: email,
        subject,
        html,
      });
      return `OTP sent successfully to ${email}`;
    } else {
      ExistingOTP.otp = otp;
      ExistingOTP.save();
      await sendMail({
        to: email,
        subject,
        html,
      });

      return new ApiResponse(null, `New OTP sent successfully to ${email}`, true);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError("Error sendinfg OTP !!!", 200);
  }
};

export const verifyOtpService = async (data) => {
  const { email, otp } = data;

  console.log("Email:", email);
  console.log("OTP:", otp);

  if ((email && otp) == "") {
    throw new CustomError("fields must not be empty !!!", 200);
  }
  try {
    const otpExists = await OTP.findOne({ email });
    if (!otpExists) {
      throw new CustomError("No OTP found for the Email !!", 200);
    }

    if (otpExists.otp !== otp) {
      throw new CustomError("OTP is incorrect !!", 200);
    } else {
      await OTP.deleteOne({ email });
      return new ApiResponse(null, "OTP verified Successfully ...", true);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Error verifying OTP !!! " + error.message, 500);
  }
};

export const changePasswordService = async (data) => {
  const { email, password, confirmPassword } = data;
  if ((email && password && confirmPassword) == "") {
    throw new CustomError("fields must not be empty !!!", 200);
  }
  if (password !== confirmPassword) {
    throw new CustomError("Passwords are not same !!!", 200);
  }
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("User not found with this email!", 200);
    }
    // Set new password and save
    user.password = data.password;
    await user.save();
    return new ApiResponse(null, "Password changed successfully", true);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }

    throw new CustomError("Failed to change password !!!", 500);
  }
};

export const getUserProfileService = async (_id) => {
  try {
    const user = await User.findById(_id).select("-password -createdAt -__v -_id"); 
    if (!user) {
      throw new CustomError("User not found", 200);
    }
    return new ApiResponse(user, "User profile fetched successfully", true);
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Failed to fetch user profile", 500);
  }
};
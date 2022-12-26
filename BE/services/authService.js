const bcrypt = require("bcryptjs");
const authModel = require("../models/authModel");
const { saltRounds } = require("../config/index");
const {
  GenerateToken,
  AuthenticationError,
  validateEmail
} = require("../utils/index");
const sendMail = require("../utils/sendMail");
const sendMailReset = require("../utils/sendMailReset");
const { CLIENT_URL } = require("../config/index");
const { hexEncode, hexDecode } = require("../utils/hexToString");

exports.LoginLocal = async (user) => {
  // Check email is verify or not
  if (!user.is_activated) {
    return {
      ReturnCode: AuthenticationError.Email_Not_Verify,
      Message:
        "Your email is not verify. Please verify your email before sign in!"
    };
  }

  // Check email
  if (validateEmail(user.email)) {
    const token = GenerateToken(user.id, user.email, "local");

    return {
      ReturnCode: 1,
      Message: "Sign in successfully.",
      User: {
        token: token,
        provider: "local"
      }
    };
  }
  return {
    ReturnCode: AuthenticationError.Email_Not_Valid,
    Message: "Your email is not valid!"
  };
};

exports.Register = async (user) => {
  try {
    if (validateEmail(user.email)) {
      let account = await authModel.getUserByProvider(user.email, "local");

      if (account && account.email === user.email) {
        return {
          ReturnCode: AuthenticationError.Account_Already_Exist,
          Message: "This email is already sign up. Please choose another email!"
        };
      }

      bcrypt.genSalt(parseInt(saltRounds), async function (err, salt) {
        let pwdHashed = await bcrypt.hash(user.password, salt);
        let account = {
          username: user.username,
          email: user.email,
          password: pwdHashed,
          external_id: null,
          is_activated: false,
          provider: "local"
        };
        const newUser = await authModel.add(account);

        // Send email to verify
        let tokenEmail = hexEncode(newUser.email);
        let url = `${CLIENT_URL}/${newUser.id}/verify/${tokenEmail}`;
        await sendMail(newUser.email, newUser.username, url);
      });

      return {
        ReturnCode: 1,
        Message: "Sign up successfully."
      };
    } else {
      return {
        ReturnCode: AuthenticationError.Email_Not_Valid,
        Message: "Your email is not valid."
      };
    }
  } catch (error) {
    return {
      ReturnCode: AuthenticationError.Error,
      Message: "Something is wrong. Please sign up again!"
    };
  }
};

exports.CheckEmailVerified = async (req) => {
  const user = await authModel.getUserByID(req.params.id);
  if (!user)
    return {
      ReturnCode: AuthenticationError.Error,
      Message: "Invalid link"
    };

  const challengeResult =
    hexDecode(req.params.token) === user.email && user.is_activated === false;

  if (!challengeResult)
    return {
      ReturnCode: AuthenticationError.Error,
      Message: "Invalid link"
    };

  const userUpdate = await authModel.update(user.id, { is_activated: true });

  if (userUpdate) {
    return {
      ReturnCode: 1,
      Message: "Email verified successfully"
    };
  }
  return {
    ReturnCode: AuthenticationError.Error,
    Message: "Invalid link"
  };
};

exports.LoginGoogle = async (user) => {
  let account = await authModel.getUserByProvider(user.email, "google");
  let token = "";

  if (!account) {
    let accountAdd = {
      username: user.name,
      email: user.email,
      password: null,
      external_id: user.googleId,
      is_activated: true,
      provider: "google"
    };
    const newUser = await authModel.add(accountAdd);

    token = GenerateToken(newUser.id, newUser.email, newUser.provider);
  } else {
    token = GenerateToken(account.id, account.email, account.provider);
  }

  return {
    ReturnCode: 1,
    Message: "Sign in Google successfully!",
    User: {
      token: token,
      provider: "google"
    }
  };
};

exports.ForgotPass = async (email) => {
  let account = await authModel.getUserByProvider(email, "local");

  if (!account) {
    return {
      ReturnCode: AuthenticationError.Account_Not_Exist,
      Message: "Your email is not exist!"
    };
  }

  let tokenEmail = hexEncode(account.email);
  let url = `${CLIENT_URL}/resetpass/${tokenEmail}`;
  await sendMailReset(account.email, account.username, url);

  return {
    ReturnCode: 1,
    Message: "Your email is exist!"
  };
};

exports.ResetPass = async (req) => {
  const { passwordReset, email } = req;

  let account = await authModel.getUserByProvider(email, "local");

  if (account) {
    bcrypt.genSalt(parseInt(saltRounds), async function (err, salt) {
      let pwdHashed = await bcrypt.hash(passwordReset.password, salt);

      await authModel.resetPass(account.id, {
        password: pwdHashed
      });
    });

    return {
      ReturnCode: 1,
      Message: "Your password is reset successfully!"
    };
  }
};

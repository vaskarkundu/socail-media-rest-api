exports.ForgotPassword = (user) => {
  return {
    from: "Excited User <me@samples.mailgun.org>",
    to: `${user.name} <${user.local.email}>`,
    subject: "Account Activation Link",
    html: `<h2> Please click on the given link to reset your password</h2>
                  <p>${user.resetPasswordCode}</p>`,
  };
};

exports.VerifyRegister = (user) => {
  return {
    from: "Excited User <me@samples.mailgun.org>",
    to: `${user.name} <${user.email}>`,
    subject: "Account Activation Link",
    html: `<h2> Please click on the given link to reset your password</h2>
                  <p>${user.verifyCode}</p>`,
  };
};

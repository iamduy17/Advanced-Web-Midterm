const nodemailer = require("nodemailer");
const { EmailInfo } = require("../config/index");

const emailHTML = (email, url) => {
  return `<!DOCTYPE html>
	<html lang="en">
	<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	</head>
	<body style="font-family:'Work Sans',sans-serif;background: #FAF7F0;padding:40px;">
	<table cellspacing="0" cellpadding="0" align="center">
	<tbody>
	<tr>
	<td valign=“top” style="height:600px;padding: 0 40px;border:1px solid #98A8F8;border-radius:20px;" bgcolor="#ffffff">
	<table cellspacing="0" cellpadding="0" align="center" style="font-family:'Work Sans',sans-serif;"  >
	<tbody>
	<tr>
	<td align="center">
	<img src="https://cdn-icons-png.flaticon.com/256/3487/3487761.png" alt="email">
	</td>                               
	</tr>
	<tr>
	<td align="center">
	<h2 style="margin-top:2rem!important;font-size:30px!important;">Collaborator Invitation</h2>
	</td>
	</tr>
	<tr>
	<td align="center">
	<p style="width:600px!important;font-size:20px!important;text-align:center!important;letter-spacing:1px!important;margin-bottom:2rem!important;">Hey ${email}, you have an invitation to become a collaborator. Simply click the big blue button below to become a collaborator.</p>
	</td>
	</tr>
	<tr>
	<td align="center">
	<a href="${url}" style="text-decoration:none!important;border:1px solid #98A8F8!important;border-radius: 5px!important;background-color:#98A8F8!important;font-size:25px!important;color:white!important;padding:10px 15px!important;cursor:pointer!important;">Let's join now!</a>
	</td>
	</tr>
	</tbody>
	</table>
	</td>
	</tr>
	</tbody>
	</table>
	</body>
	</html>`;
};

module.exports = async (email, url) => {
  try {
    const transporter = nodemailer.createTransport({
      host: EmailInfo.EMAIL_HOST,
      service: EmailInfo.EMAIL_SERVICE,
      port: Number(EmailInfo.EMAIL_PORT),
      secure: true,
      auth: {
        user: EmailInfo.EMAIL_USER,
        pass: EmailInfo.EMAIL_PASS
      }
    });

    const htmlText = emailHTML(email, url);
    await transporter.sendMail({
      from: {
        name: "DND Group",
        address: EmailInfo.EMAIL_USER
      },
      to: email,
      subject: "Confirm your email address",
      html: htmlText
    });
  } catch (error) {
    return error;
  }
};

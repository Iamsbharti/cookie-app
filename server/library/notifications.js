const { formatResponse } = require("../library/formatResponse");
const nodemailer = require("nodemailer");
const logger = require("../library/logger");
const Mailgen = require("mailgen");
const path = require("path");
//configure mail options
//construst transport
let transporter = nodemailer.createTransport({
  service: "yahoo",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});
// email theme configurations
const orderPlacedMailGenerator = new Mailgen({
  theme: {
    // Build an absolute path to the theme file within your project
    path: path.resolve("server/library/notificationMail/notification.html"),
    // Also (optionally) provide the path to a plaintext version of the theme (if you wish to use `generatePlaintext()`)
    plaintextPath: path.resolve(
      "server/library/notificationMail/notification.html"
    ),
  },
  textDirection: "rtl",
  product: {
    // Appears in header & footer of e-mails
    name: "MeraBazzar",
    link: "http://merabazzar.xyz",
    //logo: "https://mailgen.js/img/logo.png",
    copyright: "Copyright © 2021 Merabazzar. All rights reserved.",
  },
});
// email feedback mail configurations
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    // Appears in header & footer of e-mails
    name: "MeraBazzar",
    link: "http://merabazzar.xyz",
    //logo: "https://mailgen.js/img/logo.png",
    copyright: "Copyright © 2021 Merabazzar. All rights reserved.",
  },
});
// feedback email content
const feedBackEmailBody = (message, mail) => {
  return {
    body: {
      intro: "You Have a feedback from " + mail,
      outro: message,
    },
  };
};
// email contents
const placeOrderEmailBody = (notificationInfo) => {
  const {
    name,
    orderDetails,
    discount,
    totalPrice,
    additionalCharges,
    address,
    dueDeliveryDate,
    orderId,
    purchaseDate,
    totalDiscountPrice,
    invoicePDFLink,
  } = notificationInfo;

  let email = {
    body: {
      name: name,
      intro: "Order Placed",
      table: {
        data: orderDetails,
        columns: {
          customWidth: {
            item: "40%",
            quantity: "40%",
            price: "40%",
          },
          customAlignment: {
            item: "right",
            quantity: "center",
            price: "left",
          },
        },
      },
      dictionary: {
        discount: discount,
        AdditionalCharges: additionalCharges,
        ToPay: totalPrice,
        DeliveryBy: dueDeliveryDate,
        address: address,
        purchaseDate: purchaseDate,
        orderId: orderId,
        totalDiscountPrice: totalDiscountPrice,
        invoicePDFLink: invoicePDFLink,
      },
      outro: "We are preparing you order for shipping",
    },
  };
  console.debug("generated mail::", email);
  return email;
};
//send code to mail
const orderPlacedEmailNotification = async (notificationInfo) => {
  logger.info("send order email");
  let sendEmailResult, emailSubject;

  const { email, notificationType } = notificationInfo;
  console.debug("input::", notificationInfo);
  let emailContents;
  switch (notificationType) {
    // get the email contents
    case "order_placed":
      emailContents = placeOrderEmailBody(notificationInfo);
      emailSubject = "Order Placed @DO NOT REPLY";
      break;
    case "":
      break;
  }
  // Generate an HTML email with the provided contents
  let emailHtml = orderPlacedMailGenerator.generate(emailContents);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  let emailText = orderPlacedMailGenerator.generatePlaintext(emailContents);

  let mailOptions = {
    from: "mera.bazzar@yahoo.com",
    to: email,
    subject: emailSubject,
    html: emailHtml,
    text: emailText,
  };
  logger.info(`mailoptions:${mailOptions}`);

  //send email
  let data = await transporter.sendMail(mailOptions);
  logger.info(`Response-${data}`);
  if (data) {
    sendEmailResult = "SUCCESS";
  } else {
    sendEmailResult = "ERROR";
  }
  return sendEmailResult;
};
const feedBackNotification = async (notificationInfo) => {
  console.debug("Send Feedback notification::", notificationInfo);
  let sendEmailResult,
    emailSubject = "Feedback@MeraBazzar";
  const { email, message } = notificationInfo;
  let emailContents = feedBackEmailBody(message, email);
  // Generate an HTML email with the provided contents
  let emailHtml = mailGenerator.generate(emailContents);
  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  let emailText = mailGenerator.generatePlaintext(emailContents);
  let mailOptions = {
    from: "mera.bazzar@yahoo.com",
    to: "saurabhbharti9@gmail.com",
    subject: emailSubject,
    html: emailHtml,
    text: emailText,
  };
  //send feedback email
  logger.info(`mailoptions:${mailOptions}`);
  let data = await transporter.sendMail(mailOptions);
  logger.info(`Response-${data}`);
  if (data) {
    sendEmailResult = "SUCCESS";
  } else {
    sendEmailResult = "ERROR";
  }
  return sendEmailResult;
};
module.exports = {
  orderPlacedEmailNotification,
  feedBackNotification,
};

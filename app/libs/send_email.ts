import aws from "aws-sdk";

const config = {
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
};

aws.config.update(config);

const ses = new aws.SES(config);

export default function sendEmail(email: string, secret: string) {
  const params = {
    Source: process.env.AWS_FROM_EMAIL!,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `Your access code is ${secret}`,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: secret,
        },
      },
    },
  };
  return ses.sendEmail(params).promise();
}

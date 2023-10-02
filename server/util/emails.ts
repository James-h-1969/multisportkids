// SETUP EMAILS
const AWS = require('aws-sdk');
require("dotenv").config();

const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2"
};

export const ses = new AWS.SES(SES_CONFIG);
export const senderEmail = 'jameshocking542@gmail.com'; // Replace with your sender email address
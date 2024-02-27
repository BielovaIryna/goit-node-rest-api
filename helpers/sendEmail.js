import nodemailer from 'nodemailer';
import { serverConfig } from '../configs/serverConfig.js';




const nodemailreConfig = serverConfig.environment === 'production'? 
{
    host: serverConfig.metaHost,
    port: serverConfig.metaPort,
    secure: true,
    auth: {
      user: serverConfig.metaUser,
      pass: serverConfig.metaPassword,
    },
}:
{
   
    host: serverConfig.mailtrapHost,
    port: serverConfig.mailtrapPort,
    auth: {
      user: serverConfig.mailtrapUser,
      pass: serverConfig.mailtrapPassword,
    }
  };
  
  const transport = nodemailer.createTransport(nodemailreConfig);
  
  const sendEmail = async (data) => {
    const emailConfig = { ...data, from: "bielova_i@meta.ua" };
    await transport
      .sendMail(emailConfig)
      .then(() => {
        console.log("Email send success");
      })
      .catch((error) => console.log(error.message));
    return true;
  };

  export {sendEmail}


import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.MAILTRAP;
export const mailtarpCn = new MailtrapClient({
  token: TOKEN,  
});
 
export const sender = {
  email: "hello@demomailtrap.com",
  name: "Tq",
};
// const recipients = [
//   {
//     email: "paytariqfhm@gmail.com",
//   }
// ];

// mailtarpCn.send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
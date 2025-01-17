import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js"
import { mailtarpCn } from "./mailtrap.config.js"
import { sender } from "./mailtrap.config.js"


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtarpCn.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification Email",                
        });
        console.log('Email Sended successfuly !', response);
        
    } catch (error) {
        console.log('email error verification ', error);
        throw new Error(`Error sending verification email :  ${error}`)
        
    }
    
}
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await mailtarpCn.send({
            from: sender,
            to: recipient,
            template_uuid: "d1c4e4fe-a081-4a53-9ef9-a00463f75ae8",
               template_variables: {
                "company_info_name": "Auth APP",
                "name": name
                }
        })
        console.log(' Email Sended successfuly !', response);
      
    } catch (error) {
        throw new Error(`Error sending welcome email :  ${error}`)
     
        
    }
    
    
}
export const sendResetPassEmail = async (email, token) => {
    const recipient = [{ email }]
    try {
        const response = await mailtarpCn.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',`${process.env.CLIENT_URL}/reset-password/${token}`) ,
            category: "Reset Password Email",
        })
        console.log(' Email Sended successfuly !', response);
        
    } catch (error) {
        throw new Error(`Error sending reset password email :  ${error.message}`)
    }

    
}
export const sendConfirmChangePassEmail = async (email) => {
    const recipient = [{ email }]
    try {
       const response =  await mailtarpCn.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category : "Reset Password Email",
        })
        console.log( ' Email Sended successfuly !', response);
        
    } catch (error) {
        throw new Error(`Error sending reset password email :  ${error.message}`)
        
    }
 }
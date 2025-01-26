import sgMail from '@sendgrid/mail'
import { sendGridTemplate } from '../config/templateId.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendGridService = async (payload) => {

    try {
        const { userEmail, userName } = payload;
        let templateId = sendGridTemplate("test_service");

        if (!templateId) {
            throw new Error(`Template ID for 'test-service' is not found.`);
        }

        const dynamicData = {
            userEmail,
            userName,
        };

        console.log("dssdfsdf", dynamicData)

        const msg = {
            personalizations: [
                {
                    to: userEmail,
                    dynamic_template_data: dynamicData,
                },
            ],
            from: {
                email: 'sahil.yadav@mastersunion.org',
            },
            subject: "Thanks! for Reaching Out",
            templateId: templateId,
        };

        let response = await sgMail.send(msg);

        return true;
    } catch (error) {
        console.error('Error occurred while sending email:', error);

        if (error.response) {
            console.error('Response body:', error.response.body);
        } else if (error.request) {
            console.error('No response received from SendGrid:', error.request);
        } else {
            console.error('Error details:', error.message);
        }

        return false;
    }
};


const nodeMailerService = async (payload) => {
    try {
        const { userEmail, userName } = payload;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
            secure: true,
            port: 465,
        });

        // const htmlContent = `
        // <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        // <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

        // <head>
        //     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        //     <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
        //     <style type="text/css">
        //         body,
        //         p,
        //         div {
        //             font-family: comic sans ms, cursive;
        //             font-size: 14px;
        //         }

        //         body {
        //             color: #ffdede;
        //         }

        //         body a {
        //             color: #1188E6;
        //             text-decoration: none;
        //         }

        //         p {
        //             margin: 0;
        //             padding: 0;
        //         }

        //         table.wrapper {
        //             width: 100% !important;
        //             table-layout: fixed;
        //             -webkit-font-smoothing: antialiased;
        //             -webkit-text-size-adjust: 100%;
        //             -moz-text-size-adjust: 100%;
        //             -ms-text-size-adjust: 100%;
        //         }

        //         img.max-width {
        //             max-width: 100% !important;
        //         }

        //         .column.of-2 {
        //             width: 50%;
        //         }

        //         .column.of-3 {
        //             width: 33.333%;
        //         }

        //         .column.of-4 {
        //             width: 25%;
        //         }

        //         @media screen and (max-width:480px) {

        //             .columns {
        //                 width: 100% !important;
        //             }

        //             .column {
        //                 display: block !important;
        //                 width: 100% !important;
        //                 padding-left: 0 !important;
        //                 padding-right: 0 !important;
        //             }
        //         }
        //     </style>
        // </head>

        // <body>
        //     <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:comic sans ms,cursive; color:#ffdede;">
        //         <div class="webkit">
        //             <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
        //                 <tr>
        //                     <td valign="top" bgcolor="#ffffff" width="100%">
        //                         <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
        //                             <tr>
        //                                 <td width="100%">
        //                                     <table width="100%" cellpadding="0" cellspacing="0" border="0">
        //                                         <tr>
        //                                             <td>
        //                                                 <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
        //                                                     <tr>
        //                                                         <td role="modules-container" style="padding:0px 0px 0px 0px; color:#ffdede; text-align:left;" bgcolor="#090202" width="100%" align="left">
        //                                                             <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        //                                                                 <tbody>
        //                                                                     <tr>
        //                                                                         <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
        //                                                                             <img class="max-width" border="0" style="display:block; width:100%; height:auto;" width="600" alt="" src="http://cdn.mcauto-images-production.sendgrid.net/42823e12861ed156/ddc93eb2-6555-4328-8428-28ee67a54fd1/1244x376.png">
        //                                                                         </td>
        //                                                                     </tr>
        //                                                                 </tbody>
        //                                                             </table>

        //                                                             <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        //                                                                 <tbody>
        //                                                                     <tr>
        //                                                                         <td style="padding:25px 40px 25px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top">
        //                                                                             <div>
        //                                                                                 <div style="font-family: inherit; text-align: inherit">
        //                                                                                     Hi ${userName},
        //                                                                                 </div>
        //                                                                                 <br>
        //                                                                                 <div style="font-family: inherit; text-align: inherit">
        //                                                                                     Thank you for getting in touch with me! I really appreciate your interest and the time you took to reach out through my portfolio.
        //                                                                                 </div>
        //                                                                                 <br>
        //                                                                                 <div style="font-family: inherit; text-align: inherit">
        //                                                                                     If you’d like to stay connected or learn more about my work, click here to connect: <a href="https://www.linkedin.com/in/sahilyadav9/"><u>Sahil Yadav</u></a>
        //                                                                                 </div>
        //                                                                                 <br>
        //                                                                                 <div style="font-family: inherit; text-align: inherit">
        //                                                                                     If you have any questions or would like to discuss further, don’t hesitate to reach out. I’d love to connect and explore ways we can collaborate!
        //                                                                                 </div>
        //                                                                                 <br>
        //                                                                                 <div style="font-family: inherit; text-align: inherit">
        //                                                                                     Thanks again, and I look forward to hearing from you soon!
        //                                                                                 </div>
        //                                                                                 <br>
        //                                                                                 <div style="font-family: inherit; text-align: inherit">
        //                                                                                     Best regards,<br><br>Sahil Yadav
        //                                                                                 </div>
        //                                                                             </div>
        //                                                                         </td>
        //                                                                     </tr>
        //                                                                 </tbody>
        //                                                             </table>
        //                                                         </td>
        //                                                     </tr>
        //                                                 </table>
        //                                             </td>
        //                                         </tr>
        //                                     </table>
        //                                 </td>
        //                             </tr>
        //                         </table>
        //                     </td>
        //                 </tr>
        //             </table>
        //         </div>
        //     </center>
        // </body>
        // </html>
        // `;

        const htmlContent = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <style type="text/css">
        body,
        p,
        div {
            font-size: 14px;
        }

        body {
            color: #ffdede;
        }

        body a {
            color: #1188E6;
            text-decoration: none;
        }

        p {
            margin: 0;
            padding: 0;
        }

        table.wrapper {
            width: 100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        img.max-width {
            max-width: 100% !important;
        }

        .column.of-2 {
            width: 50%;
        }

        .column.of-3 {
            width: 33.333%;
        }

        .column.of-4 {
            width: 25%;
        }

        @media screen and (max-width:480px) {

            .columns {
                width: 100% !important;
            }

            .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
        }
    </style>
</head>

<body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; color:#ffdede;">
        <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                <tr>
                    <td valign="top" bgcolor="#ffffff" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td width="100%">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td>
                                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                    <tr>
                                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#ffdede; text-align:left;" bgcolor="#090202" width="100%" align="left">
                                                            <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                                                                            <img class="max-width" border="0" style="display:block; width:100%; height:auto;" width="600" alt="" src="http://cdn.mcauto-images-production.sendgrid.net/42823e12861ed156/ddc93eb2-6555-4328-8428-28ee67a54fd1/1244x376.png">
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding:25px 40px 25px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top">
                                                                            <div>
                                                                                <div style="font-family: inherit; text-align: inherit">
                                                                                    Hi ${userName},
                                                                                </div>
                                                                                <br>
                                                                                <div style="font-family: inherit; text-align: inherit">
                                                                                    Thank you for getting in touch with me! I really appreciate your interest and the time you took to reach out through my portfolio.
                                                                                </div>
                                                                                <br>
                                                                                <div style="font-family: inherit; text-align: inherit">
                                                                                    If you’d like to stay connected or learn more about my work, click here to connect: <a href="https://www.linkedin.com/in/sahilyadav9/"><u>Sahil Yadav</u></a>
                                                                                </div>
                                                                                <br>
                                                                                <div style="font-family: inherit; text-align: inherit">
                                                                                    If you have any questions or would like to discuss further, don’t hesitate to reach out. I’d love to connect and explore ways we can collaborate!
                                                                                </div>
                                                                                <br>
                                                                                <div style="font-family: inherit; text-align: inherit">
                                                                                    Thanks again, and I look forward to hearing from you soon!
                                                                                </div>
                                                                                <br>
                                                                                <div style="font-family: inherit; text-align: inherit">
                                                                                    Best regards,<br><br>Sahil Yadav
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </center>
</body>

</html>
`;

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: userEmail,
            subject: 'Thanks for Reaching Out!',
            html: htmlContent,
        };

        let info = await transporter.sendMail(mailOptions);

        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        return false;
    }
};



export {
    sendGridService,
    nodeMailerService,
};

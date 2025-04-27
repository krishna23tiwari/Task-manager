const nodemailer = require('nodemailer');

const createTransporter = (email, mailkey) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "jangiddummy6375@gmail.com",
      pass: "hneo ulux pgln lgts"
    }
  });
};

const sendOtpEmail = async (email, otp, name, senderEmail, mailkey) => {
  try {
    const transporter = createTransporter(senderEmail, mailkey);

    const mailOptions = {
      from: "jangiddummy6375@gmail.com",
      to: email,
      subject: 'Your OTP Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name},</h2>
          <p>Your verification code is:</p>
          <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email: ', error);
    return false;
  }
};


const sendTaskAssignedEmail = async (receiverEmail, receiverName, taskTitle, taskDescription, dueDate, senderName, senderEmail, mailkey) => {
    try {
      const transporter = createTransporter(senderEmail, mailkey);
  
      const mailOptions = {
        from: "jangiddummy6375@gmail.com",
        to: receiverEmail,
        subject: `New Task Assigned: ${taskTitle}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9;">
            <h2 style="text-align: center; color: #4f46e5;">New Task Assigned</h2>
            <p>Hi <strong>${receiverName}</strong>,</p>
            <p><strong>${senderName}</strong> has assigned a new task to you. Here are the details:</p>
  
            <div style="background: #ffffff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); margin-top: 20px;">
              <h3 style="color: #333;">${taskTitle}</h3>
              <p style="color: #555;"><strong>Description:</strong> ${taskDescription}</p>
              <p style="color: #555;"><strong>Due Date:</strong> ${dueDate ? new Date(dueDate).toLocaleDateString() : 'Not Specified'}</p>
            </div>
  
            <p style="margin-top: 20px;">Please log in to your account to view and start working on the task.</p>
            <p>Good luck! 🚀</p>
  
            <hr style="margin-top: 30px;"/>
            <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Task Assigned Email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending assigned task email: ', error);
      return false;
    }
  };

  const sendTaskUpdatedEmail = async (email, name, title, content, updatedByName, senderEmail, mailkey) => {
    try {
      const transporter = createTransporter(senderEmail, mailkey);
  
      const mailOptions = {
        from: senderEmail,
        to: email,
        subject: 'Task Updated Notification',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hello ${name},</h2>
            <p>The task assigned to you has been <strong>updated</strong>:</p>
            <h3>Task: ${title}</h3>
            <p><strong>Description:</strong> ${content}</p>
            <p>Updated by: ${updatedByName}</p>
            <p>Please check your dashboard for more details.</p>
          </div>
        `
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Update Email sent: ', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending update email: ', error);
      return false;
    }
  };

module.exports = { sendOtpEmail,
    sendTaskAssignedEmail,
    sendTaskUpdatedEmail };

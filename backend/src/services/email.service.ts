import nodemailer from 'nodemailer';
import { env } from '../config/env';

// Create reusable transporter
const createTransporter = () => {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;

  if (!sendgridApiKey) {
    console.warn('⚠️  SENDGRID_API_KEY not set, emails will fail');
  }

  console.log('🔧 Creating SendGrid email transporter');
  console.log('  API Key present:', !!sendgridApiKey);

  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: sendgridApiKey || ''
    }
  });
};

// Email templates
const getQuoteConfirmationEmail = (data: {
  name: string;
  email: string;
  service_type: string;
  pincode: string;
}) => {
  return {
    subject: 'Your Quote Request Received - Master Brush',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2D2A2B 0%, #FF6B35 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #FF6B35; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .button { display: inline-block; padding: 12px 30px; background: #FF6B35; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 Master Brush</h1>
            <p>Premium Painting Services</p>
          </div>
          <div class="content">
            <h2>Thank You, ${data.name}!</h2>
            <p>We've received your quote request and our team will get back to you within 24 hours.</p>
            
            <div class="detail-box">
              <h3>Your Request Details:</h3>
              <p><strong>Service Type:</strong> ${data.service_type}</p>
              <p><strong>Location:</strong> ${data.pincode}</p>
              <p><strong>Email:</strong> ${data.email}</p>
            </div>

            <h3>What Happens Next?</h3>
            <ol>
              <li>Our team will review your requirements</li>
              <li>We'll contact you within 24 hours to discuss details</li>
              <li>Get a customized quote tailored to your needs</li>
              <li>Schedule your painting project at your convenience</li>
            </ol>

            <p>Have questions? Feel free to reach out:</p>
            <p>📞 Phone: +91 63013 13300<br>
            📧 Email: sudhimallaavinash00@gmail.com</p>
          </div>
          <div class="footer">
            <p>Master Brush - Painting Simplified with Perfection</p>
            <p>© 2024 Master Brush. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getPainterConfirmationEmail = (data: {
  full_name: string;
  email: string;
  city: string;
  years_experience: number;
}) => {
  return {
    subject: 'Application Received - Master Brush Painter Network',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2D2A2B 0%, #FF6B35 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .detail-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #FF6B35; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎨 Master Brush</h1>
            <p>Painter Network</p>
          </div>
          <div class="content">
            <h2>Thank You for Applying, ${data.full_name}!</h2>
            <p>We've received your application to join the Master Brush Painter Network.</p>
            
            <div class="detail-box">
              <h3>Application Details:</h3>
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Location:</strong> ${data.city}</p>
              <p><strong>Experience:</strong> ${data.years_experience} years</p>
            </div>

            <h3>What's Next?</h3>
            <ol>
              <li>Our team will review your application within 24-48 hours</li>
              <li>We'll verify your experience and qualifications</li>
              <li>You'll receive an email with our decision</li>
              <li>If approved, we'll onboard you to our network</li>
            </ol>

            <p><strong>Note:</strong> We carefully review each application to ensure quality service for our customers.</p>

            <p>Questions? Contact us:<br>
            📧 Email: sudhimallaavinash00@gmail.com<br>
            📞 Phone: +91 63013 13300</p>
          </div>
          <div class="footer">
            <p>Master Brush - Building a Network of Professional Painters</p>
            <p>© 2024 Master Brush. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getAdminNewLeadEmail = (data: {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  pincode: string;
  address: string;
}) => {
  return {
    subject: '🔔 New Lead Received - Master Brush',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2D2A2B; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .detail-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #FF6B35; }
          .button { display: inline-block; padding: 12px 30px; background: #FF6B35; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Lead Received</h2>
          </div>
          <div class="content">
            <div class="detail-box">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>Service:</strong> ${data.service_type}</p>
              <p><strong>Location:</strong> ${data.pincode} - ${data.address}</p>
            </div>
            <p><a href="http://localhost:3000/admin" class="button">View in Admin Dashboard</a></p>
            <p><small>Received: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getAdminNewPainterEmail = (data: {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  years_experience: number;
  skills: string[];
}) => {
  return {
    subject: '🔔 New Painter Application - Master Brush',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2D2A2B; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .detail-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #FF6B35; }
          .button { display: inline-block; padding: 12px 30px; background: #FF6B35; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Painter Application</h2>
          </div>
          <div class="content">
            <div class="detail-box">
              <p><strong>Name:</strong> ${data.full_name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              <p><strong>City:</strong> ${data.city}</p>
              <p><strong>Experience:</strong> ${data.years_experience} years</p>
              <p><strong>Skills:</strong> ${data.skills.join(', ')}</p>
            </div>
            <p><a href="http://localhost:3000/admin" class="button">Review Application</a></p>
            <p><small>Received: ${new Date().toLocaleString()}</small></p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Email sending functions
export const sendQuoteConfirmation = async (data: {
  name: string;
  email: string;
  service_type: string;
  pincode: string;
}) => {
  try {
    console.log('📧 Attempting to send quote confirmation email...');
    console.log('To:', data.email);
    console.log('From:', process.env.EMAIL_USER);

    const transporter = createTransporter();
    const emailContent = getQuoteConfirmationEmail(data);

    const fromEmail = process.env.EMAIL_FROM || 'sudhimallaavinash00@gmail.com';
    console.log('Using From address:', fromEmail);

    const info = await transporter.sendMail({
      from: `"Master Brush" <${fromEmail}>`,
      to: data.email,
      subject: emailContent.subject,
      html: emailContent.html
    });

    console.log('✅ Quote confirmation email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error sending quote confirmation email:');
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
};

export const sendPainterConfirmation = async (data: {
  full_name: string;
  email: string;
  city: string;
  years_experience: number;
}) => {
  try {
    const transporter = createTransporter();
    const emailContent = getPainterConfirmationEmail(data);

    await transporter.sendMail({
      from: `"Master Brush" <${process.env.EMAIL_USER || env.ADMIN_DEFAULT_EMAIL}>`,
      to: data.email,
      subject: emailContent.subject,
      html: emailContent.html
    });

    console.log(`Painter confirmation email sent to ${data.email}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending painter confirmation email:', error);
    return { success: false, error };
  }
};

export const sendAdminNewLeadNotification = async (data: {
  name: string;
  email: string;
  phone: string;
  service_type: string;
  pincode: string;
  address: string;
}) => {
  try {
    const transporter = createTransporter();
    const emailContent = getAdminNewLeadEmail(data);
    const adminEmail = process.env.ADMIN_EMAIL || env.ADMIN_DEFAULT_EMAIL;

    await transporter.sendMail({
      from: `"Master Brush System" <${process.env.EMAIL_USER || env.ADMIN_DEFAULT_EMAIL}>`,
      to: adminEmail,
      subject: emailContent.subject,
      html: emailContent.html
    });

    console.log(`Admin notification sent for new lead: ${data.name}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin lead notification:', error);
    return { success: false, error };
  }
};

export const sendAdminNewPainterNotification = async (data: {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  years_experience: number;
  skills: string[];
}) => {
  try {
    const transporter = createTransporter();
    const emailContent = getAdminNewPainterEmail(data);
    const adminEmail = process.env.ADMIN_EMAIL || env.ADMIN_DEFAULT_EMAIL;

    await transporter.sendMail({
      from: `"Master Brush System" <${process.env.EMAIL_USER || env.ADMIN_DEFAULT_EMAIL}>`,
      to: adminEmail,
      subject: emailContent.subject,
      html: emailContent.html
    });

    console.log(`Admin notification sent for new painter: ${data.full_name}`);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin painter notification:', error);
    return { success: false, error };
  }
};

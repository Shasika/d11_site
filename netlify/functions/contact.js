// Netlify Function for Contact Form
// Handles form submissions and sends email notifications

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Validation
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Email configuration (using environment variables)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // Set in Netlify dashboard
        pass: process.env.SMTP_PASS  // Set in Netlify dashboard
      }
    });

    // Email to you (notification)
    const adminEmail = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || 'info@d11architecture.lk',
      subject: `🏗️ New ${data.projectType || 'Project'} Inquiry from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #B28B47 0%, #8B6914 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #B28B47; }
            .value { margin-top: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .badge { display: inline-block; background: #B28B47; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏗️ New Lead from D11 Architecture Website</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Contact Information:</div>
                <div class="value">
                  <strong>Name:</strong> ${data.name}<br>
                  <strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a><br>
                  ${data.phone ? `<strong>Phone:</strong> ${data.phone}<br>` : ''}
                </div>
              </div>

              <div class="field">
                <div class="label">Project Details:</div>
                <div class="value">
                  <strong>Type:</strong> <span class="badge">${data.projectType || 'Not specified'}</span><br>
                  ${data.budget ? `<strong>Budget:</strong> ${data.budget}<br>` : ''}
                </div>
              </div>

              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>

              ${data.files && data.files.length > 0 ? `
              <div class="field">
                <div class="label">Attached Files:</div>
                <div class="value">${data.files.join(', ')}</div>
              </div>
              ` : ''}

              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date(data.timestamp).toLocaleString('en-LK')}</div>
              </div>
            </div>
            <div class="footer">
              <p>This inquiry was submitted through your D11 Architecture website contact form.</p>
              <p>Please respond within 24 hours for best conversion rates.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Email to customer (confirmation)
    const customerEmail = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: 'Thank you for contacting D11 Architecture',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #B28B47 0%, #8B6914 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${data.name}!</h1>
            </div>
            <div class="content">
              <p>Thank you for your interest in D11 Architecture.</p>
              <p>We've received your inquiry about <strong>${data.projectType || 'your project'}</strong> and will review it shortly.</p>
              <p>Our team will get back to you within <strong>24 hours</strong> to discuss your project in detail.</p>
              <p>In the meantime, feel free to explore our portfolio at <a href="https://www.d11architecture.lk">www.d11architecture.lk</a></p>
              <br>
              <p>Best regards,<br><strong>D11 Architecture Team</strong></p>
            </div>
            <div class="footer">
              <p>D11 Architecture | Professional Architectural Drafting Services</p>
              <p>Colombo, Sri Lanka</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send both emails
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(customerEmail);

    // Optional: Store in database (Airtable, Google Sheets, etc.)
    // await storeInDatabase(data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully!'
      })
    };

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process form submission',
        details: error.message
      })
    };
  }
};

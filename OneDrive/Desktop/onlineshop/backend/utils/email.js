import nodemailer from 'nodemailer';

// Email transporter configuration
// For development: You can use Gmail, SendGrid, or any SMTP service
// For production: Use SendGrid, AWS SES, or similar service
const createTransporter = () => {
  // Use environment variables for email configuration
  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  };

  // If email credentials are not configured, return null (email sending will be skipped)
  if (!config.auth.user || !config.auth.pass) {
    console.warn('⚠️  Email credentials not configured. Email sending will be skipped.');
    return null;
  }

  return nodemailer.createTransport(config);
};

// Get status label in Mongolian
const getStatusLabel = (status) => {
  const statusLabels = {
    'шинэ': 'Шинэ',
    'баталгаажсан': 'Баталгаажсан',
    'хүргэлтэнд': 'Хүргэлтэнд',
    'хүргэгдсэн': 'Хүргэгдсэн',
    'цуцалсан': 'Цуцалсан'
  };
  return statusLabels[status] || status;
};

// Generate email HTML template for order status update
const generateOrderStatusEmailHTML = (order, newStatus) => {
  const statusLabel = getStatusLabel(newStatus);
  const orderDate = new Date(order.created_at).toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Захиалгын төлөв шинэчлэгдлээ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #9333ea;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #9333ea;
      margin: 0;
      font-size: 24px;
    }
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: bold;
      margin: 20px 0;
    }
    .status-шинэ { background-color: #dbeafe; color: #1e40af; }
    .status-баталгаажсан { background-color: #d1fae5; color: #065f46; }
    .status-хүргэлтэнд { background-color: #fef3c7; color: #92400e; }
    .status-хүргэгдсэн { background-color: #dcfce7; color: #166534; }
    .status-цуцалсан { background-color: #fee2e2; color: #991b1b; }
    .order-info {
      background-color: #f9fafb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .order-info h2 {
      color: #1f2937;
      font-size: 18px;
      margin-top: 0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: bold;
      color: #6b7280;
    }
    .info-value {
      color: #1f2937;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Захиалгын төлөв шинэчлэгдлээ</h1>
    </div>
    
    <p>Сайн байна уу, <strong>${order.customer_name}</strong>!</p>
    
    <p>Таны захиалгын төлөв шинэчлэгдлээ:</p>
    
    <div style="text-align: center;">
      <span class="status-badge status-${newStatus}">${statusLabel}</span>
    </div>
    
    <div class="order-info">
      <h2>Захиалгын мэдээлэл</h2>
      <div class="info-row">
        <span class="info-label">Захиалгын дугаар:</span>
        <span class="info-value">#${order.id.slice(0, 8)}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Огноо:</span>
        <span class="info-value">${orderDate}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Нийт дүн:</span>
        <span class="info-value">${new Intl.NumberFormat('mn-MN').format(order.total_amount)}₮</span>
      </div>
      <div class="info-row">
        <span class="info-label">Төлбөрийн арга:</span>
        <span class="info-value">${order.payment_method}</span>
      </div>
      ${order.delivery_address ? `
      <div class="info-row">
        <span class="info-label">Хүргэх хаяг:</span>
        <span class="info-value">${order.delivery_address}</span>
      </div>
      ` : ''}
    </div>
    
    <p>Хэрэв танд асуулт байвал бидэнтэй холбогдоорой.</p>
    
    <div class="footer">
      <p>Баярлалаа,</p>
      <p><strong>BuySmart</strong></p>
      <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
        Энэ имэйл автоматаар илгээгдсэн. Хариу бичих шаардлагагүй.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

// Send order status update email
export const sendOrderStatusEmail = async (order, newStatus) => {
  try {
    const transporter = createTransporter();
    
    // Skip email sending if transporter is not configured
    if (!transporter) {
      console.log('⏭️  Skipping email send (email not configured)');
      return { success: false, skipped: true };
    }

    // Validate email address
    if (!order.customer_email) {
      console.warn('⚠️  Customer email not provided. Skipping email send.');
      return { success: false, skipped: true, reason: 'No email address' };
    }

    const statusLabel = getStatusLabel(newStatus);
    const htmlContent = generateOrderStatusEmailHTML(order, newStatus);
    
    const mailOptions = {
      from: `"BuySmart" <${process.env.EMAIL_USER}>`,
      to: order.customer_email,
      subject: `Захиалгын төлөв шинэчлэгдлээ - ${statusLabel}`,
      html: htmlContent,
      text: `
Сайн байна уу, ${order.customer_name}!

Таны захиалгын төлөв шинэчлэгдлээ: ${statusLabel}

Захиалгын дугаар: #${order.id.slice(0, 8)}
Огноо: ${new Date(order.created_at).toLocaleDateString('mn-MN')}
Нийт дүн: ${new Intl.NumberFormat('mn-MN').format(order.total_amount)}₮

Баярлалаа,
BuySmart
      `.trim()
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Order status email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending order status email:', error);
    // Don't throw error - we don't want email failures to break the order update
    return { success: false, error: error.message };
  }
};


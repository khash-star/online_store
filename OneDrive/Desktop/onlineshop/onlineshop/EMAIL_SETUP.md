# 📧 Email Service Setup

Захиалгын статус өөрчлөхөд хэрэглэгчид автоматаар имэйл илгээх систем нэмэгдлээ.

## ✅ Хийгдсэн өөрчлөлт

1. **Email Service Utility** (`backend/utils/email.js`)
   - Nodemailer ашиглан email илгээх функц
   - Mongolian email template
   - Error handling

2. **Order Status Update Endpoint** (`backend/routes/orders.js`)
   - Status өөрчлөхөд автоматаар email илгээх
   - Async email sending (order update-г удаашруулахгүй)

3. **Email Template**
   - HTML болон text format
   - Mongolian language
   - Status badge-ууд (өнгөт)
   - Захиалгын мэдээлэл (дугаар, огноо, дүн, хаяг)

## 🔧 Configuration

### 1. Backend .env файлд email configuration нэмэх:

```env
# Email Configuration (Optional - if not set, email sending will be skipped)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### 2. Gmail ашиглах тохиолдолд:

1. Gmail account руу орох
2. Settings → Security → 2-Step Verification идэвхжүүлэх
3. App Passwords үүсгэх:
   - https://myaccount.google.com/apppasswords
   - "Select app" → "Mail"
   - "Select device" → "Other (Custom name)"
   - Generated password-ийг `EMAIL_PASSWORD` дээр ашиглах

### 3. Бусад Email Service (SendGrid, AWS SES, etc.):

SendGrid ашиглах тохиолдолд:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

AWS SES ашиглах тохиолдолд:
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-ses-smtp-username
EMAIL_PASSWORD=your-ses-smtp-password
```

## 📝 Ашиглах

### Admin panel дээр захиалгын статус өөрчлөх:

1. PromoAdmin → Захиалга таб руу орох
2. Захиалгын status dropdown-оос шинэ статус сонгох
3. Status өөрчлөгдөхөд хэрэглэгчид автоматаар email илгээгдэнэ

### Email агуулга:

- Захиалгын дугаар
- Төлөв (шинэ, баталгаажсан, хүргэлтэнд, хүргэгдсэн, цуцалсан)
- Огноо
- Нийт дүн
- Төлбөрийн арга
- Хүргэх хаяг

## ⚠️ Анхаарах зүйлс

1. **Email configuration хоосон байвал** email илгээхгүй (system ажиллахгүй байхгүй)
2. **Email илгээхэд алдаа гарвал** order update амжилттай байх (email алдаа order update-г удаашруулахгүй)
3. **Development environment дээр** email илгээхгүй байх тохиолдолд console.log-д мэдээлэл хэвлэгдэнэ

## 🧪 Testing

1. Backend .env файлд email configuration нэмэх
2. Backend server restart хийх
3. PromoAdmin дээр захиалгын статус өөрчлөх
4. Хэрэглэгчийн email inbox шалгах

## 📚 Documentation

- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid SMTP](https://docs.sendgrid.com/for-developers/sending-email/getting-started-smtp)


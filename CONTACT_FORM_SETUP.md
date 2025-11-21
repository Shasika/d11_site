# Contact Form Setup Guide

## 🎯 Quick Start (2 Options)

Your contact form now has **TWO** backend options that work automatically:

### **Option 1: Web3Forms (Recommended for Quick Start)** ⚡

**Time: 2 minutes | Cost: FREE**

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email (e.g., `info@d11architecture.lk`)
3. Click "Create Access Key"
4. Copy your access key
5. Open `index.html` and find line 3051:
   ```javascript
   web3FormData.append('access_key', 'YOUR_WEB3FORMS_KEY');
   ```
6. Replace `YOUR_WEB3FORMS_KEY` with your actual key
7. **Done!** Form submissions will be emailed to you immediately

**Features:**
- ✅ Instant setup
- ✅ Email notifications
- ✅ File uploads supported
- ✅ No coding required
- ✅ 250 submissions/month (free tier)

---

### **Option 2: Netlify Functions (Better Long-term)** 🚀

**Time: 10 minutes | Cost: FREE**

**Step 1: Deploy to Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**Step 2: Set up Email (Gmail Example)**

1. **Enable 2-Factor Authentication** on your Gmail
2. **Create App Password:**
   - Go to Google Account → Security
   - Search for "App passwords"
   - Generate password for "Mail"
   - Copy the 16-character password

**Step 3: Add Environment Variables in Netlify**

1. Go to your Netlify dashboard
2. Site Settings → Environment Variables
3. Add these variables:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASS = xxxx xxxx xxxx xxxx  (app password from step 2)
ADMIN_EMAIL = info@d11architecture.lk
```

4. Redeploy your site

**Features:**
- ✅ Professional email templates
- ✅ Auto-reply to customers
- ✅ Custom branding
- ✅ Unlimited submissions
- ✅ Database integration ready
- ✅ Full control

---

## 📧 Email Providers

### **Gmail (Easiest)**
```
Host: smtp.gmail.com
Port: 587
Auth: App Password (not regular password!)
Limit: 500 emails/day
```

### **SendGrid (Best for Business)**
```
Host: smtp.sendgrid.net
Port: 587
Auth: API Key
Limit: 100 emails/day (free)
Website: sendgrid.com
```

### **Mailgun (Developers)**
```
Host: smtp.mailgun.org
Port: 587
Limit: 100 emails/day (free)
Website: mailgun.com
```

---

## 🧪 Testing

### Test Web3Forms:
1. Open your website
2. Fill out the form
3. Submit
4. Check your email (arrives within 60 seconds)

### Test Netlify Functions:
```bash
# Install dependencies
npm install

# Test locally
netlify dev

# Open http://localhost:8888
# Submit form
```

---

## 📊 What Happens When Form is Submitted?

1. **User fills form** → Validation checks run
2. **Submit clicked** → Loading state shown
3. **System tries:**
   - First: Netlify Function (if deployed to Netlify)
   - Fallback: Web3Forms (works everywhere)
4. **Emails sent:**
   - You receive: Detailed lead notification
   - Customer receives: Professional confirmation
5. **Success message** → Form resets
6. **Analytics** → Conversion tracked (if GA4 setup)

---

## 🎨 Customization

### Change Email Template Colors:
Edit `netlify/functions/contact.js` line 40:
```javascript
.header { background: linear-gradient(135deg, #B28B47 0%, #8B6914 100%); }
```

### Change Auto-Reply Message:
Edit `netlify/functions/contact.js` line 110-120

### Add More Fields:
1. Add field to HTML form
2. Add to `formData` object (index.html line 3025-3034)
3. Add to email template (contact.js)

---

## 🔒 Security Features

✅ Form validation (client + server)
✅ Spam protection ready (add reCAPTCHA if needed)
✅ File size limits (10MB per file)
✅ Email rate limiting
✅ Sanitized inputs
✅ HTTPS required

---

## 📈 Next Steps (Optional)

### Add Database Storage:
```javascript
// In contact.js after sending emails:
await fetch('YOUR_AIRTABLE_API', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Add SMS Notifications:
```javascript
// Using Twilio
await twilio.messages.create({
  to: '+94XXXXXXXXX',
  body: `New lead: ${data.name}`
});
```

### Add Slack Notifications:
```javascript
await fetch('YOUR_SLACK_WEBHOOK', {
  method: 'POST',
  body: JSON.stringify({
    text: `🎉 New lead from ${data.name}!`
  })
});
```

---

## 🐛 Troubleshooting

### "Failed to send message"
- Check browser console for errors
- Verify Web3Forms access key is correct
- Check network tab for failed requests

### Netlify Function Not Working
- Verify environment variables are set
- Check Netlify function logs
- Ensure `nodemailer` is in dependencies

### Not Receiving Emails
- Check spam folder
- Verify SMTP credentials
- Test with a different email address

---

## 💡 Tips

1. **Test thoroughly** before going live
2. **Set up both** Web3Forms AND Netlify Functions (redundancy)
3. **Monitor submissions** regularly
4. **Respond within 24 hours** for best conversion
5. **Save form data** to spreadsheet/database

---

## 📞 Support

Need help? Options:
1. Check Netlify function logs
2. Review browser console errors
3. Contact Web3Forms support
4. Review this documentation

---

**Your form is now production-ready! 🎉**

Choose Web3Forms for immediate use, or Netlify Functions for a professional setup.

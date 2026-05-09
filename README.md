# MailFlow — Smart Email Automation Platform

MailFlow is a modern full-stack email automation platform built using React, Node.js, Express, MongoDB, and Nodemailer. It allows users to create accounts, manage contacts, send professional email campaigns, and track campaign history from a premium responsive dashboard.

## Features

* User Authentication (Signup/Login)
* JWT Security
* Modern Responsive UI
* Email Campaign Sending
* Contact Management
* Campaign History Tracking
* Smooth Animations with Lenis
* MongoDB Integration
* Mobile Responsive Navigation
* About, Pricing, Support, Privacy Policy, and Terms Sections

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Framer Motion
* Lenis
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Nodemailer
* JWT Authentication

## Workflow

1. User creates an account and logs in securely.
2. Contacts can be added and managed.
3. Users create campaigns with subject and message.
4. Emails are sent through MailFlow’s delivery system.
5. Replies return to the customer email using Reply-To headers.
6. Sent campaigns are stored in history.

## Additional Sections

* About Section
* Pricing (Coming Soon)
* Help & Support
* Privacy Policy
* Terms & Conditions

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
node server.js
```

## Environment Variables

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

EMAIL_USER=your_platform_email
EMAIL_PASS=your_email_app_password
```

## Author

Developed by Bhavesh Patil.

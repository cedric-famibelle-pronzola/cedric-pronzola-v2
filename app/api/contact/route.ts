import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const validateForm = (data: any) => {
  const errors = [];
  
  if (!data.name || data.name.trim() === '') {
    errors.push({ path: 'name', msg: 'Le nom est requis' });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ path: 'email', msg: 'Email invalide' });
  }
  
  if (!data.subject || data.subject === '') {
    errors.push({ path: 'subject', msg: 'Le sujet est requis' });
  }
  
  if (!data.message || data.message.trim() === '') {
    errors.push({ path: 'message', msg: 'Le message est requis' });
  } else if (data.message.trim().length < 10) {
    errors.push({ path: 'message', msg: 'Le message doit contenir au moins 10 caractères' });
  }
  
  return errors;
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        success: false, 
        errors: validationErrors 
      }, { status: 400 });
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@cedric-pronzola.re',
      to: process.env.CONTACT_EMAIL || 'contact@cedric-pronzola.re',
      replyTo: data.email,
      subject: `[Contact Form] ${data.subject}`,
      text: `Nom: ${data.name}\nEmail: ${data.email}\nSujet: ${data.subject}\n\nMessage:\n${data.message}`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>Nom:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Sujet:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Votre message a été envoyé avec succès' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Une erreur s’est produite lors de l’envoi de votre message' 
    }, { status: 500 });
  }
} 
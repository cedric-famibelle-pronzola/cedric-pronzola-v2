import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RATE_LIMIT_DURATION = 60 * 10000;

const rateLimitStore = new Map<string, number>();

interface ValidationError {
  path: string;
  msg: string;
}

// Sanitize input to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  if (!input) return '';

  // Replace < and > with their HTML entities
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

const validateForm = (data: any, locale: string = 'fr'): ValidationError[] => {
  const errors: ValidationError[] = [];

  const errorMessages = {
    en: {
      nameRequired: 'Name is required',
      emailInvalid: 'Invalid email address',
      subjectRequired: 'Subject is required',
      messageRequired: 'Message is required',
      messageMinLength: 'Message must be at least 10 characters long'
    },
    fr: {
      nameRequired: 'Le nom est requis',
      emailInvalid: 'Email invalide',
      subjectRequired: 'Le sujet est requis',
      messageRequired: 'Le message est requis',
      messageMinLength: 'Le message doit contenir au moins 10 caractères'
    }
  };

  // Default to French if locale is not supported
  const msgs = errorMessages[locale as keyof typeof errorMessages] || errorMessages.fr;

  if (!data.name || data.name.trim() === '') {
    errors.push({ path: 'name', msg: msgs.nameRequired });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({ path: 'email', msg: msgs.emailInvalid });
  }

  if (!data.subject || data.subject === '') {
    errors.push({ path: 'subject', msg: msgs.subjectRequired });
  }

  if (!data.message || data.message.trim() === '') {
    errors.push({ path: 'message', msg: msgs.messageRequired });
  } else if (data.message.trim().length < 10) {
    errors.push({ path: 'message', msg: msgs.messageMinLength });
  }

  return errors;
};

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const locale = req.headers.get('accept-language')?.split(',')[0]?.startsWith('fr') ? 'fr' : 'en';
    const csrfToken = req.headers.get('x-csrf-token');

    // Verify CSRF token validity - In a real production app, you'd have a more secure implementation
    // For now, we'll just check if it exists
    if (!csrfToken) {
      return NextResponse.json({
        success: false,
        message: locale === 'fr' ? 'Token de sécurité invalide' : 'Invalid security token',
      }, { status: 403 });
    }

    const lastSubmissionTime = rateLimitStore.get(ip);
    const currentTime = Date.now();

    if (lastSubmissionTime && currentTime - lastSubmissionTime < RATE_LIMIT_DURATION) {
      const secondsToWait = Math.ceil((RATE_LIMIT_DURATION - (currentTime - lastSubmissionTime)) / 1000);
      return NextResponse.json({
        success: false,
        message: `${secondsToWait}`,
        rateLimited: true
      }, { status: 429 });
    }

    const data = await req.json();

    // Check for honeypot field - if it contains data, it's likely a bot
    if (data.website) {
      // Silently reject bot submissions but pretend it succeeded
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully.'
      });
    }

    const validationErrors = validateForm(data, locale);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        success: false,
        errors: validationErrors
      }, { status: 400 });
    }

    // Sanitize all input data
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.message)
    };

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
      from: process.env.SMTP_FROM || 'noreply@cedric-pronzola.dev',
      to: process.env.CONTACT_EMAIL || 'contact@cedric-pronzola.dev',
      replyTo: sanitizedData.email,
      subject: `[Formulaire cedric-pronzola.dev] ${sanitizedData.subject}`,
      text: `Nom: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nSujet: ${sanitizedData.subject}\nIP: ${ip}\n\nMessage:\n${sanitizedData.message}`,
      html: `
        <h2>Nouveau message du formulaire de contact</h2>
        <p><strong>Nom:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Sujet:</strong> ${sanitizedData.subject}</p>
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    rateLimitStore.set(ip, currentTime);

    if (Math.random() < 0.1) { // 10% chance to clean up on each request
      const oneHourAgo = Date.now() - 60 * 60 * 1000;
      for (const [storedIp, timestamp] of rateLimitStore.entries()) {
        if (timestamp < oneHourAgo) {
          rateLimitStore.delete(storedIp);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: locale === 'fr' ? 'Votre message a été envoyé avec succès' : 'Your message has been sent successfully'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({
      success: false,
      message: 'Une erreur s\'est produite lors de l\'envoi de votre message'
    }, { status: 500 });
  }
}

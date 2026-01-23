import type { APIRoute } from 'astro';

interface ApplicationSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  experience?: string;
  referralSource?: string;
  coverLetter?: string;
  isVeteran?: boolean;
  resumeFileName?: string;
  submittedAt: string;
}

const experienceLabels: Record<string, string> = {
  '0-1': '0-1 years',
  '1-3': '1-3 years',
  '3-5': '3-5 years',
  '5-10': '5-10 years',
  '10+': '10+ years',
};

const referralLabels: Record<string, string> = {
  employee: 'Employee Referral',
  linkedin: 'LinkedIn',
  indeed: 'Indeed',
  website: 'Company Website',
  'career-fair': 'Career Fair',
  other: 'Other',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ApplicationSubmission = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.position) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format the email content
    const emailContent = formatEmailContent(data);

    // Get notification email from environment
    const notificationEmail = import.meta.env.CAREERS_NOTIFICATION_EMAIL || 'careers@jewett.com';

    // Log the application (in production, this would send an email)
    console.log('=== NEW JOB APPLICATION ===');
    console.log(`To: ${notificationEmail}`);
    console.log(`Subject: New Application: ${data.position} - ${data.firstName} ${data.lastName}`);
    console.log('---');
    console.log(emailContent);
    console.log('===========================');

    // In production with proper email service, you would:
    // 1. Use a service like SendGrid, Mailgun, or AWS SES
    // 2. Or use Cloudflare Email Workers
    // 3. Or integrate with an existing ATS (Applicant Tracking System)

    // Return success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Application submitted successfully',
        id: generateApplicationId(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing application:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function formatEmailContent(data: ApplicationSubmission): string {
  const lines = [
    `New Job Application`,
    '',
    '═'.repeat(50),
    '',
    `APPLICANT INFORMATION`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.isVeteran ? `Veteran Status: Yes - Military Veteran` : null,
    '',
    '─'.repeat(50),
    '',
    `POSITION DETAILS`,
    `Position Applied For: ${data.position}`,
    data.experience ? `Experience: ${experienceLabels[data.experience] || data.experience}` : null,
    data.referralSource ? `How They Heard About Us: ${referralLabels[data.referralSource] || data.referralSource}` : null,
    '',
  ];

  if (data.resumeFileName) {
    lines.push('─'.repeat(50));
    lines.push('');
    lines.push(`RESUME`);
    lines.push(`Filename: ${data.resumeFileName}`);
    lines.push(`Note: Resume file was selected but requires separate handling for attachment.`);
    lines.push('');
  }

  if (data.coverLetter) {
    lines.push('─'.repeat(50));
    lines.push('');
    lines.push(`COVER LETTER / ADDITIONAL INFORMATION`);
    lines.push(data.coverLetter);
    lines.push('');
  }

  lines.push('═'.repeat(50));
  lines.push('');
  lines.push(`Submitted: ${new Date(data.submittedAt).toLocaleString()}`);
  lines.push('');
  lines.push('This application was received through Jewett Junction.');
  lines.push('');
  lines.push('─'.repeat(50));
  lines.push('ACTION REQUIRED: Please respond to the applicant within 24 hours.');

  return lines.filter(line => line !== null).join('\n');
}

function generateApplicationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `APP-${timestamp}-${random}`.toUpperCase();
}

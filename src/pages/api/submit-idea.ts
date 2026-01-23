import type { APIRoute } from 'astro';

interface IdeaSubmission {
  name: string;
  email: string;
  department?: string;
  title: string;
  category: string;
  impact?: string;
  description: string;
  benefits?: string;
  resources?: string;
  submittedAt: string;
  notificationEmail?: string;
}

const categoryLabels: Record<string, string> = {
  process: 'Process Improvement',
  safety: 'Safety Enhancement',
  cost: 'Cost Savings',
  culture: 'Team & Culture',
  innovation: 'New Initiative',
  other: 'Other',
};

const impactLabels: Record<string, string> = {
  low: 'Nice to Have',
  medium: 'Moderate Impact',
  high: 'High Impact',
  critical: 'Game Changer',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: IdeaSubmission = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.title || !data.category || !data.description) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format the email content
    const emailContent = formatEmailContent(data);

    // For now, log the submission (in production, this would send an email)
    console.log('=== NEW IDEA SUBMISSION ===');
    console.log(`To: ${data.notificationEmail || 'ideas@jewett.com'}`);
    console.log(`Subject: New Idea Submission: ${data.title}`);
    console.log('---');
    console.log(emailContent);
    console.log('===========================');

    // In production with proper email service, you would:
    // 1. Use a service like SendGrid, Mailgun, or AWS SES
    // 2. Or use Cloudflare Email Workers
    // 3. Or integrate with an existing notification system

    // For Cloudflare Workers, you could use:
    // - Cloudflare Email Routing
    // - Integration with external email API via fetch

    // Return success
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Idea submitted successfully',
        id: generateSubmissionId(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing idea submission:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

function formatEmailContent(data: IdeaSubmission): string {
  const lines = [
    `New Idea Submission from ${data.name}`,
    '',
    '─'.repeat(50),
    '',
    `SUBMITTED BY`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.department ? `Department: ${data.department}` : null,
    '',
    '─'.repeat(50),
    '',
    `IDEA DETAILS`,
    `Title: ${data.title}`,
    `Category: ${categoryLabels[data.category] || data.category}`,
    data.impact ? `Expected Impact: ${impactLabels[data.impact] || data.impact}` : null,
    '',
    `Description:`,
    data.description,
    '',
  ];

  if (data.benefits) {
    lines.push(`Expected Benefits:`);
    lines.push(data.benefits);
    lines.push('');
  }

  if (data.resources) {
    lines.push(`Resources Needed:`);
    lines.push(data.resources);
    lines.push('');
  }

  lines.push('─'.repeat(50));
  lines.push('');
  lines.push(`Submitted: ${new Date(data.submittedAt).toLocaleString()}`);
  lines.push('');
  lines.push('This submission was received through Jewett Junction.');

  return lines.filter(line => line !== null).join('\n');
}

function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `IDEA-${timestamp}-${random}`.toUpperCase();
}

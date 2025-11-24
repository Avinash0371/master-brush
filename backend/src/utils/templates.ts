export const painterApprovalTemplate = (name: string, status: string, notes?: string) => `
  <h1>Master Brush Painter Application</h1>
  <p>Hi ${name},</p>
  <p>Your application status is now <strong>${status}</strong>.</p>
  ${notes ? `<p>Notes: ${notes}</p>` : ''}
  <p>Thank you for partnering with Master Brush.</p>
`;

export const leadConfirmationTemplate = (name: string) => `
  <h1>Master Brush</h1>
  <p>Hi ${name},</p>
  <p>Thanks for reaching out! Our team will contact you shortly to finalise your painting needs.</p>
`;

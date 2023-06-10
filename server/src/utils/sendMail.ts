export async function sendMail(
  from: string,
  to: string,
  url_link: string,
  subject: string
) {
  const apiKey = `${process.env.EMAIL_API_KEY}`;

  const endpoint = "https://api.brevo.com/v3/smtp/email";
  const headers = {
    accept: "application/json",
    "api-key": apiKey,
    "content-type": "application/json",
  };
  const payload = {
    sender: { email: from },
    to: [{ email: to }],
    replyTo: { email: from },
    subject: subject,
    htmlContent: `
        <html>
        <head>
        <style>
        a {
        background-color: #ceda81;
        color: blue;
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        }
        
        a::after {
        content: " →"
        }
        
        </style>
        </head>
        <body>
        
        <h4>Click the button to join Workspace.</h4>
        <a href=${url_link} target="_blank">Accept Invite</a>
        
        <p>If you are receiving this email by mistake just ignore it.</p>
        
        </body>
        </html> 
        `,
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to send invite");
    }
    return "success";
  } catch (error) {
    throw new Error("Failed to send invite");
  }
}

import axios from "axios";

interface Personalisation {
  to: [{ email: string; name: string }];
  cc?: [{ email: string; name: string }];
  bcc?: [{ email: string; name: string }];
}

export const sendContactEmail = async (
  from: string,
  name: string,
  emailContent: string,
  subject?: string
) => {
  const baseUrl = "https://api.sendgrid.com/v3/mail/send";
  const apiKey = process.env.SENDGRID_API_KEY!;
  const sender = "info@laybackandwin.com.au";

  const message = {
    personalizations: [
      {
        to: [
          {
            email: sender,
          },
        ],
      },
    ],
    from: { email: sender, name: name },
    reply_to: { email: from, name: name },
    subject: subject ? subject : "Layback and Win Contact Form",
    content: [
      {
        type: "text/plain",
        value: emailContent,
      },
    ],
  };

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(baseUrl, message, { headers });

  console.log(response.data);

  return response;
};

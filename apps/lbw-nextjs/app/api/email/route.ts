import { sendContactEmail } from "@/lib/send-grid";

export async function POST(req: Request) {
  const body = await req.json();

  const { from, name, emailContent, subject } = body;

  if (!from || !name || !emailContent) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    await sendContactEmail(from, name, emailContent, subject);
  } catch (error) {
    return new Response("Error sending email", { status: 500 });
  }

  console.log(`[API] email sent successfully from=${from}`);
  return new Response("Email sent", { status: 200 });
}

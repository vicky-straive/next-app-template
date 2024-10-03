// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from "next";
import ElasticEmail from "elastic-email";

const elasticEmailClient = new ElasticEmail({
  apiKey: process.env.ELASTIC_EMAIL_API_KEY, // Set your Elastic Email API key
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { recipient, subject, message } = req.body;

    const emailData = {
      from: "your-email@example.com",
      to: recipient,
      subject: subject,
      bodyHtml: message,
    };

    try {
      await elasticEmailClient.email.send(emailData);
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

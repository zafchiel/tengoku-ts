import resend from "@/resend";
import { SendVerificationRequestParams } from "next-auth/providers";
import MagicLinkEmail from "@/resend/magicLinkEmail";

export async function sendVerificationRequest({
  identifier,
  url,
}: SendVerificationRequestParams) {
  const { host } = new URL(url);
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLinkEmail({ url, host }),
    });
    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send the verification Email.");
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

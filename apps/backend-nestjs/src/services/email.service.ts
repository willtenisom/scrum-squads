import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export class EmailService {
  private static readonly DEFAULT_FROM_EMAIL = process.env.FROM_EMAIL || "";
  private static readonly RECIPIENTS = (process.env.SCRUM_MASTER_EMAIL || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  static async sendDailyEmail(userEmail: string, pdfBase64: string): Promise<void> {
    const formattedDate = EmailService.getFormattedDate();

    const msg = {
      to: EmailService.RECIPIENTS,
      from: EmailService.DEFAULT_FROM_EMAIL,
      replyTo: userEmail,
      subject: `[PB ABR25] Registro Daily - ${formattedDate}`,
      text: `Relatório enviado por: ${userEmail}`,
      attachments: [
        {
          content: pdfBase64,
          filename: `daily_${EmailService.normalizeFileName(userEmail)}.pdf`,
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    try {
      await sgMail.send(msg);
      console.log(`✅ Email enviado para: ${EmailService.RECIPIENTS.join(", ")}`);
    } catch (error) {
      console.error("❌ Erro ao enviar email:", error);
      throw new Error("Falha no serviço de email");
    }
  }

  private static normalizeFileName(email: string): string {
    return email.split("@")[0].replace(/\./g, "_").toLowerCase();
  }

  private static getFormattedDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}`;
  }
}

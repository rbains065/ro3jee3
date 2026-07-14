import emailjs from "@emailjs/browser";

// Check if EmailJS keys are configured
const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || "";
const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || "";
const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || "";

const isEmailJSConfigured = 
  serviceId.trim() !== "" && 
  templateId.trim() !== "" && 
  publicKey.trim() !== "" &&
  !serviceId.includes("YOUR_") &&
  !templateId.includes("YOUR_") &&
  !publicKey.includes("YOUR_");

export interface EmailLog {
  id: string;
  sent_at: string;
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  status: "sent" | "simulated";
}

// Store a list of sent/simulated emails in localStorage for the Admin Dashboard to read
const logEmailLocally = (emailLog: EmailLog) => {
  try {
    const existing = localStorage.getItem("buildora_email_logs");
    const list: EmailLog[] = existing ? JSON.parse(existing) : [];
    list.unshift(emailLog);
    localStorage.setItem("buildora_email_logs", JSON.stringify(list));
  } catch (err) {
    console.error("Failed to log email to localStorage", err);
  }
};

export const getEmailLogs = (): EmailLog[] => {
  try {
    const existing = localStorage.getItem("buildora_email_logs");
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.error("Failed to read email logs", err);
    return [];
  }
};

export const clearEmailLogs = () => {
  localStorage.removeItem("buildora_email_logs");
};

/**
 * Sends a confirmation email to the user's email address.
 * Uses real EmailJS if credentials are set up, otherwise simulates and records it.
 */
export async function sendConfirmationEmail(params: {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; status: "sent" | "simulated"; error?: string }> {
  const logId = Math.random().toString(36).substring(2, 11);
  const timestamp = new Date().toISOString();

  if (isEmailJSConfigured) {
    try {
      // Structure template parameters for EmailJS
      // Pass multiple keys to handle whatever placeholder the user created in their EmailJS dashboard template (e.g. {{email}}, {{to_email}}, {{user_email}}, {{to}})
      const templateParams = {
        to_email: params.to_email,
        email: params.to_email,
        user_email: params.to_email,
        to: params.to_email,
        recipient_email: params.to_email,
        
        to_name: params.to_name,
        name: params.to_name,
        user_name: params.to_name,
        
        subject: params.subject,
        message: params.message,
        reply_to: "support@buildora.ca"
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("EmailJS Sent Success:", response.status, response.text);

      const emailLog: EmailLog = {
        id: logId,
        sent_at: timestamp,
        to_email: params.to_email,
        to_name: params.to_name,
        subject: params.subject,
        message: params.message,
        status: "sent"
      };
      logEmailLocally(emailLog);

      return { success: true, status: "sent" };
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      
      // Still log it as simulated/failed so the admin can see what happened
      const emailLog: EmailLog = {
        id: logId,
        sent_at: timestamp,
        to_email: params.to_email,
        to_name: params.to_name,
        subject: params.subject,
        message: `${params.message}\n\n[ERROR: EmailJS failed with error: ${error?.text || error?.message || error}]`,
        status: "simulated"
      };
      logEmailLocally(emailLog);

      return { success: false, status: "simulated", error: error?.text || error?.message };
    }
  } else {
    // Simulated behavior
    console.log(
      `%c[EmailJS Simulation] Sending email to ${params.to_email} (${params.to_name})%c\nSubject: ${params.subject}\nMessage: ${params.message}`,
      "color: #ff6b35; font-weight: bold; font-size: 14px;",
      "color: inherit;"
    );

    const emailLog: EmailLog = {
      id: logId,
      sent_at: timestamp,
      to_email: params.to_email,
      to_name: params.to_name,
      subject: params.subject,
      message: params.message,
      status: "simulated"
    };
    logEmailLocally(emailLog);

    return { success: true, status: "simulated" };
  }
}

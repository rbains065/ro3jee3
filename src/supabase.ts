import { createClient } from "@supabase/supabase-js";

// Check if Supabase keys are configured
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = 
  supabaseUrl.trim() !== "" && 
  supabaseAnonKey.trim() !== "" && 
  !supabaseUrl.includes("YOUR_") && 
  !supabaseAnonKey.includes("YOUR_");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Submission {
  id: string;
  type: "mockup" | "contact" | "booking";
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  message?: string;
  website?: string;
  interest?: string;
  preferredTime?: string;
}

// Save a submission to localStorage
const saveToLocal = (submission: Submission) => {
  try {
    const existing = localStorage.getItem("buildora_submissions");
    const list: Submission[] = existing ? JSON.parse(existing) : [];
    list.unshift(submission); // Newest first
    localStorage.setItem("buildora_submissions", JSON.stringify(list));
  } catch (err) {
    console.error("Failed to save submission to localStorage", err);
  }
};

// Retrieve submissions from localStorage
export const getLocalSubmissions = (): Submission[] => {
  try {
    const existing = localStorage.getItem("buildora_submissions");
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.error("Failed to read submissions from localStorage", err);
    return [];
  }
};

// Clear localStorage submissions
export const clearLocalSubmissions = () => {
  localStorage.removeItem("buildora_submissions");
};

// Discord Webhook URL for booking and submission notifications
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1527135114696462568/1ToUzTDt0OBYE3-70EAIXh-JjRuVrnGh_R1g6Ib6LwGo9WQrMYbWmsjo-Z5Zoj7XPkEU";

async function sendToDiscord(submission: Submission) {
  try {
    const typeLabels: Record<string, string> = {
      mockup: "🆓 Free Homepage Design Request",
      contact: "✉️ Contact Form Submission",
      booking: "📅 Discovery Call Booking"
    };

    const title = typeLabels[submission.type] || "🆕 New Website Submission";
    const color = submission.type === "booking" ? 3066993 // Green
                : submission.type === "mockup" ? 15105570 // Orange
                : 3447003; // Blue

    const fields = [
      { name: "Name", value: submission.name || "N/A", inline: true },
      { name: "Email", value: submission.email || "N/A", inline: true },
      { name: "Phone", value: submission.phone || "N/A", inline: true }
    ];

    if (submission.type === "mockup" && submission.businessType) {
      fields.push({ name: "Business Type", value: submission.businessType, inline: false });
    }

    if (submission.type === "booking") {
      if (submission.interest) {
        fields.push({ name: "Selected Focus", value: submission.interest, inline: true });
      }
      if (submission.preferredTime) {
        fields.push({ name: "Preferred Time Frame", value: submission.preferredTime, inline: true });
      }
      if (submission.website) {
        fields.push({ name: "Current Website", value: submission.website, inline: false });
      }
    }

    if (submission.message) {
      fields.push({ name: "Message/Notes", value: submission.message, inline: false });
    }

    const payload = {
      embeds: [
        {
          title: title,
          color: color,
          fields: fields,
          timestamp: submission.created_at,
          footer: {
            text: "Buildora Leads Bot"
          }
        }
      ]
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Failed to send lead notification to Discord webhook:", err);
  }
}

/**
 * Core function to handle saving a submission.
 * It will always save to localStorage so the admin dashboard can see it instantly.
 * It will also attempt to save to Supabase if configured.
 */
export async function createSubmission(submissionData: Omit<Submission, "id" | "created_at">): Promise<Submission> {
  const newSubmission: Submission = {
    id: Math.random().toString(36).substring(2, 11),
    created_at: new Date().toISOString(),
    ...submissionData
  };

  // Always save locally first to guarantee persistence in the preview
  saveToLocal(newSubmission);

  // Send to Discord Webhook asynchronously (non-blocking)
  sendToDiscord(newSubmission).catch((err) => {
    console.error("Discord webhook dispatch error:", err);
  });

  // If Supabase is configured, attempt to save to the database table "submissions"
  if (supabase) {
    try {
      const { error } = await supabase.from("submissions").insert([
        {
          id: newSubmission.id,
          type: newSubmission.type,
          created_at: newSubmission.created_at,
          name: newSubmission.name,
          email: newSubmission.email,
          phone: newSubmission.phone || null,
          business_type: newSubmission.businessType || null,
          message: newSubmission.message || null,
          website: newSubmission.website || null,
          interest: newSubmission.interest || null,
          preferred_time: newSubmission.preferredTime || null
        }
      ]);

      if (error) {
        console.warn("Supabase insertion error (table 'submissions' might not exist yet):", error.message);
      } else {
        console.log("Successfully synchronized submission with Supabase.");
      }
    } catch (e) {
      console.warn("Could not insert to Supabase, fallback to localStorage was used.", e);
    }
  }

  return newSubmission;
}

/**
 * Fetch all submissions. Combines local storage and Supabase submissions (if configured).
 */
export async function getSubmissions(): Promise<Submission[]> {
  const localItems = getLocalSubmissions();

  if (!supabase) {
    return localItems;
  }

  try {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Could not read from Supabase 'submissions' table. Using local submissions.", error.message);
      return localItems;
    }

    if (data && data.length > 0) {
      // Map Supabase rows back to Submission interfaces
      const dbItems: Submission[] = data.map((row: any) => ({
        id: row.id,
        type: row.type,
        created_at: row.created_at,
        name: row.name,
        email: row.email,
        phone: row.phone || undefined,
        businessType: row.business_type || undefined,
        message: row.message || undefined,
        website: row.website || undefined,
        interest: row.interest || undefined,
        preferredTime: row.preferred_time || undefined
      }));

      // Combine and filter out duplicates by ID
      const allItems = [...dbItems, ...localItems];
      const seen = new Set<string>();
      return allItems.filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  } catch (e) {
    console.warn("Failed to retrieve from Supabase, returning local items instead.", e);
  }

  return localItems;
}

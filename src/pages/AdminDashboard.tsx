import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Database, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  RefreshCw, 
  Search, 
  Filter, 
  User, 
  Phone, 
  Globe, 
  Calendar, 
  FileText, 
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Lock,
  Unlock,
  ShieldAlert,
  LogOut
} from "lucide-react";
import { motion } from "motion/react";
import { getSubmissions, clearLocalSubmissions, Submission, supabase } from "../supabase";
import { getEmailLogs, clearEmailLogs, EmailLog } from "../emailjs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [subFilter, setSubFilter] = useState<"all" | "mockup" | "contact" | "booking">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"submissions" | "emails" | "setup">("submissions");

  // Passcode security states
  const [inputPasscode, setInputPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [passcodeError, setPasscodeError] = useState("");
  const [isPasscodeDefault, setIsPasscodeDefault] = useState(false);

  // Check if ADMIN_PASSCODE is default fallback
  useEffect(() => {
    fetch("/api/admin-status")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.isPasscodeDefault === "boolean") {
          setIsPasscodeDefault(data.isPasscodeDefault);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch admin status:", err);
      });
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/verify-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: inputPasscode }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        sessionStorage.setItem("admin_authenticated", "true");
        setIsAuthenticated(true);
        setPasscodeError("");
      } else {
        setPasscodeError(data.error || "Incorrect passcode. Please try again.");
      }
    } catch (err) {
      console.error("Auth request failed:", err);
      setPasscodeError("Server connection error. Please try again.");
    }
  };

  const handleSignOut = () => {
    if (window.confirm("Are you sure you want to lock the admin panel?")) {
      sessionStorage.removeItem("admin_authenticated");
      setIsAuthenticated(false);
      setInputPasscode("");
    }
  };

  // Connection check
  const isSupabaseConnected = !!supabase;
  const isEmailJSConnected = 
    !!(import.meta as any).env.VITE_EMAILJS_SERVICE_ID && 
    !!(import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID && 
    !!(import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

  const loadData = async () => {
    setLoading(true);
    try {
      const subs = await getSubmissions();
      setSubmissions(subs);
      setEmailLogs(getEmailLogs());
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleClearLocal = () => {
    if (window.confirm("Are you sure you want to clear all browser-saved submissions? This will not affect Supabase database records.")) {
      clearLocalSubmissions();
      loadData();
    }
  };

  const handleClearEmails = () => {
    if (window.confirm("Are you sure you want to clear all email simulation logs?")) {
      clearEmailLogs();
      loadData();
    }
  };

  const filteredSubs = submissions.filter((sub) => {
    const matchesFilter = subFilter === "all" || sub.type === subFilter;
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.phone && sub.phone.includes(searchQuery)) ||
      (sub.businessType && sub.businessType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sub.message && sub.message.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Database setup query helper
  const sqlSetupSnippet = `-- Run this query in your Supabase SQL Editor to create the submissions table:

CREATE TABLE IF NOT EXISTS public.submissions (
  id text PRIMARY KEY,
  created_at timestamptz DEFAULT timezone('utc'::text, now()) NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  business_type text,
  message text,
  website text,
  interest text,
  preferred_time text
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (leads submitting forms)
CREATE POLICY "Allow public inserts" ON public.submissions 
  FOR INSERT TO anon WITH CHECK (true);

-- Create policy to allow authenticated reads (admin panel access)
CREATE POLICY "Allow authenticated reads" ON public.submissions 
  FOR SELECT TO anon USING (true); -- Set up proper authenticated role in production!
`;

  if (!isAuthenticated) {
    return (
      <main className="pt-24 pb-16 bg-surface min-h-screen text-primary flex items-center justify-center select-text overflow-hidden px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8 shadow-lg relative overflow-hidden"
        >
          {/* Top orange gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent"></div>
          
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent mb-4">
              <Lock className="h-6 w-6" />
            </div>
            
            <h1 className="text-2xl font-bold font-display text-primary">Admin Control Center</h1>
            <p className="text-xs text-muted-foreground mt-2 max-w-xs mx-auto">
              Please enter the master passcode to view form submissions, email simulation logs, and active configurations.
            </p>
          </div>

          <form onSubmit={handleAuthenticate} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                required
                value={inputPasscode}
                onChange={(e) => {
                  setInputPasscode(e.target.value);
                  if (passcodeError) setPasscodeError("");
                }}
                placeholder="••••••••"
                className={`w-full h-11 px-4 rounded-xl border bg-surface text-sm focus:outline-none transition-all ${
                  passcodeError 
                    ? "border-destructive focus:ring-1 focus:ring-destructive" 
                    : "border-border focus:border-accent focus:ring-1 focus:ring-accent"
                }`}
              />
              {passcodeError && (
                <p className="mt-1.5 text-xs text-destructive flex items-center gap-1 font-medium">
                  <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                  {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-cta w-full h-11 text-sm font-bold flex items-center justify-center gap-2"
            >
              <Unlock className="h-4 w-4" />
              Unlock Dashboard
            </button>
          </form>

          {/* Info Banner about ADMIN_PASSCODE */}
          <div className="mt-6 border-t border-border pt-4 text-center">
            {isPasscodeDefault ? (
              <div className="rounded-lg bg-warning/10 border border-warning/20 p-3 text-left">
                <p className="text-[11px] leading-relaxed text-warning/80 flex gap-1.5 items-start">
                  <ShieldAlert className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <span>
                    <strong>Currently using default fallback passcode.</strong> To secure this page properly, add the <code>ADMIN_PASSCODE</code> variable to your environment configuration.
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1.5 font-mono">
                <span>🔒 Passcode secured via environment</span>
              </p>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-accent font-semibold inline-flex items-center gap-1">
              ← Back to homepage
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16 bg-surface min-h-screen text-primary select-text overflow-hidden">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container-page max-w-6xl"
      >
        
        {/* Passcode Reminder Banner */}
        {isPasscodeDefault && (
          <motion.div 
            variants={itemVariants}
            className="mb-6 p-4 rounded-xl border border-warning/20 bg-warning/5 text-warning flex items-start gap-3"
          >
            <ShieldAlert className="h-5 w-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Unsecured Fallback Active</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                The admin panel is currently using the default fallback passcode ("admin123"). Please configure the <code>ADMIN_PASSCODE</code> environment variable to use your own secure master passcode.
              </p>
            </div>
          </motion.div>
        )}

        {/* Top Header Navigation */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Link to="/" className="hover:text-accent flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Home
              </Link>
              <span>/</span>
              <span>Admin Control Center</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display text-primary flex items-center gap-2">
              Buildora Leads & logs <span className="text-xs bg-accent/15 text-accent border border-accent/20 px-2 py-0.5 rounded-full font-mono">v1.2</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Consolidated workspace containing form submissions, client-directed confirmation logs, and API status monitoring.
            </p>
          </div>
 
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button 
              onClick={loadData}
              className="px-4 h-10 inline-flex items-center gap-2 rounded-lg border border-border bg-card text-xs font-bold hover:border-accent transition-all text-primary"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
            <button 
              onClick={handleSignOut}
              className="px-4 h-10 inline-flex items-center gap-2 rounded-lg border border-border bg-destructive/5 hover:border-destructive hover:bg-destructive/10 text-xs font-bold transition-all text-destructive"
              title="Lock admin dashboard"
            >
              <LogOut className="h-3.5 w-3.5" />
              Lock Panel
            </button>
          </div>
        </motion.div>

        {/* Integration Status Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Supabase Status Card */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex items-start gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${isSupabaseConnected ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Supabase Storage</div>
              <div className="text-base font-bold text-primary mt-1 flex items-center gap-1.5">
                {isSupabaseConnected ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    Connected
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-warning shrink-0" />
                    LocalStorage Mode
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isSupabaseConnected 
                  ? "Writing and reading records directly to your active Supabase database." 
                  : "Using browser LocalStorage. Set VITE_SUPABASE_URL & KEY to activate SQL storage."
                }
              </p>
            </div>
          </div>

          {/* EmailJS Status Card */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex items-start gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${isEmailJSConnected ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">EmailJS Automated Sends</div>
              <div className="text-base font-bold text-primary mt-1 flex items-center gap-1.5">
                {isEmailJSConnected ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    Live Active
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-warning shrink-0" />
                    Simulation Active
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {isEmailJSConnected 
                  ? "Delivering actual confirmation emails to your clients in real-time."
                  : "Simulating user notifications. Configure credentials to fire live outbound emails."
                }
              </p>
            </div>
          </div>

          {/* Submission Total Card */}
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex items-start gap-4">
            <div className="p-3 rounded-xl shrink-0 bg-accent/10 text-accent">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Leads Collected</div>
              <div className="text-2xl font-black text-primary mt-0.5">{submissions.length}</div>
              <p className="text-xs text-muted-foreground mt-1.5">
                {submissions.filter(s => s.type === "mockup").length} Mockups · {submissions.filter(s => s.type === "contact").length} Contacts · {submissions.filter(s => s.type === "booking").length} Bookings
              </p>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="border-b border-border mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab("submissions")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all px-1 ${
              activeTab === "submissions" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-primary"
            }`}
          >
            Leads Received ({filteredSubs.length})
          </button>
          <button
            onClick={() => setActiveTab("emails")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all px-1 ${
              activeTab === "emails" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-primary"
            }`}
          >
            Email confirmation Logs ({emailLogs.length})
          </button>
          <button
            onClick={() => setActiveTab("setup")}
            className={`pb-3 text-sm font-bold border-b-2 transition-all px-1 ${
              activeTab === "setup" ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-primary"
            }`}
          >
            Supabase Setup Guide
          </button>
        </div>

        {/* Tab 1: Submissions */}
        {activeTab === "submissions" && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-card p-4 rounded-xl border border-border">
              <div className="flex flex-wrap gap-2 shrink-0">
                {(["all", "mockup", "contact", "booking"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSubFilter(type)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border capitalize transition-all ${
                      subFilter === type 
                        ? "bg-primary text-white border-primary" 
                        : "bg-surface border-border hover:border-accent"
                    }`}
                  >
                    {type === "all" ? "All categories" : type}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-xs focus:ring-1 focus:ring-accent focus:border-accent outline-none"
                />
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div className="text-center py-12 text-sm text-muted-foreground">Loading leads data...</div>
            ) : filteredSubs.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-foreground">
                <Database className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                <h4 className="font-bold text-primary">No submissions found</h4>
                <p className="text-xs mt-1 max-w-xs mx-auto">
                  Try submitting one of the forms on the Free Homepage, Book a Call, or Contact pages to see details instantly populated here!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubs.map((sub) => (
                  <div key={sub.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all shadow-sm">
                    {/* Top bar of row */}
                    <div className="border-b border-border bg-surface/50 px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] ${
                          sub.type === "mockup" ? "bg-accent/15 text-accent border border-accent/20" :
                          sub.type === "booking" ? "bg-success/15 text-success border border-success/20" :
                          "bg-primary/10 text-primary border border-primary/20"
                        }`}>
                          {sub.type === "mockup" ? "Free Mockup" : sub.type === "booking" ? "Discovery Call" : "Standard Inquiry"}
                        </span>
                        <span className="text-muted-foreground font-mono">ID: {sub.id}</span>
                      </div>
                      <div className="text-muted-foreground font-medium">
                        {new Date(sub.created_at).toLocaleString()}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="grid gap-6 md:grid-cols-12">
                        
                        {/* Submitter details */}
                        <div className="md:col-span-4 space-y-3">
                          <div className="flex items-center gap-2 text-sm text-primary font-bold">
                            <User className="h-4 w-4 text-accent shrink-0" />
                            {sub.name}
                          </div>
                          
                          <div className="space-y-1.5 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-3.5 w-3.5" />
                              <a href={`mailto:${sub.email}`} className="hover:underline hover:text-accent select-all">{sub.email}</a>
                            </div>
                            {sub.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5" />
                                <span className="select-all">{sub.phone}</span>
                              </div>
                            )}
                            {sub.website && (
                              <div className="flex items-center gap-2">
                                <Globe className="h-3.5 w-3.5" />
                                <a href={`https://${sub.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-accent select-all">{sub.website}</a>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Submission Specifics */}
                        <div className="md:col-span-8 space-y-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                          {sub.businessType && (
                            <div className="text-xs">
                              <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">Business Type</span>
                              <span className="font-semibold text-primary">{sub.businessType}</span>
                            </div>
                          )}

                          {sub.interest && (
                            <div className="text-xs">
                              <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">Inquiry Topic</span>
                              <span className="font-semibold text-primary">{sub.interest}</span>
                            </div>
                          )}

                          {sub.preferredTime && (
                            <div className="text-xs">
                              <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">Preferred Appointment Call Time</span>
                              <span className="font-semibold text-primary">{sub.preferredTime}</span>
                            </div>
                          )}

                          {sub.message && (
                            <div className="text-xs">
                              <span className="font-bold text-muted-foreground uppercase tracking-wider block mb-1">Message / Project Goals</span>
                              <div className="bg-surface rounded-lg p-3 text-primary border border-border mt-1 leading-relaxed select-text font-sans whitespace-pre-wrap">
                                {sub.message}
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleClearLocal}
                    className="h-10 px-4 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-500 rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Clear local browser logs
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Email Logs */}
        {activeTab === "emails" && (
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-xl border border-border text-xs text-muted-foreground flex justify-between items-center">
              <span>These are local logs showing automated customer confirmation emails sent or simulated by EmailJS.</span>
              <button 
                onClick={handleClearEmails}
                className="text-red-500 font-bold hover:underline inline-flex items-center gap-1 shrink-0"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear logs
              </button>
            </div>

            {emailLogs.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-foreground">
                <Mail className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                <h4 className="font-bold text-primary">No notifications logged</h4>
                <p className="text-xs mt-1">Submit a lead request on any of the forms to watch instant auto-confirmation emails trigger.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {emailLogs.map((log) => (
                  <div key={log.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:border-accent/40 transition-all">
                    <div className="border-b border-border bg-surface/50 px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] ${
                          log.status === "sent" ? "bg-success/15 text-success border border-success/20" : "bg-warning/15 text-warning border border-warning/20"
                        }`}>
                          {log.status === "sent" ? "EmailJS Sent" : "EmailJS Simulated"}
                        </span>
                        <span className="text-muted-foreground font-mono">Recipient: {log.to_name} ({log.to_email})</span>
                      </div>
                      <span className="text-muted-foreground font-medium">{new Date(log.sent_at).toLocaleString()}</span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject Line</div>
                        <div className="font-bold text-primary text-sm mt-0.5">{log.subject}</div>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Email Body Message Sent</div>
                        <pre className="bg-surface p-4 rounded-xl text-xs text-primary leading-relaxed whitespace-pre-wrap font-sans border border-border select-text">
                          {log.message}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Setup Instructions */}
        {activeTab === "setup" && (
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold font-display text-primary flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" /> Integrating Supabase with Buildora
              </h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Buildora is ready for persistent cloud database storage with Supabase out of the box. Follow these steps to synchronize this UI with your database dashboard:
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white mt-0.5">1</div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Create a free Supabase project</h4>
                  <p className="text-xs text-muted-foreground mt-1">Sign up at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">supabase.com</a> and click "New Project".</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white mt-0.5">2</div>
                <div className="w-full">
                  <h4 className="font-bold text-primary text-sm">Run table generation SQL</h4>
                  <p className="text-xs text-muted-foreground mt-1">Navigate to the "SQL Editor" page in Supabase, open a new query sheet, copy-paste the SQL code below, and click "Run":</p>
                  
                  <div className="mt-2.5 relative">
                    <pre className="bg-surface text-primary rounded-xl border border-border p-4 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre select-all max-h-[300px]">
                      {sqlSetupSnippet}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white mt-0.5">3</div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Configure Environment Secrets</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Copy your project's <strong className="text-primary font-medium">Project URL</strong> and <strong className="text-primary font-medium">Anon API key</strong> from Supabase Project Settings → API, and add them in the Settings secrets panel of Google AI Studio or your local environment as:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1.5 text-xs text-primary font-mono bg-surface p-3 rounded-lg border border-border">
                    <li>VITE_SUPABASE_URL="https://your-project-id.supabase.co"</li>
                    <li>VITE_SUPABASE_ANON_KEY="your-anon-key-string"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </motion.div>
    </main>
  );
}

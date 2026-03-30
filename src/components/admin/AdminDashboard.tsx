import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Users,
  KeyRound,
  UserPlus,
  Home,
  RefreshCw,
  Search,
  Mail,
  Reply,
} from "lucide-react";

interface AdminDashboardProps {
  session: any;
}

type Tab = "overview" | "enquiries" | "content" | "password" | "users";

const AdminDashboard = ({ session }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEnquiries();
    fetchSiteContent();
  }, []);

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    const { data } = await supabase
      .from("contact_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setEnquiries(data);
      setStats({
        total: data.length,
        unread: data.filter((e: any) => !e.is_read).length,
        read: data.filter((e: any) => e.is_read).length,
      });
    }
    setLoadingEnquiries(false);
  };

  const fetchSiteContent = async () => {
    const { data } = await supabase.from("site_content").select("*").order("section_key");
    if (data) setSiteContent(data);
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_enquiries").update({ is_read: true }).eq("id", id);
    fetchEnquiries();
    toast({ title: "Marked as read" });
  };

  const deleteEnquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    await supabase.from("contact_enquiries").delete().eq("id", id);
    fetchEnquiries();
    toast({ title: "Enquiry deleted" });
  };

  const updateContent = async (id: string, title: string, content: string) => {
    const { error } = await supabase
      .from("site_content")
      .update({ title, content, updated_by: session.user.id })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Content updated successfully" });
      fetchSiteContent();
    }
  };

  const deleteContent = async (id: string) => {
    if (!window.confirm("Delete this content section?")) return;
    const { error } = await supabase.from("site_content").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Content deleted" });
      fetchSiteContent();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const filteredEnquiries = enquiries.filter(
    (e) =>
      !searchQuery ||
      e.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
    { id: "enquiries" as Tab, label: "Messages", icon: MessageSquare },
    { id: "content" as Tab, label: "Content", icon: FileText },
    { id: "password" as Tab, label: "Password", icon: KeyRound },
    { id: "users" as Tab, label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0 md:w-16"
        } gradient-bg-dark text-white transition-all duration-300 flex flex-col overflow-hidden flex-shrink-0`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          {sidebarOpen && <h2 className="font-bold text-lg font-['Space_Grotesk']">Admin Panel</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon size={18} />
              {sidebarOpen && tab.label}
              {tab.id === "enquiries" && stats.unread > 0 && sidebarOpen && (
                <span className="ml-auto gradient-bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.unread}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <Home size={18} />
            {sidebarOpen && "Back to Site"}
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut size={18} />
            {sidebarOpen && "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text font-['Space_Grotesk']">
                {tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Logged in as {session.user.email}
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl border border-border hover:bg-accent"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Messages", value: stats.total, icon: MessageSquare, bg: "gradient-bg" },
                  { label: "Unread", value: stats.unread, icon: Clock, bg: "gradient-bg-secondary" },
                  { label: "Read", value: stats.read, icon: CheckCircle, bg: "gradient-bg" },
                  { label: "Content Sections", value: siteContent.length, icon: FileText, bg: "gradient-bg-secondary" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</p>
                      <div className={`w-9 h-9 ${stat.bg} rounded-xl flex items-center justify-center`}>
                        <stat.icon size={16} className="text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Recent Messages</h3>
                  <button onClick={fetchEnquiries} className="text-muted-foreground hover:text-foreground transition-colors">
                    <RefreshCw size={16} />
                  </button>
                </div>
                {enquiries.slice(0, 5).map((enq) => (
                  <div key={enq.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${enq.is_read ? "bg-muted" : "bg-secondary"}`} />
                      <div>
                        <p className="font-medium text-foreground text-sm">{enq.name}</p>
                        <p className="text-xs text-muted-foreground">{enq.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {enquiries.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No messages yet</p>
                )}
              </div>
            </div>
          )}

          {/* Enquiries / Messages */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages by name, email, or subject..."
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button onClick={fetchEnquiries} className="p-2.5 border border-border rounded-xl hover:bg-accent transition-colors">
                  <RefreshCw size={16} />
                </button>
              </div>

              {loadingEnquiries ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin mx-auto" />
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                  <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">{searchQuery ? "No matching messages" : "No messages yet"}</p>
                </div>
              ) : (
                filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className={`bg-card rounded-2xl border p-5 shadow-sm transition-all ${
                      enq.is_read ? "border-border" : "border-secondary/30 bg-secondary/[0.02]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                          {enq.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-foreground text-sm">{enq.name}</h4>
                            {!enq.is_read && (
                              <span className="text-[10px] gradient-bg-secondary text-white px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail size={10} /> {enq.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(enq.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground text-sm mb-1">{enq.subject}</p>
                    <p className="text-muted-foreground text-sm mb-4 whitespace-pre-wrap">{enq.message}</p>
                    <div className="flex gap-2">
                      {!enq.is_read && (
                        <button
                          onClick={() => markAsRead(enq.id)}
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-accent text-foreground hover:bg-accent/80 transition-colors"
                        >
                          <Eye size={12} /> Mark Read
                        </button>
                      )}
                      <a
                        href={`mailto:${enq.email}?subject=Re: ${encodeURIComponent(enq.subject)}`}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Reply size={12} /> Reply
                      </a>
                      <button
                        onClick={() => deleteEnquiry(enq.id)}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-bold text-foreground mb-3">Add New Content Section</h3>
                <AddContentForm onAdded={fetchSiteContent} userId={session.user.id} />
              </div>

              {siteContent.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                  <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No content sections yet. Add one above.</p>
                </div>
              ) : (
                siteContent.map((item) => (
                  <ContentEditor key={item.id} item={item} onSave={updateContent} onDelete={deleteContent} />
                ))
              )}
            </div>
          )}

          {/* Password Tab */}
          {activeTab === "password" && <ChangePasswordForm />}

          {/* Users Tab */}
          {activeTab === "users" && <UserManagement currentUserId={session.user.id} />}
        </div>
      </main>
    </div>
  );
};

// Change Password
const ChangePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password updated successfully" });
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
            <KeyRound size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Change Password</h3>
            <p className="text-xs text-muted-foreground">Update your admin password</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter new password"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Confirm new password"
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-gradient w-full !py-2.5 !text-sm disabled:opacity-50">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

// User Management
const UserManagement = ({ currentUserId }: { currentUserId: string }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setProfiles(data);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    setLoading(true);

    try {
      // Use edge function to create user (admin only)
      const { data, error } = await supabase.functions.invoke("admin-create-user", {
        body: { email, password, full_name: fullName },
      });

      if (error) throw error;
      toast({ title: "User created successfully", description: `Invitation sent to ${email}` });
      setEmail("");
      setPassword("");
      setFullName("");
      fetchProfiles();
    } catch (err: any) {
      toast({ title: "Error creating user", description: err.message, variant: "destructive" });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 gradient-bg-secondary rounded-xl flex items-center justify-center">
            <UserPlus size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Create New User</h3>
            <p className="text-xs text-muted-foreground">Add a new user to the system</p>
          </div>
        </div>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Min 6 characters"
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-gradient w-full !py-2.5 !text-sm disabled:opacity-50">
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <h3 className="font-bold text-foreground mb-4">Registered Users</h3>
        {profiles.length === 0 ? (
          <p className="text-muted-foreground text-sm">No registered users found</p>
        ) : (
          <div className="space-y-3">
            {profiles.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold">
                    {(p.full_name || p.email || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{p.full_name || "No name"}</p>
                    <p className="text-xs text-muted-foreground">{p.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(p.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Add content form
const AddContentForm = ({ onAdded, userId }: { onAdded: () => void; userId: string }) => {
  const [sectionKey, setSectionKey] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sectionKey) return;

    const { error } = await supabase.from("site_content").insert({
      section_key: sectionKey,
      title,
      content,
      updated_by: userId,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Content section added" });
      setSectionKey("");
      setTitle("");
      setContent("");
      onAdded();
    }
  };

  return (
    <form onSubmit={handleAdd} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={sectionKey}
          onChange={(e) => setSectionKey(e.target.value)}
          placeholder="Section key (e.g., hero_title)"
          className="px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={3}
        className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button type="submit" className="btn-gradient !px-6 !py-2.5 !text-sm">
        Add Section
      </button>
    </form>
  );
};

// Content editor
const ContentEditor = ({
  item,
  onSave,
  onDelete,
}: {
  item: any;
  onSave: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [title, setTitle] = useState(item.title || "");
  const [content, setContent] = useState(item.content || "");
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-1 bg-accent rounded text-muted-foreground">{item.section_key}</span>
          {item.updated_at && (
            <span className="text-xs text-muted-foreground">
              Updated: {new Date(item.updated_at).toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (editing) onSave(item.id, title, content);
              setEditing(!editing);
            }}
            className={editing ? "btn-gradient !px-4 !py-1.5 !text-xs" : "text-xs px-3 py-1.5 rounded-lg bg-accent text-foreground hover:bg-accent/80"}
          >
            {editing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {editing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Content"
          />
        </div>
      ) : (
        <div>
          {title && <h4 className="font-bold text-foreground mb-1">{title}</h4>}
          <p className="text-muted-foreground text-sm">{content || "No content"}</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

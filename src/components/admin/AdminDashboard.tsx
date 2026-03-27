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
} from "lucide-react";

interface AdminDashboardProps {
  session: any;
}

type Tab = "overview" | "enquiries" | "content";

const AdminDashboard = ({ session }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });

  useEffect(() => {
    fetchEnquiries();
    fetchSiteContent();
  }, []);

  const fetchEnquiries = async () => {
    setLoadingEnquiries(true);
    const { data, error } = await supabase
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: LayoutDashboard },
    { id: "enquiries" as Tab, label: "Enquiries", icon: MessageSquare },
    { id: "content" as Tab, label: "Site Content", icon: FileText },
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
          {sidebarOpen && <h2 className="font-bold text-lg">Admin Panel</h2>}
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

        <div className="p-4 border-t border-white/10">
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "enquiries" && "Contact Enquiries"}
                {activeTab === "content" && "Site Content"}
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {session.user.email}
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl border border-border hover:bg-accent"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Enquiries", value: stats.total, icon: MessageSquare, color: "gradient-bg" },
                  { label: "Unread", value: stats.unread, icon: Clock, color: "gradient-bg-secondary" },
                  { label: "Read", value: stats.read, icon: CheckCircle, color: "gradient-bg" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                        <stat.icon size={18} className="text-white" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Recent Enquiries */}
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4">Recent Enquiries</h3>
                {enquiries.slice(0, 5).map((enq) => (
                  <div key={enq.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{enq.name}</p>
                      <p className="text-sm text-muted-foreground">{enq.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!enq.is_read && (
                        <span className="w-2 h-2 rounded-full gradient-bg-secondary" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
                {enquiries.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No enquiries yet</p>
                )}
              </div>
            </div>
          )}

          {/* Enquiries Tab */}
          {activeTab === "enquiries" && (
            <div className="space-y-4">
              {loadingEnquiries ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin mx-auto" />
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                  <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No enquiries yet</p>
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className={`bg-card rounded-2xl border p-6 shadow-sm transition-all ${
                      enq.is_read ? "border-border" : "border-[hsl(25,100%,50%)/0.3] bg-[hsl(25,100%,50%)/0.02]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground">{enq.name}</h4>
                          {!enq.is_read && (
                            <span className="text-xs gradient-bg-secondary text-white px-2 py-0.5 rounded-full">New</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{enq.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(enq.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground mb-2">{enq.subject}</p>
                    <p className="text-muted-foreground text-sm mb-4 whitespace-pre-wrap">{enq.message}</p>
                    <div className="flex gap-2">
                      {!enq.is_read && (
                        <button
                          onClick={() => markAsRead(enq.id)}
                          className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-accent text-foreground hover:bg-accent/80 transition-colors"
                        >
                          <Eye size={14} /> Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => deleteEnquiry(enq.id)}
                        className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                      >
                        <Trash2 size={14} /> Delete
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
                <p className="text-muted-foreground mb-4">
                  Manage your website content here. Add or edit content sections that appear on your website.
                </p>
                <AddContentForm onAdded={fetchSiteContent} userId={session.user.id} />
              </div>

              {siteContent.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-2xl border border-border">
                  <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No content sections yet. Add one above.</p>
                </div>
              ) : (
                siteContent.map((item) => (
                  <ContentEditor key={item.id} item={item} onSave={updateContent} />
                ))
              )}
            </div>
          )}
        </div>
      </main>
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
    <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3">
      <input
        value={sectionKey}
        onChange={(e) => setSectionKey(e.target.value)}
        placeholder="Section key (e.g., hero_title)"
        className="flex-1 px-4 py-2.5 border border-border rounded-xl bg-background text-sm"
        required
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="flex-1 px-4 py-2.5 border border-border rounded-xl bg-background text-sm"
      />
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="flex-1 px-4 py-2.5 border border-border rounded-xl bg-background text-sm"
      />
      <button type="submit" className="btn-gradient !px-6 !py-2.5 !text-sm whitespace-nowrap">
        Add Section
      </button>
    </form>
  );
};

// Content editor
const ContentEditor = ({ item, onSave }: { item: any; onSave: (id: string, title: string, content: string) => void }) => {
  const [title, setTitle] = useState(item.title || "");
  const [content, setContent] = useState(item.content || "");
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-mono px-2 py-1 bg-accent rounded text-muted-foreground">{item.section_key}</span>
          {item.updated_at && (
            <span className="text-xs text-muted-foreground ml-3">
              Updated: {new Date(item.updated_at).toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            if (editing) {
              onSave(item.id, title, content);
            }
            setEditing(!editing);
          }}
          className={editing ? "btn-gradient !px-4 !py-1.5 !text-sm" : "text-sm px-4 py-1.5 rounded-lg bg-accent text-foreground hover:bg-accent/80"}
        >
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {editing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm"
            placeholder="Title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 border border-border rounded-xl bg-background text-sm resize-none"
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

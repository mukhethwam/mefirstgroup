import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Lock, Mail, Eye, EyeOff, UserPlus, KeyRound, ArrowLeft, ShieldCheck } from "lucide-react";

type View = "login" | "signup" | "reset" | "update-password";

interface AdminLoginProps {
  forceView?: View;
}

const AdminLogin = ({ forceView }: AdminLoginProps) => {
  const [view, setView] = useState<View>(forceView || "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      toast({ title: "Sign Up Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account Created", description: "Please check your email to verify your account, then ask an admin to grant you access." });
      setView("login");
    }
    setLoading(false);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin`,
    });
    if (error) {
      toast({ title: "Reset Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email Sent", description: "Check your inbox for a password reset link." });
      setView("login");
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password Updated", description: "Your password has been changed successfully." });
      window.location.reload();
    }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[hsl(25,90%,50%)/0.08] via-[hsl(215,70%,40%)/0.05] to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[hsl(200,80%,45%)/0.06] via-[hsl(215,60%,35%)/0.04] to-transparent blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
            {view === "login" && <Lock className="text-primary-foreground" size={28} />}
            {view === "signup" && <UserPlus className="text-primary-foreground" size={28} />}
            {view === "reset" && <KeyRound className="text-primary-foreground" size={28} />}
            {view === "update-password" && <ShieldCheck className="text-primary-foreground" size={28} />}
          </div>
          <h1 className="text-3xl font-bold gradient-text">
            {view === "login" && "Admin Login"}
            {view === "signup" && "Create Account"}
            {view === "reset" && "Reset Password"}
            {view === "update-password" && "Set New Password"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {view === "login" && "Sign in to manage your website"}
            {view === "signup" && "Create a new account to request access"}
            {view === "reset" && "Enter your email to receive a reset link"}
            {view === "update-password" && "Enter your new password below"}
          </p>
        </div>

        {/* Login Form */}
        {view === "login" && (
          <form onSubmit={handleLogin} className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="admin@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-gradient w-full !rounded-xl disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <div className="flex items-center justify-between text-sm pt-2">
              <button type="button" onClick={() => { resetForm(); setView("reset"); }}
                className="text-primary hover:underline">Forgot password?</button>
              <button type="button" onClick={() => { resetForm(); setView("signup"); }}
                className="text-primary hover:underline">Create account</button>
            </div>
          </form>
        )}

        {/* Sign Up Form */}
        {view === "signup" && (
          <form onSubmit={handleSignup} className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <UserPlus size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="John Doe" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-gradient w-full !rounded-xl disabled:opacity-50">
              {loading ? "Creating account..." : "Sign Up"}
            </button>
            <button type="button" onClick={() => { resetForm(); setView("login"); }}
              className="flex items-center gap-1 text-sm text-primary hover:underline mx-auto pt-2">
              <ArrowLeft size={14} /> Back to login
            </button>
          </form>
        )}

        {/* Reset Password Form */}
        {view === "reset" && (
          <form onSubmit={handleReset} className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="your@email.com" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-gradient w-full !rounded-xl disabled:opacity-50">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button type="button" onClick={() => { resetForm(); setView("login"); }}
              className="flex items-center gap-1 text-sm text-primary hover:underline mx-auto pt-2">
              <ArrowLeft size={14} /> Back to login
            </button>
          </form>
        )}

        {/* Update Password Form */}
        {view === "update-password" && (
          <form onSubmit={handleUpdatePassword} className="bg-card rounded-2xl shadow-xl border border-border p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-gradient w-full !rounded-xl disabled:opacity-50">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

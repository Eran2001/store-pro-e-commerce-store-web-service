import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(email, password);

    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    } else {
      toast({
        title: "Login failed",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">
                S
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight">StorePro</span>
          </Link>

          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to continue shopping
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-accent hover:underline"
            >
              Create one now
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 rounded-lg bg-secondary/50 p-4">
            <p className="text-sm font-medium">Demo Credentials</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Email: demo@example.com
              <br />
              Password: password
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="hidden lg:block lg:w-1/2"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex h-full items-center justify-center p-16">
          <div className="max-w-lg text-center text-primary-foreground">
            <h2 className="text-4xl font-bold">Shop with Confidence</h2>
            <p className="mt-4 text-lg text-primary-foreground/70">
              Join thousands of satisfied customers and discover products that
              define your style.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-primary-foreground/60">
                  Customers
                </div>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-primary-foreground/60">
                  Products
                </div>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 p-4">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-primary-foreground/60">Happy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

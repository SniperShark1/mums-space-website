import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const passwordSchema = z.object({
  password: z.string().min(12, "Password must be at least 12 characters"),
});

type PasswordData = z.infer<typeof passwordSchema>;

interface AdminAuthProps {
  children: React.ReactNode;
  requiredPassword?: string;
}

const AdminAuth: React.FC<AdminAuthProps> = ({ 
  children, 
  requiredPassword = "MumsSpace2024!" // Default 12-character password
}) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const form = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Check if already authenticated (stored in sessionStorage)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Lock after 3 failed attempts for 5 minutes
  useEffect(() => {
    if (attempts >= 3) {
      setIsLocked(true);
      toast({
        title: "Too many failed attempts",
        description: "Access locked for 5 minutes",
        variant: "destructive",
      });
      
      const lockTimeout = setTimeout(() => {
        setIsLocked(false);
        setAttempts(0);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(lockTimeout);
    }
  }, [attempts, toast]);

  const onSubmit = (data: PasswordData) => {
    if (isLocked) {
      toast({
        title: "Access locked",
        description: "Please wait before trying again",
        variant: "destructive",
      });
      return;
    }

    if (data.password === requiredPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      toast({
        title: "Access granted",
        description: "Welcome to admin area",
      });
      form.reset();
    } else {
      setAttempts(prev => prev + 1);
      toast({
        title: "Invalid password",
        description: `${3 - attempts - 1} attempts remaining`,
        variant: "destructive",
      });
      form.reset();
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    toast({
      title: "Logged out",
      description: "Admin session ended",
    });
  };

  if (isAuthenticated) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white border-red-500"
          >
            <Lock className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mums-pink flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-mums-dark mb-2">Admin Access</h2>
          <p className="text-gray-600">Enter password to continue</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter 12-character password"
                        disabled={isLocked}
                        className="bg-white pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        disabled={isLocked}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLocked}
              className="w-full bg-mums-accent hover:bg-mums-dark text-white"
            >
              {isLocked ? "Access Locked" : "Access Admin Area"}
            </Button>

            {attempts > 0 && !isLocked && (
              <p className="text-sm text-red-600 text-center">
                {3 - attempts} attempts remaining
              </p>
            )}

            {isLocked && (
              <p className="text-sm text-red-600 text-center">
                Access locked for 5 minutes due to failed attempts
              </p>
            )}
          </form>
        </Form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Security Features:</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 12-character minimum password</li>
            <li>• Session-based authentication</li>
            <li>• Automatic lockout after 3 failed attempts</li>
            <li>• 5-minute lockout duration</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AdminAuth;
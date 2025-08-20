import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

const NewsletterSignup = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: NewsletterData) => {
      console.log("DEBUG: Sending newsletter signup request for:", data.email);
      
      const response = await fetch('/api/newsletter/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log("DEBUG: Response status:", response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error("DEBUG: Newsletter signup error:", error);
        throw new Error(error.error || 'Failed to subscribe');
      }

      const result = await response.json();
      console.log("DEBUG: Newsletter signup success:", result);
      return result;
    },
    onSuccess: () => {
      console.log("DEBUG: Newsletter signup mutation succeeded");
      setIsSubmitted(true);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about Mum's Space features and news.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      console.error("DEBUG: Newsletter signup mutation failed:", error);
      toast({
        title: "Subscription failed",
        description: error.message === "Email already subscribed" 
          ? "This email is already subscribed to our newsletter."
          : `Error: ${error.message}. Check browser console for details.`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterData) => {
    signupMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 border border-green-200 rounded-2xl">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you for subscribing!</h3>
        <p className="text-green-700">We'll keep you updated with the latest Mum's Space news.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white bg-opacity-70 border-mums-accent border-opacity-30 text-center"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={signupMutation.isPending}
            className="bg-mums-accent hover:bg-mums-dark text-white font-semibold px-8 py-2 rounded-xl transition-colors duration-300 whitespace-nowrap"
          >
            {signupMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewsletterSignup;
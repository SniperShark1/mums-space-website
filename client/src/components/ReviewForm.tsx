import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const reviewSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewData = z.infer<typeof reviewSchema>;

const ReviewForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ReviewData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      userName: "",
      rating: 0,
      reviewText: "",
    },
  });

  // Get username from URL parameters when component loads
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userNameFromUrl = urlParams.get('userName');
    const ratingFromUrl = urlParams.get('rating');
    
    if (userNameFromUrl) {
      form.setValue('userName', decodeURIComponent(userNameFromUrl));
    }
    
    if (ratingFromUrl) {
      const ratingValue = parseInt(ratingFromUrl, 10);
      if (ratingValue >= 1 && ratingValue <= 5) {
        setRating(ratingValue);
        form.setValue('rating', ratingValue);
      }
    }
  }, [form]);

  const submitReviewMutation = useMutation({
    mutationFn: async (data: ReviewData) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          verified: true // Mark as verified since it's coming from the app
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit review');
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Review submitted successfully!",
        description: "Thank you for sharing your experience with Mum's Space.",
      });
      form.reset();
      setRating(0);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to submit review",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewData) => {
    submitReviewMutation.mutate({
      ...data,
      rating: rating,
    });
  };

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-8 h-8 cursor-pointer transition-colors ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
        }`}
        onClick={interactive ? () => {
          setRating(i + 1);
          form.setValue('rating', i + 1);
        } : undefined}
      />
    ));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-green-800 mb-4">Thank You!</h3>
        <p className="text-green-700 mb-6">
          Your review has been submitted and will appear on the reviews page shortly.
        </p>
        <Button
          onClick={() => {
            setIsSubmitted(false);
            window.location.reload();
          }}
          className="bg-mums-accent hover:bg-mums-dark text-white"
        >
          Write Another Review
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your app username will appear here automatically"
                  className="bg-white bg-opacity-70 border-mums-accent border-opacity-30"
                  readOnly={!!field.value}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {renderStars(true)}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reviewText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share your experience with Mum's Space. What did you like most? How has it helped you?"
                  className="bg-white bg-opacity-70 border-mums-accent border-opacity-30"
                  rows={5}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-center">
          <Button 
            type="submit" 
            disabled={submitReviewMutation.isPending || rating === 0}
            className="bg-mums-accent hover:bg-mums-dark text-white font-semibold py-3 px-8 rounded-xl"
          >
            {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Your review will be marked as verified and will help other mothers discover our community.
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
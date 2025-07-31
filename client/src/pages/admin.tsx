import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, CheckCircle, Plus, Users, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Review, DownloadStats, InsertReview } from "@shared/schema";

const reviewFormSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.coerce.number().min(1).max(5),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
  verified: z.boolean().default(true),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddReview, setShowAddReview] = useState(false);

  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const { data: downloadStats } = useQuery<DownloadStats[]>({
    queryKey: ['/api/download-stats'],
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      userName: "",
      rating: 5,
      reviewText: "",
      verified: true,
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (data: InsertReview) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add review');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      toast({
        title: "Review added successfully!",
        description: "The new review is now visible on the reviews page.",
      });
      form.reset();
      setShowAddReview(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to add review",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    addReviewMutation.mutate(data);
  };

  const totalDownloads = downloadStats?.reduce((sum, stat) => sum + stat.downloadCount, 0) || 0;
  const averageRating = reviews?.length ? 
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-mums-pink">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-mums-dark mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Manage reviews and monitor app statistics for Mum's Space
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="section-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-mums-dark mb-2">
                {totalDownloads.toLocaleString()}
              </h3>
              <p className="text-gray-600">Total Downloads</p>
            </Card>

            <Card className="section-card p-6 text-center">
              <div className="flex justify-center mb-4">
                {renderStars(Math.round(Number(averageRating)))}
              </div>
              <h3 className="text-2xl font-bold text-mums-dark mb-2">
                {averageRating}
              </h3>
              <p className="text-gray-600">Average Rating</p>
            </Card>

            <Card className="section-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-mums-dark mb-2">
                {reviews?.length || 0}
              </h3>
              <p className="text-gray-600">Total Reviews</p>
            </Card>
          </div>

          {/* Add Review Section */}
          <Card className="section-card p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-mums-dark">Manage Reviews</h2>
              <Button
                onClick={() => setShowAddReview(!showAddReview)}
                className="bg-mums-accent hover:bg-mums-dark text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Review
              </Button>
            </div>

            {showAddReview && (
              <div className="bg-mums-primary bg-opacity-10 p-6 rounded-2xl mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Review</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Sarah M."
                                className="bg-white"
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
                            <FormLabel>Rating</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger className="bg-white">
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="5">5 Stars - Excellent</SelectItem>
                                <SelectItem value="4">4 Stars - Very Good</SelectItem>
                                <SelectItem value="3">3 Stars - Good</SelectItem>
                                <SelectItem value="2">2 Stars - Fair</SelectItem>
                                <SelectItem value="1">1 Star - Poor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="reviewText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Review Text</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write the review content here..."
                              className="bg-white"
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="verified"
                        {...form.register("verified")}
                        className="rounded"
                      />
                      <label htmlFor="verified" className="text-sm">
                        Mark as verified user
                      </label>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        type="submit" 
                        disabled={addReviewMutation.isPending}
                        className="bg-mums-accent hover:bg-mums-dark text-white"
                      >
                        {addReviewMutation.isPending ? "Adding..." : "Add Review"}
                      </Button>
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => setShowAddReview(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}

            {/* Setup Instructions */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                How to Set Up Review Management
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <strong>For Lovable (Admin):</strong>
                  <ol className="list-decimal list-inside mt-2 space-y-1 ml-4">
                    <li>Access this admin panel at: <code className="bg-blue-100 px-2 py-1 rounded">/admin</code></li>
                    <li>Use the "Add New Review" button above to add authentic user reviews</li>
                    <li>Always use real user names (with last initial for privacy)</li>
                    <li>Mark reviews as "verified" only for actual app users</li>
                    <li>Keep reviews authentic and helpful for potential users</li>
                  </ol>
                </div>
                <div className="mt-4">
                  <strong>API Integration:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>POST to <code className="bg-blue-100 px-2 py-1 rounded">/api/reviews</code> to add new reviews</li>
                    <li>GET from <code className="bg-blue-100 px-2 py-1 rounded">/api/reviews</code> to fetch all reviews</li>
                    <li>Reviews automatically appear on the public reviews page</li>
                    <li>Download stats update automatically when users click download buttons</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Current Reviews */}
          <Card className="section-card p-8">
            <h2 className="text-2xl font-semibold text-mums-dark mb-6">Current Reviews</h2>
            
            {reviewsLoading ? (
              <div className="grid md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-100 rounded-lg p-4 h-32"></div>
                ))}
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.userName}</span>
                        {review.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.reviewText}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Add the first review above!</p>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
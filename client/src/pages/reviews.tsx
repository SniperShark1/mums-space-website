import { useQuery } from "@tanstack/react-query";
import { Star, CheckCircle, Users, MessageSquare } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeartBackground from "@/components/HeartBackground";
import ReviewCard from "@/components/ReviewCard";
import { Card } from "@/components/ui/card";
import type { Review, DownloadStats } from "@shared/schema";

const Reviews = () => {
  const { data: reviews, isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const { data: downloadStats, isLoading: statsLoading } = useQuery<DownloadStats[]>({
    queryKey: ['/api/download-stats'],
  });

  const totalDownloads = downloadStats?.reduce((sum, stat) => sum + stat.downloadCount, 0) || 0;
  const averageRating = reviews?.length ? 
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getRatingDistribution = () => {
    if (!reviews?.length) return Array(5).fill(0);
    
    const distribution = Array(5).fill(0);
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse(); // Show 5 stars first
  };

  return (
    <div className="min-h-screen bg-mums-pink">
      <Navigation />
      
      {/* Header Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <HeartBackground />
              <div className="relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-mums-dark mb-6">
                  Community Reviews
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                  See what our amazing community of mothers thinks about Mum's Space
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="section-card p-8 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 bg-mums-accent rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-mums-dark mb-3">
                  {totalDownloads.toLocaleString()}
                </h3>
                <p className="text-gray-600 font-medium">Total Downloads</p>
              </Card>

              <Card className="section-card p-8 text-center shadow-lg">
                <div className="flex justify-center mb-6">
                  {renderStars(Math.round(Number(averageRating)))}
                </div>
                <h3 className="text-4xl font-bold text-mums-dark mb-3">
                  {averageRating}
                </h3>
                <p className="text-gray-600 font-medium">Average Rating</p>
              </Card>

              <Card className="section-card p-8 text-center shadow-lg">
                <div className="w-20 h-20 mx-auto mb-6 bg-mums-accent rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-mums-dark mb-3">
                  {reviews?.length || 0}
                </h3>
                <p className="text-gray-600 font-medium">Reviews</p>
              </Card>
            </div>
          </div>

          {/* Rating Distribution */}
          {reviews && reviews.length > 0 && (
            <Card className="section-card p-8 mb-12">
              <h3 className="text-2xl font-semibold text-mums-dark mb-6 text-center">Rating Distribution</h3>
              <div className="space-y-3">
                {getRatingDistribution().map((count, index) => {
                  const stars = 5 - index;
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  
                  return (
                    <div key={stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-20">
                        <span className="text-sm font-medium">{stars}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-mums-accent h-3 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      </section>



      {/* Review Information Section */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-mums-accent">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-mums-dark mb-3">Want to Write a Review?</h3>
              <p className="text-gray-700 mb-4">
                Only users of the Mum's Space app can write reviews. If you want to share your experience:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <span className="text-sm font-medium text-gray-600">1. Download the app</span>
                <span className="hidden sm:inline text-gray-400">→</span>
                <span className="text-sm font-medium text-gray-600">2. Use it for a few days</span>
                <span className="hidden sm:inline text-gray-400">→</span>
                <span className="text-sm font-medium text-gray-600">3. Write your review from within the app</span>
              </div>
              <div className="mt-4">
                <a 
                  href="/#download" 
                  className="inline-flex items-center px-6 py-2 bg-mums-accent hover:bg-mums-dark text-white font-semibold rounded-full transition-colors"
                >
                  Download Mum's Space Now
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {reviewsLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="section-card p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : reviews && reviews.length > 0 ? (
            <div className="grid gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} isAdmin={false} />
              ))}
            </div>
          ) : (
            <Card className="section-card p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-mums-dark mb-4">No Reviews Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Be one of the first to download Mum's Space and share your experience with the community!
              </p>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
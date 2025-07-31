import { useQuery } from "@tanstack/react-query";
import { Star, CheckCircle, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeartBackground from "@/components/HeartBackground";
import ReviewForm from "@/components/ReviewForm";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-mums-dark mb-2">
                {reviews?.length || 0}
              </h3>
              <p className="text-gray-600">Reviews</p>
            </Card>
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

      {/* Add Review Section for App Users */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card p-8 bg-gradient-to-r from-mums-primary to-mums-accent text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
              <p className="text-lg mb-6 opacity-90">
                Have you used Mum's Space? Your review helps other mothers discover our community!
              </p>
              <Button
                onClick={() => window.location.href = '/reviews#review-form'}
                className="bg-white text-mums-accent hover:bg-gray-100 font-semibold py-3 px-8 rounded-full"
              >
                Write a Review
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Review Form Section */}
      <section id="review-form" className="pb-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card p-8">
            <h3 className="text-2xl font-semibold text-mums-dark mb-6 text-center">Write Your Review</h3>
            <ReviewForm />
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
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="section-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-mums-dark">{review.userName}</h4>
                        {review.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    {review.reviewText}
                  </p>
                </Card>
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
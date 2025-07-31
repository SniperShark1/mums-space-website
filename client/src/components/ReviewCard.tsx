import { useState } from "react";
import { Star, MessageSquare, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminReplyForm from "@/components/AdminReplyForm";
import type { Review } from "@shared/schema";

interface ReviewCardProps {
  review: Review;
  isAdmin?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isAdmin = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg border">
      {/* Review Content */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-semibold text-gray-900">{review.userName}</span>
            <div className="flex">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            {review.verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                ✓ Verified User
              </span>
            )}
          </div>
          <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
        </div>
        <span className="text-xs text-gray-500 ml-4">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Admin Reply Section */}
      {review.adminReply && (
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-200 rounded">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Admin Reply</span>
            <span className="text-xs text-blue-600">
              {review.adminReplyAt && new Date(review.adminReplyAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed">{review.adminReply}</p>
          
          {isAdmin && (
            <div className="mt-3 pt-3 border-t border-blue-200">
              <Button
                onClick={() => setShowReplyForm(true)}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Reply
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Admin Controls */}
      {isAdmin && !review.adminReply && !showReplyForm && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button
            onClick={() => setShowReplyForm(true)}
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Reply as Admin
          </Button>
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && isAdmin && (
        <AdminReplyForm
          reviewId={review.id}
          existingReply={review.adminReply}
          onCancel={() => setShowReplyForm(false)}
        />
      )}
    </div>
  );
};

export default ReviewCard;
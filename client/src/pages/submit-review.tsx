import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import { Card } from "@/components/ui/card";

const SubmitReview = () => {
  const [userName, setUserName] = useState("");
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userNameFromUrl = urlParams.get('userName');
    
    if (userNameFromUrl) {
      setUserName(decodeURIComponent(userNameFromUrl));
      setIsValidUser(true);
    } else {
      // No username parameter - this should only be accessible from the app
      setIsValidUser(false);
    }
  }, []);

  if (!isValidUser) {
    return (
      <div className="min-h-screen bg-mums-pink">
        <Navigation />
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="section-card p-8 text-center">
              <h2 className="text-2xl font-semibold text-mums-dark mb-4">Access Restricted</h2>
              <p className="text-gray-700 mb-6">
                This review form is only accessible through the Mum's Space app. 
                Please open the app and use the "Write Review" button to submit your review.
              </p>
              <a 
                href="/reviews" 
                className="inline-block bg-mums-accent hover:bg-mums-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                View Existing Reviews
              </a>
            </Card>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mums-pink">
      <Navigation />
      
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-mums-dark mb-4">Submit Your Review</h2>
              <p className="text-gray-700">
                Welcome <strong>{userName}</strong>! Share your experience with other mothers.
              </p>
            </div>
            <ReviewForm />
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitReview;
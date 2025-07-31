import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Users, Star, Download, Upload, Settings } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminAuth from "@/components/AdminAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Review, DownloadStats } from "@shared/schema";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: reviews } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  const { data: downloadStats } = useQuery<DownloadStats[]>({
    queryKey: ['/api/download-stats'],
  });

  const totalDownloads = downloadStats?.reduce((sum, stat) => sum + stat.downloadCount, 0) || 0;
  const averageRating = reviews?.length ? 
    (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : 0;

  const AdminContent = () => (
    <div className="min-h-screen bg-mums-pink">
      <Navigation />
      
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-mums-dark mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-700">
              Manage your Mum's Space website and monitor app statistics
            </p>
            <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-green-800">
                <strong>✓ Secure Access:</strong> Only you can see this admin area. Regular website visitors cannot access this page without the password.
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="section-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-mums-dark mb-2">
                {totalDownloads.toLocaleString()}
              </h3>
              <p className="text-gray-600">Total Downloads</p>
            </Card>

            <Card className="section-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-mums-dark mb-2">
                {averageRating}
              </h3>
              <p className="text-gray-600">Average Rating</p>
            </Card>

            <Card className="section-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-mums-dark mb-2">
                {reviews?.length || 0}
              </h3>
              <p className="text-gray-600">Total Reviews</p>
            </Card>
          </div>

          {/* Management Section */}
          <Card className="section-card p-8 mb-8">
            <h2 className="text-2xl font-semibold text-mums-dark mb-6">App File Management</h2>
            
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                How to Upload Your App Files
              </h3>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <strong>Step 1: Prepare your files</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Name your Android app: <code className="bg-blue-100 px-1 rounded">mums-space-android.apk</code></li>
                    <li>Name your iPhone app: <code className="bg-blue-100 px-1 rounded">mums-space-ios.ipa</code></li>
                    <li>Name your PC app: <code className="bg-blue-100 px-1 rounded">mums-space-pc.exe</code></li>
                  </ul>
                </div>
                <div className="mt-4">
                  <strong>Step 2: Upload via your hosting provider</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Use FTP/SFTP to upload to <code className="bg-blue-100 px-1 rounded">/public/downloads/</code> folder</li>
                    <li>Or use your hosting provider's file manager</li>
                    <li>Or commit files to your GitHub repository</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <strong>Step 3: Files will automatically be available for download</strong>
                  <p className="text-blue-700 mt-2">
                    Once uploaded, the download buttons on your website will serve the actual app files.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Current Download Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Android APK:</span>
                    <span className="text-orange-600">File needed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>iPhone IPA:</span>
                    <span className="text-orange-600">File needed</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PC EXE:</span>
                    <span className="text-orange-600">File needed</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Security</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>✓ Password protected admin area</p>
                  <p>✓ No public upload forms</p>
                  <p>✓ Secure file management</p>
                  <p>✓ Session-based authentication</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Reviews */}
          <Card className="section-card p-8">
            <h2 className="text-2xl font-semibold text-mums-dark mb-6">Recent Reviews</h2>
            
            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="bg-white p-4 rounded-lg border flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.userName}</span>
                        <div className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{review.reviewText}</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-4">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                
                {reviews.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={() => window.location.href = '/reviews'}>
                      View All Reviews
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">
                No reviews yet. Reviews will appear here when users submit them through the app.
              </p>
            )}
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );

  return (
    <AdminAuth requiredPassword="MumsSpace2024!">
      <AdminContent />
    </AdminAuth>
  );
};

export default AdminPanel;
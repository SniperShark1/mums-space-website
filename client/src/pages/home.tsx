import { Smartphone, Monitor, Download, Heart, Users, Lock, CheckCircle, BookOpen, Clock, Mail, Star, Crown } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeartBackground from "@/components/HeartBackground";
import storiesImage from "@assets/stories-updated.png";
import debatesImage from "@assets/debates-new.png";
import guidesImage from "@assets/Screenshot_14_1755234349059.png";
import mealPlannerImage from "@assets/Screenshot_21_1755234508674.png";
import contractionTrackerImage from "@assets/Screenshot_18_1755234564029.png";
import feedingTrackerImage from "@assets/Screenshot_20_1755234646909.png";
import mumsToBeImage from "@assets/mums-to-be-final.png";
import stage01Image from "@assets/zero-one-new.png";
import stage25Image from "@assets/two-five-updated.png";
import reviewsImage from "@assets/Screenshot_36_1755235233351.png";
import downloadImage from "@assets/Screenshot_37_1755235284470.png";
import babyIsHereImage from "@assets/Screenshot_38_1755235350831.png";
import communityMothersImage from "@assets/community-mothers.png";
import foundersImage from "@assets/Screenshot_33_1755718284955.png";

import NewsletterSignup from "@/components/NewsletterSignup";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { DownloadStats } from "@shared/schema";

const Home = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: downloadStats } = useQuery<DownloadStats[]>({
    queryKey: ['/api/download-stats'],
  });

  const downloadMutation = useMutation({
    mutationFn: async (platform: string) => {
      const response = await fetch(`/api/download/${platform}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Download failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/download-stats'] });
    },
  });

  const totalDownloads = downloadStats?.reduce((sum, stat) => sum + stat.downloadCount, 0) || 0;

  const handleDownload = async (platform: string) => {
    // Define file URLs for actual app downloads
    const fileUrls: { [key: string]: string } = {
      'iPhone': '/downloads/mums-space-ios.ipa',
      'Android': '/downloads/mums-space-android.apk', 
      'PC': '/downloads/mums-space-pc.exe'
    };
    
    const fileUrl = fileUrls[platform];
    
    if (fileUrl) {
      // Increment download counter
      downloadMutation.mutate(platform);
      
      // Start actual file download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `mums-space-${platform.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started!",
        description: `Your ${platform} app is downloading now.`,
      });
    } else {
      toast({
        title: "Coming soon!",
        description: `The ${platform} version will be available soon.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-mums-pink">
      <Navigation />
      
      {/* Home Section */}
      <section id="home" className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Section with Hearts */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <HeartBackground />
              <div className="w-64 md:w-80 h-auto mx-auto relative z-10">
                <img 
                  src="/logo.png" 
                  alt="Mum's Space Logo - Mother and baby in heart shape" 
                  className="w-full h-auto filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <Card className="section-card rounded-3xl p-8 md:p-12 text-center shadow-xl max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mums-dark">Welcome to Mum's Space</h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">The private support space for mums and women—by mums, for mums. Connect, share, and find your community in a safe, supportive environment.</p>
            
            <Button 
              onClick={() => document.getElementById('app-features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-mums-accent hover:bg-mums-dark text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore What's Inside
            </Button>
            
            <div className="mt-8 p-4 bg-mums-light bg-opacity-50 rounded-2xl">
              <p className="text-sm md:text-base text-mums-dark font-medium">
                <strong>Important:</strong> Mum's Space is a women-only community. By joining, you affirm you are a woman/mum and agree to our community guidelines.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* App Features Section - Chatroom Showcase */}
      <section id="app-features" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">What We Offer: Real Chatrooms for Every Mum</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              {/* Chatroom Screenshot */}
              <div className="order-2 lg:order-1">
                <img 
                  src="/chatroom-screenshot.png" 
                  alt="Mum's Space Chatroom Interface showing active conversations" 
                  className="w-full h-auto rounded-2xl shadow-lg border border-mums-accent border-opacity-20"
                  onError={(e) => {
                    console.error('Chatroom image failed to load:', e);
                    e.currentTarget.style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('Chatroom image loaded successfully')}
                />
              </div>
              
              {/* Description */}
              <div className="order-1 lg:order-2">
                <p className="text-lg mb-8 leading-relaxed text-gray-700">
                  At Mum's Space, you'll find dedicated chatrooms for every stage of your journey:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-mums-dark mb-2">Mums to Be</h4>
                      <p className="text-gray-600 text-sm">Connect with other expecting mums, ask questions, and share your excitement (and worries!) in a private space.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-mums-dark mb-2">0–1 Years</h4>
                      <p className="text-gray-600 text-sm">Get instant support from mums going through sleepless nights, teething, and those amazing first milestones.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-mums-dark mb-2">2–5 Years</h4>
                      <p className="text-gray-600 text-sm">Share tips, triumphs, and challenges with other mums of toddlers and preschoolers.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-mums-light bg-opacity-50 rounded-xl">
                  <p className="text-sm font-medium text-mums-dark">
                    No matter your child's age or your parenting journey, there's a chatroom just for you.
                  </p>
                </div>
              </div>
            </div>
            
            {/* What Makes It Special */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-mums-dark">What Makes Mum's Space Chatroom Special?</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Private & Safe</h4>
                  <p className="text-sm text-gray-600">Only mums and women can join—no outsiders, no judgment.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Easy to Use</h4>
                  <p className="text-sm text-gray-600">Clean, inviting design with big, soft buttons and welcoming colors.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Real Community</h4>
                  <p className="text-sm text-gray-600">Every chatroom is filled with mums just like you—ready to listen, help, and celebrate.</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Group Support</h4>
                  <p className="text-sm text-gray-600">Create your own group for more focused conversations (playgroups, single mums, special needs, and more).</p>
                </div>
                
                <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl md:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-mums-dark">Fun & Expressive</h4>
                  <p className="text-sm text-gray-600">Emojis and nicknames keep things light and personal.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">About Mum's Space</h2>
            
            {/* Our Story Section */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-mums-accent">🌸 Our Story</h3>
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="leading-relaxed">Mum's Space was born from the recognition that while motherhood is one of life's greatest joys, it can also be one of its loneliest journeys. Too often, mothers find themselves navigating sleepless nights, endless questions, and emotional challenges in silence. We wanted to change that.</p>
                
                <p className="leading-relaxed">Mum's Space is more than just an app — it's a sanctuary built by mothers, for mothers. A place where women from all walks of life can share their stories openly, without judgment. Whether it's celebrating milestones, seeking advice during difficult times, or simply finding someone who truly understands, Mum's Space was created to remind every mother that she is never alone.</p>
              </div>
            </div>

            {/* Two Images Side by Side */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <img 
                  src={communityMothersImage}
                  alt="Diverse group of mothers and baby in supportive community" 
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
              <div>
                <img 
                  src="/about-image.png" 
                  alt="Mother and baby sharing a tender moment" 
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              </div>
            </div>

            {/* Our Mission Section */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-6 text-mums-accent">💜 Our Mission</h3>
              <div className="max-w-3xl mx-auto">
                <p className="mb-4 leading-relaxed">Our mission is simple but powerful: to create a safe, inclusive, and supportive digital space where mothers and women feel seen, heard, and connected.</p>
                
                <p className="mb-4 leading-relaxed">We believe that motherhood should never be a solitary experience. At Mum's Space, women can:</p>
                
                <ul className="mb-6 space-y-2 text-gray-700 text-left inline-block">
                  <li className="flex items-start">
                    <span className="text-mums-accent mr-2">•</span>
                    Connect authentically with others who share their experiences.
                  </li>
                  <li className="flex items-start">
                    <span className="text-mums-accent mr-2">•</span>
                    Share wisdom gained through the ups and downs of parenting.
                  </li>
                  <li className="flex items-start">
                    <span className="text-mums-accent mr-2">•</span>
                    Seek guidance and reassurance in moments of uncertainty.
                  </li>
                  <li className="flex items-start">
                    <span className="text-mums-accent mr-2">•</span>
                    Celebrate the journey — from the small daily victories to the life-changing milestones.
                  </li>
                </ul>
                
                <p className="leading-relaxed">At its heart, Mum's Space is about building a community where women uplift each other, foster lasting friendships, and find strength in shared stories. Together, we are rewriting the narrative of motherhood — from isolation to connection, from doubt to confidence, from silence to support.</p>
              </div>
            </div>

            {/* Values */}
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Support</h4>
                <p className="text-sm text-gray-600">We believe in lifting each other up through every challenge and celebration.</p>
              </div>
              <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Privacy</h4>
                <p className="text-sm text-gray-600">Your conversations and personal information are always protected and secure.</p>
              </div>
              <div className="text-center p-6 bg-white bg-opacity-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Community</h4>
                <p className="text-sm text-gray-600">Building genuine connections that last beyond the digital space.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-mums-dark">Download Mum's Space</h2>
            
            {/* Download Counter */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-mums-primary bg-opacity-20 px-6 py-3 rounded-full">
                <Users className="w-5 h-5 text-mums-accent" />
                <span className="text-lg font-semibold text-mums-dark">
                  {totalDownloads.toLocaleString()} women have already joined!
                </span>
              </div>
            </div>

            <div className="text-center mb-12">
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Get Mum's Space on your preferred device and join our supportive community of mothers. 
                Available for iPhone, Android, and PC - start connecting today!
              </p>
            </div>

            {/* Download Buttons */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <Button
                onClick={() => handleDownload('iPhone')}
                disabled={downloadMutation.isPending}
                className="flex flex-col items-center gap-3 h-auto py-6 px-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-mums-accent transition-all duration-300"
              >
                <Smartphone className="w-8 h-8" />
                <div>
                  <div className="font-semibold">iPhone</div>
                  <div className="text-sm opacity-75">iOS App</div>
                </div>
              </Button>

              <Button
                onClick={() => handleDownload('Android')}
                disabled={downloadMutation.isPending}
                className="flex flex-col items-center gap-3 h-auto py-6 px-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-mums-accent transition-all duration-300"
              >
                <Smartphone className="w-8 h-8" />
                <div>
                  <div className="font-semibold">Android</div>
                  <div className="text-sm opacity-75">APK Download</div>
                </div>
              </Button>

              <Button
                onClick={() => handleDownload('PC')}
                disabled={downloadMutation.isPending}
                className="flex flex-col items-center gap-3 h-auto py-6 px-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-mums-accent transition-all duration-300"
              >
                <Monitor className="w-8 h-8" />
                <div>
                  <div className="font-semibold">PC/Mac</div>
                  <div className="text-sm opacity-75">Desktop App</div>
                </div>
              </Button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                All versions are free to download. Join our growing community of supportive mothers!
              </p>
            </div>

            {/* Important Notice */}
            <div className="mt-12 p-8 bg-mums-accent bg-opacity-10 rounded-2xl border-2 border-mums-accent border-opacity-20">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-mums-accent rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-mums-dark">Important: Our App Isn't Ready Yet!</h3>
                
                <div className="max-w-2xl mx-auto space-y-3 mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    We're putting the finishing touches on Mum's Space to ensure it's the perfect supportive community you deserve. 
                    We're building a thriving community of mothers first, so when the app launches, it will be completely ready and filled with engaged, supportive women.
                  </p>
                </div>
                
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-3 bg-white bg-opacity-80 px-6 py-3 rounded-full">
                    <Mail className="w-5 h-5 text-mums-accent" />
                    <span className="font-medium text-mums-dark">Get notified when we launch!</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-mums-accent hover:bg-mums-dark text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300"
                >
                  Join Our Newsletter
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Founders Screenshot */}
              <div className="order-2 lg:order-1">
                <img 
                  src={foundersImage} 
                  alt="Mum's Space Founders Club interface showing Wall of Founders with 100 available spots" 
                  className="w-full h-auto rounded-2xl shadow-lg border border-mums-accent border-opacity-20"
                />
              </div>
              
              {/* Founders Description */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-mums-dark">Founders Club</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    <strong>We're opening just 100 Founder spots</strong>—snag yours for a one-time <strong>$59.99 AUD</strong> and lock in lifetime membership.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    As a Founder, you'll be recognised forever, get exclusive access to a private Founders-only chatroom, and never pay again—no subscriptions, no renewals, all future features included.
                  </p>
                  
                  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                    <p className="text-gray-800 font-medium">
                      <strong>⏰ This is a once-only launch offer:</strong> when the 100 are gone, they're gone.
                    </p>
                  </div>
                </div>

                {/* Founders Benefits */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-semibold text-mums-dark">Founder Benefits:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">Lifetime access to Mum's Space - no future payments ever</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">Gold Founder badge on your profile</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">Private Founders-only chatroom</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">Direct influence through Founder feedback</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">Early access to all future features</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-mums-light bg-opacity-50 rounded-xl p-6">
                  <p className="text-center text-mums-dark font-medium mb-4">
                    Join the exclusive group of mothers who believed in us from day one
                  </p>
                  <Button 
                    onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-lg"
                  >
                    Join Newsletter for Founders Access
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* eBook Library Section */}
      <section id="library" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-20 text-mums-dark">Explore Mums Space</h2>
            
            {/* Section 1: Stories - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Stories</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Real experiences from mums at every stage.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Share your journey, struggles, and victories with a supportive community. From pregnancy symptoms to parenting challenges, connect with mothers who understand exactly what you're going through.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Browse stories by topic, share your own experiences, and find comfort in knowing you're not alone in your motherhood journey.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={storiesImage} 
                  alt="Mums sharing pregnancy and parenting stories in community discussions" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
            </div>

            {/* Section 2: Debates - Image Left */}
            <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start mb-20">
              <div className="w-full max-w-[560px] order-2 lg:order-1">
                <img 
                  src={debatesImage} 
                  alt="Community debates with voting interface and discussion threads" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
              <div className="max-w-[480px] order-1 lg:order-2 lg:ml-auto">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Debates</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Vote, comment, and see what the community thinks.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Engage in thoughtful discussions about parenting choices, from sleep training methods to feeding decisions. Share your perspective and learn from diverse experiences.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Vote on topics that matter to you and discover what other mums in similar situations have chosen to do.</p>
              </div>
            </div>

            {/* Section 3: Chatroom - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Chatroom</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Drop in for live, friendly conversation.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Connect instantly with other mums online right now. Get quick advice, share a laugh, or just chat about your day with women who understand.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Whether you need immediate support or want to offer encouragement to others, our chatroom is always buzzing with friendly conversation.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src="/chatroom-screenshot.png" 
                  alt="Live chatroom with ongoing conversations between mums" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
            </div>

            {/* Section 4: Guides (eBooks) - Image Left */}
            <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start mb-20">
              <div className="w-full max-w-[560px] order-2 lg:order-1">
                <img 
                  src={guidesImage} 
                  alt="Digital library of expert parenting guides and eBooks" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
              <div className="max-w-[480px] order-1 lg:order-2 lg:ml-auto">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Guides (eBooks)</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">A marketplace where mums share their knowledge.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Browse and purchase eBooks written by experienced mothers in our community. From parenting tips to personal growth, discover practical guides created by mums who've been there.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Support fellow mothers by purchasing their expertly crafted guides, or share your own knowledge by selling your eBooks to the community.</p>
              </div>
            </div>

            {/* Section 5: Meal Planner - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Meal Planner</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Plan weekly meals and auto-build a shopping list.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Take the stress out of meal planning with our smart planner. Add meals for breakfast, lunch, dinner, and snacks, then generate an organized shopping list automatically.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Save your favorite meal combinations and never wonder "what's for dinner?" again. Perfect for busy mums juggling family nutrition.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={mealPlannerImage} 
                  alt="Weekly meal planner with auto-generated shopping lists" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
            </div>

            {/* Section 6: Baby is Here - Image Left */}
            <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start mb-20">
              <div className="w-full max-w-[560px] order-2 lg:order-1">
                <img 
                  src={babyIsHereImage} 
                  alt="Baby milestone celebration with birth announcement and community support" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
              <div className="max-w-[480px] order-1 lg:order-2 lg:ml-auto">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Baby is Here</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Celebrate milestones and find support in the newborn stage.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Share your beautiful birth story and celebrate this incredible milestone with the community. Document labor details, share photos, and receive loving support from other mums.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Connect with other new mothers, share your recovery journey, and find encouragement during those early precious weeks with your newborn.</p>
              </div>
            </div>

            {/* Section 7: Contraction Tracker - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Contraction Tracker</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Track timings and intervals in real time.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Monitor your contractions with precision during labor. Simply tap to start and stop timing, and our tracker automatically calculates duration and intervals.</p>
                <p className="text-gray-600 text-sm leading-relaxed">See your contraction patterns clearly with detailed history and summaries to help you know when it's time to head to the hospital.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={contractionTrackerImage} 
                  alt="Real-time contraction tracking tool with timing intervals" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
            </div>

            {/* Section 8: Feeding Tracker - Image Left */}
            <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start mb-20">
              <div className="w-full max-w-[560px] order-2 lg:order-1">
                <img 
                  src={feedingTrackerImage} 
                  alt="Baby feeding tracker for breast, bottle and solid food logging" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
              <div className="max-w-[480px] order-1 lg:order-2 lg:ml-auto">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Feeding Tracker</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Log breast, bottle, and solids with easy history.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Keep track of your baby's feeding schedule with our comprehensive tracker. Monitor breastfeeding sessions, bottle feeds, and solid food introduction with suggested timing schedules.</p>
                <p className="text-gray-600 text-sm leading-relaxed">View weekly and monthly statistics to understand feeding patterns and ensure your little one is getting proper nutrition.</p>
              </div>
            </div>

            {/* Section 9: Mums-to-be - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Mums-to-be</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Pregnancy topics, tools, and support in one place.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Navigate your pregnancy journey with confidence using our comprehensive pregnancy toolkit. Track milestones, access specialized content, and connect with other expecting mothers.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">From first trimester symptoms to birth preparation, find everything you need to support a healthy, informed pregnancy experience.</p>
                <p className="text-gray-600 text-xs italic leading-relaxed">These are just a few of the options available in our app.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={mumsToBeImage} 
                  alt="Pregnancy tools, topics and community support for expecting mothers" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
            </div>

            {/* Section 10: 0–1 - Image Left */}
            <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start mb-20">
              <div className="w-full max-w-[560px] order-2 lg:order-1">
                <img 
                  src={stage01Image} 
                  alt="Newborn care guide with sleep, feeding schedules and milestone tracking" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
              <div className="max-w-[480px] order-1 lg:order-2 lg:ml-auto">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">0–1</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Newborn to one: sleep, feeding, routines, milestones.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Navigate the crucial first year with specialized content for newborns to one-year-olds. Access baby recipes, establish routines, and track important developmental milestones.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Connect with other new mums, share experiences, and get support during this incredible but challenging first year of parenthood.</p>
                <p className="text-gray-600 text-xs italic leading-relaxed">These are just a few of the options available in our app.</p>
              </div>
            </div>

            {/* Section 11: 2–5 - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">2–5</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Toddlers to preschool: behaviour, play, toilet training.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Support your growing child through the toddler and preschool years. Access specialized tools for behavior management, developmental activities, and important milestones like toilet training.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Find age-appropriate guidance, connect with other parents of similar-aged children, and navigate this exciting stage of growth and learning together.</p>
                <p className="text-gray-600 text-xs italic leading-relaxed">These are just a few of the options available in our app.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={stage25Image} 
                  alt="Toddler development activities, behavior guidance and preschool preparation" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
            </div>

            {/* Section 12: Reviews - Image Left */}
            <div className="grid lg:grid-cols-[1fr_440px] gap-16 items-start mb-20">
              <div className="w-full max-w-[560px] order-2 lg:order-1">
                <img 
                  src={reviewsImage} 
                  alt="Honest reviews and testimonials from mums using the app" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
                />
              </div>
              <div className="max-w-[480px] order-1 lg:order-2 lg:ml-auto">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Reviews</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">See honest feedback from mums using MumSpace.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Read authentic testimonials from verified users who share their real experiences with our community and features. From finding supportive friendships to accessing helpful resources.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Discover how Mum's Space has helped other mothers feel less isolated and more confident in their parenting journey.</p>
              </div>
            </div>

            {/* Section 13: Download the App - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Download the App</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-4">Install on iOS or Android for faster access.</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Join over 2,600 women who have already downloaded Mum's Space. Available for iPhone, Android, and PC, so you can stay connected wherever you are.</p>
                <p className="text-gray-600 text-sm leading-relaxed">Get instant access to our supportive community of mothers and all the tools you need for your parenting journey. Download is completely free.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={downloadImage} 
                  alt="Mobile app download screens for iOS and Android platforms" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="img-download-link"
                />
              </div>
            </div>

            {/* Section 14: Too many to list - Image Left */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-semibold mb-4 text-mums-dark">Too many to list</h3>
                <p className="text-gray-700 mb-6">Open Explore to browse every section and tool.</p>
              </div>

            </div>



            {/* Why Mums Space is Special */}
            <div className="bg-mums-primary bg-opacity-20 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-center text-mums-dark">Why Mums Space is Special</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">All-in-One App</h4>
                  <p className="text-sm text-gray-600">Everything you need as a mum in one simple, beautiful app.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Real Community</h4>
                  <p className="text-sm text-gray-600">Connect with other mums going through the same experiences.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-mums-accent rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Expert Guidance</h4>
                  <p className="text-sm text-gray-600">Trusted guides and tools backed by parenting experts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-mums-dark">Get Notified About Mum's Space Updates</h2>
            
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                Enter your email below to get notified when we launch new features or have exciting news. We'll keep you in the loop—no spam, ever.
              </p>
              
              <NewsletterSignup />
              
              <p className="text-sm text-gray-600 mt-6">
                You can unsubscribe at any time. For urgent help, please contact your local support line.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Policies Section */}
      <section id="policies" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">Policies & Guidelines</h2>
            
            <div className="space-y-8">
              {/* Women-Only Policy */}
              <div className="p-6 bg-mums-light bg-opacity-50 rounded-2xl border-l-4 border-mums-accent">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="mr-3 w-6 h-6" />
                  Women-Only Community Policy
                </h3>
                <p className="mb-4">Mum's Space is exclusively for women and mothers. This policy ensures:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-6">
                  <li>A safe space for women to share personal experiences</li>
                  <li>Gender-specific discussions about motherhood and women's issues</li>
                  <li>Protection from inappropriate behavior often found in mixed-gender spaces</li>
                  <li>Authentic conversations without fear of judgment</li>
                </ul>
                <p className="mt-4 font-medium">By joining, you agree to maintain the integrity of our women-only space.</p>
              </div>

              {/* Community Guidelines */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="mr-3 w-6 h-6" />
                  Community Guidelines
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white bg-opacity-50 rounded-xl">
                    <h4 className="font-semibold text-green-700 mb-2">✓ We Encourage:</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Respectful and supportive communication</li>
                      <li>• Sharing experiences and advice</li>
                      <li>• Asking questions without shame</li>
                      <li>• Celebrating each other's wins</li>
                      <li>• Offering help when possible</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white bg-opacity-50 rounded-xl">
                    <h4 className="font-semibold text-red-700 mb-2">✗ Not Allowed:</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Harassment or bullying</li>
                      <li>• Spam or promotional content</li>
                      <li>• Sharing personal information of others</li>
                      <li>• Discriminatory language</li>
                      <li>• Medical advice (share experiences only)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Privacy Policy */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Lock className="mr-3 w-6 h-6" />
                  Privacy & Data Protection
                </h3>
                <div className="bg-white bg-opacity-50 rounded-xl p-6">
                  <div className="space-y-6">


                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">What Information We Collect</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>We only store your name and username when you register through Google.</li>
                        <li>No government IDs, photos, or personal documents are collected or stored.</li>
                        <li>Registration is handled securely through Google's authentication system.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">Data Protection</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>We protect your personal information and never share it with third parties.</li>
                        <li>Your data is used only to provide community services and communication.</li>
                        <li>We maintain secure systems to protect your privacy at all times.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">Your Rights</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>You can delete your account at any time through your profile page, or if we haven't implemented that yet, contact us and we can delete it for you.</li>
                        <li>For assistance, email us at support@mumsspace.com.</li>
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-mums-light bg-opacity-50 rounded-lg border-l-4 border-mums-accent">
                      <p className="text-sm font-medium text-mums-dark">
                        By using Mum's Space, you agree to this privacy policy and our community guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms of Service */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CheckCircle className="mr-3 w-6 h-6" />
                  Terms of Service
                </h3>
                <div className="bg-white bg-opacity-50 rounded-xl p-6 text-sm space-y-4">
                  <p><strong>Account Responsibility:</strong> You are responsible for maintaining your account security and the content you post.</p>
                  <p><strong>Content Ownership:</strong> You retain rights to your content, but grant us license to display it within the app.</p>
                  <p><strong>Acceptable Use:</strong> Use the platform respectfully and in accordance with our community guidelines.</p>
                  <p><strong>Termination:</strong> We reserve the right to suspend accounts that violate our terms or community guidelines.</p>
                  <p><strong>Changes:</strong> We may update these terms with notice to users.</p>
                </div>
              </div>
            </div>


          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

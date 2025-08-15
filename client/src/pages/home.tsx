import { Smartphone, Monitor, Download, Heart, Users, Lock, CheckCircle, BookOpen } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeartBackground from "@/components/HeartBackground";
import storiesImage from "@assets/Screenshot_31_1755233840917.png";
import debatesImage from "@assets/Screenshot_32_1755233328576.png";
import guidesImage from "@assets/Screenshot_14_1755234349059.png";
import mealPlannerImage from "@assets/Screenshot_21_1755234508674.png";
import contractionTrackerImage from "@assets/Screenshot_18_1755234564029.png";
import feedingTrackerImage from "@assets/Screenshot_20_1755234646909.png";
import mumsToBeImage from "@assets/Screenshot_23_1755234695724.png";
import stage01Image from "@assets/Screenshot_22_1755235131834.png";
import stage25Image from "@assets/Screenshot_24_1755235176114.png";
import reviewsImage from "@assets/Screenshot_36_1755235233351.png";
import downloadImage from "@assets/Screenshot_37_1755235284470.png";
import babyIsHereImage from "@assets/Screenshot_38_1755235350831.png";
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
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/about-image.png" 
                  alt="Mother and baby sharing a tender moment" 
                  className="rounded-2xl shadow-lg w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
                <p className="mb-6 leading-relaxed">Mum's Space was born from the understanding that motherhood, while beautiful, can be isolating. We created a sanctuary where women can connect authentically, share experiences, and support one another through every stage of their journey.</p>
                
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="mb-6 leading-relaxed">To provide a safe, inclusive, and supportive digital space where mothers and women can build meaningful connections, share wisdom, seek advice, and celebrate the ups and downs of motherhood together.</p>
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
                <p className="text-gray-600 text-base leading-relaxed">Real experiences from mums at every stage.</p>
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
                <p className="text-gray-600 text-base leading-relaxed">Vote, comment, and see what the community thinks.</p>
              </div>
            </div>

            {/* Section 3: Chatroom - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Chatroom</h3>
                <p className="text-gray-600 text-base leading-relaxed">Drop in for live, friendly conversation.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src="/chatroom.webp" 
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
                <p className="text-gray-600 text-base leading-relaxed">Short, expert guides you can read anytime.</p>
              </div>
            </div>

            {/* Section 5: Meal Planner - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Meal Planner</h3>
                <p className="text-gray-600 text-base leading-relaxed">Plan weekly meals and auto-build a shopping list.</p>
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
                <p className="text-gray-600 text-base leading-relaxed">Celebrate milestones and find support in the newborn stage.</p>
              </div>
            </div>

            {/* Section 7: Contraction Tracker - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Contraction Tracker</h3>
                <p className="text-gray-600 text-base leading-relaxed">Track timings and intervals in real time.</p>
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
                <p className="text-gray-600 text-base leading-relaxed">Log breast, bottle, and solids with easy history.</p>
              </div>
            </div>

            {/* Section 9: Mums-to-be - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Mums-to-be</h3>
                <p className="text-gray-600 text-base leading-relaxed">Pregnancy topics, tools, and support in one place.</p>
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
                <p className="text-gray-600 text-base leading-relaxed">Newborn to one: sleep, feeding, routines, milestones.</p>
              </div>
            </div>

            {/* Section 11: 2–5 - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">2–5</h3>
                <p className="text-gray-600 text-base leading-relaxed">Toddlers to preschool: behaviour, play, toilet training.</p>
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
                <p className="text-gray-600 text-base leading-relaxed">See honest feedback from mums using MumSpace.</p>
              </div>
            </div>

            {/* Section 13: Download the App - Image Right */}
            <div className="grid lg:grid-cols-[440px_1fr] gap-16 items-start mb-20">
              <div className="max-w-[480px]">
                <h3 className="text-xl font-semibold mb-3 text-mums-dark leading-tight">Download the App</h3>
                <p className="text-gray-600 text-base leading-relaxed">Install on iOS or Android for faster access.</p>
              </div>
              <div className="w-full max-w-[560px] lg:ml-auto">
                <img 
                  src={downloadImage} 
                  alt="Mobile app download screens for iOS and Android platforms" 
                  loading="lazy"
                  className="w-full h-auto rounded-3xl shadow-lg aspect-video"
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
                  Privacy & Data Protection — ID Verification (For Mum's Space Website)
                </h3>
                <div className="bg-white bg-opacity-50 rounded-xl p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">Why do we verify your ID?</h4>
                      <p className="text-gray-700 leading-relaxed">
                        To keep Mum's Space a safe, supportive women-only community, we may ask you to upload a photo of your government-issued ID and a selfie. This helps us protect against fake accounts and keep all members safe.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">How is your information used?</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>Your ID and selfie are used only to confirm your identity and eligibility for our community.</li>
                        <li>Your information is not used for any other purpose and is never shared with third parties.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">How is your information stored?</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>All ID images are stored securely with access limited to our verification team.</li>
                        <li>As soon as your verification is complete, your ID and selfie are permanently deleted from our system.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">How long do we keep your ID?</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>We keep your ID images only as long as necessary to review and verify your account.</li>
                        <li>Once verification is done, all copies of your ID are deleted.</li>
                        <li>We never keep your ID on file after this.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-mums-dark">Your rights:</h4>
                      <ul className="ml-6 space-y-1 text-gray-700">
                        <li>You can request to see, update, or delete your data at any time by contacting our support team.</li>
                        <li>For more information, see our full Privacy Policy or email us at support@mumsspace.com.</li>
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

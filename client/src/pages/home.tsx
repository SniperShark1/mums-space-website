import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Smartphone, Monitor, Download, Heart, Users, Lock, Mail, Instagram, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeartBackground from "@/components/HeartBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Home = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message! We'll get back to you soon.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const handleDownload = (platform: string) => {
    toast({
      title: "Download starting...",
      description: `${platform} download will be available soon!`,
    });
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

      {/* App Features Section - Placeholder for upcoming showcase */}
      <section id="app-features" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">What's Inside Mum's Space</h2>
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">Coming soon...</p>
              <p className="text-sm text-gray-500">We're preparing something special to show you what makes our community unique.</p>
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
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Women supporting each other in a warm, caring environment" 
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

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="section-card rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-mums-dark">Contact & Support</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              className="bg-white bg-opacity-70 border-mums-accent border-opacity-30"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-white bg-opacity-70 border-mums-accent border-opacity-30"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white bg-opacity-70 border-mums-accent border-opacity-30">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="technical">Technical Support</SelectItem>
                              <SelectItem value="guidelines">Community Guidelines</SelectItem>
                              <SelectItem value="account">Account Issues</SelectItem>
                              <SelectItem value="suggestions">Suggestions</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?"
                              className="bg-white bg-opacity-70 border-mums-accent border-opacity-30"
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-mums-accent hover:bg-mums-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">Other Ways to Reach Us</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Email Support</h4>
                      <p className="text-gray-600">support@mumsspace.com</p>
                      <p className="text-sm text-gray-500">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Social Media</h4>
                      <p className="text-gray-600">@mumsspace</p>
                      <p className="text-sm text-gray-500">Follow us for updates and tips</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-mums-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">FAQ & Help Center</h4>
                      <p className="text-gray-600">Find instant answers</p>
                      <p className="text-sm text-gray-500">Available 24/7 in the app</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-mums-light bg-opacity-50 rounded-xl">
                  <h4 className="font-semibold mb-2">Emergency Support</h4>
                  <p className="text-sm text-gray-600">If you're in crisis or need immediate help, please contact your local emergency services or mental health crisis line.</p>
                </div>
              </div>
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
                <p className="mb-4">Mum's Space is exclusively for women, mothers, and those who identify as women. This policy ensures:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-6">
                  <li>A safe space for women to share personal experiences</li>
                  <li>Gender-specific discussions about motherhood and women's issues</li>
                  <li>Protection from inappropriate behavior often found in mixed-gender spaces</li>
                  <li>Authentic conversations without fear of judgment</li>
                </ul>
                <p className="mt-4 font-medium">By joining, you confirm you identify as a woman and agree to maintain the integrity of our women-only space.</p>
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

            {/* Contact for Policies */}
            <div className="mt-8 text-center p-6 bg-mums-accent bg-opacity-10 rounded-2xl">
              <p className="text-sm">
                Questions about our policies? Contact us at{" "}
                <a href="mailto:policies@mumsspace.com" className="text-mums-accent font-medium hover:underline">
                  policies@mumsspace.com
                </a>
              </p>
              <p className="text-xs text-gray-600 mt-2">Last updated: January 2024</p>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

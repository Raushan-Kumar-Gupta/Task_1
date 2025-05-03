
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { UserCircle, Bell, Shield, CreditCard, HardDrive, LogOut, Save, Settings as SettingsIcon } from "lucide-react";
import AOS from "aos";

export default function Settings() {
  const { toast } = useToast();
  
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Product Manager with over 5 years of experience in the tech industry. Passionate about creating intuitive user experiences and data-driven decision making.",
    avatar: "https://i.pravatar.cc/150?img=12",
  });
  
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    weeklyUpdates: true,
    twoFactorAuth: false,
    activityLog: true,
    dataSharing: false,
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your preference settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between" data-aos="fade-up">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full" data-aos="fade-up" data-aos-delay="100">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="profile" className="flex gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">Change avatar</Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        value={profile.name}
                        onChange={e => setProfile({...profile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email" 
                        value={profile.email}
                        onChange={e => setProfile({...profile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself" 
                      value={profile.bio}
                      onChange={e => setProfile({...profile, bio: e.target.value})}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      This information will be displayed publicly so be careful what you share.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="ml-auto bg-keshavSoft-pink hover:bg-keshavSoft-pink/90"
                onClick={handleSaveProfile}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Connect your accounts to enable single sign-on
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                    <span className="text-blue-600 font-bold">G</span>
                  </div>
                  <div>
                    <p className="font-medium">Google</p>
                    <p className="text-sm text-muted-foreground">Sign in with Google</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-900">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">Sign in with GitHub</p>
                  </div>
                </div>
                <Button variant="outline">Connect</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={preferences.emailNotifications}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, emailNotifications: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
                <Switch 
                  checked={preferences.pushNotifications}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, pushNotifications: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new features and offers
                  </p>
                </div>
                <Switch 
                  checked={preferences.marketingEmails}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, marketingEmails: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium">Weekly Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of your account activity
                  </p>
                </div>
                <Switch 
                  checked={preferences.weeklyUpdates}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, weeklyUpdates: checked})
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="ml-auto bg-keshavSoft-pink hover:bg-keshavSoft-pink/90"
                onClick={handleSavePreferences}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch 
                  checked={preferences.twoFactorAuth}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, twoFactorAuth: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between py-3 border-t">
                <div>
                  <p className="font-medium">Activity Log</p>
                  <p className="text-sm text-muted-foreground">
                    Track and log all activity on your account
                  </p>
                </div>
                <Switch 
                  checked={preferences.activityLog}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, activityLog: checked})
                  }
                />
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-2">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-destructive rounded-lg p-4">
                <h3 className="font-medium text-destructive mb-1">Delete Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all of your data. This action cannot be undone.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      $19.99 per month, billed annually
                    </p>
                  </div>
                  <Badge variant="outline">Current Plan</Badge>
                </div>
                <div className="space-y-1 mb-4">
                  <p className="text-sm flex items-center">
                    <span className="text-green-600 mr-2">✓</span> Unlimited access to all features
                  </p>
                  <p className="text-sm flex items-center">
                    <span className="text-green-600 mr-2">✓</span> Priority support
                  </p>
                  <p className="text-sm flex items-center">
                    <span className="text-green-600 mr-2">✓</span> Advanced analytics
                  </p>
                  <p className="text-sm flex items-center">
                    <span className="text-green-600 mr-2">✓</span> Custom integrations
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
              
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                View your recent billing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 border-b py-3 px-4 font-semibold">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Invoice</div>
                </div>
                <div className="grid grid-cols-4 items-center border-b py-3 px-4">
                  <div>May 1, 2023</div>
                  <div>$19.99</div>
                  <div><Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge></div>
                  <div className="text-right"><Button variant="ghost" size="sm">Download</Button></div>
                </div>
                <div className="grid grid-cols-4 items-center border-b py-3 px-4">
                  <div>Apr 1, 2023</div>
                  <div>$19.99</div>
                  <div><Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge></div>
                  <div className="text-right"><Button variant="ghost" size="sm">Download</Button></div>
                </div>
                <div className="grid grid-cols-4 items-center py-3 px-4">
                  <div>Mar 1, 2023</div>
                  <div>$19.99</div>
                  <div><Badge variant="outline" className="bg-green-100 text-green-800">Paid</Badge></div>
                  <div className="text-right"><Button variant="ghost" size="sm">Download</Button></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced settings for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Data Sharing</p>
                  <p className="text-sm text-muted-foreground">
                    Allow us to share anonymous usage data to improve our services
                  </p>
                </div>
                <Switch 
                  checked={preferences.dataSharing}
                  onCheckedChange={checked => 
                    setPreferences({...preferences, dataSharing: checked})
                  }
                />
              </div>
              
              <div className="py-3 border-t">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="en">English (US)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
              
              <div className="py-3 border-t">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="utc">UTC (GMT+0)</option>
                    <option value="est">Eastern Time (GMT-4)</option>
                    <option value="pst">Pacific Time (GMT-7)</option>
                    <option value="cet">Central European Time (GMT+1)</option>
                  </select>
                </div>
              </div>
              
              <div className="py-3 border-t">
                <h3 className="font-medium mb-2">Data Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download all of your account data as a JSON or CSV file
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <HardDrive className="mr-2 h-4 w-4" />
                    Export as JSON
                  </Button>
                  <Button variant="outline">
                    <HardDrive className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                </div>
              </div>
              
              <div className="py-3 border-t">
                <h3 className="font-medium mb-2">Sessions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage and sign out of your active sessions
                </p>
                <Button variant="outline" className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out of All Sessions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { LayoutShell } from "@/components/layout-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your profile has been updated successfully.",
    });
  };

  return (
    <LayoutShell>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h2 className="text-heading-lg text-foreground">Account Settings</h2>
          <p className="text-body mt-2">Manage your profile information and preferences.</p>
        </div>

        <Tabs defaultValue="general" className="w-full max-w-4xl">
          <TabsList className="mb-6 border-b border-border rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger value="general" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3">General</TabsTrigger>
            <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3">Security</TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="text-heading-md">Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and account information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 ring-2 ring-primary/20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">{user?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="font-medium">Change Avatar</Button>
                </div>
                
                <div className="space-y-4 border-t border-border pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-semibold">Full Name</Label>
                      <Input id="name" defaultValue={user?.name} className="border-border/60 py-2.5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user?.email} className="border-border/60 py-2.5" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="font-semibold">Account Role</Label>
                      <Input id="role" defaultValue={user?.role} disabled className="bg-muted border-border/60 py-2.5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="member" className="font-semibold">Member Since</Label>
                      <Input id="member" defaultValue="January 2024" disabled className="bg-muted border-border/60 py-2.5" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border px-6 py-4 flex justify-end gap-3">
                <Button variant="outline" className="font-medium">Cancel</Button>
                <Button onClick={handleSave} className="font-semibold">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="text-heading-md">Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current" className="font-semibold">Current Password</Label>
                    <Input id="current" type="password" className="border-border/60 py-2.5" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new" className="font-semibold">New Password</Label>
                    <Input id="new" type="password" className="border-border/60 py-2.5" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="font-semibold">Confirm Password</Label>
                    <Input id="confirm" type="password" className="border-border/60 py-2.5" placeholder="••••••••" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border px-6 py-4 flex justify-end gap-3">
                <Button variant="outline" className="font-medium">Cancel</Button>
                <Button onClick={handleSave} className="font-semibold">Update Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="card-professional">
              <CardHeader>
                <CardTitle className="text-heading-md">Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about your tasks and projects.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-4">
                  {[
                    { title: "Task Assignments", desc: "Get notified when a new task is assigned" },
                    { title: "Task Updates", desc: "Get notified when tasks are updated or completed" },
                    { title: "Team Activity", desc: "Get notified about team member actions" },
                    { title: "Weekly Digest", desc: "Receive a weekly summary of your progress" },
                  ].map((notif, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium text-foreground">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">{notif.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded cursor-pointer" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border px-6 py-4 flex justify-end gap-3">
                <Button variant="outline" className="font-medium">Cancel</Button>
                <Button onClick={handleSave} className="font-semibold">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutShell>
  );
}

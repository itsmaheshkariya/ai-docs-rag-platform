"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
// import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save, User, Bell, Shield, Database, Upload } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function SettingsPage() {
//   const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Profile settings
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI and document management enthusiast. Working on RAG applications.",
    avatarUrl: "",
  })

  // Application preferences
  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "en",
    defaultView: "documents",
    resultsPerPage: 10,
  })

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    documentProcessed: true,
    newComments: true,
    systemUpdates: false,
    weeklyDigest: true,
  })

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
  })

  // API settings
  const [apiSettings, setApiSettings] = useState({
    modelProvider: "together",
    embeddingModel: "default",
    maxTokens: 1024,
    temperature: 0.7,
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

    //   toast({
    //     title: "Profile updated",
    //     description: "Your profile information has been updated successfully.",
    //   })
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Update failed",
    //     description: "There was an error updating your profile. Please try again.",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferencesUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

    //   toast({
    //     title: "Preferences updated",
    //     description: "Your application preferences have been updated successfully.",
    //   })
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Update failed",
    //     description: "There was an error updating your preferences. Please try again.",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

    //   toast({
    //     title: "Notification settings updated",
    //     description: "Your notification preferences have been updated successfully.",
    //   })
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Update failed",
    //     description: "There was an error updating your notification settings. Please try again.",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

    //   toast({
    //     title: "Security settings updated",
    //     description: "Your security settings have been updated successfully.",
    //   })
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Update failed",
    //     description: "There was an error updating your security settings. Please try again.",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApiSettingsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

    //   toast({
    //     title: "API settings updated",
    //     description: "Your API configuration has been updated successfully.",
    //   })
    } catch (error) {
    //   toast({
    //     variant: "destructive",
    //     title: "Update failed",
    //     description: "There was an error updating your API settings. Please try again.",
    //   })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>API</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information and profile settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profile.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                      alt={profile.name}
                    />
                    <AvatarFallback>
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Avatar
                    </Button>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="flex items-center gap-2">
                    <Input id="password" type="password" value="••••••••" disabled />
                    <Button variant="outline" type="button">
                      Change Password
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleProfileUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Settings */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your application experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePreferencesUpdate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-view">Default View</Label>
                  <RadioGroup
                    value={preferences.defaultView}
                    onValueChange={(value: any) => setPreferences({ ...preferences, defaultView: value })}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dashboard" id="dashboard" />
                      <Label htmlFor="dashboard">Dashboard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="documents" id="documents" />
                      <Label htmlFor="documents">Documents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qa" id="qa" />
                      <Label htmlFor="qa">Q&A</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="results-per-page">Results Per Page: {preferences.resultsPerPage}</Label>
                  </div>
                  <Slider
                    id="results-per-page"
                    min={5}
                    max={50}
                    step={5}
                    value={[preferences.resultsPerPage]}
                    onValueChange={(value) => setPreferences({ ...preferences, resultsPerPage: value[0] })}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5</span>
                    <span>25</span>
                    <span>50</span>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handlePreferencesUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationsUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Types</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="document-processed" className="flex-1">
                          Document Processing Completed
                        </Label>
                        <Switch
                          id="document-processed"
                          checked={notifications.documentProcessed}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, documentProcessed: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-comments" className="flex-1">
                          New Comments on Documents
                        </Label>
                        <Switch
                          id="new-comments"
                          checked={notifications.newComments}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, newComments: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-updates" className="flex-1">
                          System Updates and Maintenance
                        </Label>
                        <Switch
                          id="system-updates"
                          checked={notifications.systemUpdates}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="weekly-digest" className="flex-1">
                          Weekly Activity Digest
                        </Label>
                        <Switch
                          id="weekly-digest"
                          checked={notifications.weeklyDigest}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleNotificationsUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecurityUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={security.twoFactorAuth}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactorAuth: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select
                      value={security.sessionTimeout}
                      onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                    >
                      <SelectTrigger id="session-timeout">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Your session will expire after this period of inactivity
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-notifications">Login Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for new login attempts
                      </p>
                    </div>
                    <Switch
                      id="login-notifications"
                      checked={security.loginNotifications}
                      onCheckedChange={(checked) => setSecurity({ ...security, loginNotifications: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Active Sessions</h3>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Windows • Chrome • New York, USA</p>
                        </div>
                        <Badge>Active Now</Badge>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-medium">Mobile Session</p>
                          <p className="text-sm text-muted-foreground">iOS • Safari • New York, USA</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Danger Zone</h3>
                    <div className="rounded-md border border-destructive/50 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-destructive">Delete Account</p>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all your data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSecurityUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Configure the AI models and API settings for document processing</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApiSettingsUpdate} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="model-provider">Model Provider</Label>
                  <Select
                    value={apiSettings.modelProvider}
                    onValueChange={(value) => setApiSettings({ ...apiSettings, modelProvider: value })}
                  >
                    <SelectTrigger id="model-provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="together">Together AI</SelectItem>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="embedding-model">Embedding Model</Label>
                  <Select
                    value={apiSettings.embeddingModel}
                    onValueChange={(value) => setApiSettings({ ...apiSettings, embeddingModel: value })}
                  >
                    <SelectTrigger id="embedding-model">
                      <SelectValue placeholder="Select embedding model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default (Provider Recommended)</SelectItem>
                      <SelectItem value="openai-ada-002">OpenAI Ada 002</SelectItem>
                      <SelectItem value="together-embed">Together Embed</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="max-tokens">Max Tokens: {apiSettings.maxTokens}</Label>
                  </div>
                  <Slider
                    id="max-tokens"
                    min={256}
                    max={4096}
                    step={128}
                    value={[apiSettings.maxTokens]}
                    onValueChange={(value) => setApiSettings({ ...apiSettings, maxTokens: value[0] })}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>256</span>
                    <span>2048</span>
                    <span>4096</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="temperature">Temperature: {apiSettings.temperature.toFixed(1)}</Label>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[apiSettings.temperature]}
                    onValueChange={(value) => setApiSettings({ ...apiSettings, temperature: value[0] })}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0.0 (Precise)</span>
                    <span>0.5</span>
                    <span>1.0 (Creative)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" value="••••••••••••••••••••••••••••••" disabled />
                  <p className="text-xs text-muted-foreground">API keys are managed by system administrators</p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleApiSettingsUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

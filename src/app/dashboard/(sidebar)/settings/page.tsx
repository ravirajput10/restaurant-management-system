"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: "Bistro Dashboard",
    timezone: "America/New_York",
    currency: "USD",
    language: "en-US",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    businessHours: {
      monday: { open: "09:00", close: "22:00", closed: false },
      tuesday: { open: "09:00", close: "22:00", closed: false },
      wednesday: { open: "09:00", close: "22:00", closed: false },
      thursday: { open: "09:00", close: "22:00", closed: false },
      friday: { open: "09:00", close: "23:00", closed: false },
      saturday: { open: "10:00", close: "23:00", closed: false },
      sunday: { open: "10:00", close: "21:00", closed: false },
    },
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    lowInventoryAlerts: true,
    newOrderAlerts: true,
    reservationAlerts: true,
    staffAlerts: false,
    financialReports: true,
    marketingEmails: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    accentColor: "blue",
    compactMode: false,
    showWelcomeMessage: true,
    defaultDashboardView: "overview",
    sidebarCollapsed: false,
  });

  const handleSaveGeneral = (e) => {
    e.preventDefault();
    // Save general settings logic here
    console.log("General settings saved:", generalSettings);
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    // Save notification settings logic here
    console.log("Notification settings saved:", notificationSettings);
  };

  const handleSaveAppearance = (e) => {
    e.preventDefault();
    // Save appearance settings logic here
    console.log("Appearance settings saved:", appearanceSettings);
  };

  const updateBusinessHours = (day, field, value) => {
    setGeneralSettings({
      ...generalSettings,
      businessHours: {
        ...generalSettings.businessHours,
        [day]: {
          ...generalSettings.businessHours[day],
          [field]: value,
        },
      },
    });
  };

  const weekdays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ];

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 space-y-6">
          <form onSubmit={handleSaveGeneral}>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic restaurant settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="restaurantName">Restaurant Name</Label>
                  <Input
                    id="restaurantName"
                    value={generalSettings.restaurantName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        restaurantName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">
                          Eastern Time (ET)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time (CT)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time (MT)
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Greenwich Mean Time (GMT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="GBP">British Pound (£)</SelectItem>
                        <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                        <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="en-GB">English (UK)</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={generalSettings.dateFormat}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          dateFormat: value,
                        })
                      }
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select
                    value={generalSettings.timeFormat}
                    onValueChange={(value) =>
                      setGeneralSettings({
                        ...generalSettings,
                        timeFormat: value,
                      })
                    }
                  >
                    <SelectTrigger id="timeFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                      <SelectItem value="24h">24-hour (13:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  Set your restaurant's operating hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weekdays.map((day) => (
                    <div
                      key={day.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="w-28">
                        <Label>{day.label}</Label>
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <Switch
                          checked={!generalSettings.businessHours[day.id].closed}
                          onCheckedChange={(checked) =>
                            updateBusinessHours(day.id, "closed", !checked)
                          }
                        />
                        <span className="text-sm">
                          {generalSettings.businessHours[day.id].closed
                            ? "Closed"
                            : "Open"}
                        </span>
                      </div>
                      {!generalSettings.businessHours[day.id].closed && (
                        <>
                          <div className="grid gap-1">
                            <Label
                              htmlFor={`${day.id}-open`}
                              className="text-xs"
                            >
                              Open
                            </Label>
                            <Input
                              id={`${day.id}-open`}
                              type="time"
                              value={generalSettings.businessHours[day.id].open}
                              onChange={(e) =>
                                updateBusinessHours(
                                  day.id,
                                  "open",
                                  e.target.value
                                )
                              }
                              className="w-24"
                            />
                          </div>
                          <div className="grid gap-1">
                            <Label
                              htmlFor={`${day.id}-close`}
                              className="text-xs"
                            >
                              Close
                            </Label>
                            <Input
                              id={`${day.id}-close`}
                              type="time"
                              value={generalSettings.businessHours[day.id].close}
                              onChange={(e) =>
                                updateBusinessHours(
                                  day.id,
                                  "close",
                                  e.target.value
                                )
                              }
                              className="w-24"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Save General Settings
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-6">
          <form onSubmit={handleSaveNotifications}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Choose how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
                <CardDescription>
                  Select which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Inventory Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when inventory items are running low
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.lowInventoryAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        lowInventoryAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Order Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new orders are placed
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newOrderAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        newOrderAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reservation Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new or changed reservations
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reservationAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        reservationAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Staff Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about staff schedule changes or issues
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.staffAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        staffAlerts: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Financial Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive periodic financial reports
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.financialReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        financialReports: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing tips and product updates
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        marketingEmails: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Save Notification Settings
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-6">
          <form onSubmit={handleSaveAppearance}>
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={appearanceSettings.theme}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        theme: value,
                      })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <Select
                    value={appearanceSettings.accentColor}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        accentColor: value,
                      })
                    }
                  >
                    <SelectTrigger id="accentColor">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Use a more compact layout to fit more content on screen
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.compactMode}
                    onCheckedChange={(checked) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        compactMode: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Welcome Message</Label>
                    <p className="text-sm text-muted-foreground">
                      Show welcome message on dashboard
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.showWelcomeMessage}
                    onCheckedChange={(checked) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        showWelcomeMessage: checked,
                      })
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="defaultDashboardView">Default Dashboard View</Label>
                  <Select
                    value={appearanceSettings.defaultDashboardView}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        defaultDashboardView: value,
                      })
                    }
                  >
                    <SelectTrigger id="defaultDashboardView">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overview">Overview</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="reservations">Reservations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sidebar Collapsed</Label>
                    <p className="text-sm text-muted-foreground">
                      Start with sidebar collapsed by default
                    </p>
                  </div>
                  <Switch
                    checked={appearanceSettings.sidebarCollapsed}
                    onCheckedChange={(checked) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        sidebarCollapsed: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-6">
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Save Appearance Settings
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

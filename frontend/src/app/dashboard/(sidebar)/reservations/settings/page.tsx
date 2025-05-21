"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReservationSettingsPage() {
  const [settings, setSettings] = useState({
    maxPartySize: 10,
    minAdvanceTime: 30,
    maxAdvanceDays: 30,
    timeSlotInterval: 30,
    defaultReservationDuration: 120,
    autoConfirm: true,
    requirePhoneNumber: true,
    requireEmail: true,
    enableWaitlist: true,
    allowCancellations: true,
    cancellationDeadline: 24,
    sendConfirmationEmails: true,
    sendReminders: true,
    reminderTime: 24,
    overBookingBuffer: 0,
    specialRequests: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reservation Settings</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure basic reservation parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="maxPartySize">Maximum Party Size</Label>
              <Input
                id="maxPartySize"
                type="number"
                value={settings.maxPartySize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxPartySize: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="timeSlotInterval">Time Slot Interval (minutes)</Label>
              <Select
                value={settings.timeSlotInterval.toString()}
                onValueChange={(value) =>
                  setSettings({ ...settings, timeSlotInterval: parseInt(value) })
                }
              >
                <SelectTrigger id="timeSlotInterval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="defaultReservationDuration">
                Default Reservation Duration (minutes)
              </Label>
              <Input
                id="defaultReservationDuration"
                type="number"
                value={settings.defaultReservationDuration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultReservationDuration: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Rules</CardTitle>
            <CardDescription>
              Set reservation booking constraints
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="minAdvanceTime">
                Minimum Advance Booking Time (minutes)
              </Label>
              <Input
                id="minAdvanceTime"
                type="number"
                value={settings.minAdvanceTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    minAdvanceTime: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxAdvanceDays">
                Maximum Advance Booking Days
              </Label>
              <Input
                id="maxAdvanceDays"
                type="number"
                value={settings.maxAdvanceDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxAdvanceDays: parseInt(e.target.value),
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-confirm Reservations</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically confirm new reservations
                </p>
              </div>
              <Switch
                checked={settings.autoConfirm}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoConfirm: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Requirements</CardTitle>
            <CardDescription>
              Set required customer information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Phone Number</Label>
              </div>
              <Switch
                checked={settings.requirePhoneNumber}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requirePhoneNumber: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Email</Label>
              </div>
              <Switch
                checked={settings.requireEmail}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireEmail: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Special Requests</Label>
              </div>
              <Switch
                checked={settings.specialRequests}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, specialRequests: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure reservation notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Send Confirmation Emails</Label>
              </div>
              <Switch
                checked={settings.sendConfirmationEmails}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, sendConfirmationEmails: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Send Reminders</Label>
              </div>
              <Switch
                checked={settings.sendReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, sendReminders: checked })
                }
              />
            </div>

            {settings.sendReminders && (
              <div className="grid gap-2">
                <Label htmlFor="reminderTime">
                  Reminder Time (hours before reservation)
                </Label>
                <Input
                  id="reminderTime"
                  type="number"
                  value={settings.reminderTime}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      reminderTime: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderSettingsPage() {
  const [settings, setSettings] = useState({
    autoAssignOrders: true,
    defaultPrepTime: 20,
    orderNumberPrefix: "ORD",
    orderNumberSequence: "daily",
    enableTips: true,
    defaultTipPercentages: [10, 15, 20],
    allowCustomTips: true,
    requireCustomerPhone: true,
    requireCustomerEmail: false,
    autoSendReceipts: true,
    receiptTemplate: "default",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Settings</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Processing</CardTitle>
            <CardDescription>
              Configure how orders are processed and assigned
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-assign Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically assign new orders to available staff
                </p>
              </div>
              <Switch
                checked={settings.autoAssignOrders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoAssignOrders: checked })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="defaultPrepTime">Default Preparation Time (minutes)</Label>
              <Input
                id="defaultPrepTime"
                type="number"
                value={settings.defaultPrepTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    defaultPrepTime: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Numbers</CardTitle>
            <CardDescription>
              Configure order number format and sequence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="orderNumberPrefix">Order Number Prefix</Label>
              <Input
                id="orderNumberPrefix"
                value={settings.orderNumberPrefix}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    orderNumberPrefix: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="orderNumberSequence">Order Number Sequence</Label>
              <Select
                value={settings.orderNumberSequence}
                onValueChange={(value) =>
                  setSettings({ ...settings, orderNumberSequence: value })
                }
              >
                <SelectTrigger id="orderNumberSequence">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="continuous">Continuous</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips & Gratuity</CardTitle>
            <CardDescription>
              Configure tipping options for orders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Tips</Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to add tips to their orders
                </p>
              </div>
              <Switch
                checked={settings.enableTips}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, enableTips: checked })
                }
              />
            </div>

            {settings.enableTips && (
              <>
                <div className="grid gap-2">
                  <Label>Default Tip Percentages</Label>
                  <Input
                    value={settings.defaultTipPercentages.join(", ")}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        defaultTipPercentages: e.target.value
                          .split(",")
                          .map((n) => parseInt(n.trim()))
                          .filter((n) => !isNaN(n)),
                      })
                    }
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter percentages separated by commas
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Custom Tips</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to enter custom tip amounts
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowCustomTips}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, allowCustomTips: checked })
                    }
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>
              Configure required customer information for orders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Phone Number</Label>
                <p className="text-sm text-muted-foreground">
                  Require customers to provide a phone number
                </p>
              </div>
              <Switch
                checked={settings.requireCustomerPhone}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireCustomerPhone: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Email</Label>
                <p className="text-sm text-muted-foreground">
                  Require customers to provide an email address
                </p>
              </div>
              <Switch
                checked={settings.requireCustomerEmail}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, requireCustomerEmail: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receipts</CardTitle>
            <CardDescription>
              Configure order receipt settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-send Receipts</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically send receipts after order completion
                </p>
              </div>
              <Switch
                checked={settings.autoSendReceipts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoSendReceipts: checked })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="receiptTemplate">Receipt Template</Label>
              <Select
                value={settings.receiptTemplate}
                onValueChange={(value) =>
                  setSettings({ ...settings, receiptTemplate: value })
                }
              >
                <SelectTrigger id="receiptTemplate">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Template</SelectItem>
                  <SelectItem value="minimal">Minimal Template</SelectItem>
                  <SelectItem value="detailed">Detailed Template</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  );
}
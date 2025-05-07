"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Save, ExternalLink, Plus } from "lucide-react";

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState({
    paymentProcessors: {
      stripe: {
        enabled: true,
        apiKey: "sk_test_***********************",
        webhookSecret: "whsec_***********************",
      },
      paypal: {
        enabled: false,
        clientId: "",
        clientSecret: "",
      },
    },
    delivery: {
      doordash: {
        enabled: true,
        apiKey: "dd_api_***********************",
      },
      ubereats: {
        enabled: false,
        apiKey: "",
      },
    },
    pos: {
      square: {
        enabled: false,
        accessToken: "",
      },
      toast: {
        enabled: true,
        apiKey: "toast_***********************",
      },
    },
    marketing: {
      mailchimp: {
        enabled: true,
        apiKey: "mc_***********************",
        listId: "abc123",
      },
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    // Save integrations settings logic here
    console.log("Integration settings saved:", integrations);
  };

  const updateIntegration = (category, name, field, value) => {
    setIntegrations({
      ...integrations,
      [category]: {
        ...integrations[category],
        [name]: {
          ...integrations[category][name],
          [field]: value,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add New Integration
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Processors</CardTitle>
            <CardDescription>
              Connect payment processing services to your restaurant
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Stripe</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Active
                  </div>
                </div>
                <Switch
                  checked={integrations.paymentProcessors.stripe.enabled}
                  onCheckedChange={(checked) =>
                    updateIntegration("paymentProcessors", "stripe", "enabled", checked)
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="stripeApiKey">API Key</Label>
                  <Input
                    id="stripeApiKey"
                    type="password"
                    value={integrations.paymentProcessors.stripe.apiKey}
                    onChange={(e) =>
                      updateIntegration(
                        "paymentProcessors",
                        "stripe",
                        "apiKey",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="stripeWebhookSecret">Webhook Secret</Label>
                  <Input
                    id="stripeWebhookSecret"
                    type="password"
                    value={integrations.paymentProcessors.stripe.webhookSecret}
                    onChange={(e) =>
                      updateIntegration(
                        "paymentProcessors",
                        "stripe",
                        "webhookSecret",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="mt-3 text-sm">
                <a
                  href="https://dashboard.stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Go to Stripe Dashboard
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">PayPal</div>
                  <div className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    Inactive
                  </div>
                </div>
                <Switch
                  checked={integrations.paymentProcessors.paypal.enabled}
                  onCheckedChange={(checked) =>
                    updateIntegration("paymentProcessors", "paypal", "enabled", checked)
                  }
                />
              </div>

              {integrations.paymentProcessors.paypal.enabled && (
                <div className="space-y-3">
                  <div className="grid gap-2">
                    <Label htmlFor="paypalClientId">Client ID</Label>
                    <Input
                      id="paypalClientId"
                      value={integrations.paymentProcessors.paypal.clientId}
                      onChange={(e) =>
                        updateIntegration(
                          "paymentProcessors",
                          "paypal",
                          "clientId",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="paypalClientSecret">Client Secret</Label>
                    <Input
                      id="paypalClientSecret"
                      type="password"
                      value={integrations.paymentProcessors.paypal.clientSecret}
                      onChange={(e) =>
                        updateIntegration(
                          "paymentProcessors",
                          "paypal",
                          "clientSecret",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              )}

              <div className="mt-3 text-sm">
                <a
                  href="https://developer.paypal.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Go to PayPal Developer Dashboard
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Services</CardTitle>
            <CardDescription>
              Connect with food delivery platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">DoorDash</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Active
                  </div>
                </div>
                <Switch
                  checked={integrations.delivery.doordash.enabled}
                  onCheckedChange={(checked) =>
                    updateIntegration("delivery", "doordash", "enabled", checked)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="doordashApiKey">API Key</Label>
                <Input
                  id="doordashApiKey"
                  type="password"
                  value={integrations.delivery.doordash.apiKey}
                  onChange={(e) =>
                    updateIntegration(
                      "delivery",
                      "doordash",
                      "apiKey",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Uber Eats</div>
                  <div className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    Inactive
                  </div>
                </div>
                <Switch
                  checked={integrations.delivery.ubereats.enabled}
                  onCheckedChange={(checked) =>
                    updateIntegration("delivery", "ubereats", "enabled", checked)
                  }
                />
              </div>

              {integrations.delivery.ubereats.enabled && (
                <div className="grid gap-2">
                  <Label htmlFor="uberEatsApiKey">API Key</Label>
                  <Input
                    id="uberEatsApiKey"
                    type="password"
                    value={integrations.delivery.ubereats.apiKey}
                    onChange={(e) =>
                      updateIntegration(
                        "delivery",
                        "ubereats",
                        "apiKey",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketing</CardTitle>
            <CardDescription>
              Connect email marketing and customer engagement tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Mailchimp</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Active
                  </div>
                </div>
                <Switch
                  checked={integrations.marketing.mailchimp.enabled}
                  onCheckedChange={(checked) =>
                    updateIntegration("marketing", "mailchimp", "enabled", checked)
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="mailchimpApiKey">API Key</Label>
                  <Input
                    id="mailchimpApiKey"
                    type="password"
                    value={integrations.marketing.mailchimp.apiKey}
                    onChange={(e) =>
                      updateIntegration(
                        "marketing",
                        "mailchimp",
                        "apiKey",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mailchimpListId">List ID</Label>
                  <Input
                    id="mailchimpListId"
                    value={integrations.marketing.mailchimp.listId}
                    onChange={(e) =>
                      updateIntegration(
                        "marketing",
                        "mailchimp",
                        "listId",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" /> Save Integrations
          </Button>
        </div>
      </form>
    </div>
  );
}
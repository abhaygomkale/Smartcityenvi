import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bell, Shield, Zap, Palette, Database, User, Mail, Lock, Globe, HardDrive, Download } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useAppContext } from "../context/AppContext";

export function SettingsPage() {
  const { theme, toggleTheme } = useAppContext();
  const [notifications, setNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataRefresh, setDataRefresh] = useState([30]);

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:to-slate-800 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10 dark:opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      <div className="relative p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl mb-2">Settings</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage your dashboard preferences and system configuration</p>
          </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1">
            <TabsTrigger value="general" className="gap-2">
              <Zap className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="display" className="gap-2">
              <Palette className="h-4 w-4" />
              Display
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[#3b82f6]" />
                </div>
                <div>
                  <h2>General Settings</h2>
                  <p className="text-sm text-[#64748b]">Configure basic dashboard preferences</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Dashboard Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Default Time Zone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">IST (GMT+5:30) - India Standard Time</SelectItem>
                      <SelectItem value="utc">UTC (GMT+0) - Coordinated Universal Time</SelectItem>
                      <SelectItem value="est">EST (GMT-5) - Eastern Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Data Refresh Interval</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={dataRefresh}
                      onValueChange={setDataRefresh}
                      min={10}
                      max={300}
                      step={10}
                      className="flex-1"
                    />
                    <span className="text-sm w-20 text-right">{dataRefresh[0]} seconds</span>
                  </div>
                  <p className="text-xs text-[#64748b]">How often the dashboard updates with new data</p>
                </div>

                <div className="space-y-3">
                  <Label>Date Format</Label>
                  <Select defaultValue="dmy">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Regional Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Temperature Unit</Label>
                  <Select defaultValue="celsius">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celsius">Celsius (°C)</SelectItem>
                      <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Distance Unit</Label>
                  <Select defaultValue="km">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="km">Kilometers (km)</SelectItem>
                      <SelectItem value="miles">Miles (mi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-[#f59e0b]" />
                </div>
                <div>
                  <h2>Notification Preferences</h2>
                  <p className="text-sm text-[#64748b]">Control how you receive alerts and updates</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-[#64748b]">Receive alerts and updates in the dashboard</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-[#64748b]">Receive important alerts via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <Label>Critical Alerts Only</Label>
                    <p className="text-sm text-[#64748b]">Only show high-priority notifications</p>
                  </div>
                  <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Alert Thresholds</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CO₂ Warning Level (ppm)</Label>
                    <Input type="number" defaultValue="600" />
                  </div>
                  <div className="space-y-2">
                    <Label>CO₂ Critical Level (ppm)</Label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>AQI Warning Level</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>AQI Critical Level</Label>
                    <Input type="number" defaultValue="150" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Temperature Warning (°C)</Label>
                    <Input type="number" defaultValue="35" />
                  </div>
                  <div className="space-y-2">
                    <Label>Temperature Critical (°C)</Label>
                    <Input type="number" defaultValue="40" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Display */}
          <TabsContent value="display" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center">
                  <Palette className="h-6 w-6 text-[#8b5cf6]" />
                </div>
                <div>
                  <h2>Display Preferences</h2>
                  <p className="text-sm text-[#64748b]">Customize the visual appearance</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Theme Mode</Label>
                  <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg hover:bg-[#f1f5f9] transition-colors">
                    <div>
                      <p>Current Theme: {theme === "light" ? "Light Mode" : "Dark Mode"}</p>
                      <p className="text-sm text-[#64748b]">Switch between light and dark themes</p>
                    </div>
                    <Button onClick={toggleTheme} variant="outline">
                      Toggle Theme
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Map Style</Label>
                  <Select defaultValue="default">
                    <SelectTrigger>
                      <SelectValue placeholder="Select map style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="satellite">Satellite View</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Chart Color Scheme</Label>
                  <div className="grid grid-cols-4 gap-3">
                    <button className="h-16 rounded-lg bg-gradient-to-r from-[#1e40af] to-[#3b82f6] border-2 border-[#3b82f6] shadow-lg"></button>
                    <button className="h-16 rounded-lg bg-gradient-to-r from-[#0891b2] to-[#06b6d4] border-2 border-transparent hover:border-[#0891b2]"></button>
                    <button className="h-16 rounded-lg bg-gradient-to-r from-[#10b981] to-[#34d399] border-2 border-transparent hover:border-[#10b981]"></button>
                    <button className="h-16 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] border-2 border-transparent hover:border-[#8b5cf6]"></button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Data Management */}
          <TabsContent value="data" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0891b2]/20 flex items-center justify-center">
                  <Database className="h-6 w-6 text-[#0891b2]" />
                </div>
                <div>
                  <h2>Data Management</h2>
                  <p className="text-sm text-[#64748b]">Manage system data and storage</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h3>Data Retention Period</h3>
                    <p className="text-sm text-[#64748b]">90 days of historical data stored</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h3>Storage Usage</h3>
                    <p className="text-sm text-[#64748b]">2.4 GB / 10 GB used (24%)</p>
                    <div className="w-48 h-2 bg-[#e2e8f0] rounded-full mt-2">
                      <div className="w-[24%] h-full bg-[#3b82f6] rounded-full"></div>
                    </div>
                  </div>
                  <Badge className="bg-[#10b981]">Healthy</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h3>Export Historical Data</h3>
                    <p className="text-sm text-[#64748b]">Download all recorded sensor data</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <h3>Clear Cache</h3>
                    <p className="text-sm text-[#64748b]">Reset temporary data and improve performance</p>
                  </div>
                  <Button variant="outline">Clear</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Backup Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <Label>Automatic Backup</Label>
                    <p className="text-sm text-[#64748b]">Daily automated backups at 2:00 AM</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Backup Location</Label>
                  <Select defaultValue="cloud">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-[#10b981]" />
                </div>
                <div>
                  <h2>Security & Privacy</h2>
                  <p className="text-sm text-[#64748b]">Manage your account security settings</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Change Password</Label>
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                  <Button className="bg-[#1e40af]">Update Password</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-[#64748b]">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-[#64748b]">Auto-logout after inactivity</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] border-[#3b82f6]/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-[#1e40af]" />
                <h3>System Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#64748b]">Version</p>
                  <p>v3.2.1</p>
                </div>
                <div>
                  <p className="text-[#64748b]">Last Updated</p>
                  <p>Oct 29, 2025</p>
                </div>
                <div>
                  <p className="text-[#64748b]">Active Sensors</p>
                  <p>3 / 3</p>
                </div>
                <div>
                  <p className="text-[#64748b]">System Uptime</p>
                  <p>99.8%</p>
                </div>
                <div>
                  <p className="text-[#64748b]">API Status</p>
                  <Badge className="bg-[#10b981]">Operational</Badge>
                </div>
                <div>
                  <p className="text-[#64748b]">Database</p>
                  <Badge className="bg-[#10b981]">Healthy</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline">Reset to Defaults</Button>
          <Button className="bg-[#1e40af] hover:bg-[#1e3a8a]">Save All Changes</Button>
        </div>
        </div>
      </div>
    </div>
  );
}

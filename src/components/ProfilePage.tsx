import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Award, Settings, Shield, Clock } from "lucide-react";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { useAppContext } from "../context/AppContext";

export function ProfilePage() {
  const { username, setUsername } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleSave = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  const userStats = [
    { label: "Dashboards Created", value: "12", icon: Award, color: "#3b82f6" },
    { label: "Reports Generated", value: "47", icon: Briefcase, color: "#0891b2" },
    { label: "Alerts Configured", value: "23", icon: Shield, color: "#10b981" },
    { label: "Days Active", value: "156", icon: Clock, color: "#8b5cf6" },
  ];

  const recentActivity = [
    { action: "Generated Annual CO₂ Report", date: "2 hours ago", type: "report" },
    { action: "Updated alert thresholds for Sitabuldi", date: "5 hours ago", type: "alert" },
    { action: "Exported analytics data", date: "1 day ago", type: "export" },
    { action: "Created custom dashboard view", date: "2 days ago", type: "dashboard" },
    { action: "Configured new sensor zone", date: "3 days ago", type: "settings" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Banner */}
      <div className="h-48 bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#0891b2] relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      </div>

      <div className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="relative -mt-24 mb-8">
          <Card className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                <AvatarFallback className="bg-gradient-to-br from-[#1e40af] to-[#0891b2] text-4xl">
                  <User className="h-16 w-16 text-white" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl mb-2">{username}</h1>
                    <p className="text-[#64748b] mb-3">Senior Environmental Data Analyst</p>
                    <div className="flex gap-2">
                      <Badge className="bg-[#1e40af]">Administrator</Badge>
                      <Badge className="bg-[#10b981]">Verified User</Badge>
                      <Badge className="bg-[#8b5cf6]">Premium Access</Badge>
                    </div>
                  </div>
                  <Button className="bg-[#1e40af] hover:bg-[#1e3a8a]" onClick={() => setIsEditing(!isEditing)}>
                    <Settings className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg">
                    <Mail className="h-5 w-5 text-[#3b82f6]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Email</p>
                      <p className="text-sm">rajesh.kumar@nagpur.gov.in</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg">
                    <Phone className="h-5 w-5 text-[#0891b2]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Phone</p>
                      <p className="text-sm">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg">
                    <MapPin className="h-5 w-5 text-[#10b981]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Location</p>
                      <p className="text-sm">Nagpur, Maharashtra</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#f8fafc] rounded-lg">
                    <Briefcase className="h-5 w-5 text-[#8b5cf6]" />
                    <div>
                      <p className="text-xs text-[#64748b]">Department</p>
                      <p className="text-sm">Environment Monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-3xl mb-1" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-sm text-[#64748b]">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className={`p-6 col-span-2 ${isEditing ? '' : 'hidden'}`}>
            <h2 className="mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={tempUsername.split(' ')[0]} onChange={(e) => setTempUsername(e.target.value + ' ' + tempUsername.split(' ')[1])} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={tempUsername.split(' ')[1]} onChange={(e) => setTempUsername(tempUsername.split(' ')[0] + ' ' + e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" defaultValue="rajesh.kumar@nagpur.gov.in" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Employee ID</Label>
                  <Input defaultValue="NGP-ENV-2021-047" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Input defaultValue="Environment Monitoring & Analysis" />
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="Smart City Office, Civil Lines, Nagpur - 440001" />
              </div>

              <Separator />

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button className="bg-[#1e40af] hover:bg-[#1e3a8a]" onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'report' ? 'bg-[#3b82f6]' :
                    activity.type === 'alert' ? 'bg-[#f59e0b]' :
                    activity.type === 'export' ? 'bg-[#10b981]' :
                    activity.type === 'dashboard' ? 'bg-[#0891b2]' :
                    'bg-[#8b5cf6]'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-[#64748b] mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Certifications & Achievements */}
        <Card className="p-6 mt-6">
          <h2 className="mb-6">Certifications & Achievements</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border border-[#e2e8f0] rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm">Environmental Data Analyst</h3>
                  <p className="text-xs text-[#64748b]">Level 3 Certified</p>
                </div>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-[#64748b] mt-2">Completed: Jan 2024</p>
            </div>

            <div className="p-4 border border-[#e2e8f0] rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#10b981] to-[#0891b2] flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm">Smart City Solutions</h3>
                  <p className="text-xs text-[#64748b]">Expert Badge</p>
                </div>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-[#64748b] mt-2">Completed: Mar 2024</p>
            </div>

            <div className="p-4 border border-[#e2e8f0] rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6] flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-sm">CO₂ Monitoring Specialist</h3>
                  <p className="text-xs text-[#64748b]">Advanced</p>
                </div>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-[#64748b] mt-2">In Progress</p>
            </div>
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
}

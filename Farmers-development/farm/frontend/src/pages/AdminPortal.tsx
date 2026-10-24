import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Users, ShieldCheck, Activity, TrendingUp, UserCog,
  Loader2, RefreshCcw, ShoppingCart, Download, Search, MessageSquare, FlaskConical
} from "lucide-react";
import { adminApi } from "@/Backend/api/adminApi";
import { appointmentApi } from "@/Backend/api/medicalApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Stethoscope } from "lucide-react";
import ABTestingDashboard from "@/components/ABTestingDashboard";

const AdminPortal = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // States
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [supportMessages, setSupportMessages] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userProfileData, setUserProfileData] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [replyMessageId, setReplyMessageId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, statsData, ordersData, activitiesData, appointmentsData] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getStats(),
        adminApi.getOrders(),
        adminApi.getActivity(),
        appointmentApi.getAppointments()
      ]);
      setUsers(usersData);
      setStats(statsData);
      setOrders(ordersData);
      setActivities(activitiesData);
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : appointmentsData.appointments || []);
      // Fetch support messages (non-critical)
      try {
        const suppData = await adminApi.getSupportMessages();
        setSupportMessages(suppData.messages || []);
      } catch { /* ignore */ }
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh stats every 30 seconds for "real-time" feel
    const interval = setInterval(() => {
      adminApi.getStats().then(setStats).catch(console.error);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      await adminApi.updateUserRole(userId, newRole);
      toast({ title: "Success", description: `User role updated to ${newRole}` });
      fetchData(); // Refresh list
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, status);
      toast({ title: "Success", description: `Order status updated to ${status}` });
      fetchData();
    } catch (error: any) {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    }
  };

  const openUserProfile = async (user: any) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
    try {
      const profileData = await adminApi.getUserProfile(user._id);
      setUserProfileData(profileData);
    } catch (error) {
      toast({ title: "Error", description: "Could not fetch user profile details", variant: "destructive" });
    }
  };

  const handleSupportReply = async (messageId: string) => {
    if (!adminReplyText.trim()) return;
    setIsReplying(true);
    try {
      await adminApi.replyToSupportMessage(messageId, adminReplyText);
      toast({ title: "Reply Sent", description: "Your response has been saved." });
      setReplyMessageId(null);
      setAdminReplyText("");
      fetchData(); // Refresh to show the reply
    } catch (error: any) {
      toast({ title: "Failed to send reply", description: error.message, variant: "destructive" });
    } finally {
      setIsReplying(false);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).map(val => `"${val}"`).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading && !users.length) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.phone?.includes(searchQuery)
  );

  const filteredOrders = orders.filter(o => 
    o.orderId?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.userId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              Admin Command Center
            </h1>
            <p className="text-slate-500 font-medium">Comprehensive platform monitoring and management.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="Search globally..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[250px] bg-white border-slate-200"
              />
            </div>
            <Button onClick={fetchData} variant="outline" className="bg-white gap-2">
              <RefreshCcw className="w-4 h-4" /> Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={Users} color="text-blue-600" bg="bg-blue-50" />
          <StatCard title="Active Today" value={stats?.activeUsersToday || 0} icon={Activity} color="text-emerald-600" bg="bg-emerald-50" isStatus />
          <StatCard title="Total Orders" value={stats?.ordersToday || 0} icon={ShoppingCart} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard title="Total Revenue" value={`₹${stats?.totalRevenue?.toLocaleString() || 0}`} icon={TrendingUp} color="text-amber-600" bg="bg-amber-50" />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full max-w-[1050px] mb-8 bg-slate-200/50 p-1 rounded-xl">
            <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
            <TabsTrigger value="users" className="rounded-lg">Users</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-lg">Orders</TabsTrigger>
            <TabsTrigger value="medical" className="rounded-lg">Medical</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-lg">Activity</TabsTrigger>
            <TabsTrigger value="support" className="rounded-lg flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Support
              {supportMessages.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{supportMessages.length}</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="ab-tests" className="rounded-lg flex items-center gap-1">
              <FlaskConical className="w-3 h-3" /> A/B Tests
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-[1.5rem] border-none shadow-md">
                <CardHeader>
                  <CardTitle>Daily Active Users (7 Days)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {stats?.chartData && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="activeUsers" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-[1.5rem] border-none shadow-md">
                <CardHeader>
                  <CardTitle>Revenue Trends (7 Days)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {stats?.chartData && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users" className="mt-0">
            <Card className="rounded-[1.5rem] border-none shadow-md bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 px-8 py-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
                    <UserCog className="w-5 h-5" /> User Management
                  </CardTitle>
                </div>
                <Button 
                  size="sm" variant="secondary" className="gap-2"
                  onClick={() => exportToCSV(users.map(u => ({ ID: u._id, Name: u.name, Phone: u.phone, Role: u.role })), 'users_export')}
                >
                  <Download className="w-4 h-4" /> Export CSV
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Contact</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => openUserProfile(user)}>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                {user.name?.[0]?.toUpperCase() || 'U'}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{user.name}</div>
                                <div className="text-xs text-slate-400">ID: {user._id.slice(-6)}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="text-sm text-slate-600">{user.email || 'No Email'}</div>
                            <div className="text-sm font-medium text-slate-900">{user.phone}</div>
                          </td>
                          <td className="px-8 py-5">
                            <Badge className={getRoleBadgeStyle(user.role)}>{user.role}</Badge>
                          </td>
                          <td className="px-8 py-5">
                            {user.isOnline ? (
                              <Badge className="bg-emerald-500/10 text-emerald-600 border-none">Online</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-none">Offline</Badge>
                            )}
                          </td>
                          <td className="px-8 py-5" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              {updatingId === user._id ? (
                                <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                              ) : (
                                <Select defaultValue={user.role} onValueChange={(val) => handleRoleUpdate(user._id, val)}>
                                  <SelectTrigger className="w-[120px] h-8 text-xs font-bold bg-slate-50 border-slate-200">
                                    <SelectValue placeholder="Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="farmer">Farmer</SelectItem>
                                    <SelectItem value="doctor">Doctor</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ORDERS TAB */}
          <TabsContent value="orders" className="mt-0">
            <Card className="rounded-[1.5rem] border-none shadow-md bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 px-8 py-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Order Management
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Items</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Total</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Payment</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Fulfillment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredOrders.map((order) => (
                        <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5">
                            <div className="font-mono text-sm text-slate-600">{order.orderId}</div>
                            <div className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="font-bold text-slate-900">{order.userId?.name || 'Unknown'}</div>
                            <div className="text-xs text-slate-500">{order.userId?.phone}</div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="text-sm text-slate-700">{order.items?.length || 0} items</div>
                            <div className="text-xs text-slate-400 truncate w-32">
                              {order.items?.map((i:any) => i.name).join(', ')}
                            </div>
                          </td>
                          <td className="px-8 py-5 font-bold text-slate-900">₹{order.amount}</td>
                          <td className="px-8 py-5">
                            <div className="flex flex-col gap-1">
                              {order.paymentMethod === 'cod' ? (
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                                  Cash on Delivery
                                </Badge>
                              ) : (
                                <Badge className={order.status === 'completed' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}>
                                  {order.status}
                                </Badge>
                              )}
                              {order.paymentMethod !== 'cod' && order.paymentMethod && (
                                <span className="text-[10px] text-slate-400 font-medium uppercase">{order.paymentMethod}</span>
                              )}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <Select defaultValue={order.orderStatus || 'placed'} onValueChange={(val) => handleOrderStatusUpdate(order._id, val)}>
                              <SelectTrigger className="w-[130px] h-8 text-xs font-bold bg-white border-slate-200">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="placed">Placed</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEDICAL TAB */}
          <TabsContent value="medical" className="mt-0">
            <Card className="rounded-[1.5rem] border-none shadow-md bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 px-8 py-6">
                <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" /> Medical Bookings Monitor
                </CardTitle>
                <CardDescription className="text-slate-400">All appointments across the platform</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Appointment</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Participants</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Date/Time</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {appointments.map((apt) => (
                        <tr key={apt._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5">
                            <div className="font-bold text-slate-900">{apt.title}</div>
                            <div className="text-xs text-slate-500 truncate w-48">{apt.description}</div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="text-xs text-slate-400 uppercase font-black">Doctor</div>
                            <div className="text-sm font-bold text-slate-900">{apt.doctorId?.name || 'Unassigned'}</div>
                            <div className="text-xs text-slate-400 uppercase font-black mt-2">Farmer</div>
                            <div className="text-sm font-bold text-slate-900">{apt.patientId?.name || 'Public Request'}</div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="text-sm font-bold text-slate-900">{new Date(apt.scheduledDate).toLocaleDateString()}</div>
                            <div className="text-xs text-slate-500">{new Date(apt.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>
                          <td className="px-8 py-5">
                            <Badge className={
                              apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                              apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                              apt.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                              'bg-amber-100 text-amber-700'
                            }>{apt.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {appointments.length === 0 && (
                    <div className="text-center py-20 text-slate-500">No medical appointments found</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="activity" className="mt-0">
             <Card className="rounded-[1.5rem] border-none shadow-md bg-white">
              <CardHeader>
                <CardTitle>Recent Platform Activity</CardTitle>
                <CardDescription>Real-time log of user actions across the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((act) => (
                    <div key={act._id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-bold text-slate-900">{act.userId?.name || 'Unknown User'}</div>
                          <div className="text-xs text-slate-400">{new Date(act.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-slate-600">
                          <span className="font-medium capitalize text-blue-600">{act.actionType.replace('_', ' ')}</span>
                          {" - "}{act.details}
                        </div>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div className="text-center py-10 text-slate-500">No recent activity</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUPPORT MESSAGES TAB */}
          <TabsContent value="support" className="mt-0">
            <Card className="rounded-[1.5rem] border-none shadow-md bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 px-8 py-6">
                <CardTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Support Messages Inbox
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1">Messages sent by users from the Help Centre in My Orders</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {supportMessages.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No support messages yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {supportMessages.map((msg: any) => (
                      <div key={msg._id} className="px-8 py-5 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">
                            {(msg.userName || 'U')[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-bold text-slate-900">{msg.userName || 'Unknown User'}</div>
                              <div className="text-xs text-slate-400">{new Date(msg.createdAt).toLocaleString('en-IN')}</div>
                            </div>
                            {msg.userPhone && (
                              <div className="text-xs text-slate-500 mb-2">📞 {msg.userPhone}</div>
                            )}
                            {msg.orderId && (
                              <div className="text-xs text-slate-500 mb-2">Order: <span className="font-mono text-slate-700">{msg.orderId}</span></div>
                            )}
                            <div className="bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 text-sm text-slate-700 leading-relaxed mb-3">
                              {msg.message}
                            </div>
                            
                            {msg.adminReply ? (
                              <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-slate-700 leading-relaxed ml-6 relative">
                                <div className="absolute -left-3 top-4 w-3 h-0.5 bg-emerald-100"></div>
                                <div className="font-bold text-emerald-700 text-xs mb-1">Admin Response ({new Date(msg.repliedAt).toLocaleString('en-IN')})</div>
                                {msg.adminReply}
                              </div>
                            ) : (
                              replyMessageId === msg._id ? (
                                <div className="mt-3 space-y-3">
                                  <textarea
                                    className="w-full p-3 rounded-xl border border-purple-200 text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                    placeholder="Type your reply here..."
                                    value={adminReplyText}
                                    onChange={(e) => setAdminReplyText(e.target.value)}
                                    rows={3}
                                  />
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      className="bg-purple-600 hover:bg-purple-700"
                                      disabled={isReplying || !adminReplyText.trim()}
                                      onClick={() => handleSupportReply(msg._id)}
                                    >
                                      {isReplying ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                                      Send Reply
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      onClick={() => { setReplyMessageId(null); setAdminReplyText(""); }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="mt-2 text-xs border-purple-200 text-purple-700 hover:bg-purple-50"
                                  onClick={() => setReplyMessageId(msg._id)}
                                >
                                  Reply to User
                                </Button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* A/B TESTS TAB */}
          <TabsContent value="ab-tests" className="mt-0">
            <ABTestingDashboard />
          </TabsContent>

        </Tabs>
      </main>

      {/* USER PROFILE DIALOG */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          {!userProfileData ? (
             <div className="py-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-600" /></div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b pb-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-600">
                  {selectedUser?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedUser?.name}</h2>
                  <div className="text-slate-500 mb-2">{selectedUser?.phone} | {selectedUser?.email || 'No email'}</div>
                  <Badge className={getRoleBadgeStyle(selectedUser?.role)}>{selectedUser?.role}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Total Spending</div>
                  <div className="text-2xl font-black text-slate-900">₹{userProfileData.totalSpending || 0}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-sm text-slate-500 mb-1">Total Orders</div>
                  <div className="text-2xl font-black text-slate-900">{userProfileData.totalOrders || 0}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Recent Orders</h3>
                {userProfileData.recentOrders?.length > 0 ? (
                  <div className="space-y-2">
                    {userProfileData.recentOrders.map((order: any) => (
                      <div key={order._id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-bold">{order.orderId}</div>
                          <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-600">₹{order.amount}</div>
                          <Badge variant="outline" className="text-[10px]">{order.orderStatus || 'placed'}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500">No orders placed yet.</div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, bg, isStatus }: any) => (
  <Card className="rounded-[1.5rem] border-none shadow-md bg-white p-6 hover:translate-y-[-4px] transition-transform cursor-default">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      {isStatus && (
        <Badge className="bg-emerald-500 text-white border-none animate-pulse">
          Live
        </Badge>
      )}
    </div>
    <div className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{title}</div>
    <div className="text-3xl font-black text-slate-900">{value}</div>
  </Card>
);

const getRoleBadgeStyle = (role: string) => {
  switch (role) {
    case 'admin': return "bg-red-500/10 text-red-600 border-none hover:bg-red-500/20";
    case 'doctor': return "bg-indigo-500/10 text-indigo-600 border-none hover:bg-indigo-500/20";
    default: return "bg-emerald-500/10 text-emerald-600 border-none hover:bg-emerald-500/20";
  }
};

export default AdminPortal;

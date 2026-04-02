import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { authApi } from '@/Backend/api/todoApi';
import { User, Mail, UserCircle, Edit3, Camera } from 'lucide-react';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      if (authApi.isAuthenticated()) {
        const profile = await authApi.getProfile();
        setCurrentUser(profile.user);
        setName(profile.user.name || '');
        setEmail(profile.user.email || '');
        setPhoto(profile.user.photo || '');
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      toast({ title: t('error'), description: 'Could not load profile data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
         toast({ title: t('error'), description: 'Image text size must be less than 2MB', variant: 'destructive' });
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setIsEditing(true); // Automatically enter edit mode if not already
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
       setIsSaving(true);
       const response = await authApi.updateProfile({ name, email, photo });
       setCurrentUser(response.user);
       toast({ title: t('success'), description: 'Profile updated successfully' });
       setIsEditing(false);
    } catch (error: any) {
       console.error("Error updating profile", error);
       toast({ title: t('error'), description: error.message || 'Failed to update profile.', variant: 'destructive' });
    } finally {
       setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          {t('loading')}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex items-center justify-center pt-32 text-slate-500">
          User data not found. Please log in again.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-[124px] pb-12 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <UserCircle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-slate-900">{t('profile') || 'My Profile'}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar and Basic Info */}
          <Card className="col-span-1 rounded-3xl border-slate-100 shadow-sm overflow-hidden">
             <div className="h-24 bg-primary/20 w-full" />
             <CardContent className="px-6 pb-6 pt-0 flex flex-col items-center -mt-12 text-center">
                 <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md mb-4 relative">
                   <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl overflow-hidden">
                     {photo ? (
                        <img src={photo} alt={name} className="w-full h-full object-cover" />
                     ) : (
                        name ? name.charAt(0).toUpperCase() : <User className="w-8 h-8" />
                     )}
                   </div>
                   <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden" 
                   />
                   <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                   >
                      <Camera className="w-4 h-4" />
                   </button>
                 </div>
                 <h2 className="text-xl font-bold text-slate-900 mb-1">{name || 'User Name'}</h2>
                 <p className="text-slate-500 text-sm mb-4">{currentUser.email}</p>
                 <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                    User Account
                 </div>
             </CardContent>
          </Card>

          {/* Details Form */}
          <Card className="col-span-1 md:col-span-2 rounded-3xl border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 pb-6 px-8">
              <div>
                <CardTitle className="text-xl">Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-xl border-slate-200"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </CardHeader>
            <CardContent className="px-8 pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" /> Full Name
                  </label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing || isSaving}
                    className="bg-slate-50 rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-400" /> Email Address
                  </label>
                  <Input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing || isSaving}
                    type="email"
                    className="bg-slate-50 rounded-xl h-11"
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="pt-4 flex justify-end">
                  <Button 
                     onClick={handleSave}
                     disabled={isSaving}
                     className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-elegant px-8"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

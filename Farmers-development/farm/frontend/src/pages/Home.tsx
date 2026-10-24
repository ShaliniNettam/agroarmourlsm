import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { authApi } from "@/Backend/api/todoApi";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useExperiment } from "@/hooks/useExperiment";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe,
  Leaf,
  Scale,
  MousePointerClick,
  AlertTriangle,
  Phone,
  MapPin,
  Siren
} from "lucide-react";
import { cn } from "@/lib/utils";
import RoamingChick from "@/components/RoamingChick";
// import heroBg from "@/assets/home-hero.png"; // Removed background image since user requested plain background

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // A/B experiments
  const { variant: ctaVariant, trackConversion: trackCtaConversion } = useExperiment('hero_cta');
  const { variant: subtitleVariant } = useExperiment('hero_subtitle');

  // Variant copy
  const ctaText = ctaVariant === 'variant_a' ? 'Check My Livestock Now →' : (t('getStarted') === 'getStarted' ? 'Get Started' : t('getStarted'));
  const subtitleText = subtitleVariant === 'variant_a'
    ? "Every day without monitoring costs you. Catch disease early, prevent losses, and protect your herd \u2014 before it\u2019s too late."
    : (t('heroSubtitle') === 'heroSubtitle' ? 'Keep your cattle and poultry healthy with simple, smart monitoring. AgroArmor provides the precision tools you need for modern farming.' : t('heroSubtitle'));

  useEffect(() => {
    const checkRole = async () => {
      if (authApi.isAuthenticated()) {
        try {
          const profile = await authApi.getProfile();
          if (profile.user?.role === 'doctor') {
            navigate('/doctor-portal', { replace: true });
          } else if (profile.user?.role === 'admin') {
            navigate('/admin', { replace: true });
          }
        } catch (error) {
          console.error("Home role check failed", error);
        }
      }
    };
    checkRole();
  }, [navigate]);

  const services = [
    {
      icon: ShieldCheck,
      title: t('awareness'),
      desc: "Instant AI diagnosis and expert prevention guides for your farm.",
      color: "bg-emerald-600",
      size: "col-span-1 md:col-span-2 lg:col-span-2",
    },
    {
      icon: Globe,
      title: t('gpsTracking'),
      desc: "Find and navigate to the nearest veterinary experts in seconds.",
      color: "bg-indigo-600",
      size: "col-span-1",
    },
    {
      icon: Users,
      title: t('community'),
      desc: "Join a growing network of farmers sharing knowledge and solutions.",
      color: "bg-blue-600",
      size: "col-span-1",
    },
    {
      icon: Scale,
      title: t('compliance'),
      desc: "Precision management tools to keep your farm compliant and efficient.",
      color: "bg-amber-600",
      size: "col-span-1 md:col-span-2 lg:col-span-2",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <Navbar />
      <RoamingChick />
      
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center pt-10 pb-10 overflow-hidden min-h-[calc(100vh-80px)]">
        {/* Subtle Light Atmosphere */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/50 to-white" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              {t('heroTitle1') === 'heroTitle1' ? 'Smarter Livestock Care' : t('heroTitle1')} <br />
              <span className="text-emerald-600">
                {t('heroTitle2') === 'heroTitle2' ? 'Starts Here' : t('heroTitle2')}
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
              {subtitleText}
            </p>
            
            <div className="flex justify-center">
              <Link to="/hygiene-test" onClick={() => trackCtaConversion({ cta_text: ctaText })}>
                <Button
                  id="hero-cta-button"
                  size="lg"
                  className="h-16 px-12 text-xl font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/20 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
                >
                  {ctaVariant === 'variant_a' ? ctaText : <><span>{ctaText}</span><ArrowRight className="w-8 h-8 ml-3 transition-transform group-hover:translate-x-1" /></>}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <MousePointerClick className="w-6 h-6 text-slate-400" />
        </div>
      </section>

      {/* Emergency SOS Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-rose-50 to-orange-50 border-t border-rose-100">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 font-bold text-sm px-4 py-2 rounded-full mb-4">
              <Siren className="w-4 h-4 animate-pulse" />
              Emergency Services
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3">Need Immediate Help?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">If your livestock is in a critical condition, don't wait. Use the emergency options below to get expert help fast.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* SOS Call */}
            <div className="bg-rose-600 rounded-3xl p-8 text-white shadow-2xl shadow-rose-200 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.location.href = 'tel:+1800-AGROARMOR'}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black mb-2">SOS Call</h3>
              <p className="text-rose-100 text-sm mb-4">Connect instantly with an available vet doctor.</p>
              <span className="bg-white text-rose-600 font-black px-5 py-2 rounded-xl text-sm">Call Now</span>
            </div>

            {/* Find Nearby Vet */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate('/find-vet')}
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Find Nearby Vet</h3>
              <p className="text-slate-500 text-sm mb-4">Locate the closest veterinary clinic on the map right now.</p>
              <span className="bg-indigo-600 text-white font-black px-5 py-2 rounded-xl text-sm">Open Map</span>
            </div>

            {/* Report Outbreak */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => navigate('/community')}
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Report Outbreak</h3>
              <p className="text-slate-500 text-sm mb-4">Alert the farmer community and get advice from experts.</p>
              <span className="bg-amber-500 text-white font-black px-5 py-2 rounded-xl text-sm">Report Now</span>
            </div>
          </div>

          {/* Emergency Hotlines */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-rose-500" />
              <span className="font-bold text-slate-700">Emergency Hotlines:</span>
            </div>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-end">
              <a href="tel:1800-180-1551" className="text-sm font-bold text-rose-600 hover:underline">🇮🇳 Livestock Helpline: 1800-180-1551</a>
              <a href="tel:1962" className="text-sm font-bold text-slate-600 hover:underline">Animal Disease: 1962</a>
              <a href="tel:011-25841991" className="text-sm font-bold text-slate-600 hover:underline">ICAR: 011-25841991</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
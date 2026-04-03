import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Users, 
  Globe,
  Leaf,
  Scale,
  MousePointerClick
} from "lucide-react";
import { cn } from "@/lib/utils";
import RoamingChick from "@/components/RoamingChick";
// import heroBg from "@/assets/home-hero.png"; // Removed background image since user requested plain background

const Home = () => {
  const { t } = useLanguage();

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
              {t('heroSubtitle') === 'heroSubtitle' ? 'Keep your cattle and poultry healthy with simple, smart monitoring. AgroArmor provides the precision tools you need for modern farming.' : t('heroSubtitle')}
            </p>
            
            <div className="flex justify-center">
              <Link to="/hygiene-test">
                <Button size="lg" className="h-16 px-12 text-xl font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/20 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 group">
                  {t('getStarted') === 'getStarted' ? 'Get Started' : t('getStarted')}
                  <ArrowRight className="w-8 h-8 ml-3 transition-transform group-hover:translate-x-1" />
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
    </div>
  );
};

export default Home;
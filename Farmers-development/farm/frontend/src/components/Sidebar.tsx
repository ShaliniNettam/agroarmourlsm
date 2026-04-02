import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Footprints, 
  ClipboardList, 
  MapPin, 
  Stethoscope, 
  ShieldCheck,
  ChevronRight,
  Crown,
  Users
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Sidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    { icon: AlertTriangle, label: t('awareness'), path: "/awareness", color: "text-amber-500" },
    { icon: Footprints, label: t('hygieneTest'), path: "/hygiene-test", color: "text-emerald-500" },
    { icon: ClipboardList, label: t('todoList'), path: "/todo-list", color: "text-purple-500" },
    { icon: MapPin, label: t('gpsTracking'), path: "/gps-tracking", color: "text-green-600" },
    { icon: Stethoscope, label: t('vetDoctors'), path: "/medical", color: "text-red-500" },
    { icon: Users, label: t('community'), path: "/community", color: "text-blue-500" },
    { icon: ShieldCheck, label: t('compliance'), path: "/compliance", color: "text-indigo-500" },
  ];

  return (
    <aside className="w-64 fixed left-0 top-[112px] bottom-0 bg-white border-r border-border hidden lg:block overflow-y-auto pt-4 shadow-sm z-40">
      <div className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {t('mainMenu')}
      </div>
      <div className="space-y-1 px-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : item.color)} />
                {item.label}
              </div>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-70" />}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {t('system')}
      </div>
      <div className="space-y-1 px-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-all"
        >
          <div className="p-1 bg-secondary rounded-md">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          {t('settings')}
        </Link>
      </div>

      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
        <div className="flex items-center gap-3 mb-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-bold text-primary">{t('goPremium')}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
          {t('premiumDesc')}
        </p>
        <Link to="/subscription">
          <button className="w-full py-1.5 bg-primary text-white text-[11px] font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-elegant">
            {t('upgradeNow')}
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

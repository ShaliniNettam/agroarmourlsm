import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  AlertCircle, 
  Pill, 
  Shield, 
  Play, 
  Zap, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react";

const Awareness = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const poultryVideos = [
    {
      title: t('poultryVideo1Title'),
      url: "https://www.youtube.com/embed/c38AAEPFQFU",
    },
    {
      title: t('poultryVideo2Title'),
      url: "https://www.youtube.com/embed/SaH0g0PAL8M",
    }
  ];

  const cattleVideos = [
    {
      title: t('cattleVideo1Title'),
      url: "https://www.youtube.com/embed/JEMHrEyDoGI",
    },
    {
      title: t('cattleVideo2Title'),
      url: "https://www.youtube.com/embed/jjGNt93JA-o",
    }
  ];

  const DiseaseCard = ({ 
    title, 
    symptoms, 
    treatment, 
    prevention 
  }: { 
    title: string; 
    symptoms: string; 
    treatment: string; 
    prevention: string;
  }) => (
    <Card className="mb-6 shadow-elegant hover:shadow-glow transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h4 className="font-semibold text-lg">{t('symptoms')}</h4>
          </div>
          <p className="text-muted-foreground ml-7">{symptoms}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Pill className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-lg">{t('treatment')}</h4>
          </div>
          <p className="text-muted-foreground ml-7">{treatment}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-lg">{t('prevention')}</h4>
          </div>
          <p className="text-muted-foreground ml-7">{prevention}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl animate-fade-in">
        <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">{t('awarenessTitle')}</h1>

        {/* Smart AI Detection Section */}
        <Card className="mb-12 border-none shadow-elegant bg-primary overflow-hidden text-white relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-emerald-900 opacity-90" />
          <CardContent className="relative z-10 p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-3 h-3" />
                  {t('poweredByAI')}
                </div>
                <h2 className="text-3xl font-bold">{t('smartDetectionTitle')}</h2>
                <p className="text-white/80 text-sm leading-relaxed max-w-md">
                  {t('smartDetectionDesc')}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                   <Button className="bg-white text-primary hover:bg-white/90 font-bold h-12 px-8 rounded-xl shadow-lg">
                      <Camera className="w-5 h-5 mr-2" />
                      {t('takePhoto')}
                   </Button>
                   <Button variant="outline" className="bg-transparent border-white/30 hover:bg-white/10 text-white font-bold h-12 px-8 rounded-xl">
                      <Upload className="w-5 h-5 mr-2" />
                      {t('uploadImage')}
                   </Button>
                </div>
              </div>

              {/* Mock AI Analysis Result (Hidden until upload) */}
              <div className="w-full md:w-[350px] bg-white rounded-3xl p-6 shadow-2xl text-slate-900 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('analysisResultLabel')}</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                       <CheckCircle2 className="w-3 h-3" />
                       98.2% {t('confidenceLabel')}
                    </span>
                 </div>
                 <div className="space-y-4">
                    <div>
                       <h3 className="text-xl font-bold text-slate-900">{t('newcastleDisease')}</h3>
                       <p className="text-xs text-slate-500 mt-1">{t('detectedIn', { sector: 'Sector B', time: '2m' })}</p>
                    </div>
                    
                    <div className="h-px bg-slate-100" />
                    
                    <div className="space-y-3">
                       <h4 className="text-xs font-bold text-slate-900 uppercase">{t('immediateSteps')}</h4>
                       <ul className="space-y-2">
                          {[
                            t('isolateBirds'),
                            t('sanitizeCoop'),
                            t('consultVetVaccination')
                          ].map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                               <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                               {step}
                            </li>
                          ))}
                       </ul>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-11 rounded-xl shadow-elegant mt-2" onClick={() => navigate('/medical')}>
                       {t('consultNearbyVet')}
                       <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="poultry" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="poultry" className="text-lg">
              {t('poultryDiseases')}
            </TabsTrigger>
            <TabsTrigger value="cattle" className="text-lg">
              {t('cattleDiseases')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="poultry">
            <DiseaseCard
              title={t('newcastleDisease')}
              symptoms={t('newcastleSymptoms')}
              treatment={t('newcastleTreatment')}
              prevention={t('newcastlePrevention')}
            />
            
            <DiseaseCard
              title={t('fowlPox')}
              symptoms={t('fowlPoxSymptoms')}
              treatment={t('fowlPoxTreatment')}
              prevention={t('fowlPoxPrevention')}
            />
            
            <DiseaseCard
              title={t('coccidiosis')}
              symptoms={t('coccidiosisSymptoms')}
              treatment={t('coccidiosisTreatment')}
              prevention={t('coccidiosisPrevention')}
            />

            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-semibold">{t('poultryVideoTitle')}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {poultryVideos.map((video, index) => (
                  <Card key={index} className="overflow-hidden shadow-elegant">
                    <div className="aspect-video bg-black">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg">{video.title}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cattle">
            <DiseaseCard
              title={t('fmd')}
              symptoms={t('fmdSymptoms')}
              treatment={t('fmdTreatment')}
              prevention={t('fmdPrevention')}
            />
            
            <DiseaseCard
              title={t('mastitis')}
              symptoms={t('mastitisSymptoms')}
              treatment={t('mastitisTreatment')}
              prevention={t('mastitisPrevention')}
            />
            
            <DiseaseCard
              title={t('blackQuarter')}
              symptoms={t('blackQuarterSymptoms')}
              treatment={t('blackQuarterTreatment')}
              prevention={t('blackQuarterPrevention')}
            />

            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <Play className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-semibold">{t('cattleVideoTitle')}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {cattleVideos.map((video, index) => (
                  <Card key={index} className="overflow-hidden shadow-elegant">
                    <div className="aspect-video bg-black">
                      <iframe
                        src={video.url}
                        title={video.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg">{video.title}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Awareness;

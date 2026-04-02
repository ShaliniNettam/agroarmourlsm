import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, X, MessageSquare, Sparkles, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const toggleAssistant = () => setIsOpen(!isOpen);

  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    setAiResponse("");
    
    // Mock Listening
    setTimeout(() => {
      setTranscript("How is my poultry health today?");
      setIsListening(false);
      
      // Mock AI Thinking
      setTimeout(() => {
        setAiResponse("Based on recent sensor data and the AI detection from Sector B, your poultry health is stable, but I recommend checking the Newcastle vaccination schedule for the younger batch.");
      }, 1000);
    }, 2500);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Assistant Window */}
      {isOpen && (
        <div className="w-[350px] mb-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up">
          <div className="bg-primary p-6 text-white relative">
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleAssistant}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none">AgroArmor Voice</h3>
                <span className="text-[10px] text-white/70 uppercase font-bold tracking-widest">AI Assistant</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto">
            {transcript && (
              <div className="flex justify-end">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                  <p className="text-xs text-slate-800 font-medium">{transcript}</p>
                </div>
              </div>
            )}

            {isListening && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative bg-primary p-4 rounded-full text-white">
                    <Mic className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Listening...</p>
              </div>
            )}

            {aiResponse && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-primary/5 p-4 rounded-2xl rounded-tl-none border border-primary/10">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Volume2 className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase">AI Response</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            )}

            {!isListening && !transcript && !aiResponse && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-sm text-slate-500">Ask me anything about your farm health, marketplace prices, or tasks.</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <Button 
               className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-elegant"
               onClick={startListening}
               disabled={isListening}
            >
              {isListening ? "Listening..." : "Tap to Speak"}
              <Mic className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleAssistant}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-large relative group",
          isOpen ? "bg-slate-900 rotate-90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <>
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20 group-hover:opacity-40" />
            <Sparkles className="w-8 h-8 text-white" />
          </>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;

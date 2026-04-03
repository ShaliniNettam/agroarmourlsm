import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, X, MessageSquare, Sparkles, Volume2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types for Web Speech API ---
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(window.speechSynthesis);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const finalTranscript = event.results[i][0].transcript;
            setTranscript(finalTranscript);
            handleAiProcessing(finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            setTranscript(interimTranscript);
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error === 'not-allowed') {
          setError("Microphone access denied. Please enable it in your browser settings.");
        } else {
          setError("Speech recognition failed. Please try again.");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setError("Speech recognition is not supported in this browser.");
    }
  }, []);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTranscript("");
      setAiResponse("");
      setError(null);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setTranscript("");
        setAiResponse("");
        setError(null);
        recognitionRef.current.start();
      } catch (err) {
        console.error("Error starting recognition", err);
      }
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const generateSimpleResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("poultry") || lowerInput.includes("chicken") || lowerInput.includes("hen")) {
      return "Based on your latest records, your poultry batch in Sector B is showing stable growth. Remember to check the Newcastle vaccination schedule for the younger hatchlings today.";
    }
    if (lowerInput.includes("crop") || lowerInput.includes("wheat") || lowerInput.includes("rice")) {
      return "Soil moisture levels for your wheat fields are currently at 65%. I recommend skipping irrigation for the next 24 hours as light rain is expected.";
    }
    if (lowerInput.includes("weather") || lowerInput.includes("rain")) {
      return "The forecast shows mostly clear skies with a 20% chance of rain this evening. Temperatures will hover around 28 degrees Celsius.";
    }
    if (lowerInput.includes("price") || lowerInput.includes("market")) {
      return "Current market prices for organic tomatoes are up by 15% today. It might be a good time to list your harvest on the marketplace.";
    }
    if (lowerInput.includes("task") || lowerInput.includes("to do")) {
      return "You have 3 pending tasks: check water levels, update livestock inventory, and review fertilizer supply.";
    }
    if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      return "Hello! I am your AgroArmor AI assistant. How can I help you with your farm today?";
    }
    
    return "I heard you say: '" + input + "'. I'm currently learning more about your farm data to provide specific advice. Is there anything particular about your livestock or crops you want to know?";
  };

  const handleAiProcessing = (text: string) => {
    // Artificial delay to feel more natural
    setTimeout(() => {
      const response = generateSimpleResponse(text);
      setAiResponse(response);
      speakResponse(response);
    }, 800);
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      stopSpeaking();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      synthRef.current.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 font-sans">
      {/* Assistant Window */}
      {isOpen && (
        <div className="w-[350px] mb-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-slide-up flex flex-col">
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

          <div className="p-6 space-y-6 max-h-[400px] min-h-[200px] overflow-y-auto bg-slate-50/30">
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-[11px] font-medium leading-tight">{error}</p>
              </div>
            )}

            {!isListening && !transcript && !aiResponse && !error && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-primary/40" />
                </div>
                <p className="text-sm text-slate-500 px-4">Ask me anything about your farm health, marketplace prices, or tasks.</p>
              </div>
            )}

            {transcript && (
              <div className="flex justify-end animate-in fade-in slide-in-from-right-4">
                <div className="bg-primary p-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                  <p className="text-xs text-white font-medium leading-relaxed">{transcript}</p>
                </div>
              </div>
            )}

            {isListening && (
              <div className="flex flex-col items-center justify-center py-4 space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                  <div className="relative bg-primary p-4 rounded-full text-white shadow-lg">
                    <Mic className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] animate-pulse">Listening...</p>
              </div>
            )}

            {aiResponse && (
              <div className="flex justify-start animate-in fade-in slide-in-from-left-4">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-md max-w-[90%]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">AI Response</span>
                    </div>
                    <button onClick={stopSpeaking} className="text-slate-400 hover:text-slate-600 text-[10px] underline">Stop</button>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <Button 
               className={cn(
                 "flex-1 h-12 font-black uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all",
                 isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-primary hover:bg-primary/90 text-white"
               )}
               onClick={isListening ? () => recognitionRef.current?.stop() : startListening}
               disabled={!!error && !recognitionRef.current}
            >
              <Mic className="w-4 h-4 mr-2" />
              {isListening ? "Stop Listening" : "Tap to Speak"}
            </Button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleAssistant}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl relative group",
          isOpen ? "bg-slate-900 rotate-90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <>
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20 group-hover:opacity-40" />
            <Sparkles className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;

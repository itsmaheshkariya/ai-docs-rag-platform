'use client'

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send, Loader2, VolumeX, Volume2, AlertCircle, Settings, ChevronDown, ChevronUp, Maximize2, Minimize2, RefreshCw, Download, Upload, Moon, Sun, Eraser } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
// import AnimatedCardTitle from "./AnimatedCardTitle";

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  currentPrompt: any;
  coin: string;
  currentValue: any;
}

const ChatBot: React.FC<ChatBotProps> = ({ currentPrompt, coin, currentValue }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `As a professional Crypto trader and Mathematician and Trading psychologist, analyze and calculate past and current market data on multiple timeframes of ${coin} to provide insights on future trends. Analyze ${coin} market data till 2024 using advanced trading strategies and machine learning. Identify trends, support/resistance levels, and key patterns. Predict actionable insights: 'buy', 'sell', 'hold', etc., with risk management details and justification. Focus on detailed breakdown of trends, parameters, and model layers in a readable format.
                Use:
                Past and real-time OHLC data (${currentPrompt.candleStickData})
                CURRENT LIVE VALUE of: ${currentValue}
                Neural network with optimized training strategies (Leaky ReLU, dropout, L2 regularization, etc.).
                Predict next market movement with reasoning for decisions. Avoid external news or events.
                Readable format required, not JSON. Also Take care of advance strategies apart from basics. we need best wiining ratio's all time and make sure to define numbers and short messages only. SL TP and Possibility would be appriciated.
                Note answers hsould be one liners only and Use sarcastic, friendly responses (a fraind who dosent listen to anyone) roasted, funny and and honest responses use emojis and use normal dark language. you can use hindi with english mix. and no need to mention everytime it just a preidiction I know already.   
                What is your prediction for the next market movement?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRecognitionError, setSpeechRecognitionError] = useState<string | null>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: null as SpeechSynthesisVoice | null,
    rate: 1.1,
    pitch: 1.1,
    volume: 1,
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [elevenlabsVoices, setElevenlabsVoices] = useState<any[]>([]);
  const [selectedElevenLabsVoice, setSelectedElevenLabsVoice] = useState<string>("");
  const [isUsingElevenLabs, setIsUsingElevenLabs] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ name: string; messages: Message[] }[]>([]);
  const [currentChatName, setCurrentChatName] = useState("New Chat");
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
//   const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthesisRef.current = window.speechSynthesis;
      const updateVoices = () => {
        setAvailableVoices(synthesisRef.current?.getVoices() || []);
      };
      synthesisRef.current.onvoiceschanged = updateVoices;
      updateVoices();

      // Initialize AudioContext
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(audioCtx);
    }

    // Fetch ElevenLabs voices
    fetchElevenLabsVoices();

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (availableVoices.length > 0 && !voiceSettings.voice) {
      setVoiceSettings(prev => ({ ...prev, voice: availableVoices[197] }));
    }
  }, [availableVoices, voiceSettings.voice]);

  const fetchElevenLabsVoices = async () => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'Accept': 'application/json',
          'xi-api-key': 'sk_5df58b88acccf0265fe4107615931d34cfcf48fe29dc38d3'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ElevenLabs voices');
      }
      const data: any = await response.json();
      setElevenlabsVoices(data.voices);
      if (data.voices.length > 0) {
        setSelectedElevenLabsVoice(data.voices[0].voice_id);
      }
    } catch (error) {
      console.error('Error fetching ElevenLabs voices:', error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to fetch ElevenLabs voices. Please check your API key and try again.",
    //     variant: "destructive",
    //   });
    }
  };

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userInput }
    ]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/siri", {  // Call to your proximity API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-Vision-Free",
          messages: [
            ...messages,
            { role: "user", content: userInput },
          ],
          userInput,  // Send user input
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: any = await response.json();

      if (data?.botResponse) {
        const botResponse = data.botResponse;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: botResponse },
        ]);
        if (autoSpeak) {
          if (isUsingElevenLabs) {
            await speakWithElevenLabs(botResponse);
          } else {
            speakText(botResponse);
          }
        }
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      console.error("Error fetching bot response", error);
    //   toast({
    //     title: "Error",
    //     description: "Failed to get a response. Please try again.",
    //     variant: "destructive",
    //   });
    } finally {
      setIsLoading(false);
    }

  };

  const toggleVoiceRecognition = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setSpeechRecognitionError(null);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        setUserInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setSpeechRecognitionError(event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
    //   toast({
    //     title: "Error",
    //     description: "Speech recognition is not supported in your browser.",
    //     variant: "destructive",
    //   });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesisRef.current) {
      // Cancel any ongoing speech
      synthesisRef.current.cancel();

      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);

      if (voiceSettings.voice) {
        utterance.voice = voiceSettings.voice;
      }
      utterance.rate = voiceSettings.rate;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = voiceSettings.volume;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsSpeaking(false);
        // toast({
        //   title: "Text-to-Speech Error",
        //   description: "Failed to speak the response. Please try again.",
        //   variant: "destructive",
        // });
      };
      synthesisRef.current.speak(utterance);
    }
  };

  const speakWithElevenLabs = async (text: string) => {
    if (!audioContext) {
      console.error('AudioContext is not initialized');
      return;
    }

    setIsSpeaking(true);
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedElevenLabsVoice}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': 'sk_5df58b88acccf0265fe4107615931d34cfcf48fe29dc38d3',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }

      audioSourceRef.current = audioContext.createBufferSource();
      audioSourceRef.current.buffer = audioBuffer;
      audioSourceRef.current.connect(audioContext.destination);

      audioSourceRef.current.onended = () => {
        setIsSpeaking(false);
        setIsAudioPlaying(false);
        setAudioProgress(0);
      };

      audioSourceRef.current.start();
      setIsAudioPlaying(true);

      // Update progress
      const updateProgress = () => {
        if (audioSourceRef.current && audioContext.currentTime < audioSourceRef.current.buffer!.duration) {
          setAudioProgress((audioContext.currentTime / audioSourceRef.current.buffer!.duration) * 100);
          requestAnimationFrame(updateProgress);
        }
      };
      updateProgress();

    } catch (error) {
      console.error('Error generating speech with ElevenLabs:', error);
    //   toast({
    //     title: "Text-to-Speech Error",
    //     description: "Failed to generate speech with ElevenLabs. Please try again.",
    //     variant: "destructive",
    //   });
    } finally {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
    }
    setIsSpeaking(false);
    setIsAudioPlaying(false);
    setAudioProgress(0);
  };

  const handleVoiceSettingsChange = (setting: string, value: any) => {
    setVoiceSettings(prev => ({ ...prev, [setting]: value }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Apply dark mode to the entire app
    document.documentElement.classList.toggle('dark');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const exportChat = () => {
    setIsExporting(true);
    try {
      const chatData = JSON.stringify(messages);
      const blob = new Blob([chatData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentChatName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting chat:', error);
    //   toast({
    //     title: "Export Error",
    //     description: "Failed to export chat. Please try again.",
    //     variant: "destructive",
    //   });
    } finally {
      setIsExporting(false);
    }
  };

  const importChat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImporting(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedMessages = JSON.parse(e.target?.result as string);
          setMessages(importedMessages);
        //   toast({
        //     title: "Import Successful",
        //     description: "Chat history has been imported successfully.",
        //     variant: "default",
        //   });
        } catch (error) {
          console.error('Error importing chat:', error);
        //   toast({
        //     title: "Import Error",
        //     description: "Failed to import chat. Please check the file and try again.",
        //     variant: "destructive",
        //   });
        } finally {
          setIsImporting(false);
        }
      };
      reader.readAsText(file);
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep the system message
    setCurrentChatName("New Chat");
    // toast({
    //   title: "Chat Cleared",
    //   description: "The chat history has been cleared.",
    //   variant: "default",
    // });
  };

  const saveChatHistory = () => {
    const newChat = { name: currentChatName, messages: messages };
    setChatHistory(prev => [...prev, newChat]);
    setCurrentChatName("New Chat");
    setMessages([messages[0]]); // Keep the system message
    // toast({
    //   title: "Chat Saved",
    //   description: "The current chat has been saved to history.",
    //   variant: "default",
    // });
  };

  const loadChatFromHistory = (index: number) => {
    const selectedChat = chatHistory[index];
    setMessages(selectedChat.messages);
    setCurrentChatName(selectedChat.name);
  };

  return (
    <Card className={`w-full mx-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-xl transition-all duration-300 ease-in-out`}>
      <CardHeader className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-t-lg flex justify-between items-center`}>
        {/* <CardTitle className="text-2xl font-bold">AI Crypto Assistant</CardTitle> */}
        {/* <AnimatedCardTitle message="Trade GPT" /> */}
        {/* <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={toggleFullScreen}>
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div> */}
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <Tabs defaultValue="voice">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="voice">Voice Settings</TabsTrigger>
                <TabsTrigger value="chat">Chat Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="voice">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>TTS Provider</Label>
                    <Select
                      value={isUsingElevenLabs ? "elevenlabs" : "browser"}
                      onValueChange={(value) => setIsUsingElevenLabs(value === "elevenlabs")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select TTS Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="browser">Browser TTS</SelectItem>
                        <SelectItem value="elevenlabs">ElevenLabs TTS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {isUsingElevenLabs ? (
                    <div className="space-y-2">
                      <Label>ElevenLabs Voice</Label>
                      <Select
                        value={selectedElevenLabsVoice}
                        onValueChange={setSelectedElevenLabsVoice}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ElevenLabs Voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {elevenlabsVoices.map((voice) => (
                            <SelectItem key={voice.voice_id} value={voice.voice_id}>
                              {voice.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label>Browser Voice</Label>
                        <Select
                          value={voiceSettings.voice?.name || ''}
                          onValueChange={(value) => handleVoiceSettingsChange('voice', availableVoices.find(v => v.name === value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a voice" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableVoices.map((voice) => (
                              <SelectItem key={voice.name} value={voice.name}>
                                {voice.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Rate</Label>
                        <Slider
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSettings.rate]}
                          onValueChange={([value]) => handleVoiceSettingsChange('rate', value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Pitch</Label>
                        <Slider
                          min={0.5}
                          max={2}
                          step={0.1}
                          value={[voiceSettings.pitch]}
                          onValueChange={([value]) => handleVoiceSettingsChange('pitch', value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Volume</Label>
                        <Slider
                          min={0}
                          max={1}
                          step={0.1}
                          value={[voiceSettings.volume]}
                          onValueChange={([value]) => handleVoiceSettingsChange('volume', value)}
                        />
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-speak"
                      checked={autoSpeak}
                      onCheckedChange={setAutoSpeak}
                    />
                    <Label htmlFor="auto-speak">Auto-speak responses</Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Chat Name</Label>
                    <Input
                      value={currentChatName}
                      onChange={(e) => setCurrentChatName(e.target.value)}
                      placeholder="Enter chat name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Saved Chats</Label>
                    <Select onValueChange={(value) => loadChatFromHistory(parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a saved chat" />
                      </SelectTrigger>
                      <SelectContent>
                        {chatHistory.map((chat, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {chat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between">
                    <Button onClick={saveChatHistory}>Save Current Chat</Button>
                    <Button onClick={clearChat} variant="destructive">Clear Chat</Button>
                  </div>
                  <div className="flex justify-between">
                    <Button onClick={exportChat} disabled={isExporting}>
                      {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                      Export Chat
                    </Button>
                    <Label htmlFor="import-chat" className="cursor-pointer">
                      <Input
                        id="import-chat"
                        type="file"
                        className="hidden"
                        onChange={importChat}
                        accept=".json"
                      />
                      <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        Import Chat
                      </div>
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover> */}
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col h-[78vh]">
          <ScrollArea className="flex-1 p-4" ref={chatContainerRef}>
            <AnimatePresence>
              {messages.map((message, index) => (
                message.role !== 'system' && (
                  <motion.div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className={`flex items-start max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <Avatar className={`w-8 h-8 ${message.role === "user" ? "ml-2" : "mr-2"}`}>
                        <AvatarFallback>{message.role === "user" ? "U" : "A"}</AvatarFallback>
                        <AvatarImage src={message.role === "user" ? "/user-avatar.png" : "/ai-avatar.png"} />
                      </Avatar>
                      <div
                        className={`px-4 py-2 rounded-lg ${message.role === "user"
                          ? isDarkMode ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-900"
                          : isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-900"
                          }`}
                      >
                        {/* {message.content} */}
                        {parseMessage(message.content)}
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                className="flex justify-center items-center"  // Center loading spinner
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }} // Smooth fade-in/fade-out
              >
                <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-800 text-gray-300 flex justify-center items-center">
                  <Loader2 className="w-6 h-6 animate-spin" /> {/* Increased size for better visibility */}
                </div>
              </motion.div>
            )}
          </ScrollArea>

          {speechRecognitionError && (
            <Alert variant="destructive" className="m-4">
              <AlertCircle className="h-4 w-4" />
              {/* <AlertTitle>Speech Recognition Error</AlertTitle> */}
              <AlertDescription>
                {/* {speechRecognitionError}.  */}
                Speech Recognition Error Please use text input.
              </AlertDescription>
            </Alert>
          )}

          {isAudioPlaying && (
            <div className="px-4 py-2">
              <Progress value={audioProgress} className="w-full" />
            </div>
          )}

          {/* <div className={`p-4 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-300'} rounded-b-lg`}>
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleVoiceRecognition}
                className={`${isListening ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  } text-white p-2 rounded-full`}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type or speak..."
                className={`flex-1 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || userInput.trim() === ""}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </Button>
              <Button
                onClick={isSpeaking ? stopSpeaking : () => { }}
                className={`${isSpeaking ? "bg-red-600 hover:bg-red-700" : "bg-gray-600"
                  } text-white p-2 rounded-full`}
                aria-label={isSpeaking ? "Stop speaking" : "Not speaking"}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>
          </div> */}
          <div className={`p-4 ${isDarkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-300'} rounded-b-lg`}>
            <div className="flex items-center gap-4">
              {/* Voice Recognition Button */}
              <Button
                onClick={toggleVoiceRecognition}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-3 rounded-md shadow-md transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>

              {/* Input Field */}
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type or speak..."
                className={`flex-1 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-3 rounded-md shadow-md transition-all duration-200`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                aria-label="Message input field"
              />

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={isLoading || userInput.trim() === ''}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-md transition-all duration-200 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-6 h-6" />
              </Button>

              {/* Speech Button */}
              <Button
                onClick={isSpeaking ? stopSpeaking : () => { }}
                className={`${isSpeaking ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white p-3 rounded-md shadow-md transition-all duration-200`}
                aria-label={isSpeaking ? 'Stop speaking' : 'Not speaking'}
              >
                {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};
export function parseMessage(content: string): React.ReactNode {
  // Define the mapping of basic emojis to more fancy emojis
  const fancyEmojiReplacements: { [key: string]: string } = {
    '🤣': '😂', // Replace the laughing emoji with a fancier one
    '😏': '😎', // Replace the smirking emoji with a cool sunglasses emoji
    '💸': '💰', // Use money bag instead of money flying
    '⚠️': '🚨', // Use alert emoji instead of warning
  };

  // Apply fancy emojis replacements
  let parsedContent = content;
  Object.entries(fancyEmojiReplacements).forEach(([oldEmoji, newEmoji]) => {
    parsedContent = parsedContent.replace(new RegExp(oldEmoji, 'g'), newEmoji);
  });

  // Split the content based on bold text and handle formatting
  const parts = parsedContent.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    // Colorize 'Sell', 'Buy', and 'Hold' with respective colors
    if (part === 'Sell') {
      return (
        <span key={index} style={{ color: 'red', fontWeight: 'bold' }}>
          {part}
        </span>
      );
    }
    if (part === 'Buy') {
      return (
        <span key={index} style={{ color: 'green', fontWeight: 'bold' }}>
          {part}
        </span>
      );
    }
    if (part === 'Hold') {
      return (
        <span key={index} style={{ color: 'orange', fontWeight: 'bold' }}>
          {part}
        </span>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    // Handle list items
    if (part.includes('- ')) {
      const listItems = part.split('- ').filter(item => item.trim() !== '');
      return (
        <ul key={index} className="list-disc pl-5 space-y-1">
          {listItems.map((item, itemIndex) => (
            <li key={itemIndex}>{item.trim()}</li>
          ))}
        </ul>
      );
    }

    return part;
  });
}



export default ChatBot;


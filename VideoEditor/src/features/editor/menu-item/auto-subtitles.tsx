import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

import { CheckCircle } from 'lucide-react';
import { 
  Play, 
  Pause, 
  Download, 
  Settings, 
  Wand2, 
  Clock, 
  Languages,
  Volume2,
  FileText,
  Sparkles,
  Check,
  X,
  Upload
} from 'lucide-react';

interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
  confidence: number;
}

export const AutoSubtitles = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'idle' | 'analyzing' | 'transcribing' | 'optimizing' | 'complete'>('idle');
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [accuracy, setAccuracy] = useState(0);

  // Mock subtitles data - more realistic gaming content
  const mockSubtitles: Subtitle[] = [
    { id: '1', start: 0.5, end: 3.2, text: "Yo what's up gamers! Welcome back to the channel!", confidence: 0.98 },
    { id: '2', start: 3.5, end: 6.8, text: "Today we're jumping into some insane ranked gameplay", confidence: 0.96 },
    { id: '3', start: 7.1, end: 10.4, text: "I've been practicing this strategy all week", confidence: 0.94 },
    { id: '4', start: 10.7, end: 14.2, text: "Alright, enemy team is pushing mid - let's rotate", confidence: 0.97 },
    { id: '5', start: 14.5, end: 17.8, text: "OH MY GOD! Did you see that headshot?!", confidence: 0.99 },
    { id: '6', start: 18.1, end: 21.4, text: "That's what I'm talking about! Clip that!", confidence: 0.95 },
    { id: '7', start: 21.7, end: 25.2, text: "If you enjoyed this make sure to smash that like button", confidence: 0.93 },
    { id: '8', start: 25.5, end: 28.8, text: "And subscribe for more epic gaming content", confidence: 0.91 },
  ];

  const startGeneration = async () => {
    setIsProcessing(true);
    setStage('analyzing');
    setProgress(0);
    setAccuracy(0);

    // Realistic AI processing stages
    const stages = [
      { name: 'analyzing', duration: 3000, progressEnd: 20, desc: 'Analyzing audio patterns...' },
      { name: 'transcribing', duration: 5000, progressEnd: 70, desc: 'Transcribing speech to text...' },
      { name: 'optimizing', duration: 2000, progressEnd: 90, desc: 'Optimizing timing and accuracy...' },
      { name: 'complete', duration: 1000, progressEnd: 100, desc: 'Finalizing subtitles...' }
    ];

    for (let i = 0; i < stages.length; i++) {
      const stageInfo = stages[i];
      setStage(stageInfo.name as any);
      
      const startProgress = i === 0 ? 0 : stages[i-1].progressEnd;
      const targetProgress = stageInfo.progressEnd;
      const duration = stageInfo.duration;
      const steps = 60;
      const stepDuration = duration / steps;
      const progressStep = (targetProgress - startProgress) / steps;

      for (let j = 0; j < steps; j++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        setProgress(prev => Math.min(prev + progressStep, targetProgress));
        
        // Update accuracy gradually
        if (stageInfo.name === 'transcribing') {
          setAccuracy(prev => Math.min(prev + (95 / steps), 95));
        } else if (stageInfo.name === 'optimizing') {
          setAccuracy(prev => Math.min(prev + (3 / steps), 98));
        }
      }
    }

    // Show results
    setSubtitles(mockSubtitles);
    setIsProcessing(false);
    setAccuracy(97.8);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };

  const exportSubtitles = (format: 'srt' | 'vtt') => {
    if (subtitles.length === 0) return;

    let content = '';
    if (format === 'srt') {
      content = subtitles.map((sub, index) => {
        const start = formatTime(sub.start).replace('.', ',');
        const end = formatTime(sub.end).replace('.', ',');
        return `${index + 1}\n${start} --> ${end}\n${sub.text}\n`;
      }).join('\n');
    } else {
      content = 'WEBVTT\n\n' + subtitles.map(sub => {
        const start = formatTime(sub.start);
        const end = formatTime(sub.end);
        return `${start} --> ${end}\n${sub.text}\n`;
      }).join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subtitles.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full w-full flex bg-background">
      {/* Left Panel - Controls */}
      <div className="w-80 border-r border-border/20 bg-background/50 p-6 space-y-6 flex-shrink-0">
        {/* Video Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Upload className="w-4 h-4" />
            <span>Current Video</span>
          </div>
          <div className="p-3 bg-background/50 rounded-lg border border-border/30">
            <div className="font-medium text-sm">Untitled video</div>
            <div className="text-xs text-muted-foreground">Duration: 0:08</div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Language
          </label>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-3 rounded-lg bg-background border border-border/50 text-sm"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="ja-JP">Japanese</option>
            <option value="ko-KR">Korean</option>
            <option value="zh-CN">Chinese (Simplified)</option>
          </select>
        </div>

        {/* AI Model Settings */}
        <div className="space-y-3">
          <label className="text-sm font-medium flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            AI Model
          </label>
          <select className="w-full p-3 rounded-lg bg-background border border-border/50 text-sm">
            <option value="gaming-pro">Gaming Pro (Best for Gaming)</option>
            <option value="whisper-large">Whisper Large (Highest Accuracy)</option>
            <option value="fast-transcribe">Fast Transcribe (Quick Results)</option>
          </select>
        </div>

        {/* Processing Controls */}
        <div className="space-y-4 pt-4 border-t border-border/20">
          {!isProcessing && subtitles.length === 0 && (
            <Button 
              onClick={startGeneration}
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] hover:to-[#26C6DA] text-white font-semibold py-3"
              size="lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate AI Subtitles
            </Button>
          )}

          {isProcessing && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] text-sm font-medium">
                  <div className="w-3 h-3 bg-[#4ECDC4] rounded-full animate-pulse"></div>
                  {stage === 'analyzing' && 'Analyzing Audio...'}
                  {stage === 'transcribing' && 'Transcribing Speech...'}
                  {stage === 'optimizing' && 'Optimizing Results...'}
                  {stage === 'complete' && 'Finalizing...'}
                </div>
              </div>
              <Progress value={progress} className="w-full h-3" />
              <div className="text-center text-sm text-muted-foreground">
                {progress.toFixed(0)}% Complete
                {accuracy > 0 && (
                  <span className="ml-2">• Accuracy: {accuracy.toFixed(1)}%</span>
                )}
              </div>
            </div>
          )}

          {subtitles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Subtitles Generated!</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={() => exportSubtitles('srt')}
                  variant="outline" 
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export as SRT
                </Button>
                <Button 
                  onClick={() => exportSubtitles('vtt')}
                  variant="outline" 
                  className="w-full"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export as VTT
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full text-[#FF6B6B] border-[#FF6B6B]/30 hover:bg-[#FF6B6B]/10"
                onClick={() => {
                  setSubtitles([]);
                  setProgress(0);
                  setStage('idle');
                  setAccuracy(0);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        {subtitles.length > 0 && (
          <div className="pt-4 border-t border-border/20 space-y-3">
            <div className="text-sm font-medium">Statistics</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <div className="text-xl font-bold text-[#4ECDC4]">{subtitles.length}</div>
                <div className="text-xs text-muted-foreground">Segments</div>
              </div>
              <div className="text-center p-3 bg-background/50 rounded-lg">
                <div className="text-xl font-bold text-[#FF6B6B]">{accuracy.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>
            <div className="text-center p-3 bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10 rounded-lg border border-[#FF6B6B]/20">
              <div className="text-sm font-medium text-foreground">Ready for Export!</div>
              <div className="text-xs text-muted-foreground">Professional quality subtitles</div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Subtitles Preview */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Subtitles Header */}
        <div className="p-4 border-b border-border/20 bg-background/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Generated Subtitles
              {subtitles.length > 0 && (
                <Badge variant="secondary" className="ml-2">{subtitles.length} segments</Badge>
              )}
            </h4>
            {subtitles.length > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-green-500 border-green-500/30">
                  ✓ Ready
                </Badge>
                <Button variant="ghost" size="sm">
                  <Play className="w-4 h-4 mr-1" />
                  Preview
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Subtitles List */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {subtitles.length === 0 && !isProcessing && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-lg mb-2">No Subtitles Generated Yet</h4>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                Click "Generate AI Subtitles" to automatically create professional subtitles for your gaming video using advanced AI speech recognition
              </p>
            </div>
          )}

          {subtitles.map((subtitle, index) => (
            <div 
              key={subtitle.id}
              className="group p-4 rounded-xl border border-border/20 bg-background/50 hover:bg-background/80 hover:border-[#4ECDC4]/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      #{String(index + 1).padStart(2, '0')}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {formatTime(subtitle.start)} → {formatTime(subtitle.end)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {((subtitle.end - subtitle.start)).toFixed(1)}s
                    </span>
                  </div>
                  <div className="text-sm leading-relaxed text-foreground font-medium">
                    {subtitle.text}
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 text-xs">
                      <div className={`w-2 h-2 rounded-full ${
                        subtitle.confidence > 0.95 ? 'bg-green-500' :
                        subtitle.confidence > 0.9 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-muted-foreground">
                        {(subtitle.confidence * 100).toFixed(1)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
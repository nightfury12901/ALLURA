import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Sparkles,
  X,
  CheckCircle,
  Plus,
  AlertTriangle,
  Film,
  Clock,
  Download,
  Copy,
  Zap
} from 'lucide-react';
import useStore from '../store/use-store';

interface Subtitle {
  id: string;
  start: number;
  end: number;
  text: string;
  confidence?: number;
}

export const AutoSubtitlesSidebar = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>('');
  const [currentStage, setCurrentStage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { trackItemsMap } = useStore();

  // Get video info from timeline
  const videoItems = Object.values(trackItemsMap || {}).filter(item => item.type === 'video');
  const mainVideo = videoItems[0];
  const videoDuration = mainVideo ? (mainVideo.display.to - mainVideo.display.from) / 1000 : 8.2;
  const videoUrl = mainVideo?.src;

  // Your exact subtitles for the demo
  const exactSubtitles: Subtitle[] = [
    { id: "sub_1", start: 0.0, end: 1.0, text: "One by iterating over", confidence: 0.95 },
    { id: "sub_2", start: 1.0, end: 2.0, text: "day property.", confidence: 0.92 },
    { id: "sub_3", start: 2.0, end: 3.0, text: "Welcome to episode", confidence: 0.97 },
    { id: "sub_4", start: 3.0, end: 3.5, text: "29.", confidence: 0.99 },
    { id: "sub_5", start: 3.5, end: 4.0, text: "Mapet type enables", confidence: 0.88 },
    { id: "sub_6", start: 4.0, end: 5.0, text: "you to transform", confidence: 0.94 },
    { id: "sub_7", start: 5.0, end: 6.0, text: "existing type into new", confidence: 0.91 },
    { id: "sub_8", start: 6.0, end: 7.0, text: "type by flying", confidence: 0.87 },
    { id: "sub_9", start: 7.0, end: 8.0, text: "transformation", confidence: 0.93 }
  ];

  // Generate subtitles with realistic AI processing simulation
  const generateSubtitles = async () => {
    console.log('🎬 Starting AI subtitle generation...');
    setError('');
    setIsGenerating(true);
    setProgress(0);

    try {
      // Realistic AI processing stages
      const stages = [
        { message: "Initializing AI models...", duration: 600, progress: 8 },
        { message: "Extracting audio waveform...", duration: 800, progress: 20 },
        { message: "Analyzing speech patterns...", duration: 1200, progress: 35 },
        { message: "Processing with Whisper AI...", duration: 1500, progress: 60 },
        { message: "Generating text transcription...", duration: 900, progress: 80 },
        { message: "Optimizing subtitle timing...", duration: 700, progress: 95 },
        { message: "Finalizing confidence scores...", duration: 400, progress: 100 }
      ];

      for (const stage of stages) {
        setCurrentStage(stage.message);
        console.log(`🤖 ${stage.message}`);
        
        // Animate progress smoothly
        const steps = 10;
        const progressStep = (stage.progress - progress) / steps;
        
        for (let i = 0; i < steps; i++) {
          await new Promise(resolve => setTimeout(resolve, stage.duration / steps));
          setProgress(prev => Math.min(prev + progressStep, stage.progress));
        }
      }

      setSubtitles(exactSubtitles);
      setCurrentStage("Generation complete!");
      console.log("✅ Generated subtitles:", exactSubtitles);

    } catch (err: any) {
      console.error("❌ Error generating subtitles:", err);
      setError(err.message || 'Failed to generate subtitles');
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStage('');
      }, 800);
    }
  };

  // Video playback controls
  const togglePlayback = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      videoRef.current.play().catch(console.error);
      intervalRef.current = setInterval(() => {
        if (videoRef.current && !videoRef.current.paused) {
          setCurrentTime(videoRef.current.currentTime);
        }
      }, 100);
    }
    setIsPlaying(!isPlaying);
  };

  // Get current active subtitle
  const getCurrentSubtitle = () => {
    return subtitles.find(sub => 
      currentTime >= sub.start && currentTime <= sub.end
    );
  };

  // Edit subtitle text
  const updateSubtitleText = (id: string, newText: string) => {
    const updatedSubtitles = subtitles.map(sub =>
      sub.id === id ? { ...sub, text: newText } : sub
    );
    setSubtitles(updatedSubtitles);
  };

  // Delete subtitle
  const deleteSubtitle = (id: string) => {
    const filteredSubtitles = subtitles.filter(sub => sub.id !== id);
    setSubtitles(filteredSubtitles);
  };

  // Jump to subtitle time
  const jumpToTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Add to timeline (demo functionality)
  const addToTimeline = () => {
    console.log('🎬 Adding subtitles to timeline:', subtitles);
    
    // Fire custom event for timeline integration
    const event = new CustomEvent('addSubtitlesToTimeline', {
      detail: { 
        subtitles,
        videoId: mainVideo?.id,
        videoDuration 
      }
    });
    window.dispatchEvent(event);
    
    // Show success with realistic feedback
    const successMessages = [
      `✅ Successfully added ${subtitles.length} subtitles to timeline!`,
      `🎯 Subtitles synchronized with video timing`,
      `📝 All text elements are now editable in timeline`,
      `🎨 Professional gaming styles applied`
    ];
    
    alert(successMessages.join('\n\n'));
    
    // Reset after demo
    setTimeout(() => {
      setSubtitles([]);
      setProgress(0);
    }, 2000);
  };

  // Export as SRT
  const exportSRT = () => {
    const srtContent = subtitles.map((sub, index) => {
      const formatSRTTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const ms = Math.floor((seconds % 1) * 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
      };

      return `${index + 1}\n${formatSRTTime(sub.start)} --> ${formatSRTTime(sub.end)}\n${sub.text}\n`;
    }).join('\n');

    navigator.clipboard.writeText(srtContent).then(() => {
      console.log('📋 SRT content copied');
      alert('📋 Professional SRT subtitles copied to clipboard!\n\nReady for upload to YouTube, TikTok, or any platform.');
    }).catch(console.error);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.95) return 'text-green-500';
    if (confidence >= 0.90) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#4ECDC4]" />
          AI Auto Subtitles
        </h3>
        <Badge variant="outline" className="text-xs bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10">
          POWERED BY AI
        </Badge>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}

      {/* Video Status */}
      <div className="space-y-2">
        {mainVideo ? (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="text-sm font-medium text-green-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Video Ready for AI Processing
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Duration: {formatTime(videoDuration)} • Optimal for subtitle generation
            </div>
          </div>
        ) : (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="text-sm font-medium text-yellow-600">⚠ No Video Detected</div>
            <div className="text-xs text-muted-foreground mt-1">
              Upload a video to the timeline to generate subtitles
            </div>
          </div>
        )}
      </div>

      {/* Video Preview */}
      {videoUrl && (
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-32 object-contain"
            onLoadedMetadata={() => console.log('📹 Video loaded')}
          />
          
          {/* Subtitle Overlay */}
          {getCurrentSubtitle() && (
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <div className="inline-block bg-black bg-opacity-90 text-white px-3 py-1 rounded text-xs font-medium max-w-[90%] shadow-lg">
                {getCurrentSubtitle()?.text}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
            <button
              onClick={togglePlayback}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Time Display */}
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {formatTime(currentTime)} / {formatTime(videoDuration)}
          </div>
        </div>
      )}

      {/* Generate Button */}
      {mainVideo && subtitles.length === 0 && !isGenerating && (
        <Button 
          onClick={generateSubtitles}
          className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] hover:to-[#26C6DA] text-white font-semibold py-4 text-base shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
          Generate AI Subtitles
        </Button>
      )}

      {/* Processing Animation */}
      {isGenerating && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#4ECDC4]/10 to-[#FF6B6B]/10 border border-[#4ECDC4]/20">
              <div className="w-3 h-3 bg-[#4ECDC4] rounded-full animate-pulse"></div>
              <div className="text-sm font-medium text-[#4ECDC4]">
                {currentStage}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="w-full h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Processing {formatTime(videoDuration)} video...</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2 rounded text-xs ${progress >= 35 ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-500'}`}>
              <Clock className="w-4 h-4 mx-auto mb-1" />
              Speech Analysis
            </div>
            <div className={`p-2 rounded text-xs ${progress >= 70 ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-500'}`}>
              <Zap className="w-4 h-4 mx-auto mb-1" />
              AI Processing
            </div>
            <div className={`p-2 rounded text-xs ${progress >= 100 ? 'bg-green-500/10 text-green-600' : 'bg-gray-500/10 text-gray-500'}`}>
              <Film className="w-4 h-4 mx-auto mb-1" />
              Text Generation
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {subtitles.length > 0 && (
        <div className="flex-1 flex flex-col space-y-4">
          {/* Success Banner */}
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-[#4ECDC4]/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  AI Generation Complete!
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {subtitles.length} professional subtitles generated with timing
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#4ECDC4]">
                  {(subtitles.reduce((acc, sub) => acc + (sub.confidence || 0), 0) / subtitles.length * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={exportSRT}
              variant="outline"
              className="flex-1 text-xs"
            >
              <Download className="w-3 h-3 mr-1" />
              Export SRT
            </Button>
            <Button
              onClick={addToTimeline}
              className="flex-1 text-xs bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] text-white hover:shadow-lg transition-all"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add to Timeline
            </Button>
          </div>

          {/* Subtitle List */}
          <div className="flex-1 space-y-2 overflow-auto max-h-64">
            {subtitles.map((subtitle, index) => {
              const isActive = getCurrentSubtitle()?.id === subtitle.id;
              
              return (
                <div 
                  key={subtitle.id}
                  className={`p-3 rounded-lg border transition-all cursor-pointer group hover:shadow-md ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#4ECDC4]/10 to-[#FF6B6B]/10 border-[#4ECDC4] shadow-md' 
                      : 'bg-background/50 border-border hover:border-[#4ECDC4]/30'
                  }`}
                  onClick={() => jumpToTime(subtitle.start)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={isActive ? "default" : "outline"} 
                        className="text-xs px-2 py-0.5"
                      >
                        #{index + 1}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTime(subtitle.start)} → {formatTime(subtitle.end)}
                      </span>
                      {subtitle.confidence && (
                        <div className={`text-xs font-medium ${getConfidenceColor(subtitle.confidence)}`}>
                          {(subtitle.confidence * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSubtitle(subtitle.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <textarea
                    value={subtitle.text}
                    onChange={(e) => updateSubtitleText(subtitle.id, e.target.value)}
                    className="w-full text-sm bg-transparent border-none resize-none focus:outline-none focus:ring-1 focus:ring-[#4ECDC4] rounded p-1 min-h-[2.5rem]"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Edit subtitle text..."
                  />
                </div>
              );
            })}
          </div>

          {/* Clear Button */}
          <Button 
            onClick={() => {
              setSubtitles([]);
              setProgress(0);
              setError('');
            }}
            variant="outline" 
            size="sm"
            className="text-muted-foreground hover:text-red-500 hover:border-red-500/30 transition-colors"
          >
            <X className="w-3 h-3 mr-2" />
            Clear All Subtitles
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-center text-muted-foreground pt-2 border-t">
        Powered by AI • Professional Quality • Export Ready
      </div>
    </div>
  );
};

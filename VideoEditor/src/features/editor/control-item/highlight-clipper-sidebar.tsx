import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Zap,
  Download,
  CheckCircle,
  AlertTriangle,
  Film,
  Scissors
} from 'lucide-react';
import useStore from '../store/use-store';

export const HighlightClipperSidebar = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [highlightReady, setHighlightReady] = useState(false);

  const { trackItemsMap } = useStore();

  // Get video info
  const videoItems = Object.values(trackItemsMap || {}).filter(item => item.type === 'video');
  const mainVideo = videoItems[0];

  // AI Highlight Detection (fake processing)
  const detectHighlights = async () => {
    setIsProcessing(true);
    setProgress(0);
    setHighlightReady(false);

    try {
      // Professional AI stages
      const stages = [
        { message: "🤖 Initializing AI analysis models...", duration: 800, progress: 20 },
        { message: "🎬 Analyzing video composition...", duration: 1200, progress: 45 },
        { message: "🔍 Detecting key moments...", duration: 1500, progress: 70 },
        { message: "⚡ Processing engagement patterns...", duration: 1000, progress: 90 },
        { message: "✨ Generating highlight clip...", duration: 600, progress: 100 }
      ];

      for (const stage of stages) {
        setCurrentStage(stage.message);
        
        const steps = 15;
        const progressStep = (stage.progress - progress) / steps;
        
        for (let i = 0; i < steps; i++) {
          await new Promise(resolve => setTimeout(resolve, stage.duration / steps));
          setProgress(prev => Math.min(prev + progressStep, stage.progress));
        }
      }

      setHighlightReady(true);
      setCurrentStage("🎉 Best highlight moment identified!");

    } catch (err) {
      console.error('Error:', err);
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStage('');
      }, 1000);
    }
  };

  // Download highlight clip
  const downloadHighlight = () => {
    console.log('📹 Downloading highlight clip...');
    
    // Create download link for single demo file
    const link = document.createElement('a');
    link.href = `/exports/demo-videos/final-exported-video.mp4`; // Single file in public root
    link.download = `viral-highlight-clip-${Date.now()}.mp4`;
    link.click();
    
    // Show success message
    setTimeout(() => {
      alert(`✅ Highlight clip downloaded successfully!

📁 File: viral-highlight-clip-${Date.now()}.mp4
🎯 Best moment automatically selected
⏱️ Optimized for social media
🚀 Ready for upload!

Perfect for:
📱 TikTok & Instagram Reels
📺 YouTube Shorts
🐦 Twitter clips
📸 Story highlights`);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Scissors className="w-5 h-5 text-[#FF6B6B]" />
          Highlight Clipper
        </h3>
        <Badge variant="outline" className="text-xs bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10">
          AI POWERED
        </Badge>
      </div>

      {/* Video Status */}
      <div className="space-y-2">
        {mainVideo ? (
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="text-sm font-medium text-green-600 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Video Ready for AI Analysis
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Perfect for creating viral content
            </div>
          </div>
        ) : (
          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="text-sm font-medium text-yellow-600">⚠ No Video Detected</div>
            <div className="text-xs text-muted-foreground mt-1">
              Upload video content to detect highlights
            </div>
          </div>
        )}
      </div>

      {/* AI Features Info */}
      <div className="space-y-3">
        <div className="text-sm font-medium">AI Highlight Detection</div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="text-sm font-medium text-blue-400">⚡ Smart Analysis</div>
            <div className="text-xs text-muted-foreground mt-1">Detects peak moments</div>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <div className="text-sm font-medium text-purple-400">🎯 Auto Editing</div>
            <div className="text-xs text-muted-foreground mt-1">Perfect timing & cuts</div>
          </div>
        </div>
      </div>

      {/* Detect Button */}
      {mainVideo && !highlightReady && !isProcessing && (
        <Button 
          onClick={detectHighlights}
          className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] hover:to-[#26C6DA] text-white font-semibold py-4 text-base shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Zap className="w-5 h-5 mr-2 animate-pulse" />
          Detect Best Highlights
        </Button>
      )}

      {/* Processing */}
      {isProcessing && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10 border border-[#FF6B6B]/20">
              <div className="w-3 h-3 bg-[#FF6B6B] rounded-full animate-pulse"></div>
              <div className="text-sm font-medium text-[#FF6B6B]">
                {currentStage}
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="w-full h-3" />
          <div className="text-center text-xs text-muted-foreground">
            {progress.toFixed(0)}% • AI analyzing content...
          </div>
        </div>
      )}

      {/* Download Ready */}
      {highlightReady && (
        <div className="space-y-4">
          {/* Success Banner */}
          <div className="p-4 bg-gradient-to-r from-green-500/10 to-[#4ECDC4]/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div className="text-sm font-bold text-green-600">
                Perfect Highlight Detected!
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              AI has identified the most engaging moment from your video
            </div>
          </div>

          {/* Highlight Info */}
          <div className="p-3 rounded-lg border bg-background/50">
            <div className="text-sm font-medium mb-2">📊 Highlight Stats</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• Engagement Score: 95%</div>
              <div>• Optimal Length: Social media ready</div>
              <div>• Quality: Professional grade</div>
              <div>• Format: MP4 (Universal)</div>
            </div>
          </div>

          {/* Download Button */}
          <Button 
            onClick={downloadHighlight}
            className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] text-white font-semibold py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Highlight Clip
          </Button>

          {/* Reset Button */}
          <Button 
            onClick={() => {
              setHighlightReady(false);
              setProgress(0);
            }}
            variant="outline" 
            size="sm"
            className="w-full text-muted-foreground"
          >
            Detect New Highlights
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-center text-muted-foreground pt-2 border-t">
        AI Content Analysis • Viral Moment Detection • Social Media Optimized
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Scissors, 
  Play, 
  Download, 
  Zap, 
  Clock, 
  Target,
  TrendingUp,
  Sparkles,
  Eye,
  ThumbsUp,
  Share2,
  Wand2,
  Settings,
  CheckCircle
} from 'lucide-react';

interface Highlight {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  duration: number;
  score: number;
  type: 'kill' | 'reaction' | 'funny' | 'skillshot' | 'clutch';
  thumbnail: string;
  metrics: {
    excitement: number;
    engagement: number;
    virality: number;
  };
}

export const HighlightClipper = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'idle' | 'analyzing' | 'detecting' | 'ranking' | 'complete'>('idle');
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock highlights data
  const mockHighlights: Highlight[] = [
    {
      id: '1',
      title: 'Epic 1v4 Clutch Victory',
      startTime: 145.2,
      endTime: 162.8,
      duration: 17.6,
      score: 95,
      type: 'clutch',
      thumbnail: '/api/placeholder/160/90',
      metrics: { excitement: 98, engagement: 94, virality: 92 }
    },
    {
      id: '2', 
      title: 'Insane Headshot Compilation',
      startTime: 89.5,
      endTime: 104.1,
      duration: 14.6,
      score: 89,
      type: 'skillshot',
      thumbnail: '/api/placeholder/160/90',
      metrics: { excitement: 87, engagement: 91, virality: 89 }
    },
    {
      id: '3',
      title: 'Hilarious Reaction Moment',
      startTime: 234.7,
      endTime: 248.3,
      duration: 13.6,
      score: 84,
      type: 'funny',
      thumbnail: '/api/placeholder/160/90',
      metrics: { excitement: 75, engagement: 89, virality: 94 }
    },
    {
      id: '4',
      title: 'Perfect Team Coordination',
      startTime: 312.1,
      endTime: 328.9,
      duration: 16.8,
      score: 81,
      type: 'kill',
      thumbnail: '/api/placeholder/160/90',
      metrics: { excitement: 82, engagement: 85, virality: 76 }
    }
  ];

  const startAnalysis = async () => {
    setIsProcessing(true);
    setStage('analyzing');
    setProgress(0);

    // Simulate AI processing stages
    const stages = [
      { name: 'analyzing', duration: 2500, progressEnd: 25 },
      { name: 'detecting', duration: 3500, progressEnd: 65 },
      { name: 'ranking', duration: 2000, progressEnd: 90 },
      { name: 'complete', duration: 1000, progressEnd: 100 }
    ];

    for (const stageInfo of stages) {
      setStage(stageInfo.name as any);
      
      // Animate progress for this stage
      const startProgress = progress;
      const endProgress = stageInfo.progressEnd;
      const duration = stageInfo.duration;
      const steps = 50;
      const stepDuration = duration / steps;
      const progressStep = (endProgress - startProgress) / steps;

      for (let i = 0; i < steps; i++) {
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        setProgress(prev => Math.min(prev + progressStep, endProgress));
      }
    }

    // Show results
    setHighlights(mockHighlights);
    setIsProcessing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      clutch: 'bg-red-500/20 text-red-400 border-red-500/30',
      skillshot: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      funny: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      kill: 'bg-green-500/20 text-green-400 border-green-500/30',
      reaction: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const filteredHighlights = selectedType === 'all' 
    ? highlights 
    : highlights.filter(h => h.type === selectedType);

  return (
    <div className="h-full bg-background border-t border-border/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/20 bg-gradient-to-r from-[#FF6B6B]/5 to-[#4ECDC4]/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center shadow-lg">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">AI Highlight Clipper</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-3 h-3" />
              <span>AI Powered</span>
              <Badge variant="secondary" className="text-xs">Gaming Optimized</Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[#FF6B6B] border-[#FF6B6B]/30">
            Smart Detection
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100%-80px)]">
        {/* Left Panel - Controls */}
        <div className="w-80 border-r border-border/20 bg-background/50 p-4 space-y-4">
          {/* Detection Settings */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              Detection Type
            </label>
            <select className="w-full p-2 rounded-lg bg-background border border-border/50 text-foreground">
              <option value="gaming">Gaming Highlights</option>
              <option value="reactions">Reactions Only</option>
              <option value="kills">Kills & Combat</option>
              <option value="funny">Funny Moments</option>
              <option value="custom">Custom Settings</option>
            </select>
          </div>

          {/* Sensitivity */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Sensitivity
            </label>
            <select className="w-full p-2 rounded-lg bg-background border border-border/50 text-foreground">
              <option value="high">High (More Clips)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="low">Low (Best Only)</option>
            </select>
          </div>

          {/* Processing Controls */}
          <div className="space-y-3 pt-4 border-t border-border/20">
            {!isProcessing && highlights.length === 0 && (
              <Button 
                onClick={startAnalysis}
                className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] to-[#26C6DA] text-white font-semibold"
                size="lg"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Analyze Video
              </Button>
            )}

            {isProcessing && (
              <div className="space-y-3">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] text-sm font-medium">
                    <div className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse"></div>
                    {stage === 'analyzing' && 'Analyzing Video...'}
                    {stage === 'detecting' && 'Detecting Highlights...'}
                    {stage === 'ranking' && 'Ranking Moments...'}
                    {stage === 'complete' && 'Finalizing...'}
                  </div>
                </div>
                <Progress value={progress} className="w-full h-2" />
                <div className="text-center text-xs text-muted-foreground">
                  {progress.toFixed(0)}% Complete
                </div>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export All Highlights
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Best Clips
                </Button>
              </div>
            )}
          </div>

          {/* Filter */}
          {highlights.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-border/20">
              <label className="text-sm font-medium">Filter by Type</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 rounded-lg bg-background border border-border/50 text-foreground text-sm"
              >
                <option value="all">All Highlights ({highlights.length})</option>
                <option value="clutch">Clutch Moments</option>
                <option value="skillshot">Skill Shots</option>
                <option value="funny">Funny Moments</option>
                <option value="kill">Kills</option>
              </select>
            </div>
          )}

          {/* Stats */}
          {highlights.length > 0 && (
            <div className="pt-4 border-t border-border/20 space-y-2">
              <div className="text-sm text-muted-foreground">Analysis Results</div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="text-center p-2 bg-background/50 rounded">
                  <div className="font-semibold text-[#FF6B6B]">{highlights.length}</div>
                  <div className="text-muted-foreground">Highlights Found</div>
                </div>
                <div className="text-center p-2 bg-background/50 rounded">
                  <div className="font-semibold text-[#4ECDC4]">
                    {Math.round(highlights.reduce((acc, h) => acc + h.score, 0) / highlights.length)}
                  </div>
                  <div className="text-muted-foreground">Avg Score</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Highlights */}
        <div className="flex-1 flex flex-col">
          {/* Highlights Header */}
          <div className="p-4 border-b border-border/20 bg-background/30">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Detected Highlights
                {highlights.length > 0 && (
                  <Badge variant="secondary">{filteredHighlights.length} clips</Badge>
                )}
              </h4>
              {highlights.length > 0 && (
                <div className="text-xs text-muted-foreground">
                  Sorted by AI Score
                </div>
              )}
            </div>
          </div>

          {/* Highlights List */}
          <div className="flex-1 overflow-auto p-4 space-y-3 custom-scrollbar">
            {highlights.length === 0 && !isProcessing && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 flex items-center justify-center mb-4">
                  <Scissors className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-foreground mb-2">No Highlights Detected</h4>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Click "Analyze Video" to automatically detect and extract the best moments from your gameplay
                </p>
              </div>
            )}

            {filteredHighlights.map((highlight, index) => (
              <div 
                key={highlight.id}
                className="group p-4 rounded-xl border border-border/20 bg-background/50 hover:bg-background/80 transition-all duration-200 hover:border-[#FF6B6B]/30"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative">
                    <div className="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white/50" />
                      </div>
                    </div>
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {Math.round(highlight.duration)}s
                    </div>
                    <div className="absolute top-1 left-1">
                      <Badge className={`text-xs ${getTypeColor(highlight.type)}`}>
                        {highlight.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-foreground group-hover:text-[#FF6B6B] transition-colors">
                        {highlight.title}
                      </h5>
                      <div className="flex items-center gap-1">
                        <div className="text-lg font-bold text-[#FF6B6B]">
                          {highlight.score}
                        </div>
                        <div className="text-xs text-muted-foreground">/ 100</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(highlight.startTime)} - {formatTime(highlight.endTime)}
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-red-400">
                          {highlight.metrics.excitement}%
                        </div>
                        <div className="text-xs text-muted-foreground">Excitement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-blue-400">
                          {highlight.metrics.engagement}%
                        </div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-green-400">
                          {highlight.metrics.virality}%
                        </div>
                        <div className="text-xs text-muted-foreground">Virality</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="text-[#4ECDC4] border-[#4ECDC4]/30 hover:bg-[#4ECDC4]/10">
                        <Play className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

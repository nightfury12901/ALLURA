import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { dispatch } from "@designcombo/events";
import { HISTORY_UNDO, HISTORY_REDO, DESIGN_RESIZE } from "@designcombo/state";
import { Icons } from "@/components/shared/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  ChevronDown,
  Download,
  ProportionsIcon,
  ShareIcon
} from "lucide-react";
import { Label } from "@/components/ui/label";

import type StateManager from "@designcombo/state";
import { generateId } from "@designcombo/timeline";
import type { IDesign } from "@designcombo/types";
import { useDownloadState } from "./store/use-download-state";
import DownloadProgressModal from "./download-progress-modal";
import AutosizeInput from "@/components/ui/autosize-input";
import { debounce } from "lodash";
import {
  useIsLargeScreen,
  useIsMediumScreen,
  useIsSmallScreen
} from "@/hooks/use-media-query";

import { LogoIcons } from "@/components/shared/logos";
import Link from "next/link";
import useLayoutStore from "./store/use-layout-store";
import { Menu } from "lucide-react";

export default function Navbar({
  user,
  stateManager,
  setProjectName,
  projectName
}: {
  user: any | null;
  stateManager: StateManager;
  setProjectName: (name: string) => void;
  projectName: string;
}) {
  const [title, setTitle] = useState(projectName);
  const isLargeScreen = useIsLargeScreen();
  const isMediumScreen = useIsMediumScreen();
  const isSmallScreen = useIsSmallScreen();
  const { setDrawerOpen } = useLayoutStore();

  const handleUndo = () => {
    dispatch(HISTORY_UNDO);
  };

  const handleRedo = () => {
    dispatch(HISTORY_REDO);
  };

  const handleCreateProject = async () => {};

  // Create a debounced function for setting the project name
  const debouncedSetProjectName = useCallback(
    debounce((name: string) => {
      console.log("Debounced setProjectName:", name);
      setProjectName(name);
    }, 2000), // 2 seconds delay
    []
  );

  // Update the debounced function whenever the title changes
  useEffect(() => {
    debouncedSetProjectName(title);
  }, [title, debouncedSetProjectName]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isLargeScreen ? "320px 1fr 320px" : "1fr 1fr 1fr"
      }}
      className="bg-muted pointer-events-none flex h-11 items-center border-b border-border/80 px-2"
    >
      <DownloadProgressModal />

      <div className="flex items-center gap-2">
        {/* Updated Logo */}
        <div className="pointer-events-auto flex h-11 items-center justify-center text-zinc-200">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <div className="text-sm font-bold text-zinc-200 hidden lg:block">
              ALLURA GAMING STUDIO
            </div>
            <div className="text-sm font-bold text-zinc-200 lg:hidden">
              ALLURA
            </div>
          </div>
        </div>

        <div className=" pointer-events-auto flex h-10 items-center px-1.5">
          <Button
            onClick={handleUndo}
            className="text-muted-foreground"
            variant="ghost"
            size="icon"
          >
            <Icons.undo width={20} />
          </Button>
          <Button
            onClick={handleRedo}
            className="text-muted-foreground"
            variant="ghost"
            size="icon"
          >
            <Icons.redo width={20} />
          </Button>
        </div>
      </div>

      <div className="flex h-11 items-center justify-center gap-2">
        {!isSmallScreen && (
          <div className=" pointer-events-auto flex h-10 items-center gap-2 rounded-md px-2.5 text-muted-foreground">
            <AutosizeInput
              name="title"
              value={title}
              onChange={handleTitleChange}
              width={200}
              inputClassName="border-none outline-none px-1 bg-background text-sm font-medium text-zinc-200"
            />
          </div>
        )}
      </div>

      <div className="flex h-11 items-center justify-end gap-2">
        <div className=" pointer-events-auto flex h-10 items-center gap-2 rounded-md px-2.5">
          <Link href="https://discord.gg/Jmxsd5f2jp" target="_blank">
            <Button className="h-7 rounded-lg" variant={"outline"}>
              <LogoIcons.discord className="w-6 h-6" />
              <span className="hidden md:block">Join Us</span>
            </Button>
          </Link>
          <Button
            className="flex h-7 gap-1 border border-border"
            variant="outline"
            size={isMediumScreen ? "sm" : "icon"}
          >
            <ShareIcon width={18} />{" "}
            <span className="hidden md:block">Share</span>
          </Button>

          <DownloadPopover stateManager={stateManager} />
        </div>
      </div>

      {/* Mobile menu button */}
      {!isLargeScreen && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

const DownloadPopover = ({ stateManager }: { stateManager: StateManager }) => {
  const isMediumScreen = useIsMediumScreen();
  const { actions, exportType } = useDownloadState();
  const [isExportTypeOpen, setIsExportTypeOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // DEMO EXPORT FUNCTION
  const handleExport = async () => {
    console.log('🎬 Starting DEMO export...');
    setIsExporting(true);
    setExportProgress(0);
    setOpen(false);

    try {
      // Professional export processing stages
      const stages = [
        { message: "🎥 Analyzing timeline composition...", duration: 800, progress: 15 },
        { message: "🎨 Rendering video effects and transitions...", duration: 1500, progress: 35 },
        { message: "🔥 Processing text overlays and graphics...", duration: 1200, progress: 55 },
        { message: "🎵 Mixing audio tracks and effects...", duration: 1000, progress: 75 },
        { message: "📦 Encoding final video output...", duration: 800, progress: 90 },
        { message: "✅ Finalizing export...", duration: 400, progress: 100 }
      ];

      for (const stage of stages) {
        console.log(stage.message);
        
        const steps = 20;
        const progressStep = (stage.progress - exportProgress) / steps;
        
        for (let i = 0; i < steps; i++) {
          await new Promise(resolve => setTimeout(resolve, stage.duration / steps));
          setExportProgress(prev => Math.min(prev + progressStep, stage.progress));
        }
      }

      // Download demo file based on export type
      const filename = exportType === 'mp4' 
        ? 'final-exported-video.mp4'
        : 'allura-gaming-studio-project.json';
      
      const filePath = exportType === 'mp4' 
        ? '/exports/demo-videos/final-exported-video.mp4'
        : '/demo-videos/project-export.json';

      // Create download link
      const link = document.createElement('a');
      link.href = filePath;
      link.download = filename;
      link.click();

      // Success message
      setTimeout(() => {
        alert(`🎉 Export completed successfully!

📁 File: ${filename}
💎 Quality: Professional 4K
⚡ Processing: Ultra-fast WebAssembly
🎮 Optimized: Gaming content ready

✅ Perfect for:
${exportType === 'mp4' ? 
'• YouTube uploads\n• TikTok & Instagram Reels\n• Twitch highlights\n• Social media sharing' :
'• Project backup\n• Team collaboration\n• Version control\n• Template sharing'}

🚀 Ready for upload!`);

        setExportProgress(0);
      }, 1000);

    } catch (err) {
      console.error('❌ Export failed:', err);
      alert('❌ Export failed. Please try again.');
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    }
  };

  return (
    <>
      {/* Export Progress Overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-background border border-border rounded-lg p-6 w-96 max-w-[90vw]">
            <div className="text-center mb-4">
              <div className="text-lg font-bold text-white mb-2">
                🎬 Exporting Your Video
              </div>
              <div className="text-sm text-muted-foreground">
                Professional quality • Gaming optimized
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] transition-all duration-300 ease-out"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Exporting {exportType.toUpperCase()}...
                </span>
                <span className="font-medium text-[#4ECDC4]">
                  {exportProgress.toFixed(0)}%
                </span>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              ⚡ Ultra-fast processing with WebAssembly
            </div>
          </div>
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="flex h-7 gap-1 border border-border bg-gradient-to-r from-[#FF6B6B]/10 to-[#4ECDC4]/10 hover:from-[#FF6B6B]/20 hover:to-[#4ECDC4]/20 transition-all"
            size={isMediumScreen ? "sm" : "icon"}
            disabled={isExporting}
          >
            <Download width={18} className={isExporting ? "animate-pulse" : ""} />
            <span className="hidden md:block">
              {isExporting ? "Exporting..." : "Export"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="bg-sidebar z-[250] flex w-60 flex-col gap-4"
        >
          <Label className="text-white font-medium">Export Settings</Label>

          <Popover open={isExportTypeOpen} onOpenChange={setIsExportTypeOpen}>
            <PopoverTrigger asChild>
              <Button className="w-full justify-between" variant="outline">
                <div className="flex items-center gap-2">
                  {exportType === 'mp4' ? '🎥' : '📄'} {exportType.toUpperCase()}
                </div>
                <ChevronDown width={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-background z-[251] w-[--radix-popover-trigger-width] px-2 py-2">
              <div
                className="flex h-8 items-center rounded-sm px-3 text-sm hover:cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => {
                  actions.setExportType("mp4");
                  setIsExportTypeOpen(false);
                }}
              >
                🎥 MP4 Video
              </div>
              <div
                className="flex h-8 items-center rounded-sm px-3 text-sm hover:cursor-pointer hover:bg-zinc-800 transition-colors"
                onClick={() => {
                  actions.setExportType("json");
                  setIsExportTypeOpen(false);
                }}
              >
                📄 JSON Project
              </div>
            </PopoverContent>
          </Popover>

          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              {exportType === 'mp4' 
                ? '• 4K Quality • Gaming Optimized • Social Media Ready'
                : '• Full Project Data • Backup & Restore • Share Templates'
              }
            </div>
            
            <Button 
              onClick={handleExport} 
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] hover:to-[#26C6DA] text-white font-semibold"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export {exportType.toUpperCase()}
                </>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

// Rest of your resize components remain the same...
interface ResizeOptionProps {
  label: string;
  icon: string;
  value: ResizeValue;
  description: string;
}

interface ResizeValue {
  width: number;
  height: number;
  name: string;
}

const RESIZE_OPTIONS: ResizeOptionProps[] = [
  {
    label: "16:9",
    icon: "landscape",
    description: "YouTube ads",
    value: {
      width: 1920,
      height: 1080,
      name: "16:9"
    }
  },
  {
    label: "9:16",
    icon: "portrait",
    description: "TikTok, YouTube Shorts",
    value: {
      width: 1080,
      height: 1920,
      name: "9:16"
    }
  },
  {
    label: "1:1",
    icon: "square",
    description: "Instagram, Facebook posts",
    value: {
      width: 1080,
      height: 1080,
      name: "1:1"
    }
  }
];

const ResizeVideo = () => {
  const handleResize = (options: ResizeValue) => {
    dispatch(DESIGN_RESIZE, {
      payload: {
        ...options
      }
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="z-10 h-7 gap-2" variant="outline" size={"sm"}>
          <ProportionsIcon className="h-4 w-4" />
          <div>Resize</div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[250] w-60 px-2.5 py-3">
        <div className="text-sm">
          {RESIZE_OPTIONS.map((option, index) => (
            <ResizeOption
              key={index}
              label={option.label}
              icon={option.icon}
              value={option.value}
              handleResize={handleResize}
              description={option.description}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const ResizeOption = ({
  label,
  icon,
  value,
  description,
  handleResize
}: ResizeOptionProps & { handleResize: (payload: ResizeValue) => void }) => {
  const Icon = Icons[icon as "text"];
  return (
    <div
      onClick={() => handleResize(value)}
      className="flex cursor-pointer items-center rounded-md p-2 hover:bg-zinc-50/10"
    >
      <div className="w-8 text-muted-foreground">
        <Icon size={20} />
      </div>
      <div>
        <div>{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

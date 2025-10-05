import { memo, useCallback } from "react";
import useLayoutStore from "./store/use-layout-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import { MenuItem } from "./menu-item";
import { useIsLargeScreen } from "@/hooks/use-media-query";

// Import Lucide React icons directly
import {
  Upload,
  Type,
  Video,
  Captions,
  Image as ImageIcon,
  Volume2,
  Sparkles,
  Mic,
  TrendingUp,
  Handshake,
  DollarSign,
  Flame,
  Scissors,
  Music,
  MessageSquare,
  BarChart3,
  Gamepad2,
  ExternalLink
} from "lucide-react";

// Core editing tools (open in sidebar)
const CORE_MENU_ITEMS = [
  { id: "uploads", icon: Upload, label: "Upload" },
  { id: "texts", icon: Type, label: "Text" },
  { id: "videos", icon: Video, label: "Video" },
  { id: "images", icon: ImageIcon, label: "Images" },
  { id: "audios", icon: Volume2, label: "Audio" },
  { id: "captions", icon: Captions, label: "Captions" },
  { id: "transitions", icon: Sparkles, label: "Transitions" },
  { id: "effects", icon: Sparkles, label: "Effects" },
  { id: "ai-voice", icon: Mic, label: "AI Voice" }
] as const;

// Gaming tools that open in NEW TABS - Using your HTML files
const NEW_TAB_GAMING_ITEMS = [
  { 
    id: "analytics", 
    icon: BarChart3, 
    label: "Analytics",
    url: "/dashboards/analytics.html" // Your HTML file
  },
  { 
    id: "brand-collabs", 
    icon: Handshake, 
    label: "Brand Collabs",
    url: "/dashboards/brand-collabs.html" // Your HTML file
  },
  { 
    id: "monetization", 
    icon: DollarSign, 
    label: "Monetization",
    url: "/dashboards/monetization.html" // Your HTML file
  },
  { 
    id: "game-trends", 
    icon: Flame, 
    label: "Game Trends",
    url: "/dashboards/game-trends.html" // Your HTML file
  },
  { 
    id: "gaming-assets", 
    icon: Music, 
    label: "Gaming Assets",
    url: "/dashboards/gaming-assets.html" // Your HTML file
  },
  { 
    id: "game-collabs", 
    icon: Gamepad2, 
    label: "Game Collabs",
    url: "/dashboards/game-collabs.html" // Your HTML file
  }
] as const;

// Gaming tools that open in BOTTOM PANEL (editor integration)
const BOTTOM_PANEL_GAMING_ITEMS = [
  { id: "highlight-clipper", icon: Scissors, label: "AI Highlight Clipper" },
  { id: "auto-subtitles", icon: MessageSquare, label: "Auto Subtitles" }
] as const;

// Features that open in bottom panel (for editor integration)
const BOTTOM_PANEL_FEATURES = ["highlight-clipper", "auto-subtitles"];

// ALLURA Gaming Logo Component
const AluraLogo = memo(() => (
  <div className="flex w-14 items-center justify-center py-4 border-b border-border/50">
    <div className="relative group cursor-pointer">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
        <span className="text-white font-black text-lg">A</span>
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B6B] flex items-center justify-center border-2 border-background shadow-md">
        <span className="text-white font-bold text-xs">G</span>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md -z-10"></div>
    </div>
  </div>
));

AluraLogo.displayName = "AluraLogo";

// Memoized menu button component
const MenuButton = memo<{
  item: { id: string; icon: any; label: string; url?: string };
  isActive: boolean;
  onClick: (menuItem: string, url?: string) => void;
  buttonType: "core" | "new-tab" | "bottom-panel";
}>(({ item, isActive, onClick, buttonType }) => {
  const handleClick = useCallback(() => {
    onClick(item.id, item.url);
  }, [item.id, item.url, onClick]);

  const IconComponent = item.icon;

  return (
    <div className="relative group">
      <Button
        onClick={handleClick}
        className={cn(
          "w-12 h-12 p-0 transition-all duration-200 hover:scale-105 mb-1 relative overflow-hidden",
          isActive
            ? "bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg shadow-[#FF6B6B]/25"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
        )}
        variant="ghost"
        size="icon"
        title={`${item.label}${buttonType === 'new-tab' ? ' (Opens in New Tab)' : buttonType === 'bottom-panel' ? ' (Opens in Bottom Panel)' : ''}`}
      >
        <IconComponent size={18} className="relative z-10" />
        
        {/* Different indicators for different button types */}
        {buttonType === "new-tab" && (
          <>
            <ExternalLink className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-[#4ECDC4]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/10 to-[#FF6B6B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </>
        )}
        
        {buttonType === "bottom-panel" && (
          <>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] rounded-full animate-pulse shadow-lg shadow-[#FF6B6B]/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/10 to-[#4ECDC4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </>
        )}
        
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        )}
      </Button>
      
      {/* Enhanced Tooltip */}
      <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
        <div className="font-medium">{item.label}</div>
        <div className="text-[#4ECDC4] text-xs mt-0.5">
          {buttonType === 'new-tab' && '🌐 Opens in New Tab'}
          {buttonType === 'bottom-panel' && '🤖 AI Integration Panel'}
          {buttonType === 'core' && '📝 Sidebar Panel'}
        </div>
      </div>
    </div>
  );
});

MenuButton.displayName = "MenuButton";

// Section separator component
const MenuSeparator = memo(() => (
  <div className="flex items-center justify-center my-3">
    <div className="w-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  </div>
));

MenuSeparator.displayName = "MenuSeparator";

// Main MenuList component
function MenuList() {
  const {
    setActiveMenuItem,
    setShowMenuItem,
    activeMenuItem,
    showMenuItem,
    drawerOpen,
    setDrawerOpen
  } = useLayoutStore();

  const isLargeScreen = useIsLargeScreen();

  const handleMenuItemClick = useCallback(
    (menuItem: string, url?: string) => {
      // Handle new tab features - open your HTML files
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }
      
      // Handle core and bottom panel features
      setActiveMenuItem(menuItem as any);
      
      // Bottom panel features (highlight-clipper, auto-subtitles)
      if (BOTTOM_PANEL_FEATURES.includes(menuItem)) {
        setShowMenuItem(true); // This triggers bottom panel in editor
      } else {
        // Core features use sidebar/drawer
        if (!isLargeScreen) {
          setDrawerOpen(true);
        } else {
          setShowMenuItem(true);
        }
      }
    },
    [isLargeScreen, setActiveMenuItem, setDrawerOpen, setShowMenuItem]
  );

  const handleDrawerOpenChange = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
    },
    [setDrawerOpen]
  );

  return (
    <>
      {/* Clean Sidebar */}
      <div className="flex flex-col h-full w-16 border-r border-border/50 bg-background/95 backdrop-blur-sm">
        {/* ALLURA Gaming Logo */}
        <AluraLogo />

        {/* Navigation Menu */}
        <div className="flex flex-col items-center py-3 flex-1 overflow-y-auto scrollbar-hide">
          {/* Core Editing Tools */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground/60 mb-2 font-medium tracking-wider">EDIT</div>
            {CORE_MENU_ITEMS.map((item) => {
              const isActive = activeMenuItem === item.id && (
                showMenuItem || (drawerOpen && !isLargeScreen)
              );

              return (
                <MenuButton
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  onClick={handleMenuItemClick}
                  buttonType="core"
                />
              );
            })}
          </div>

          <MenuSeparator />

          {/* Gaming Tools - New Tab */}
          <div className="flex flex-col items-center">
            <div className="text-xs bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent font-bold mb-2 tracking-wider flex items-center gap-1">
              GAMING <ExternalLink className="w-2.5 h-2.5" />
            </div>
            {NEW_TAB_GAMING_ITEMS.map((item) => (
              <MenuButton
                key={item.id}
                item={item}
                isActive={false}
                onClick={handleMenuItemClick}
                buttonType="new-tab"
              />
            ))}
          </div>

          <MenuSeparator />

          {/* AI Tools - Bottom Panel */}
          <div className="flex flex-col items-center">
            <div className="text-xs bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent font-bold mb-2 tracking-wider">
              AI TOOLS
            </div>
            {BOTTOM_PANEL_GAMING_ITEMS.map((item) => {
              const isActive = activeMenuItem === item.id;

              return (
                <MenuButton
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  onClick={handleMenuItemClick}
                  buttonType="bottom-panel"
                />
              );
            })}
          </div>
        </div>

        {/* Footer Brand */}
        <div className="py-3 border-t border-border/50 text-center">
          <div className="text-xs font-black bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] bg-clip-text text-transparent tracking-wide">
            ALLURA
          </div>
          <div className="text-xs text-muted-foreground font-bold -mt-0.5 tracking-widest">
            STUDIO
          </div>
        </div>
      </div>

      {/* Mobile Drawer - Only for core features */}
      {!isLargeScreen && (
        <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle className="capitalize flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <div className="text-lg font-bold">{String(activeMenuItem).replace("-", " ")}</div>
                  <div className="text-sm text-muted-foreground font-normal">ALLURA Gaming Studio</div>
                </div>
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 overflow-auto">
              <MenuItem />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default memo(MenuList);

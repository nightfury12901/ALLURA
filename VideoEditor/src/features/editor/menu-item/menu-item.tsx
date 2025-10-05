import useLayoutStore from "../store/use-layout-store";
import { Transitions } from "./transitions";
import { Texts } from "./texts";
import { Audios } from "./audios";
import { Elements } from "./elements";
import { Images } from "./images";
import { Videos } from "./videos";
import { Captions } from "./captions";
import { VoiceOver } from "./voice-over";
import { useIsLargeScreen } from "@/hooks/use-media-query";
import { Uploads } from "./uploads";
import { AiVoice } from "./ai-voice";
import { Effects } from "./effects";

// Import the REAL gaming components
import { Analytics } from "./analytics";
import { BrandCollabs } from "./brand-collabs";
import { Monetization } from "./monetization";
import { GameTrends } from "./game-trends";
import { GameCollabs } from "./game-collabs";
import { HighlightClipper } from "./highlight-clipper";
import { GamingAssets } from "./gaming-assets";
import { AutoSubtitles } from "./auto-subtitles";

const ActiveMenuItem = () => {
  const { activeMenuItem } = useLayoutStore();

  // Convert to string to avoid TypeScript strict comparison issues
  const menuItem = String(activeMenuItem);

  // Use switch statement instead of if statements for TypeScript safety
  switch (menuItem) {
    // Original DesignCombo features
    case "transitions":
      return <Transitions />;
    case "texts":
      return <Texts />;
    case "shapes":
      return <Elements />;
    case "videos":
      return <Videos />;
    case "captions":
      return <Captions />;
    case "audios":
      return <Audios />;
    case "images":
      return <Images />;
    case "voiceOver":
      return <VoiceOver />;
    case "elements":
      return <Elements />;
    case "uploads":
      return <Uploads />;
    case "ai-voice":
      return <AiVoice />;

    // REAL GAMING COMPONENTS - NO MORE PLACEHOLDERS
    case "effects":
      return <Effects />;
    case "analytics":
      return <Analytics />;
    case "brand-collabs":
      return <BrandCollabs />;
    case "monetization":
      return <Monetization />;
    case "game-trends":
      return <GameTrends />;
    case "game-collabs":
      return <GameCollabs />;
    case "highlight-clipper":
      return <HighlightClipper />;
    case "gaming-assets":
      return <GamingAssets />;
    case "auto-subtitles":
      return <AutoSubtitles />;

    default:
      return null;
  }
};

export const MenuItem = () => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className={`${isLargeScreen ? "w-[300px]" : "w-full"} flex-1 flex`}>
      <ActiveMenuItem />
    </div>
  );
};

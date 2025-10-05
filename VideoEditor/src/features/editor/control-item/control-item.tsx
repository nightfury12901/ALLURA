import React from "react";
import {
  IAudio,
  ICaption,
  IImage,
  IText,
  ITrackItem,
  ITrackItemAndDetails,
  IVideo
} from "@designcombo/types";
import { useEffect, useState } from "react";
import BasicText from "./basic-text";
import BasicImage from "./basic-image";
import BasicVideo from "./basic-video";
import BasicAudio from "./basic-audio";
import useStore from "../store/use-store";
import useLayoutStore from "../store/use-layout-store";
import BasicCaption from "./basic-caption";
import { LassoSelect } from "lucide-react";
import { AutoSubtitlesSidebar } from "./auto-subtitles-sidebar";
import { HighlightClipperSidebar } from "./highlight-clipper-sidebar";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { activeIds, trackItemsMap, transitionsMap } = useStore();
  const [trackItem, setTrackItem] = useState<ITrackItem | null>(null);
  const { setTrackItem: setLayoutTrackItem } = useLayoutStore();

  useEffect(() => {
    if (activeIds.length === 1) {
      const [id] = activeIds;
      const trackItem = trackItemsMap[id];
      if (trackItem) {
        setTrackItem(trackItem);
        setLayoutTrackItem?.(trackItem);
      } else console.log(transitionsMap[id]);
    } else {
      setTrackItem(null);
      setLayoutTrackItem?.(null);
    }
  }, [activeIds, trackItemsMap]);

  return (
    <div className="flex w-[320px] flex-none border-l border-border/80 bg-muted hidden lg:block">
      {React.cloneElement(children as React.ReactElement<any>, {
        trackItem
      })}
    </div>
  );
};

const ActiveControlItem = ({
  trackItem
}: {
  trackItem?: ITrackItemAndDetails;
}) => {
  const { activeMenuItem } = useLayoutStore();
  
  // Check if we should show AI tools in sidebar
  const showAITool = activeMenuItem === 'auto-subtitles' || activeMenuItem === 'highlight-clipper';
  
  if (showAITool) {
    return (
      <div className="h-full w-full">
        {/* AI Tool Header */}
        <div className="p-4 border-b border-border/20 bg-gradient-to-r from-[#FF6B6B]/5 to-[#4ECDC4]/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#FF6B6B] flex items-center justify-center">
                <span className="text-white font-bold text-xs">G</span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">
                  {activeMenuItem === 'auto-subtitles' ? 'Auto Subtitles' : 'AI Highlight Clipper'}
                </h3>
                <div className="text-xs text-muted-foreground">ALLURA Gaming Studio</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Tool Content */}
        <div className="h-[calc(100%-80px)] overflow-auto">
          {activeMenuItem === 'auto-subtitles' && <AutoSubtitlesSidebar />}
          {activeMenuItem === 'highlight-clipper' && <HighlightClipperSidebar />}
        </div>
      </div>
    );
  }

  // Original control item logic for video/audio/text properties
  if (!trackItem) {
    return (
      <div className="pb-32 flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground h-[calc(100vh-58px)]">
        <LassoSelect />
        <span className="text-zinc-500">No item selected</span>
      </div>
    );
  }

  return (
    <>
      {
        {
          text: <BasicText trackItem={trackItem as ITrackItem & IText} />,
          caption: (
            <BasicCaption trackItem={trackItem as ITrackItem & ICaption} />
          ),
          image: <BasicImage trackItem={trackItem as ITrackItem & IImage} />,
          video: <BasicVideo trackItem={trackItem as ITrackItem & IVideo} />,
          audio: <BasicAudio trackItem={trackItem as ITrackItem & IAudio} />
        }[trackItem.type as "text"]
      }
    </>
  );
};

export const ControlItem = () => {
  return (
    <Container>
      <ActiveControlItem />
    </Container>
  );
};

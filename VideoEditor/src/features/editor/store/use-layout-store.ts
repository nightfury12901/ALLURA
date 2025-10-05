import { create } from "zustand";
import { ITrackItem } from "@designcombo/types";

interface LayoutStore {
  activeMenuItem: string;
  showMenuItem: boolean;
  drawerOpen: boolean;
  trackItem: ITrackItem | null;
  floatingControl: string;
  labelControlItem: string;
  typeControlItem: string;
  
  setActiveMenuItem: (item: string) => void;
  setShowMenuItem: (show: boolean) => void;
  setDrawerOpen: (open: boolean) => void;
  setTrackItem: (item: ITrackItem | null) => void; // ADD THIS LINE
  setLayoutTrackItem: (item: ITrackItem | null) => void; // ADD THIS LINE
  setFloatingControl: (control: string) => void;
  setLabelControlItem: (label: string) => void;
  setTypeControlItem: (type: string) => void;
}

const useLayoutStore = create<LayoutStore>((set) => ({
  activeMenuItem: "uploads",
  showMenuItem: false,
  drawerOpen: false,
  trackItem: null,
  floatingControl: "",
  labelControlItem: "",
  typeControlItem: "",
  
  setActiveMenuItem: (item: string) => set({ activeMenuItem: item }),
  setShowMenuItem: (show: boolean) => set({ showMenuItem: show }),
  setDrawerOpen: (open: boolean) => set({ drawerOpen: open }),
  setTrackItem: (item: ITrackItem | null) => set({ trackItem: item }), // ADD THIS LINE
  setLayoutTrackItem: (item: ITrackItem | null) => set({ trackItem: item }), // ADD THIS LINE
  setFloatingControl: (control: string) => set({ floatingControl: control }),
  setLabelControlItem: (label: string) => set({ labelControlItem: label }),
  setTypeControlItem: (type: string) => set({ typeControlItem: type }),
}));

export default useLayoutStore;

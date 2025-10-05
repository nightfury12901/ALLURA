import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
    Sparkles, 
    Zap, 
    Star, 
    Flame,
    Eye,
    Palette,
    Film,
    Aperture,
    Search,
    Gamepad2
} from "lucide-react";

const GAMING_EFFECTS = [
    {
        id: "neon_glow",
        name: "Neon Glow",
        description: "Cyberpunk neon outline effect",
        icon: Zap,
        color: "#FF6B6B",
        category: "Gaming",
        premium: false
    },
    {
        id: "pixel_art",
        name: "Pixel Art", 
        description: "Retro 8-bit pixelated effect",
        icon: Aperture,
        color: "#4ECDC4", 
        category: "Retro",
        premium: false
    },
    {
        id: "glitch",
        name: "Glitch",
        description: "Digital corruption effect", 
        icon: Film,
        color: "#FF6B6B",
        category: "Gaming",
        premium: false
    },
    {
        id: "fire_explosion",
        name: "Fire Blast",
        description: "Explosive fire animation",
        icon: Flame,
        color: "#FF4500",
        category: "Action",
        premium: true
    },
    {
        id: "laser_beam", 
        name: "Laser Beam",
        description: "Sci-fi laser effects",
        icon: Star,
        color: "#00FF00",
        category: "Sci-Fi",
        premium: true
    },
    {
        id: "zoom_blur",
        name: "Speed Lines",
        description: "Motion blur with speed lines",
        icon: Eye,
        color: "#FFD166",
        category: "Motion",
        premium: false
    },
    {
        id: "color_pop",
        name: "Color Pop", 
        description: "Highlight specific colors",
        icon: Palette,
        color: "#9B59B6",
        category: "Color",
        premium: false
    },
    {
        id: "sparkle",
        name: "Magic Sparkles",
        description: "Animated sparkle particles",
        icon: Sparkles,
        color: "#FFD700",
        category: "Magic",
        premium: true
    },
    {
        id: "screen_shake",
        name: "Screen Shake",
        description: "Dramatic camera shake effect",
        icon: Gamepad2,
        color: "#FF6B6B",
        category: "Gaming",
        premium: false
    }
];

const CATEGORIES = ["All", "Gaming", "Retro", "Action", "Sci-Fi", "Motion", "Color", "Magic"];

export const Effects = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEffects = GAMING_EFFECTS.filter(effect => {
        const matchesCategory = selectedCategory === "All" || effect.category === selectedCategory;
        const matchesSearch = effect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             effect.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleApplyEffect = useCallback((effectId: string) => {
        console.log(`🎮 Applying gaming effect: ${effectId}`);
        // TODO: Integrate with DesignCombo state management
        // This is where you'd dispatch the effect to the timeline
        alert(`Applied ${effectId} effect! (Integration coming soon)`);
    }, []);

    return (
        <div className="h-full flex flex-col bg-sidebar">
            {/* Header */}
            <div className="p-4 border-b border-border/20">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-[#FF6B6B]" />
                    <h3 className="text-foreground font-medium">Gaming Effects</h3>
                    <Badge variant="secondary" className="ml-auto">
                        {filteredEffects.length}
                    </Badge>
                </div>
                
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search effects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-background/50 border-border/30"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="p-4 border-b border-border/20">
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={`text-xs ${
                                selectedCategory === category 
                                    ? "bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white" 
                                    : "hover:bg-muted"
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Effects Grid */}
            <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                    {filteredEffects.map((effect) => {
                        const Icon = effect.icon;
                        return (
                            <Card 
                                key={effect.id} 
                                className="p-4 bg-card hover:bg-card/80 border-border/30 cursor-pointer transition-all duration-200 hover:scale-[1.02] group"
                            >
                                <div className="flex items-start gap-3">
                                    {/* Effect Icon Preview */}
                                    <div className="flex-shrink-0">
                                        <div 
                                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                                            style={{ 
                                                background: `${effect.color}20`,
                                                border: `1px solid ${effect.color}40`
                                            }}
                                        >
                                            <Icon 
                                                size={20}
                                                style={{ color: effect.color }}
                                                className="group-hover:scale-110 transition-transform duration-200"
                                            />
                                        </div>
                                    </div>

                                    {/* Effect Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-sm font-medium text-foreground truncate">
                                                {effect.name}
                                            </h4>
                                            {effect.premium && (
                                                <Badge variant="secondary" className="text-xs">
                                                    PRO
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {effect.description}
                                        </p>
                                        <Badge 
                                            variant="outline" 
                                            className="text-xs"
                                            style={{ 
                                                borderColor: `${effect.color}40`,
                                                color: effect.color 
                                            }}
                                        >
                                            {effect.category}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <Button 
                                    onClick={() => handleApplyEffect(effect.id)}
                                    className="w-full mt-3 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] hover:from-[#FF5252] hover:to-[#26C6DA] text-white border-0"
                                    size="sm"
                                >
                                    Apply Effect
                                </Button>
                            </Card>
                        );
                    })}
                    
                    {filteredEffects.length === 0 && (
                        <div className="text-center py-8">
                            <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">
                                No effects found matching your search
                            </p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Footer Info */}
            <div className="p-4 border-t border-border/20 bg-muted/20">
                <p className="text-xs text-muted-foreground text-center">
                    🎮 More gaming effects coming soon! 
                    <br />
                    Pro effects require ALLURA Pro subscription
                </p>
            </div>
        </div>
    );
};

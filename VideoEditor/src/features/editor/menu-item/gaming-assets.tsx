import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    Search, 
    Music, 
    Volume2, 
    Film, 
    Layers, 
    Filter,
    Download,
    Play,
    Plus,
    ChevronRight,
    Bell,
    User
} from "lucide-react";

// Asset data
const GAMING_ASSETS = [
    {
        id: 1,
        name: "Epic Battle Theme",
        description: "High-energy orchestral track perfect for boss battles",
        type: "MUSIC",
        category: "Action",
        icon: Music,
        color: "#00cccc",
        tags: ["epic", "battle", "orchestral"]
    },
    {
        id: 2,
        name: "Laser Blast",
        description: "Futuristic energy weapon sound effect",
        type: "SFX",
        category: "Action",
        icon: Volume2,
        color: "#ff4d4d",
        tags: ["laser", "weapon", "sci-fi"]
    },
    {
        id: 3,
        name: "Character Idle",
        description: "Smooth looping animation for character idle state",
        type: "ANIM",
        category: "Character",
        icon: Film,
        color: "#8000ff",
        tags: ["character", "idle", "loop"]
    },
    {
        id: 4,
        name: "Ambient Forest",
        description: "Peaceful nature soundscape with birds and wind",
        type: "MUSIC",
        category: "Ambient",
        icon: Music,
        color: "#00cccc",
        tags: ["ambient", "nature", "peaceful"]
    },
    {
        id: 5,
        name: "UI Click",
        description: "Clean interface click sound for menus",
        type: "SFX",
        category: "UI Sounds",
        icon: Volume2,
        color: "#ff4d4d",
        tags: ["ui", "click", "menu"]
    },
    {
        id: 6,
        name: "Explosion Effect",
        description: "Particle explosion animation with debris",
        type: "ANIM",
        category: "Action",
        icon: Film,
        color: "#8000ff",
        tags: ["explosion", "particles", "action"]
    },
    {
        id: 7,
        name: "Menu Theme",
        description: "Calm electronic track for main menus",
        type: "MUSIC",
        category: "UI Sounds",
        icon: Music,
        color: "#00cccc",
        tags: ["menu", "electronic", "calm"]
    },
    {
        id: 8,
        name: "Footsteps",
        description: "Set of walking sound effects on different surfaces",
        type: "SFX",
        category: "Character",
        icon: Volume2,
        color: "#ff4d4d",
        tags: ["footsteps", "walking", "character"]
    },
    {
        id: 9,
        name: "Cyberpunk City",
        description: "Synth-heavy track with neon atmosphere",
        type: "MUSIC",
        category: "Ambient",
        icon: Music,
        color: "#00cccc",
        tags: ["cyberpunk", "synth", "neon"]
    },
    {
        id: 10,
        name: "Power Up",
        description: "Rising tone indicating ability activation",
        type: "SFX",
        category: "Action",
        icon: Volume2,
        color: "#ff4d4d",
        tags: ["power", "ability", "activation"]
    },
    {
        id: 11,
        name: "Magic Spell",
        description: "Fantasy spell casting animation with particles",
        type: "ANIM",
        category: "Action",
        icon: Film,
        color: "#8000ff",
        tags: ["magic", "fantasy", "particles"]
    },
    {
        id: 12,
        name: "Victory Fanfare",
        description: "Triumphant orchestral piece for level completion",
        type: "MUSIC",
        category: "Action",
        icon: Music,
        color: "#00cccc",
        tags: ["victory", "orchestral", "triumph"]
    }
];

const CATEGORIES = [
    { name: "Action", count: 24, color: "#ff4d4d" },
    { name: "Ambient", count: 18, color: "#00cccc" },
    { name: "UI Sounds", count: 32, color: "#8000ff" },
    { name: "Character", count: 15, color: "#666666" }
];

const POPULAR_TAGS = ["epic", "8bit", "synthwave", "battle", "menu"];

export const GamingAssets = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All Assets");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredAssets = GAMING_ASSETS.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             asset.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = selectedFilter === "All Assets" || 
                             selectedFilter === "Music" && asset.type === "MUSIC" ||
                             selectedFilter === "Sound Effects" && asset.type === "SFX" ||
                             selectedFilter === "Animations" && asset.type === "ANIM";
        return matchesSearch && matchesFilter;
    });

    const handlePreview = (assetName: string) => {
        alert(`Playing preview of ${assetName}`);
    };

    const handleAddToProject = (assetName: string) => {
        alert(`Added ${assetName} to your project!`);
    };

    const handleDownloadAll = () => {
        alert("Downloading all assets... (This would trigger a bulk download)");
    };

    return (
        <div className="h-full flex bg-sidebar">
            {/* Sidebar */}
            <div className="w-64 min-h-full bg-gradient-to-b from-[#0a0a0a] to-[#121212] p-6 border-r border-border/30 shadow-2xl">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search assets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] rounded-full focus:border-[#8000ff]"
                        />
                    </div>
                </div>
                
                {/* Filters */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Filters</h3>
                    <div className="space-y-3">
                        {[
                            { id: "Music", icon: Music, color: "#00cccc" },
                            { id: "Sound Effects", icon: Volume2, color: "#ff4d4d" },
                            { id: "Animations", icon: Film, color: "#8000ff" },
                            { id: "All Assets", icon: Layers, color: "#666666" }
                        ].map((filter) => {
                            const Icon = filter.icon;
                            return (
                                <Button
                                    key={filter.id}
                                    variant={selectedFilter === filter.id ? "default" : "ghost"}
                                    className={`w-full justify-start p-3 h-auto transition-all duration-200 ${
                                        selectedFilter === filter.id 
                                            ? 'bg-[#8000ff] text-white' 
                                            : 'hover:bg-[#8000ff] hover:text-white'
                                    }`}
                                    onClick={() => setSelectedFilter(filter.id)}
                                >
                                    <Icon className="mr-3 h-4 w-4" style={{ color: selectedFilter === filter.id ? 'white' : filter.color }} />
                                    {filter.id}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                
                {/* Categories */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Categories</h3>
                    <div className="space-y-2">
                        {CATEGORIES.map((category) => (
                            <div key={category.name} className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{category.name}</span>
                                <Badge 
                                    variant="outline" 
                                    style={{ color: category.color, borderColor: category.color }}
                                    className="text-xs"
                                >
                                    {category.count}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Popular Tags */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {POPULAR_TAGS.map((tag) => (
                            <Badge 
                                key={tag}
                                variant="secondary"
                                className="px-3 py-1 bg-[#2a2a2a] text-xs hover:bg-[#8000ff] cursor-pointer transition-colors"
                            >
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-8">
                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="text-5xl font-bold mb-4">
                                Gaming <span className="text-[#ff4d4d]">Assets</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl">
                                A comprehensive library of copyright-safe music, sound effects, and animations for gaming content creators. 
                                All assets are 100% royalty-free and ready for commercial use.
                            </p>
                        </div>
                        
                        {/* Controls */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex space-x-4">
                                <Button className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] flex items-center">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Sort By
                                </Button>
                                <Button 
                                    className="px-6 py-3 bg-gradient-to-r from-[#ff4d4d] to-[#8000ff] hover:scale-105 transition-all flex items-center"
                                    onClick={handleDownloadAll}
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download All
                                </Button>
                            </div>
                            <div className="text-muted-foreground">
                                {filteredAssets.length} assets found
                            </div>
                        </div>
                        
                        {/* Asset Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                            {filteredAssets.map((asset) => {
                                const Icon = asset.icon;
                                return (
                                    <Card 
                                        key={asset.id}
                                        className="p-5 bg-gradient-to-br from-[#1a1a1a] to-[#121212] border-[#2a2a2a] hover:border-[#8000ff] hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#8000ff]/20"
                                    >
                                        <div className="relative mb-4">
                                            <div className="bg-[#2a2a2a] h-40 rounded-lg flex items-center justify-center">
                                                <Icon className="w-12 h-12" style={{ color: asset.color }} />
                                            </div>
                                            <Badge 
                                                className="absolute top-3 right-3 text-black text-xs font-bold"
                                                style={{ backgroundColor: asset.color }}
                                            >
                                                {asset.type}
                                            </Badge>
                                        </div>
                                        
                                        <h3 className="font-bold text-lg mb-2 text-foreground">{asset.name}</h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                            {asset.description}
                                        </p>
                                        
                                        <div className="flex justify-between items-center">
                                            <Button 
                                                variant="outline"
                                                size="sm"
                                                className="bg-[#8000ff]/20 border-[#8000ff] text-[#8000ff] hover:bg-[#8000ff]/40"
                                                onClick={() => handlePreview(asset.name)}
                                            >
                                                <Play className="w-3 h-3 mr-1" />
                                                Preview
                                            </Button>
                                            <Button 
                                                size="sm"
                                                className="bg-gradient-to-r from-[#ff4d4d] to-[#8000ff] hover:scale-105 transition-transform"
                                                onClick={() => handleAddToProject(asset.name)}
                                            >
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add
                                            </Button>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                        
                        {/* Pagination */}
                        <div className="flex justify-center space-x-2">
                            {[1, 2, 3].map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "ghost"}
                                    size="icon"
                                    className="w-10 h-10 rounded-full bg-[#2a2a2a] hover:bg-[#8000ff]"
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-10 h-10 rounded-full bg-[#2a2a2a] hover:bg-[#8000ff]"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    Search, 
    Plus, 
    Clock, 
    Users, 
    Mic, 
    Play,
    Filter,
    RefreshCw,
    Gamepad2,
    MessageCircle
} from "lucide-react";

// Collab data
const COLLAB_REQUESTS = [
    {
        id: 1,
        streamerName: "NovaGamer",
        followers: "12.5K",
        title: "Valorant Tournament Team-Up",
        description: "Looking for skilled players to join our weekly Valorant tournaments and co-stream the matches.",
        genre: "FPS",
        genreColor: "#ef4444",
        schedule: "EST Evenings",
        status: "live", // live, online, offline
        avatar: "1"
    },
    {
        id: 2,
        streamerName: "PixelQueen",
        followers: "8.2K",
        title: "League of Legends Duo",
        description: "Gold/Plat player looking for a consistent duo partner to climb ranked and create content together.",
        genre: "MOBA",
        genreColor: "#3b82f6",
        schedule: "Weekends",
        status: "offline",
        avatar: "2"
    },
    {
        id: 3,
        streamerName: "CosmicGamer",
        followers: "24.7K",
        title: "Apex Legends Squad",
        description: "Building a squad for Apex ranked and casual play. Mic required and positive attitude!",
        genre: "Battle Royale",
        genreColor: "#8b5cf6",
        schedule: "Weekdays 7-10PM",
        status: "online",
        avatar: "3"
    },
    {
        id: 4,
        streamerName: "RetroRex",
        followers: "5.3K",
        title: "Retro Gaming Podcast",
        description: "Looking for co-hosts for a new retro gaming podcast series. Must love 8-bit/16-bit era!",
        genre: "Retro",
        genreColor: "#f59e0b",
        schedule: "Flexible",
        status: "offline",
        avatar: "4"
    },
    {
        id: 5,
        streamerName: "TechTitan",
        followers: "18.9K",
        title: "CS:GO Strategy Stream",
        description: "Want to co-stream CS:GO matches with analysis and strategy discussion. Must be high rank.",
        genre: "FPS",
        genreColor: "#ef4444",
        schedule: "Tue/Thu Nights",
        status: "online",
        avatar: "5"
    },
    {
        id: 6,
        streamerName: "IndieGem",
        followers: "6.7K",
        title: "Indie Game Dev Collab",
        description: "Looking for streamers to playtest and showcase my upcoming indie game. Will provide keys.",
        genre: "Indie",
        genreColor: "#10b981",
        schedule: "Flexible Schedule",
        status: "online",
        avatar: "6"
    }
];

const FILTER_OPTIONS = {
    genres: [
        { name: "FPS", color: "#ef4444" },
        { name: "MOBA", color: "#3b82f6" },
        { name: "Battle Royale", color: "#8b5cf6" },
        { name: "Retro", color: "#f59e0b" },
        { name: "Indie", color: "#10b981" }
    ],
    collabTypes: [
        { name: "Co-Stream", icon: Users },
        { name: "Podcast", icon: Mic },
        { name: "Multiplayer", icon: Play }
    ],
    followerRanges: [
        { name: "1K-10K" },
        { name: "10K-50K" },
        { name: "50K+" }
    ]
};

export const GameCollabs = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [selectedCollabType, setSelectedCollabType] = useState<string | null>(null);
    const [selectedFollowerRange, setSelectedFollowerRange] = useState<string | null>(null);

    const filteredCollabs = COLLAB_REQUESTS.filter(collab => {
        const matchesSearch = collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             collab.streamerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             collab.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = !selectedGenre || collab.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    const handleConnect = (streamerName: string) => {
        alert(`Sending connection request to ${streamerName}!`);
    };

    const handleMessage = (streamerName: string) => {
        alert(`Opening message thread with ${streamerName}!`);
    };

    const handleNewCollabRequest = () => {
        alert("Opening new collaboration request form!");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "live": return "#ef4444";
            case "online": return "#10b981";
            case "offline": return "#6b7280";
            default: return "#6b7280";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "live": return "Live Now";
            case "online": return "Online";
            case "offline": return "Offline";
            default: return "Unknown";
        }
    };

    return (
        <div className="h-full flex bg-sidebar">
            {/* Sidebar Filters */}
            <div className="w-64 bg-[#0a0a0a] border-r border-border/30 p-6">
                <div className="flex items-center mb-6">
                    <Filter className="mr-2 w-5 h-5 text-[#ef4444]" />
                    <h3 className="text-lg font-semibold text-foreground">Match Filters</h3>
                </div>
                
                <div className="space-y-6">
                    {/* Game Genre Filter */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">GAME GENRE</h4>
                        <div className="space-y-2">
                            {FILTER_OPTIONS.genres.map((genre) => (
                                <Button
                                    key={genre.name}
                                    variant="ghost"
                                    className={`w-full justify-start p-2 h-auto transition-all duration-200 ${
                                        selectedGenre === genre.name 
                                            ? 'bg-[#ef4444]/20 text-[#ef4444]' 
                                            : 'hover:bg-[#ef4444]/10'
                                    }`}
                                    onClick={() => setSelectedGenre(selectedGenre === genre.name ? null : genre.name)}
                                >
                                    <div 
                                        className="w-4 h-4 rounded-full mr-3"
                                        style={{ backgroundColor: genre.color }}
                                    />
                                    <span>{genre.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Collab Type Filter */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">COLLAB TYPE</h4>
                        <div className="space-y-2">
                            {FILTER_OPTIONS.collabTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <Button
                                        key={type.name}
                                        variant="ghost"
                                        className={`w-full justify-start p-2 h-auto transition-all duration-200 ${
                                            selectedCollabType === type.name 
                                                ? 'bg-[#ef4444]/20 text-[#ef4444]' 
                                                : 'hover:bg-[#ef4444]/10'
                                        }`}
                                        onClick={() => setSelectedCollabType(selectedCollabType === type.name ? null : type.name)}
                                    >
                                        <Icon className="w-4 h-4 mr-3" />
                                        <span>{type.name}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Follower Range Filter */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">FOLLOWER RANGE</h4>
                        <div className="space-y-2">
                            {FILTER_OPTIONS.followerRanges.map((range) => (
                                <Button
                                    key={range.name}
                                    variant="ghost"
                                    className={`w-full justify-start p-2 h-auto transition-all duration-200 ${
                                        selectedFollowerRange === range.name 
                                            ? 'bg-[#ef4444]/20 text-[#ef4444]' 
                                            : 'hover:bg-[#ef4444]/10'
                                    }`}
                                    onClick={() => setSelectedFollowerRange(selectedFollowerRange === range.name ? null : range.name)}
                                >
                                    <span>{range.name}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-8">
                        {/* Header */}
                        <div className="mb-10">
                            <div className="flex items-center mb-4">
                                <Gamepad2 className="w-8 h-8 text-[#ef4444] mr-3" />
                                <h1 className="text-4xl font-bold text-foreground">Game Collabs</h1>
                            </div>
                            <p className="text-muted-foreground max-w-2xl">
                                Connect with fellow streamers for multiplayer sessions, joint streams, or content partnerships. 
                                Expand your community through meaningful collaborations.
                            </p>
                        </div>

                        {/* Search and Create */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="relative w-96">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search collabs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-background border-border focus:border-[#ef4444]"
                                />
                            </div>
                            <Button 
                                className="bg-[#ef4444] hover:bg-[#dc2626] text-white"
                                onClick={handleNewCollabRequest}
                            >
                                <Plus className="mr-2 w-4 h-4" />
                                New Collab Request
                            </Button>
                        </div>

                        {/* Collab Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                            {filteredCollabs.map((collab) => (
                                <Card 
                                    key={collab.id}
                                    className="p-6 bg-[#0a0a0a] border-border hover:border-[#ef4444] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#ef4444]/20"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ef4444] to-[#8b5cf6] mr-3 flex items-center justify-center text-white font-bold">
                                                {collab.streamerName.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground">{collab.streamerName}</h3>
                                                <p className="text-sm text-muted-foreground">{collab.followers} followers</p>
                                            </div>
                                        </div>
                                        <Badge 
                                            variant="outline"
                                            className="text-xs"
                                            style={{ 
                                                color: collab.genreColor, 
                                                borderColor: collab.genreColor + "40"
                                            }}
                                        >
                                            {collab.genre}
                                        </Badge>
                                    </div>
                                    
                                    {/* Collab Details */}
                                    <div className="mb-4">
                                        <h4 className="text-lg font-medium mb-2 text-foreground">{collab.title}</h4>
                                        <p className="text-muted-foreground text-sm line-clamp-3">{collab.description}</p>
                                    </div>
                                    
                                    {/* Schedule and Status */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                                            <span className="text-sm text-muted-foreground">{collab.schedule}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div 
                                                className={`w-3 h-3 rounded-full mr-2 ${
                                                    collab.status === 'live' ? 'animate-pulse' : ''
                                                }`}
                                                style={{ backgroundColor: getStatusColor(collab.status) }}
                                            />
                                            <span className="text-sm text-foreground">{getStatusText(collab.status)}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Action Button */}
                                    {collab.status === 'live' || collab.status === 'online' ? (
                                        <Button 
                                            className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white"
                                            onClick={() => handleConnect(collab.streamerName)}
                                        >
                                            Connect
                                        </Button>
                                    ) : (
                                        <Button 
                                            variant="outline" 
                                            className="w-full border-border hover:border-[#ef4444] hover:text-[#ef4444]"
                                            onClick={() => handleMessage(collab.streamerName)}
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            Message
                                        </Button>
                                    )}
                                </Card>
                            ))}
                        </div>
                        
                        {/* Load More */}
                        <div className="text-center">
                            <Button 
                                variant="outline"
                                className="border-border hover:border-[#ef4444] hover:text-[#ef4444]"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Load More Collabs
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

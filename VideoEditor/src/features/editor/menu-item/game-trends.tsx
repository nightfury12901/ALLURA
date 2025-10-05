import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    Filter,
    Youtube, 
    Play, 
    Smartphone, 
    Star,
    Activity,
    TrendingUp,
    Bell,
    Home,
    Settings
} from "lucide-react";

// Game data
const TRENDING_GAMES = [
    {
        id: 1,
        name: "CyberSphere 2077",
        genre: "Action RPG",
        totalPlayers: "124.8K",
        isLive: true,
        platforms: [
            { name: "YouTube", icon: Youtube, count: "42.3K", color: "#3b82f6" },
            { name: "Twitch", icon: Play, count: "35.7K", color: "#8b5cf6" },
            { name: "Mobile", icon: Smartphone, count: "28.4K", color: "#10b981" },
            { name: "PC", icon: Star, count: "18.4K", color: "#f59e0b" }
        ]
    },
    {
        id: 2,
        name: "Galaxy Racers",
        genre: "Racing",
        totalPlayers: "98.3K",
        isLive: true,
        platforms: [
            { name: "YouTube", icon: Youtube, count: "34.1K", color: "#3b82f6" },
            { name: "Twitch", icon: Play, count: "28.5K", color: "#8b5cf6" },
            { name: "Mobile", icon: Smartphone, count: "22.7K", color: "#10b981" },
            { name: "PC", icon: Star, count: "13.0K", color: "#f59e0b" }
        ]
    },
    {
        id: 3,
        name: "Mystic Realms",
        genre: "MMORPG",
        totalPlayers: "156.2K",
        isLive: true,
        platforms: [
            { name: "YouTube", icon: Youtube, count: "52.8K", color: "#3b82f6" },
            { name: "Twitch", icon: Play, count: "45.3K", color: "#8b5cf6" },
            { name: "Mobile", icon: Smartphone, count: "38.6K", color: "#10b981" },
            { name: "PC", icon: Star, count: "19.5K", color: "#f59e0b" }
        ]
    },
    {
        id: 4,
        name: "Neon Striker",
        genre: "Fighting",
        totalPlayers: "87.5K",
        isLive: true,
        platforms: [
            { name: "YouTube", icon: Youtube, count: "32.1K", color: "#3b82f6" },
            { name: "Twitch", icon: Play, count: "28.4K", color: "#8b5cf6" },
            { name: "Mobile", icon: Smartphone, count: "18.7K", color: "#10b981" },
            { name: "PC", icon: Star, count: "8.3K", color: "#f59e0b" }
        ]
    },
    {
        id: 5,
        name: "Shadow Tactics",
        genre: "Strategy",
        totalPlayers: "76.9K",
        isLive: true,
        platforms: [
            { name: "YouTube", icon: Youtube, count: "28.5K", color: "#3b82f6" },
            { name: "Twitch", icon: Play, count: "22.8K", color: "#8b5cf6" },
            { name: "Mobile", icon: Smartphone, count: "17.3K", color: "#10b981" },
            { name: "PC", icon: Star, count: "8.3K", color: "#f59e0b" }
        ]
    },
    {
        id: 6,
        name: "Ocean Explorer",
        genre: "Adventure",
        totalPlayers: "134.6K",
        isLive: true,
        platforms: [
            { name: "YouTube", icon: Youtube, count: "46.2K", color: "#3b82f6" },
            { name: "Twitch", icon: Play, count: "38.7K", color: "#8b5cf6" },
            { name: "Mobile", icon: Smartphone, count: "32.1K", color: "#10b981" },
            { name: "PC", icon: Star, count: "17.6K", color: "#f59e0b" }
        ]
    }
];

const PLATFORM_STATS = [
    { name: "YouTube", icon: Youtube, count: "32.4K Streams", color: "#3b82f6" },
    { name: "Twitch", icon: Play, count: "28.7K Streams", color: "#8b5cf6" },
    { name: "Mobile", icon: Smartphone, count: "156.3K Games", color: "#10b981" },
    { name: "Console", icon: Play, count: "89.2K Games", color: "#ef4444" },
    { name: "PC", icon: Star, count: "124.7K Games", color: "#f59e0b" }
];

export const GameTrends = () => {
    const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
    const [liveUpdate, setLiveUpdate] = useState(true);

    // Simulate live data updates
    useEffect(() => {
        if (!liveUpdate) return;
        
        const interval = setInterval(() => {
            // This would update with real API data in production
            console.log("🔴 Live data refresh...");
        }, 5000);

        return () => clearInterval(interval);
    }, [liveUpdate]);

    const handlePlatformFilter = () => {
        console.log("Opening platform filter...");
    };

    const handleGameSelect = (gameName: string) => {
        alert(`Selected ${gameName} for content creation insights!`);
    };

    return (
        <div className="h-full flex flex-col bg-sidebar">
            {/* Header */}
            <div className="p-6 border-b border-border/20">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#8b5cf6] rounded-full flex items-center justify-center">
                            <Activity className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#ef4444] bg-clip-text text-transparent">
                            GAME TRENDS
                        </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Badge 
                            variant="secondary" 
                            className="bg-[#7c3aed] text-white px-3 py-1 text-xs"
                        >
                            LIVE ANALYTICS
                        </Badge>
                        <Bell className="w-5 h-5 text-muted-foreground" />
                    </div>
                </div>
                
                <p className="text-muted-foreground text-sm max-w-2xl">
                    Monitor popular games in real-time for informed content creation. Track live player counts, viewer engagement, and trending titles across all major platforms.
                </p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-6">
                    {/* Controls */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold text-foreground">Currently Trending</h2>
                        <div className="flex space-x-4">
                            <Button
                                variant="outline" 
                                className="border-[#8b5cf6] text-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white"
                                onClick={() => setSelectedPlatform("All Platforms")}
                            >
                                {selectedPlatform}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-border hover:border-[#8b5cf6]"
                                onClick={handlePlatformFilter}
                            >
                                <Filter className="w-4 h-4 mr-1" />
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {TRENDING_GAMES.map((game) => (
                            <Card 
                                key={game.id}
                                className="p-5 bg-[#0a0a0a] border-border hover:border-[#8b5cf6] transition-all duration-300 hover:-translate-y-1 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#8b5cf6]/20"
                                onClick={() => handleGameSelect(game.name)}
                            >
                                {/* Game Card Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-2">
                                        {game.isLive && (
                                            <>
                                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                                <span className="text-xs text-muted-foreground font-medium">LIVE</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="text-[#3b82f6] drop-shadow-lg">
                                            <Youtube className="w-4 h-4" />
                                        </div>
                                        <div className="text-[#8b5cf6] drop-shadow-lg">
                                            <Play className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Game Info */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-muted rounded-lg w-16 h-16 flex-shrink-0 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#ef4444] rounded-lg"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-lg">{game.name}</h3>
                                        <p className="text-sm text-muted-foreground">{game.genre}</p>
                                    </div>
                                </div>

                                {/* Platform Stats */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground font-medium">Total Players</span>
                                        <span className="font-bold text-foreground text-lg">{game.totalPlayers}</span>
                                    </div>
                                    
                                    {game.platforms.map((platform) => {
                                        const Icon = platform.icon;
                                        return (
                                            <div key={platform.name} className="flex items-center space-x-2">
                                                <Icon className="w-3 h-3" style={{ color: platform.color }} />
                                                <span className="text-muted-foreground flex-1 text-xs">{platform.name}</span>
                                                <span className="font-semibold text-foreground">{platform.count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Platform Distribution */}
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-6">Platform Distribution</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {PLATFORM_STATS.map((platform) => {
                                const Icon = platform.icon;
                                return (
                                    <Card 
                                        key={platform.name}
                                        className="p-4 bg-[#0a0a0a] border-border text-center hover:border-[#8b5cf6] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                                    >
                                        <div className="flex justify-center mb-3">
                                            <Icon 
                                                className="w-8 h-8 drop-shadow-lg" 
                                                style={{ color: platform.color }} 
                                            />
                                        </div>
                                        <p className="font-semibold text-foreground mb-1">{platform.name}</p>
                                        <p className="text-sm text-muted-foreground">{platform.count}</p>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

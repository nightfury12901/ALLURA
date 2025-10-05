import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    TrendingUp, 
    TrendingDown, 
    Minus,
    Eye, 
    Clock, 
    Heart, 
    Users,
    RefreshCw,
    ChevronDown,
    Download,
    User,
    Zap,
    Hash,
    Video,
    Activity
} from "lucide-react";

// Mock analytics data
const ANALYTICS_DATA = {
    summary: [
        {
            id: 'views',
            label: 'Total Views',
            value: '1.24M',
            change: 12.4,
            trend: 'up',
            icon: Eye,
            color: '#00b4b8',
            chartData: [12000, 19000, 15000, 20000, 18000, 22000, 24000]
        },
        {
            id: 'watchTime',
            label: 'Watch Time',
            value: '4.7K hrs',
            change: 8.2,
            trend: 'up',
            icon: Clock,
            color: '#f43f5e',
            chartData: [400, 700, 500, 900, 800, 1000, 1200]
        },
        {
            id: 'engagement',
            label: 'Engagement Rate',
            value: '7.8%',
            change: -0.3,
            trend: 'neutral',
            icon: Heart,
            color: '#a3a3a3',
            chartData: [6.8, 7.2, 7.0, 7.5, 7.3, 7.8, 8.0]
        },
        {
            id: 'followers',
            label: 'New Followers',
            value: '3,284',
            change: -2.1,
            trend: 'down',
            icon: Users,
            color: '#a3a3a3',
            chartData: [500, 450, 600, 550, 400, 350, 300]
        }
    ],
    platforms: [
        {
            name: 'YouTube',
            color: '#ff0000',
            updateTime: '2 min ago',
            metrics: {
                views: { value: '824K', change: 14.2, trend: 'up' },
                watchTime: { value: '3.1K hrs', change: 9.7, trend: 'up' },
                subscribers: { value: '1,842', change: -1.3, trend: 'down' },
                likes: { value: '42.8K', change: 5.4, trend: 'up' }
            },
            chartData: [120000, 190000, 150000, 180000, 200000, 240000]
        },
        {
            name: 'Instagram',
            color: '#e4405f',
            updateTime: '5 min ago',
            metrics: {
                impressions: { value: '286K', change: 8.9, trend: 'up' },
                engagement: { value: '6.2%', change: -0.8, trend: 'down' },
                followers: { value: '1,024', change: 3.1, trend: 'up' },
                saves: { value: '8.7K', change: 12.4, trend: 'up' }
            },
            chartData: [80000, 120000, 90000, 140000, 160000, 180000]
        },
        {
            name: 'TikTok',
            color: '#000000',
            updateTime: '1 min ago',
            metrics: {
                views: { value: '128K', change: 21.4, trend: 'up' },
                watchTime: { value: '412 hrs', change: 18.2, trend: 'up' },
                followers: { value: '418', change: 7.6, trend: 'up' },
                likes: { value: '9.2K', change: 15.3, trend: 'up' }
            },
            chartData: [20000, 40000, 60000, 80000, 100000, 120000]
        }
    ],
    recommendations: [
        {
            icon: Clock,
            title: 'Posting Time',
            description: 'Your audience is most active between 4-6 PM. Schedule posts during this window for 23% higher engagement.',
            bgColor: '#003d3f',
            iconColor: '#00b4b8'
        },
        {
            icon: Hash,
            title: 'Hashtag Strategy',
            description: 'Using 3-5 niche hashtags could increase your reach by 18%. Try: #GamingTips #StreamerLife #AlluraGaming',
            bgColor: '#4a0025',
            iconColor: '#f43f5e'
        },
        {
            icon: Video,
            title: 'Content Length',
            description: 'Videos under 3 minutes perform 42% better on your channel. Consider breaking longer content into parts.',
            bgColor: '#002b4a',
            iconColor: '#a3a3a3'
        }
    ]
};

export const Analytics = () => {
    const [timeRange, setTimeRange] = useState('Last 7 days');
    const [activeTab, setActiveTab] = useState('Weekly');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        // Simulate API call
        setTimeout(() => {
            setIsRefreshing(false);
        }, 2000);
    };

    const handleExport = () => {
        alert('Exporting analytics data...');
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up': return TrendingUp;
            case 'down': return TrendingDown;
            default: return Minus;
        }
    };

    const getTrendColor = (trend: string) => {
        switch (trend) {
            case 'up': return '#00b4b8';
            case 'down': return '#f43f5e';
            default: return '#a3a3a3';
        }
    };

    // Simple chart component (you could replace with a proper chart library)
    const MiniChart = ({ data, color }: { data: number[], color: string }) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min || 1;

        return (
            <div className="flex items-end h-10 space-x-1">
                {data.map((value, index) => {
                    const height = ((value - min) / range) * 32 + 4;
                    return (
                        <div
                            key={index}
                            className="flex-1 rounded-sm opacity-80"
                            style={{ 
                                height: `${height}px`,
                                backgroundColor: color
                            }}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col bg-sidebar">
            {/* Header */}
            <div className="bg-[#121212] border-b border-border/30 px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Activity className="w-6 h-6 text-[#00b4b8] mr-3" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
                            <p className="text-muted-foreground">Real-time insights for smarter growth</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <select 
                                className="bg-background border border-border rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00b4b8] text-foreground"
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>This year</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                        <Button 
                            className="bg-[#00b4b8] hover:bg-[#009a9e] text-white"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-8">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {ANALYTICS_DATA.summary.map((metric) => {
                            const Icon = metric.icon;
                            const TrendIcon = getTrendIcon(metric.trend);
                            const trendColor = getTrendColor(metric.trend);

                            return (
                                <Card 
                                    key={metric.id}
                                    className="p-6 bg-[#121212] border-border hover:border-[#00b4b8] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00b4b8]/20"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-muted-foreground text-sm">{metric.label}</p>
                                            <h3 className="text-3xl font-bold mt-2 text-foreground">{metric.value}</h3>
                                            <div className="flex items-center mt-2">
                                                <span 
                                                    className="flex items-center text-sm"
                                                    style={{ color: trendColor }}
                                                >
                                                    <TrendIcon className="w-4 h-4 mr-1" />
                                                    {Math.abs(metric.change)}%
                                                </span>
                                                <span className="text-muted-foreground text-sm ml-2">vs last week</span>
                                            </div>
                                        </div>
                                        <div 
                                            className="w-16 h-16 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: '#1a1a1a' }}
                                        >
                                            <Icon className="w-8 h-8" style={{ color: metric.color }} />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <MiniChart data={metric.chartData} color={metric.color} />
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Platform Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {ANALYTICS_DATA.platforms.map((platform) => (
                            <Card 
                                key={platform.name}
                                className="p-6 bg-[#121212] border-border hover:border-[#00b4b8] transition-all duration-300"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <div 
                                            className="w-6 h-6 rounded mr-3"
                                            style={{ backgroundColor: platform.color }}
                                        />
                                        <h3 className="font-bold text-foreground">{platform.name}</h3>
                                    </div>
                                    <Badge variant="secondary" className="text-xs">
                                        Updated {platform.updateTime}
                                    </Badge>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {Object.entries(platform.metrics).map(([key, metric]) => {
                                        const TrendIcon = getTrendIcon(metric.trend);
                                        const trendColor = getTrendColor(metric.trend);
                                        
                                        return (
                                            <div key={key}>
                                                <p className="text-muted-foreground text-sm capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </p>
                                                <p className="font-bold text-foreground">{metric.value}</p>
                                                <p className="text-xs flex items-center" style={{ color: trendColor }}>
                                                    <TrendIcon className="w-3 h-3 mr-1" />
                                                    {Math.abs(metric.change)}%
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="h-20">
                                    <MiniChart data={platform.chartData} color={platform.color} />
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* AI Recommendations */}
                    <Card className="p-6 bg-[#121212] border-border mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-foreground flex items-center">
                                <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                                AI-Powered Recommendations
                            </h3>
                            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                                Just now
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {ANALYTICS_DATA.recommendations.map((rec, index) => {
                                const Icon = rec.icon;
                                
                                return (
                                    <div key={index} className="bg-background p-4 rounded-lg border border-border">
                                        <div className="flex items-start">
                                            <div 
                                                className="p-2 rounded-lg mr-3"
                                                style={{ backgroundColor: rec.bgColor }}
                                            >
                                                <Icon 
                                                    className="w-5 h-5" 
                                                    style={{ color: rec.iconColor }} 
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-1 text-foreground">{rec.title}</h4>
                                                <p className="text-muted-foreground text-sm">{rec.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Engagement Trends */}
                    <Card className="p-6 bg-[#121212] border-border">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-foreground">Engagement Trends</h3>
                            <div className="flex space-x-2">
                                {['Daily', 'Weekly', 'Monthly'].map((tab) => (
                                    <Button
                                        key={tab}
                                        variant={activeTab === tab ? 'default' : 'ghost'}
                                        size="sm"
                                        className={`text-sm ${
                                            activeTab === tab 
                                                ? 'bg-[#00b4b8] hover:bg-[#009a9e] text-white' 
                                                : 'hover:bg-background'
                                        }`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="h-80 flex items-center justify-center">
                            <div className="text-center text-muted-foreground">
                                <div className="w-16 h-16 bg-[#1a1a1a] rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-[#00b4b8]" />
                                </div>
                                <p>Interactive charts would be rendered here</p>
                                <p className="text-sm">Integration with Chart.js, Recharts, or similar library</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
};

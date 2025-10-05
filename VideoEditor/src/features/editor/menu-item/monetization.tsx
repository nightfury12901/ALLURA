import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    DollarSign,
    TrendingUp,
    TrendingDown,
    Calendar,
    Download,
    RefreshCw,
    ExternalLink,
    CreditCard,
    Wallet,
    Target,
    Settings,
    ChevronDown,
    Eye,
    Users,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    BarChart3,
    Zap
} from "lucide-react";

// Revenue data
const REVENUE_DATA = {
    summary: [
        {
            id: 'totalRevenue',
            label: 'Total Revenue',
            value: '$12,847',
            change: 23.4,
            trend: 'up',
            icon: DollarSign,
            color: '#10b981',
            description: 'This month'
        },
        {
            id: 'avgRPM',
            label: 'Avg. RPM',
            value: '$4.82',
            change: 12.8,
            trend: 'up',
            icon: TrendingUp,
            color: '#3b82f6',
            description: 'Revenue per mille'
        },
        {
            id: 'activeStreams',
            label: 'Active Revenue Streams',
            value: '7',
            change: 2,
            trend: 'up',
            icon: Target,
            color: '#f59e0b',
            description: 'Income sources'
        },
        {
            id: 'pendingPayouts',
            label: 'Pending Payouts',
            value: '$3,284',
            change: -5.2,
            trend: 'down',
            icon: Clock,
            color: '#ef4444',
            description: 'Processing'
        }
    ],
    streams: [
        {
            id: 1,
            name: 'YouTube AdSense',
            logo: '🔴',
            revenue: 4847,
            percentage: 37.7,
            change: 15.2,
            trend: 'up',
            status: 'active',
            lastPayout: '2024-09-15',
            nextPayout: '2024-10-15',
            color: '#ff0000'
        },
        {
            id: 2,
            name: 'Twitch Revenue',
            logo: '🟣',
            revenue: 2934,
            percentage: 22.8,
            change: 8.7,
            trend: 'up',
            status: 'active',
            lastPayout: '2024-09-30',
            nextPayout: '2024-10-31',
            color: '#9146ff'
        },
        {
            id: 3,
            name: 'Brand Sponsorships',
            logo: '🤝',
            revenue: 2650,
            percentage: 20.6,
            change: 45.3,
            trend: 'up',
            status: 'active',
            lastPayout: '2024-09-25',
            nextPayout: '2024-10-25',
            color: '#10b981'
        },
        {
            id: 4,
            name: 'Affiliate Marketing',
            logo: '🛒',
            revenue: 1284,
            percentage: 10.0,
            change: -3.1,
            trend: 'down',
            status: 'active',
            lastPayout: '2024-09-20',
            nextPayout: '2024-10-20',
            color: '#f59e0b'
        },
        {
            id: 5,
            name: 'Merchandise Sales',
            logo: '👕',
            revenue: 847,
            percentage: 6.6,
            change: 28.4,
            trend: 'up',
            status: 'active',
            lastPayout: '2024-09-18',
            nextPayout: '2024-10-18',
            color: '#8b5cf6'
        },
        {
            id: 6,
            name: 'Course Sales',
            logo: '📚',
            revenue: 285,
            percentage: 2.2,
            change: 12.6,
            trend: 'up',
            status: 'active',
            lastPayout: '2024-09-10',
            nextPayout: '2024-10-10',
            color: '#06b6d4'
        }
    ],
    recentTransactions: [
        { id: 1, source: 'YouTube AdSense', amount: 1247, date: '2024-10-01', status: 'completed' },
        { id: 2, source: 'Red Bull Sponsorship', amount: 2000, date: '2024-09-28', status: 'completed' },
        { id: 3, source: 'Twitch Subs', amount: 456, date: '2024-09-25', status: 'completed' },
        { id: 4, source: 'Affiliate - Razer', amount: 189, date: '2024-09-24', status: 'pending' },
        { id: 5, source: 'Merch Store', amount: 89, date: '2024-09-22', status: 'completed' },
    ]
};

const OPTIMIZATION_TIPS = [
    {
        id: 1,
        title: 'Diversify Revenue Streams',
        description: 'Add 2-3 more income sources to reduce dependency risk',
        impact: 'High',
        effort: 'Medium',
        icon: Target,
        color: '#ef4444'
    },
    {
        id: 2,
        title: 'Optimize Upload Schedule',
        description: 'Post during peak hours to increase ad revenue by 18%',
        impact: 'Medium',
        effort: 'Low',
        icon: Calendar,
        color: '#f59e0b'
    },
    {
        id: 3,
        title: 'Launch Premium Membership',
        description: 'Create exclusive content tier for loyal subscribers',
        impact: 'High',
        effort: 'High',
        icon: Users,
        color: '#10b981'
    }
];

export const Monetization = () => {
    const [timeRange, setTimeRange] = useState('This Month');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeView, setActiveView] = useState('overview');

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 2000);
    };

    const handleExportReport = () => {
        alert('Generating revenue report...');
    };

    const handleOptimizeTip = (tipId: number) => {
        alert(`Implementing optimization tip ${tipId}!`);
    };

    const getTrendIcon = (trend: string) => {
        return trend === 'up' ? TrendingUp : TrendingDown;
    };

    const getTrendColor = (trend: string) => {
        return trend === 'up' ? '#10b981' : '#ef4444';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="h-full flex flex-col bg-sidebar">
            {/* Header */}
            <div className="bg-[#121212] border-b border-border/30 px-8 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <DollarSign className="w-6 h-6 text-[#10b981] mr-3" />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Monetization Dashboard</h1>
                            <p className="text-muted-foreground">Track and optimize your revenue streams</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <select 
                                className="bg-background border border-border rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#10b981] text-foreground"
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option>This Month</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                                <option>This Year</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                        <Button 
                            variant="outline"
                            className="border-border hover:border-[#10b981]"
                            onClick={handleExportReport}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Export Report
                        </Button>
                        <Button 
                            className="bg-[#10b981] hover:bg-[#059669] text-white"
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
                    {/* Revenue Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {REVENUE_DATA.summary.map((metric) => {
                            const Icon = metric.icon;
                            const TrendIcon = getTrendIcon(metric.trend);
                            const trendColor = getTrendColor(metric.trend);

                            return (
                                <Card 
                                    key={metric.id}
                                    className="p-6 bg-[#121212] border-border hover:border-[#10b981] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-muted-foreground text-sm">{metric.label}</p>
                                            <h3 className="text-3xl font-bold mt-2 text-foreground">{metric.value}</h3>
                                            <div className="flex items-center mt-2">
                                                <span 
                                                    className="flex items-center text-sm font-medium"
                                                    style={{ color: trendColor }}
                                                >
                                                    <TrendIcon className="w-4 h-4 mr-1" />
                                                    {Math.abs(metric.change)}%
                                                </span>
                                                <span className="text-muted-foreground text-sm ml-2">{metric.description}</span>
                                            </div>
                                        </div>
                                        <div 
                                            className="w-16 h-16 rounded-lg flex items-center justify-center"
                                            style={{ backgroundColor: '#1a1a1a' }}
                                        >
                                            <Icon className="w-8 h-8" style={{ color: metric.color }} />
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Revenue Streams Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Revenue Sources */}
                        <Card className="p-6 bg-[#121212] border-border">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-foreground flex items-center">
                                    <PieChart className="w-5 h-5 mr-2 text-[#10b981]" />
                                    Revenue Streams
                                </h3>
                                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                                    6 Active
                                </Badge>
                            </div>
                            
                            <div className="space-y-4">
                                {REVENUE_DATA.streams.map((stream) => {
                                    const TrendIcon = getTrendIcon(stream.trend);
                                    const trendColor = getTrendColor(stream.trend);
                                    
                                    return (
                                        <div key={stream.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                            <div className="flex items-center">
                                                <div className="text-2xl mr-3">{stream.logo}</div>
                                                <div>
                                                    <p className="font-medium text-foreground">{stream.name}</p>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <span>{formatCurrency(stream.revenue)}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{stream.percentage}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center" style={{ color: trendColor }}>
                                                    <TrendIcon className="w-4 h-4 mr-1" />
                                                    <span className="text-sm font-medium">{Math.abs(stream.change)}%</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">vs last month</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* Recent Transactions */}
                        <Card className="p-6 bg-[#121212] border-border">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-foreground flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-[#3b82f6]" />
                                    Recent Transactions
                                </h3>
                                <Button variant="ghost" size="sm">
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    View All
                                </Button>
                            </div>
                            
                            <div className="space-y-3">
                                {REVENUE_DATA.recentTransactions.map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                                        <div>
                                            <p className="font-medium text-foreground text-sm">{transaction.source}</p>
                                            <p className="text-xs text-muted-foreground">{transaction.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-foreground">{formatCurrency(transaction.amount)}</p>
                                            <Badge 
                                                variant="outline" 
                                                className={`text-xs ${
                                                    transaction.status === 'completed' 
                                                        ? 'border-green-500 text-green-400' 
                                                        : 'border-yellow-500 text-yellow-400'
                                                }`}
                                            >
                                                {transaction.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Optimization Recommendations */}
                    <Card className="p-6 bg-[#121212] border-border mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-foreground flex items-center">
                                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                                Revenue Optimization Tips
                            </h3>
                            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
                                AI Powered
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {OPTIMIZATION_TIPS.map((tip) => {
                                const Icon = tip.icon;
                                
                                return (
                                    <div key={tip.id} className="bg-background p-4 rounded-lg border border-border">
                                        <div className="flex items-start justify-between mb-3">
                                            <div 
                                                className="p-2 rounded-lg"
                                                style={{ backgroundColor: `${tip.color}20` }}
                                            >
                                                <Icon 
                                                    className="w-5 h-5" 
                                                    style={{ color: tip.color }} 
                                                />
                                            </div>
                                            <div className="flex space-x-1">
                                                <Badge 
                                                    variant="outline" 
                                                    className="text-xs"
                                                    style={{ 
                                                        borderColor: tip.color + '40',
                                                        color: tip.color 
                                                    }}
                                                >
                                                    {tip.impact} Impact
                                                </Badge>
                                            </div>
                                        </div>
                                        <h4 className="font-medium mb-2 text-foreground">{tip.title}</h4>
                                        <p className="text-muted-foreground text-sm mb-3">{tip.description}</p>
                                        <Button 
                                            size="sm" 
                                            className="w-full"
                                            style={{ 
                                                background: `linear-gradient(135deg, ${tip.color}, ${tip.color}90)`
                                            }}
                                            onClick={() => handleOptimizeTip(tip.id)}
                                        >
                                            Implement
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Payout Schedule */}
                    <Card className="p-6 bg-[#121212] border-border">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-foreground flex items-center">
                                <Wallet className="w-5 h-5 mr-2 text-[#8b5cf6]" />
                                Upcoming Payouts
                            </h3>
                            <Button variant="ghost" size="sm">
                                <Settings className="w-4 h-4 mr-1" />
                                Payout Settings
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {REVENUE_DATA.streams.slice(0, 3).map((stream) => (
                                <div key={stream.id} className="bg-background p-4 rounded-lg border border-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl">{stream.logo}</span>
                                        <Badge variant="outline" className="text-xs">
                                            {stream.status}
                                        </Badge>
                                    </div>
                                    <h4 className="font-medium text-foreground mb-1">{stream.name}</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Expected: {formatCurrency(stream.revenue * 0.8)}
                                    </p>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        <span>Next payout: {stream.nextPayout}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </ScrollArea>
        </div>
    );
};

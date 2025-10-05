import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
    Star,
    Inbox,
    Activity,
    Archive,
    FileText,
    HelpCircle,
    Settings,
    Calendar,
    DollarSign,
    Clock,
    Check,
    MessageSquare,
    X,
    Handshake
} from "lucide-react";

// Collaboration data
const BRAND_COLLABS = [
    {
        id: 1,
        brandName: "Energy Drink Campaign",
        brandLogo: "redbull.com",
        type: "Sponsorship",
        status: "active",
        description: "Create 3 Instagram posts featuring Red Bull during gaming sessions",
        dateRange: "Jun 15 - Jul 30",
        compensation: "$1,200 + product",
        timeLeft: "2 days left",
        statusColor: "#10b981",
        typeColor: "#f43f5e"
    },
    {
        id: 2,
        brandName: "Keyboard Review",
        brandLogo: "razer.com",
        type: "Product Review",
        status: "pending",
        description: "Review the new Razer BlackWidow keyboard in a 10-min YouTube video",
        dateRange: "Pending dates",
        compensation: "Product + $500",
        timeLeft: "Response needed",
        statusColor: "#f59e0b",
        typeColor: "#8b5cf6"
    },
    {
        id: 3,
        brandName: "Affiliate Program",
        brandLogo: "nordvpn.com",
        type: "Affiliate",
        status: "negotiation",
        description: "Promote NordVPN with your unique affiliate link for 30% commission",
        dateRange: "Ongoing",
        compensation: "30% commission",
        timeLeft: "Counter offer sent",
        statusColor: "#3b82f6",
        typeColor: "#10b981"
    },
    {
        id: 4,
        brandName: "Gaming Headset",
        brandLogo: "logitech.com",
        type: "Sponsorship",
        status: "completed",
        description: "Sponsored stream featuring Logitech G Pro X headset",
        dateRange: "May 1 - May 30",
        compensation: "$2,000 + product",
        timeLeft: "Completed",
        statusColor: "#6b7280",
        typeColor: "#f43f5e"
    },
    {
        id: 5,
        brandName: "Chair Giveaway",
        brandLogo: "secretlab.co",
        type: "Sponsorship",
        status: "pending",
        description: "Host a giveaway for a Secretlab Titan chair to your audience",
        dateRange: "Aug 1 - Aug 15",
        compensation: "Product + $800",
        timeLeft: "5 days to respond",
        statusColor: "#f59e0b",
        typeColor: "#f43f5e"
    },
    {
        id: 6,
        brandName: "Game Launch",
        brandLogo: "epicgames.com",
        type: "Sponsorship",
        status: "active",
        description: "Stream new game launch with Epic Games branding",
        dateRange: "Jul 10 - Jul 25",
        compensation: "$3,500",
        timeLeft: "In progress",
        statusColor: "#10b981",
        typeColor: "#f43f5e"
    }
];

const FILTER_OPTIONS = [
    { id: "all", label: "All" },
    { id: "sponsorships", label: "Sponsorships" },
    { id: "affiliate", label: "Affiliate" },
    { id: "reviews", label: "Product Reviews" },
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending" },
    { id: "urgent", label: "Urgent" }
];

export const BrandCollabs = () => {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedCollab, setSelectedCollab] = useState<any>(null);
    const [showDetailPanel, setShowDetailPanel] = useState(false);

    const filteredCollabs = BRAND_COLLABS.filter(collab => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "sponsorships") return collab.type === "Sponsorship";
        if (selectedFilter === "affiliate") return collab.type === "Affiliate";
        if (selectedFilter === "reviews") return collab.type === "Product Review";
        if (selectedFilter === "active") return collab.status === "active";
        if (selectedFilter === "pending") return collab.status === "pending";
        if (selectedFilter === "urgent") return collab.status === "pending";
        return true;
    });

    const handleCollabClick = (collab: any) => {
        setSelectedCollab(collab);
        setShowDetailPanel(true);
    };

    const handleAccept = (collabId: number) => {
        alert(`Accepted collaboration ${collabId}!`);
    };

    const handleNegotiate = (collabId: number) => {
        alert(`Opening negotiation for collaboration ${collabId}!`);
    };

    const handleMessage = (collabId: number) => {
        alert(`Opening message thread for collaboration ${collabId}!`);
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active": return "Active";
            case "pending": return "Pending";
            case "negotiation": return "Negotiation";
            case "completed": return "Completed";
            default: return status;
        }
    };

    const getStatusBgColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-900";
            case "pending": return "bg-amber-900";
            case "negotiation": return "bg-blue-900";
            case "completed": return "bg-gray-700";
            default: return "bg-gray-700";
        }
    };

    const getTypeBadgeStyle = (type: string) => {
        switch (type) {
            case "Sponsorship":
                return "bg-[#f43f5e]/20 text-[#f43f5e] border-[#f43f5e]/30";
            case "Affiliate":
                return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30";
            case "Product Review":
                return "bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    return (
        <div className="h-full flex bg-sidebar">
            {/* Sidebar */}
            <div className="w-64 bg-[#0a0a0a] border-r border-border/30 p-6">
                <div className="flex items-center mb-10">
                    <div className="w-10 h-10 rounded-full bg-[#f43f5e] flex items-center justify-center mr-3">
                        <Star className="text-black w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">ALLURA Studio</h2>
                </div>
                
                <nav className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Collaborations</h3>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <Inbox className="mr-3 w-4 h-4" />
                            <span>Incoming Deals</span>
                            <Badge className="ml-auto bg-[#f43f5e] text-black text-xs">3</Badge>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <Activity className="mr-3 w-4 h-4" />
                            <span>Active Collabs</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <Archive className="mr-3 w-4 h-4" />
                            <span>History</span>
                        </Button>
                    </div>
                    
                    <div className="space-y-2">
                        <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Resources</h3>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <FileText className="mr-3 w-4 h-4" />
                            <span>Contract Templates</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <HelpCircle className="mr-3 w-4 h-4" />
                            <span>Negotiation Guide</span>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                            <Settings className="mr-3 w-4 h-4" />
                            <span>Settings</span>
                        </Button>
                    </div>
                </nav>
                
                {/* Profile Section */}
                <div className="absolute bottom-6 left-6 right-6">
                    <Card className="p-4 bg-background border-border">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f43f5e] to-[#8b5cf6] mr-3 flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Sarah Creator</p>
                                <p className="text-xs text-muted-foreground">Content Creator</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    {/* Header */}
                    <div className="p-8 border-b border-border/30">
                        <div className="flex items-center mb-4">
                            <Handshake className="w-8 h-8 text-[#f43f5e] mr-3" />
                            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                                Brand <span className="text-[#f43f5e]">Collabs</span>
                            </h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                            Streamline your partnership journey — view, manage, and respond to all your brand deals effortlessly.
                        </p>
                        
                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-3">
                            {FILTER_OPTIONS.map((filter) => (
                                <Button
                                    key={filter.id}
                                    variant={selectedFilter === filter.id ? "default" : "ghost"}
                                    size="sm"
                                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                                        selectedFilter === filter.id 
                                            ? 'bg-[#f43f5e] hover:bg-[#e11d48] text-white' 
                                            : 'bg-background hover:bg-[#f43f5e] hover:text-white'
                                    }`}
                                    onClick={() => setSelectedFilter(filter.id)}
                                >
                                    {filter.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Collaboration Cards */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCollabs.map((collab) => (
                                <Card 
                                    key={collab.id}
                                    className={`p-6 bg-gradient-to-br from-[#171717] to-[#0d0d0d] border-border hover:border-[#f43f5e] transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4`}
                                    style={{ borderLeftColor: collab.statusColor }}
                                    onClick={() => handleCollabClick(collab)}
                                >
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mr-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-[#f43f5e] to-[#8b5cf6] rounded"></div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground">{collab.brandName}</h3>
                                                <Badge className={`text-xs px-2 py-1 rounded border ${getTypeBadgeStyle(collab.type)}`}>
                                                    {collab.type}
                                                </Badge>
                                            </div>
                                        </div>
                                        <Badge className={`text-xs px-2 py-1 rounded ${getStatusBgColor(collab.status)}`}>
                                            {getStatusText(collab.status)}
                                        </Badge>
                                    </div>
                                    
                                    {/* Description */}
                                    <div className="mb-4">
                                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                            {collab.description}
                                        </p>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            <span>{collab.dateRange}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Compensation and Time */}
                                    <div className="flex items-center justify-between text-xs mb-4">
                                        <div className="flex items-center text-foreground">
                                            <DollarSign className="w-3 h-3 mr-1" />
                                            <span>{collab.compensation}</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground">
                                            <Clock className="w-3 h-3 mr-1" />
                                            <span>{collab.timeLeft}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex space-x-2">
                                        {collab.status === 'pending' ? (
                                            <>
                                                <Button 
                                                    className="flex-1 bg-[#f43f5e] hover:bg-[#e11d48] text-white text-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAccept(collab.id);
                                                    }}
                                                >
                                                    Accept
                                                </Button>
                                                <Button 
                                                    variant="outline"
                                                    className="flex-1 border-[#155e75] hover:bg-[#155e75]/20 text-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNegotiate(collab.id);
                                                    }}
                                                >
                                                    Negotiate
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button 
                                                    className="flex-1 bg-[#f43f5e] hover:bg-[#e11d48] text-white text-sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    View Details
                                                </Button>
                                                <Button 
                                                    variant="outline"
                                                    className="flex-1 border-[#155e75] hover:bg-[#155e75]/20 text-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMessage(collab.id);
                                                    }}
                                                >
                                                    Message
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </div>

            {/* Detail Panel */}
            {showDetailPanel && selectedCollab && (
                <div className="fixed top-0 right-0 h-full w-96 bg-[#0a0a0a] border-l border-border z-50 transform transition-transform duration-300">
                    <div className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-foreground">Deal Details</h3>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setShowDetailPanel(false)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        
                        <ScrollArea className="flex-1">
                            <div className="space-y-6">
                                {/* Brand Info */}
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Brand</h4>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center mr-3">
                                            <div className="w-6 h-6 bg-gradient-to-br from-[#f43f5e] to-[#8b5cf6] rounded"></div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">{selectedCollab.brandName}</p>
                                            <p className="text-xs text-muted-foreground">Brand Partner</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Campaign Details */}
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Campaign Details</h4>
                                    <p className="mb-4 text-foreground">{selectedCollab.description}</p>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Type</p>
                                            <p className="text-foreground">{selectedCollab.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Compensation</p>
                                            <p className="text-foreground">{selectedCollab.compensation}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Duration</p>
                                            <p className="text-foreground">{selectedCollab.dateRange}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Status</p>
                                            <p className="text-foreground">{getStatusText(selectedCollab.status)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Deliverables */}
                                <div>
                                    <h4 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Deliverables</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start">
                                            <Check className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                                            <span className="text-sm text-foreground">Create engaging content featuring the product</span>
                                        </div>
                                        <div className="flex items-start">
                                            <Check className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                                            <span className="text-sm text-foreground">Include brand hashtags and mentions</span>
                                        </div>
                                        <div className="flex items-start">
                                            <Check className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                                            <span className="text-sm text-foreground">Provide analytics report post-campaign</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                        
                        {/* Action Buttons */}
                        <div className="pt-4 border-t border-border">
                            <div className="flex space-x-3">
                                <Button className="flex-1 bg-[#f43f5e] hover:bg-[#e11d48] text-white">
                                    View Full Contract
                                </Button>
                                <Button variant="outline" className="flex-1 border-[#155e75] hover:bg-[#155e75]/20">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Message Brand
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

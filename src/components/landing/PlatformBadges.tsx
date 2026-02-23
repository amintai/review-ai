import { MapPin, MessageCircle, ThumbsUp, Star } from "lucide-react";

export default function PlatformBadges() {
    const platforms = [
        { name: "Amazon", icon: ShoppingCart, color: "text-orange-500", bg: "bg-orange-50" },
        { name: "eBay", icon: Search, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Walmart", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
        { name: "BestBuy", icon: Star, color: "text-yellow-600", bg: "bg-yellow-50" },
    ];

    return (
        <div className="flex justify-center gap-4 py-8 flex-wrap">
            {platforms.map((p) => (
                <div
                    key={p.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 shadow-sm ${p.bg}`}
                >
                    <p.icon className={`h-4 w-4 ${p.color}`} />
                    <span className={`text-sm font-medium text-gray-700`}>{p.name}</span>
                </div>
            ))}
        </div>
    );
}

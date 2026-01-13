import { MapPin, MessageCircle, ThumbsUp, Star } from "lucide-react";

export default function PlatformBadges() {
    const platforms = [
        { name: "Google", icon: MapPin, color: "text-red-500", bg: "bg-red-50" },
        { name: "Yelp", icon: Star, color: "text-red-600", bg: "bg-red-50" },
        { name: "Facebook", icon: ThumbsUp, color: "text-blue-600", bg: "bg-blue-50" },
        { name: "TripAdvisor", icon: MessageCircle, color: "text-green-600", bg: "bg-green-50" },
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

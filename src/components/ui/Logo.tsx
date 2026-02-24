"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showWordmark?: boolean;
    className?: string;
}

const sizeConfig = {
    sm: { icon: "h-6 w-6", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-10 w-10", text: "text-2xl" },
};

export default function Logo({
    size = "md",
    showWordmark = true,
    className
}: LogoProps) {
    const config = sizeConfig[size];

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {/* Logo Icon - Star with R */}
            <div className="relative">
                <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(config.icon)}
                >
                    {/* Background rounded square */}
                    <rect
                        x="2"
                        y="2"
                        width="36"
                        height="36"
                        rx="8"
                        fill="url(#brandGradient)"
                    />

                    {/* Star icon */}
                    <path
                        d="M20 8L22.5 15.5H30L24 20L26.5 27.5L20 23L13.5 27.5L16 20L10 15.5H17.5L20 8Z"
                        fill="white"
                        fillOpacity="0.3"
                    />

                    {/* Letter R -> A */}
                    <text
                        x="20"
                        y="27"
                        textAnchor="middle"
                        fill="white"
                        fontSize="18"
                        fontWeight="900"
                        fontFamily="system-ui, -apple-system, sans-serif"
                    >
                        R
                    </text>

                    {/* Gradient definition */}
                    <defs>
                        <linearGradient
                            id="brandGradient"
                            x1="2"
                            y1="2"
                            x2="38"
                            y2="38"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop stopColor="#ea580c" />
                            <stop offset="1" stopColor="#f59e0b" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Wordmark */}
            {showWordmark && (
                <span className={cn(
                    "font-black tracking-tighter text-gray-900 dark:text-white",
                    config.text
                )}>
                    Review<span className="text-orange-600">AI</span>.pro
                </span>
            )}
        </div>
    );
}

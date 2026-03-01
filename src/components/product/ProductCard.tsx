"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardHoverEffect } from '@/components/ui/card-hover-effect';
import { getPersona } from '@/lib/personas';
import { ArrowRight, Check, X, AlertCircle, FileText, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    id: string;
    asin: string;
    productName: string;
    brand?: string;
    rating?: string;
    reviewCount?: string;
    price?: string;
    currency?: string;
    category?: string;
    imageUrl?: string;
    availability?: string;
    createdAt: string;
    analysisResult: {
        verdict?: string;
        summary?: string;
        trust_score?: number;
        confidence_score?: number;
    } | null;
    personaUsed?: string | null;
}

function getVerdictStyle(verdict?: string) {
    switch (verdict?.toUpperCase()) {
        case 'BUY': return {
            badgeVariant: 'verdictBuy' as const,
            leftBorder: 'border-l-2 border-l-emerald-400',
            icon: <Check size={14} className="text-[#10B981]" />,
            mood: 'Green light',
            color: '#10B981'
        };
        case 'SKIP': return {
            badgeVariant: 'verdictSkip' as const,
            leftBorder: 'border-l-2 border-l-red-400',
            icon: <X size={14} className="text-[#EF4444]" />,
            mood: 'Hard pass',
            color: '#EF4444'
        };
        case 'CAUTION': return {
            badgeVariant: 'verdictCaution' as const,
            leftBorder: 'border-l-2 border-l-amber-400',
            icon: <AlertCircle size={14} className="text-[#F59E0B]" />,
            mood: 'Mixed signals',
            color: '#F59E0B'
        };
        default: return {
            badgeVariant: 'outline' as const,
            leftBorder: 'border-l border-l-border',
            icon: <FileText size={14} className="text-muted-foreground" />,
            mood: 'Pending',
            color: '#6B7280'
        };
    }
}

function formatRating(rating?: string): { stars: number; text: string } | null {
    if (!rating) return null;
    
    // Extract rating number from text like "4.3 out of 5 stars"
    const match = rating.match(/(\d+\.?\d*)/);
    if (!match) return null;
    
    const stars = parseFloat(match[1]);
    return { stars, text: rating };
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`${
                        star <= rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : star - 0.5 <= rating 
                                ? 'text-yellow-400 fill-yellow-400/50' 
                                : 'text-gray-300'
                    }`}
                />
            ))}
        </div>
    );
}

export default function ProductCard({
    id,
    asin,
    productName,
    brand,
    rating,
    reviewCount,
    price,
    currency,
    category,
    imageUrl,
    availability,
    createdAt,
    analysisResult,
    personaUsed
}: ProductCardProps) {
    const style = getVerdictStyle(analysisResult?.verdict);
    const trustScore = analysisResult?.trust_score ?? 85;
    const confScore = analysisResult?.confidence_score ?? 92;
    const persona = getPersona(personaUsed as any);
    const ratingData = formatRating(rating);

    return (
        <Link href={`/report/${id}`} className="block h-full">
            <CardHoverEffect className={`${style.leftBorder} h-full flex flex-col`}>
                <div className="p-4 flex flex-col gap-3 h-full">
                    {/* Product Header with Image - Fixed Height */}
                    <div className="flex gap-3 min-h-[80px]">
                        {/* Product Image - Consistent size */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 shadow-sm">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={productName}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                    unoptimized={imageUrl.includes('amazon')}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling as HTMLElement;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div 
                                className="w-full h-full bg-gray-200 flex items-center justify-center"
                                style={{ display: imageUrl ? 'none' : 'flex' }}
                            >
                                <FileText size={20} className="text-gray-400" />
                            </div>
                        </div>

                        {/* Product Info - Flexible height */}
                        <div className="flex-1 min-w-0 space-y-1.5">
                            {/* Brand and Rating Row */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {brand && (
                                    <Badge variant="outline" className="text-[10px] font-semibold px-1.5 py-0.5 h-5">
                                        {brand}
                                    </Badge>
                                )}
                                {ratingData && (
                                    <div className="flex items-center gap-1">
                                        <StarRating rating={ratingData.stars} size={10} />
                                        <span className="text-xs font-semibold text-gray-700">
                                            {ratingData.stars}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Product Name - Fixed height with line clamp */}
                            <h4 className="text-xs font-semibold text-foreground line-clamp-2 leading-tight h-8">
                                {productName}
                            </h4>

                            {/* Price and Category */}
                            <div className="flex items-center gap-2 flex-wrap">
                                {price && (
                                    <span className="text-sm font-bold text-gray-900">
                                        {currency}{price}
                                    </span>
                                )}
                                {category && (
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 h-4">
                                        {category}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Verdict and Persona Row - Fixed Height */}
                    <div className="flex justify-between items-center min-h-[24px]">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant={style.badgeVariant}
                                className="gap-1 px-2 py-0.5 text-[10px] h-5"
                            >
                                {style.icon}
                                <span className="uppercase">
                                    {analysisResult?.verdict || 'PENDING'}
                                </span>
                            </Badge>
                            
                            {/* Persona Badge */}
                            {persona && (() => {
                                const PersonaIcon = persona.icon;
                                return (
                                    <Badge
                                        variant="outline"
                                        className="gap-1 px-1.5 py-0.5 text-[9px] border-dashed h-5"
                                        style={{ 
                                            color: persona.color, 
                                            borderColor: `${persona.color}60`,
                                            backgroundColor: `${persona.color}08`
                                        }}
                                    >
                                        <PersonaIcon size={8} />
                                        {persona.label}
                                    </Badge>
                                );
                            })()}
                        </div>

                        <div className="text-right">
                            <span className="block text-[10px] text-muted-foreground" suppressHydrationWarning>
                                {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Summary - Flexible height but constrained */}
                    {analysisResult?.summary && (
                        <div className="flex-1 min-h-[32px]">
                            <p className="text-[11px] text-secondary line-clamp-2 leading-relaxed">
                                {analysisResult.summary}
                            </p>
                        </div>
                    )}

                    {/* Scores and Action - Fixed bottom */}
                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="trust"
                                className="text-[10px] px-2 py-0.5 h-5"
                            >
                                Trust {trustScore}
                            </Badge>
                            <Badge
                                variant="confidence"
                                className="text-[10px] px-2 py-0.5 h-5"
                            >
                                Conf {confScore}
                            </Badge>
                        </div>

                        <div className="w-6 h-6 rounded-lg bg-[#F9F8F6] border border-[#EBEBF0] flex items-center justify-center text-gray-300 group-hover:bg-[#FFF2ED] group-hover:border-[#FF6B35]/30 group-hover:text-[#FF6B35] transition-all">
                            <ArrowRight className="w-3 h-3" />
                        </div>
                    </div>

                    {/* Persona Context - Only if persona was used */}
                    {persona && (
                        <div 
                            className="text-[10px] p-2 rounded-lg border-l-2 -mx-1"
                            style={{ 
                                backgroundColor: `${persona.color}05`,
                                borderLeftColor: persona.color
                            }}
                        >
                            <span className="font-medium" style={{ color: persona.color }}>
                                {persona.label}:
                            </span>
                            <span className="text-gray-600 ml-1">
                                {persona.description}
                            </span>
                        </div>
                    )}
                </div>
            </CardHoverEffect>
        </Link>
    );
}
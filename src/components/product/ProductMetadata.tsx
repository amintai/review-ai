"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, ShoppingCart, Package, Tag } from 'lucide-react';
import Image from 'next/image';

interface ProductMetadataProps {
    productName: string;
    brand?: string;
    rating?: string;
    reviewCount?: string;
    price?: string;
    currency?: string;
    category?: string;
    imageUrl?: string;
    availability?: string;
    asin: string;
    amazonUrl?: string;
    className?: string;
}

function formatRating(rating?: string): { stars: number; text: string } | null {
    if (!rating) return null;
    
    // Extract rating number from text like "4.3 out of 5 stars"
    const match = rating.match(/(\d+\.?\d*)/);
    if (!match) return null;
    
    const stars = parseFloat(match[1]);
    return { stars, text: rating };
}

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
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

export default function ProductMetadata({
    productName,
    brand,
    rating,
    reviewCount,
    price,
    currency,
    category,
    imageUrl,
    availability,
    asin,
    amazonUrl,
    className
}: ProductMetadataProps) {
    const ratingData = formatRating(rating);
    const isInStock = availability?.toLowerCase().includes('stock');
    const isAvailable = availability?.toLowerCase().includes('available');

    return (
        <div className={`bg-white rounded-2xl border p-6 ${className}`} style={{ borderColor: '#EBEBF0' }}>
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                    <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={productName}
                                width={160}
                                height={160}
                                className="w-full h-full object-cover"
                                unoptimized={imageUrl.includes('amazon')} // Skip optimization for Amazon images if needed
                                onError={(e) => {
                                    // Hide broken image and show fallback
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
                            <Package size={32} className="text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                    {/* Brand and Category */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {brand && (
                            <Badge variant="outline" className="gap-1 px-2 py-1">
                                <Tag size={12} />
                                {brand}
                            </Badge>
                        )}
                        {category && (
                            <Badge variant="secondary" className="px-2 py-1">
                                {category}
                            </Badge>
                        )}
                        <span className="text-xs text-gray-400 font-mono">
                            ASIN: {asin}
                        </span>
                    </div>

                    {/* Product Name */}
                    <h1 className="font-[Syne] font-bold text-xl lg:text-2xl text-gray-900 leading-tight">
                        {productName}
                    </h1>

                    {/* Rating and Reviews */}
                    {ratingData && (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <StarRating rating={ratingData.stars} />
                                <span className="font-semibold text-gray-900">
                                    {ratingData.stars}
                                </span>
                            </div>
                            {reviewCount && (
                                <span className="text-sm text-gray-600">
                                    {reviewCount}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Price and Availability */}
                    <div className="flex items-center gap-4 flex-wrap">
                        {price && (
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    {currency}{price}
                                </span>
                            </div>
                        )}
                        
                        {availability && (
                            <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                    isInStock ? 'bg-green-500' : 
                                    isAvailable ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                                <span className={`text-sm font-medium ${
                                    isInStock ? 'text-green-700' : 
                                    isAvailable ? 'text-yellow-700' : 'text-red-700'
                                }`}>
                                    {availability}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    {amazonUrl && (
                        <div className="pt-2">
                            <Button
                                asChild
                                className="bg-[#FF9900] hover:bg-[#FF9900]/90 text-white font-semibold gap-2"
                            >
                                <a 
                                    href={amazonUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center"
                                >
                                    <ShoppingCart size={16} />
                                    View on Amazon
                                    <ExternalLink size={14} />
                                </a>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
"use client";

import { Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

interface ReportActionsProps {
    reportId: string;
    asin: string;
    amazonUrl: string;
}

export default function ReportActions({ reportId, asin, amazonUrl }: ReportActionsProps) {
    const handleShare = () => {
        trackEvent('report_shared', { report_id: reportId, asin });
        if (navigator.share) {
            navigator.share({
                title: 'ReviewAI Analysis Report',
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Report link copied to clipboard!');
        }
    };

    const handleAmazonClick = () => {
        trackEvent('view_on_amazon_clicked', { report_id: reportId, asin });
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="gap-2 cursor-pointer text-xs font-medium border-[#EBEBF0] hover:border-[#FF6B35] hover:text-white transition-colors"
                onClick={handleShare}
            >
                <Share2 className="w-3.5 h-3.5" />
                Share
            </Button>
            <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAmazonClick}
            >
                <Button
                    size="sm"
                    className="cursor-pointer gap-2 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-white"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Amazon
                </Button>
            </a>
        </div>
    );
}

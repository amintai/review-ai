"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPersona, PERSONA_LIST } from '@/lib/personas';
import { ArrowRight, Users, Lightbulb, Target } from 'lucide-react';

interface PersonaExplainerProps {
    activePersona: string | null;
    verdict: string;
    productName: string;
    onComparePersonas?: () => void;
    onChangePersona?: (personaId: string) => void;
    className?: string;
}

export default function PersonaExplainer({
    activePersona,
    verdict,
    productName,
    onComparePersonas,
    onChangePersona,
    className
}: PersonaExplainerProps) {
    const persona = getPersona(activePersona as any);
    
    if (!persona) {
        return (
            <Card className={`p-4 border-dashed border-gray-300 ${className}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Users size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                            Generic Analysis
                        </h3>
                        <p className="text-xs text-gray-500">
                            This analysis uses our standard evaluation criteria. 
                            <button 
                                onClick={() => onChangePersona?.('budget_buyer')}
                                className="text-primary hover:underline ml-1"
                            >
                                Try a persona for personalized insights
                            </button>
                        </p>
                    </div>
                </div>
            </Card>
        );
    }

    const PersonaIcon = persona.icon;
    const verdictColor = verdict === 'BUY' ? '#10B981' : verdict === 'SKIP' ? '#EF4444' : '#F59E0B';

    return (
        <Card 
            className={`p-4 border-l-4 ${className}`}
            style={{ borderLeftColor: persona.color }}
        >
            <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${persona.color}15` }}
                        >
                            <PersonaIcon size={20} style={{ color: persona.color }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 text-sm">
                                    {persona.label} Analysis
                                </h3>
                                <Badge 
                                    variant="outline" 
                                    className="text-xs px-2 py-0.5"
                                    style={{ 
                                        color: verdictColor,
                                        borderColor: `${verdictColor}40`,
                                        backgroundColor: `${verdictColor}08`
                                    }}
                                >
                                    {verdict}
                                </Badge>
                            </div>
                            <p className="text-xs text-gray-500">
                                {persona.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Explanation */}
                <div 
                    className="p-3 rounded-lg border"
                    style={{ 
                        backgroundColor: `${persona.color}05`,
                        borderColor: `${persona.color}20`
                    }}
                >
                    <div className="flex items-start gap-2">
                        <Lightbulb size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-gray-700">
                            <span className="font-medium">Why this verdict for {persona.label}s:</span>
                            <p className="mt-1 leading-relaxed">
                                {getPersonaExplanation(persona.id as any, verdict, productName)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                        <Target size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                            Personalized for your buying style
                        </span>
                    </div>
                    
                    {onComparePersonas && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onComparePersonas}
                            className="h-7 px-2 text-xs font-medium text-primary hover:text-primary/80"
                        >
                            Compare personas
                            <ArrowRight size={12} className="ml-1" />
                        </Button>
                    )}
                </div>

                {/* Quick Persona Switcher */}
                {onChangePersona && (
                    <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1 flex-wrap">
                            <span className="text-xs text-gray-500 mr-2">Try:</span>
                            {PERSONA_LIST.filter(p => p.id !== activePersona).slice(0, 3).map((p) => {
                                const Icon = p.icon;
                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => onChangePersona(p.id)}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border border-gray-200 hover:border-gray-300 transition-colors"
                                        style={{ color: p.color }}
                                    >
                                        <Icon size={10} />
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}

function getPersonaExplanation(personaId: string, verdict: string, productName: string): string {
    const explanations = {
        budget_buyer: {
            BUY: "This product offers good value for money. The core functionality works well at this price point, making it a smart purchase for cost-conscious buyers.",
            SKIP: "The price doesn't justify the value you'd get. There are likely better alternatives that offer more bang for your buck.",
            CAUTION: "While the price seems reasonable, there are some concerns about long-term value. Consider if the potential issues are worth the savings."
        },
        durability_focused: {
            BUY: "This product shows strong signs of long-term reliability. Reviews indicate it holds up well over time, making it worth the investment.",
            SKIP: "There are concerning patterns about durability and longevity. This product may not last as long as you'd want for the price.",
            CAUTION: "Mixed signals on durability. Some users report good longevity while others have issues. Consider your usage patterns carefully."
        },
        risk_averse: {
            BUY: "Despite thorough analysis, this product shows consistently positive patterns with minimal red flags. It's a safe choice.",
            SKIP: "Too many potential issues and red flags detected. The risks outweigh the benefits for conservative buyers.",
            CAUTION: "Several concerning signals detected. While not necessarily deal-breakers, these issues warrant careful consideration before purchasing."
        },
        tech_enthusiast: {
            BUY: "Technical specifications match marketing claims, and performance reviews from knowledgeable users are positive. Specs deliver as promised.",
            SKIP: "Significant gaps between advertised specs and real-world performance. Technical reviews reveal disappointing implementation.",
            CAUTION: "Some technical aspects are solid while others fall short. Review the specific technical details that matter most to you."
        },
        gift_buyer: {
            BUY: "Great choice for gifting - good packaging, accurate sizing, and easy returns if needed. Recipients typically have positive experiences.",
            SKIP: "Poor gift choice due to sizing issues, packaging problems, or difficult returns. High risk of disappointing the recipient.",
            CAUTION: "Could work as a gift but has some risks like sizing variability or return complications. Know your recipient's preferences well."
        }
    };

    return explanations[personaId as keyof typeof explanations]?.[verdict as keyof typeof explanations.budget_buyer] 
        || "This analysis is tailored to your specific buying priorities and preferences.";
}
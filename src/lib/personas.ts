import type { LucideIcon } from 'lucide-react';
import { DollarSign, Wrench, Shield, Zap, Gift } from 'lucide-react';

export type PersonaId =
    | 'budget_buyer'
    | 'durability_focused'
    | 'risk_averse'
    | 'tech_enthusiast'
    | 'gift_buyer';

export interface Persona {
    id: PersonaId;
    label: string;
    icon: LucideIcon;
    color: string;   // tailwind / hex accent for the chip
    description: string;
    promptModifier: string;
}

export const PERSONAS: Record<PersonaId, Persona> = {
    budget_buyer: {
        id: 'budget_buyer',
        label: 'Budget Buyer',
        icon: DollarSign,
        color: '#16a34a',
        description: 'Best value for money, tolerates minor flaws',
        promptModifier: `The user is a budget-conscious buyer who carefully evaluates every rupee spent.
CRITICAL: For products over ₹50,000, apply extra scrutiny on price-to-performance ratio and mention specific price concerns.
Prioritize value-for-money signals above all else - always mention if the product is "expensive" or "good value".
Heavily weight any reviews mentioning "overpriced", "expensive", "cheaper alternatives", or "not worth the money".
Downweight complaints about premium features, aesthetics, or build quality if the core function is solid.
Verdict should lean CAUTION for premium products unless exceptional value is clearly proven.
Perfect_for should focus on "budget-conscious users", "students", "cost-sensitive professionals", "value seekers".
Deal_breakers should include price-related concerns like "expensive compared to alternatives" or "poor value for money".`,
    },
    durability_focused: {
        id: 'durability_focused',
        label: 'Durability Focused',
        icon: Wrench,
        color: '#d97706',
        description: 'Long-term reliability over everything',
        promptModifier: `The user prioritizes long-term reliability and plans to keep this product for 5+ years.
Any review mentioning failure, breakdown, or degradation within 12-24 months should heavily weight the verdict toward CAUTION or SKIP, regardless of how many 5-star reviews exist.
Weight long-term ownership reviews ("still working after 2+ years") as the strongest positive signal.
Heavily penalize products with sealed designs, non-replaceable batteries, or limited repairability.
Flag concerns about serviceability, component longevity, and upgrade limitations.
Perfect_for should emphasize "long-term users", "business professionals", "users keeping products 5+ years", "reliability-focused buyers".
Deal_breakers should include repairability concerns, sealed designs, and any documented longevity issues.
Verdict should lean SKIP if any documented failure cluster exists or if the product has poor repairability.`,
    },
    risk_averse: {
        id: 'risk_averse',
        label: 'Risk-Averse',
        icon: Shield,
        color: '#2563eb',
        description: 'Would rather miss a good product than buy a bad one',
        promptModifier: `The user is highly risk-averse and prefers to miss a good product rather than buy a bad one.
Apply a pessimism filter to all borderline cases — any significant ambiguity in the review pattern should resolve toward CAUTION rather than BUY.
Amplify all warning signals and surface every documented complaint regardless of frequency.
Flag compatibility issues, learning curves, ecosystem lock-ins, and potential buyer's remorse scenarios.
Weight negative reviews more heavily than positive ones when making verdict decisions.
Perfect_for should focus on "conservative buyers", "risk-averse users", "those who research extensively".
Deal_breakers should include any potential compatibility, learning curve, or post-purchase regret scenarios.
The summary should lead with risks and potential problems, not benefits.`,
    },
    tech_enthusiast: {
        id: 'tech_enthusiast',
        label: 'Tech Enthusiast',
        icon: Zap,
        color: '#7c3aed',
        description: 'Spec accuracy, technical depth, performance data',
        promptModifier: `The user is technically sophisticated and cares about spec accuracy, real-world performance data, and technical implementation details.
Weight reviews from buyers who demonstrate technical knowledge, provide benchmarks, or discuss technical specifications more heavily.
Flag any gap between marketing claims and actual measured performance - this is a major deal-breaker.
Prioritize reviews that mention specific technical details, compatibility issues, performance metrics, or software optimization.
"Works as advertised" is weak signal — "accurate to spec with consistent results across units" or "benchmarks match claims" is strong signal.
Perfect_for should focus on "tech enthusiasts", "power users", "developers", "performance-focused professionals".
Deal_breakers should prominently feature firmware issues, compatibility problems, performance gaps, and technical limitations.
Surface technical concerns about architecture, optimization, and future-proofing prominently.`,
    },
    gift_buyer: {
        id: 'gift_buyer',
        label: 'Gift Buyer',
        icon: Gift,
        color: '#ec4899',
        description: 'Buying for someone else — packaging, fit, returns matter',
        promptModifier: `The user is buying this as a gift for someone else.
Prioritize signals about: packaging condition on arrival, size and fit accuracy (for clothing/accessories), return process ease if the gift is wrong, and recipient experience rather than personal use experience.
Downweight performance reviews that require personal sustained use to evaluate.
Flag any reviews mentioning damaged packaging, wrong sizing, or difficult returns.
The perfect_for array should describe gift recipient types, not personal use cases.`,
    },
};

export const PERSONA_LIST = Object.values(PERSONAS);

export function getPersona(id: PersonaId | null | undefined): Persona | null {
    if (!id) return null;
    return PERSONAS[id] ?? null;
}

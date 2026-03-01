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
        promptModifier: `The user is a budget-conscious buyer.
Prioritize value-for-money signals above all else.
Downweight complaints about premium features, aesthetics, or build quality if the core function is solid.
Amplify any reviews mentioning core function failure, deceptive pricing, or poor durability-to-price ratio.
Verdict should lean BUY if core use case is validated at the price point.`,
    },
    durability_focused: {
        id: 'durability_focused',
        label: 'Durability Focused',
        icon: Wrench,
        color: '#d97706',
        description: 'Long-term reliability over everything',
        promptModifier: `The user prioritizes long-term reliability above all else.
Any review mentioning failure, breakdown, or degradation within 12 months should heavily weight the verdict toward CAUTION or SKIP, regardless of how many 5-star reviews exist.
Weight long-term ownership reviews ("still working after 2 years") as the strongest positive signal.
Expand the deal_breakers array to surface all longevity-related complaints.
Verdict should lean SKIP if any documented failure cluster exists.`,
    },
    risk_averse: {
        id: 'risk_averse',
        label: 'Risk-Averse',
        icon: Shield,
        color: '#2563eb',
        description: 'Would rather miss a good product than buy a bad one',
        promptModifier: `The user is highly risk-averse and prefers to miss a good product rather than buy a bad one.
Apply a pessimism filter to all borderline cases — any significant ambiguity in the review pattern should resolve toward CAUTION rather than BUY.
Amplify all warning signals. Surface every documented complaint regardless of frequency.
The summary should lead with risks, not benefits.`,
    },
    tech_enthusiast: {
        id: 'tech_enthusiast',
        label: 'Tech Enthusiast',
        icon: Zap,
        color: '#7c3aed',
        description: 'Spec accuracy, technical depth, performance data',
        promptModifier: `The user is technically sophisticated and cares about spec accuracy and real-world performance data.
Weight reviews from buyers who demonstrate technical knowledge more heavily.
Flag any gap between marketing claims and actual measured performance.
"Works as advertised" is weak signal — "accurate to spec with consistent results across units" is strong signal.
Surface firmware, compatibility, and build tolerance issues prominently.`,
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

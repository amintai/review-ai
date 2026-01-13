"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Award, Server, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const companies = [
    { name: "TechFlow", logo: "TF" },
    { name: "GlobalMart", logo: "GM" },
    { name: "CityDental", logo: "CD" },
    { name: "CafeRoma", logo: "CR" },
    { name: "LegalEase", logo: "LE" },
    { name: "HealthPlus", logo: "HP" },
    { name: "UrbanEats", logo: "UE" },
    { name: "PetPals", logo: "PP" },
];

const certifications = [
    {
        title: "GDPR Compliant",
        description: "Fully compliant with EU data protection regulations.",
        icon: ShieldCheck,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "SOC 2 Ready",
        description: "Enterprise-grade security controls and monitoring.",
        icon: Lock,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "AES-256 Encrypted",
        description: "Bank-level encryption for all stored data.",
        icon: Server,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        title: "Google Verified",
        description: "Official Google Business Profile API Partner.",
        icon: CheckCircle2,
        color: "text-amber-600",
        bg: "bg-amber-50"
    }
];

export default function TrustSection() {
    return (
        <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* 1. Trusted By Marquee */}
                <div className="text-center mb-24">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-10">
                        Empowering 1,000+ businesses worldwide
                    </p>

                    <div className="relative group overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                        <div className="flex w-fit animate-marquee gap-16 py-4">
                            {[...companies, ...companies, ...companies].map((company, i) => (
                                <div key={i} className="flex items-center gap-4 group/logo shrink-0">
                                    <div className="h-12 w-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 group-hover/logo:border-blue-200 group-hover/logo:bg-blue-50 transition-all duration-300">
                                        <span className="text-sm font-black text-gray-400 group-hover/logo:text-blue-600 tracking-tighter">
                                            {company.logo}
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-gray-400 group-hover/logo:text-gray-900 transition-colors">
                                        {company.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Certifications & Authority Grid */}
                <div className="relative">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Enterprise Safety & Compliance</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Your reputation is safe with us. We maintain the highest standards of data sovereignty and privacy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-50 hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3", cert.bg)}>
                                    <cert.icon className={cn("h-7 w-7", cert.color)} />
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-3">{cert.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                    {cert.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 3. Review Ratings Strip */}
                <div className="mt-32 pt-20 border-t border-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 items-center max-w-5xl mx-auto">
                        <div className="text-center px-4">
                            <div className="flex items-center justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 text-amber-400 fill-current" />)}
                            </div>
                            <p className="text-2xl font-black text-gray-900 mb-1">4.9/5</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rated on Capterra</p>
                        </div>

                        <div className="text-center px-4 border-gray-100 md:border-x">
                            <div className="flex items-center justify-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 text-emerald-500 fill-current" />)}
                            </div>
                            <p className="text-2xl font-black text-gray-900 mb-1">Excellent</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">on Trustpilot</p>
                        </div>

                        <div className="text-center px-4">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Award className="h-8 w-8 text-blue-600" />
                            </div>
                            <p className="text-2xl font-black text-gray-900 mb-1">High Performer</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Winter 2025 Edition</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

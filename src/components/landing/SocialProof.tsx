import PlatformBadges from "./PlatformBadges";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function SocialProof() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Platform Support */}
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Works seamlessly with</p>
                    <PlatformBadges />
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            text: "I used to spend 2 hours a week on reviews. Now it takes 5 minutes, and the replies actually sound like ME.",
                            author: "Sarah J.",
                            role: "Cafe Owner",
                            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                        },
                        {
                            text: "The 'friendly' tone is perfect for our bakery. Customers have actually complimented our responses!",
                            author: "Mike T.",
                            role: "Bakery Manager",
                            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
                        },
                        {
                            text: "Finally an AI tool that doesn't sound like a robot. The professional tone is spot on for my law firm.",
                            author: "Elena R.",
                            role: "Attorney",
                            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
                        }
                    ].map((t, i) => (
                        <Card key={i} className="p-8 border-gray-100 bg-gray-50/50 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-yellow-400">★</span>)}
                            </div>
                            <p className="text-gray-700 italic mb-6">"{t.text}"</p>
                            <div className="flex items-center gap-3">
                                <img src={t.image} alt={t.author} className="h-10 w-10 rounded-full bg-gray-200" />
                                <div>
                                    <div className="font-semibold text-gray-900">{t.author}</div>
                                    <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-t border-gray-100 pt-10">
                    <div className="flex items-center gap-2 text-gray-600">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <span className="font-medium">100% Data Privacy</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Lock className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span className="font-medium">No Credit Card Required</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

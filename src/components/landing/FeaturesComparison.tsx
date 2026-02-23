import { Check, X } from "lucide-react";

export default function FeaturesComparison() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Why smart shoppers choose ReviewAI</h2>
                <p className="text-center text-gray-500 mb-12">See how we stack up against basic tools.</p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Feature</th>
                                <th className="py-4 px-6 text-center text-lg font-bold text-orange-600 bg-orange-50/30">ReviewAI</th>
                                <th className="py-4 px-6 text-center text-sm font-medium text-gray-400">Others</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { feature: "Fake Review Detection", us: true, them: false },
                                { feature: "Amazon & Walmart Support", us: true, them: false },
                                { feature: "Creator-Ready Summaries", us: true, them: false },
                                { feature: "Smart Sentiment Hub", us: true, them: false },
                                { feature: "Product Verdict Accuracy", us: true, them: false },
                                { feature: "Free Forever Extension", us: true, them: true },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 text-gray-700 font-medium">{row.feature}</td>
                                    <td className="py-4 px-6 text-center bg-orange-50/10">
                                        <div className="flex justify-center">
                                            {row.us ? <Check className="h-5 w-5 text-orange-600" /> : <X className="h-5 w-5 text-gray-300" />}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex justify-center">
                                            {row.them ? <Check className="h-5 w-5 text-gray-400" /> : <X className="h-5 w-5 text-gray-300" />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

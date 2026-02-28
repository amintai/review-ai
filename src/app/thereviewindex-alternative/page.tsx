import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Zap, Brain, Target, TrendingUp, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'TheReviewIndex Alternative - AI-Powered Purchase Decisions | ReviewAI',
  description: 'Beyond review aggregation. ReviewAI provides BUY/SKIP/CAUTION verdicts with AI reasoning, buyer psychology insights, and persona-based analysis for smarter Amazon shopping.',
  keywords: 'thereviewindex alternative, amazon review analysis, ai purchase decisions, review aggregator alternative',
  openGraph: {
    title: 'TheReviewIndex Alternative - AI-Powered Purchase Decisions',
    description: 'Get actionable BUY/SKIP/CAUTION verdicts, not just aggregated ratings.',
    type: 'website',
    url: 'https://reviewai.pro/thereviewindex-alternative',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TheReviewIndex Alternative - ReviewAI',
    description: 'AI-powered purchase decisions with advanced reasoning and buyer psychology.',
  },
};

export default function TheReviewIndexAlternativePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              Beyond Review Aggregation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              TheReviewIndex Alternative - AI Purchase Intelligence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop just reading aggregated reviews. Get <span className="font-semibold text-indigo-600">AI-powered BUY/SKIP/CAUTION verdicts</span> with advanced reasoning, buyer psychology, and fit analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/dashboard">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Try ReviewAI Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#comparison">
                <Button variant="outline" className="border-2 border-gray-300 px-8 py-6 text-lg rounded-xl hover:border-indigo-500 transition-all">
                  See the Difference
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Actionable verdicts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Advanced AI reasoning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            The Limitation of Review Aggregators
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              TheReviewIndex aggregates reviews from multiple sources. That's helpful, but it leaves you with the same problem:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">You still have to decide</p>
                  <p className="text-sm text-gray-600">Aggregated ratings don't tell you if YOU should buy it</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">No personalization</p>
                  <p className="text-sm text-gray-600">What matters to a budget buyer is different from someone prioritizing durability</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Missing context</p>
                  <p className="text-sm text-gray-600">You don't understand why people buy despite objections or what the real deal-breakers are</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 px-6 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            ReviewAI vs TheReviewIndex
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We're not just aggregating reviews—we're helping you make decisions.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">TheReviewIndex</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-indigo-600">ReviewAI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Fake Detection</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-gray-600 mt-1">Context-aware</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Adjusted Rating</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Not core</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Trust Score</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-gray-600 mt-1">+ Confidence Score</span>
                    </td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AI Reasoning</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-indigo-600">Advanced LLM-driven</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Buy/Skip Verdict</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                        Core Feature
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Conflicting Review Handling</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Weak</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-indigo-600">Strong (USP)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Human-Readable Explanation</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Medium</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-indigo-600">Strong</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Emotional Clarity</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Low</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-indigo-600">High</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Fit Analysis (Perfect For / Avoid If)</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-indigo-600 mt-1 font-semibold">UNIQUE</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Buyer Psychology Insights</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-indigo-600 mt-1 font-semibold">UNIQUE</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Persona-Based Verdicts</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-indigo-600 mt-1 font-semibold">P1 - Coming Soon</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Analysis Speed</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">~20 seconds</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center text-sm font-semibold text-green-600">
                        <Zap className="h-4 w-4 mr-1" /> ~10 seconds
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What ReviewAI Does Differently
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-500 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Clear Verdicts</h3>
              </div>
              <p className="text-gray-600">
                BUY/SKIP/CAUTION decisions with evidence. Not just aggregated ratings—actual purchase guidance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Advanced AI</h3>
              </div>
              <p className="text-gray-600">
                LLM-driven analysis that understands context, handles contradictions, and provides human-readable insights.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Buyer Psychology</h3>
              </div>
              <p className="text-gray-600">
                Understand why people buy despite objections, what almost stops them, and honest concerns to consider.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fit Analysis</h3>
              </div>
              <p className="text-gray-600">
                "Perfect For" who should buy, "Avoid If" who shouldn't, and "Deal Breakers" critical flaws.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">2x Faster</h3>
              </div>
              <p className="text-gray-600">
                Get results in 10 seconds with real-time analysis. No waiting, no outdated cached data.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border border-pink-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-pink-500 rounded-xl">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Emotional Clarity</h3>
              </div>
              <p className="text-gray-600">
                Human-readable explanations with emotional intelligence. Not just numbers and aggregated scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">How is ReviewAI different from TheReviewIndex?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                TheReviewIndex aggregates reviews from multiple sources and provides ratings. ReviewAI is an AI Shopping Decision Copilot that tells you whether to BUY, SKIP, or approach with CAUTION, with detailed reasoning about who the product is perfect for, what the deal-breakers are, and buyer psychology insights.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Does ReviewAI aggregate reviews like TheReviewIndex?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We analyze Amazon reviews using advanced AI, but we don't just aggregate them. We use LLM-driven reasoning to understand context, handle contradictions, and provide actionable purchase decisions. Our focus is on helping you decide, not just showing you aggregated data.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Is ReviewAI free?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! ReviewAI offers 10 free analyses per month with full report access. No credit card required. For unlimited analyses and advanced features like persona-based verdicts, Pro plans start at $9/month.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready for Smarter Purchase Decisions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands who've moved beyond review aggregation to AI-powered decision intelligence.
          </p>
          
          <Link href="/dashboard">
            <Button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              Try ReviewAI Free - No Credit Card Required
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 mt-8">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-indigo-500" />
              <span>BUY/SKIP/CAUTION verdicts</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <span>Advanced AI reasoning</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>10-second analysis</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "ReviewAI",
            "applicationCategory": "UtilitiesApplication",
            "description": "AI-powered Amazon purchase decision tool with advanced reasoning",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How is ReviewAI different from TheReviewIndex?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "TheReviewIndex aggregates reviews. ReviewAI is an AI Shopping Decision Copilot that tells you whether to BUY, SKIP, or approach with CAUTION."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}

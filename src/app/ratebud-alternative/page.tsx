import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Target, Brain, TrendingUp, Users, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RateBud Alternative - AI Shopping Decision Copilot | ReviewAI',
  description: 'Beyond fake review detection. ReviewAI is an AI Shopping Decision Copilot with BUY/SKIP/CAUTION verdicts, persona-based analysis, and buyer psychology insights.',
  keywords: 'ratebud alternative, amazon review checker, ai shopping assistant, buy skip caution, purchase decision tool',
  openGraph: {
    title: 'RateBud Alternative - AI Shopping Decision Copilot',
    description: 'Not just fake review detection. Get actionable purchase decisions with persona-based analysis.',
    type: 'website',
    url: 'https://reviewai.pro/ratebud-alternative',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateBud Alternative - ReviewAI',
    description: 'AI Shopping Decision Copilot. BUY/SKIP/CAUTION verdicts with advanced reasoning.',
  },
};

export default function RateBudAlternativePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              Beyond Fake Review Detection
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              RateBud Alternative - AI Shopping Decision Copilot
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop just detecting fakes. Start making <span className="font-semibold text-purple-600">confident purchase decisions</span> with AI-powered verdicts, persona-based analysis, and buyer psychology insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/dashboard">
                <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Try ReviewAI Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#comparison">
                <Button variant="outline" className="border-2 border-gray-300 px-8 py-6 text-lg rounded-xl hover:border-purple-500 transition-all">
                  See What's Different
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Purchase decision intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Persona-based verdicts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            The Problem with Fake Review Detectors
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              RateBud and similar tools tell you if reviews are fake. That's useful, but it's only half the answer.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">You still have to decide</p>
                  <p className="text-sm text-gray-600">A trust score doesn't tell you if YOU should buy it</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">No context for your needs</p>
                  <p className="text-sm text-gray-600">What's good for a budget buyer might be bad for someone prioritizing durability</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <X className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Missing the "why"</p>
                  <p className="text-sm text-gray-600">You don't understand buyer psychology or what makes people hesitate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            ReviewAI vs RateBud: What Makes Us Different
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We're not competing on fake detection. We're solving a different problem: helping you decide.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">RateBud</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">ReviewAI</th>
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
                      <span className="block text-xs text-gray-600 mt-1">Maybe (depends on you)</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Adjusted Rating</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Sometimes</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Not core</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Trust Score</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-gray-600 mt-1">+ Confidence Score</span>
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AI Reasoning</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-purple-600">Advanced (LLM-driven)</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Buy/Skip Verdict</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Limited</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        Core Feature
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Conflicting Review Handling</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Weak</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-purple-600">Your USP</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Human-Readable Explanation</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Medium</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-purple-600">Strong</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Emotional Clarity</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Low</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-purple-600">High</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Persona-Based Verdicts</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-purple-600 mt-1 font-semibold">UNIQUE</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Buyer Psychology Insights</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-purple-600 mt-1 font-semibold">UNIQUE</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Fit Analysis (Perfect For / Avoid If)</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-purple-600 mt-1 font-semibold">UNIQUE</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Risk Scoring Layer</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-purple-600 mt-1 font-semibold">P1 - Coming Soon</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Product Comparison Mode</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-purple-600 mt-1 font-semibold">P2 - Coming Soon</span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            What ReviewAI Does That RateBud Doesn't
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We're an AI Shopping Decision Copilot, not just a fake review detector.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">BUY/SKIP/CAUTION</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Clear, actionable verdicts. Not just "this has fake reviews"—we tell you what to DO.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                <span className="px-2 py-1 bg-purple-100 rounded">UNIQUE</span>
                <span>Core feature</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Persona-Based</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Budget Buyer? Durability Focused? Risk-Averse? Get verdicts tailored to YOUR priorities.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                <span className="px-2 py-1 bg-blue-100 rounded">UNIQUE</span>
                <span>P1 - This month</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border border-pink-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-pink-500 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Buyer Psychology</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Understand why people buy despite objections, what almost stops them, and honest concerns.
              </p>
              <div className="flex items-center gap-2 text-sm text-pink-600 font-semibold">
                <span className="px-2 py-1 bg-pink-100 rounded">UNIQUE</span>
                <span>No competitor has this</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fit Analysis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                "Perfect For" who should buy, "Avoid If" who shouldn't, "Deal Breakers" critical flaws.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                <span className="px-2 py-1 bg-green-100 rounded">UNIQUE</span>
                <span>No competitor has this</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Risk Scoring</h3>
              </div>
              <p className="text-gray-600 mb-4">
                4 risk dimensions: Durability, Return, Quality Inconsistency, Overhype. Know what you're getting into.
              </p>
              <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                <span className="px-2 py-1 bg-orange-100 rounded">UNIQUE</span>
                <span>P1 - This month</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-500 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Emotional Clarity</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Human-readable explanations with emotional intelligence. Not just numbers and charts.
              </p>
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-semibold">
                <span className="px-2 py-1 bg-indigo-100 rounded">UNIQUE</span>
                <span>High clarity</span>
              </div>
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
                <h3 className="text-lg font-semibold text-gray-900">How is ReviewAI different from RateBud?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                RateBud focuses on detecting fake reviews and giving you trust scores. ReviewAI is an AI Shopping Decision Copilot—we tell you whether to BUY, SKIP, or approach with CAUTION, who the product is perfect for, what the deal-breakers are, and why people buy despite objections. We're solving a different problem: helping you make purchase decisions, not just spotting fakes.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">What are persona-based verdicts?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                A product that's a "CAUTION" for a risk-averse shopper might be a "BUY" for a budget buyer. With persona-based verdicts (launching this month), you choose your buyer persona—Budget Buyer, Durability Focused, Risk-Averse, Tech Enthusiast—and get verdicts tailored to YOUR priorities. No competitor has this feature.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Does ReviewAI detect fake reviews like RateBud?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes, we analyze review authenticity as part of our Trust Score. But that's just one input into our decision engine. We go beyond fake detection to give you actionable purchase decisions with advanced LLM-driven reasoning, buyer psychology insights, and fit analysis.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Is ReviewAI free like RateBud?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! ReviewAI offers 10 free analyses per month with full report access. No credit card required. For unlimited analyses and advanced features like persona-based verdicts and comparison mode, Pro plans start at $9/month.
              </p>
            </details>

            <details className="group bg-white rounded-xl p-6 hover:bg-gray-50 transition-colors border border-gray-200">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">What is "conflicting review handling"?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                When a product has both glowing 5-star reviews and terrible 1-star reviews, most tools struggle to make sense of it. ReviewAI's advanced AI reasoning excels at handling these contradictions—we analyze patterns, identify which concerns are legitimate, and give you a clear verdict despite the noise. This is our USP.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready for Smarter Shopping Decisions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands who've moved beyond fake detection to confident purchase decisions.
          </p>
          
          <Link href="/dashboard">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              Try ReviewAI Free - No Credit Card Required
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 mt-8">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span>BUY/SKIP/CAUTION verdicts</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span>Persona-based analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-pink-500" />
              <span>Buyer psychology insights</span>
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
            "description": "AI Shopping Decision Copilot for Amazon product reviews",
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
                "name": "How is ReviewAI different from RateBud?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RateBud focuses on detecting fake reviews. ReviewAI is an AI Shopping Decision Copilot that tells you whether to BUY, SKIP, or approach with CAUTION."
                }
              },
              {
                "@type": "Question",
                "name": "What are persona-based verdicts?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You choose your buyer persona—Budget Buyer, Durability Focused, Risk-Averse, Tech Enthusiast—and get verdicts tailored to YOUR priorities."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}

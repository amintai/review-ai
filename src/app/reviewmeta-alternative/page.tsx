import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Zap, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ReviewMeta Alternative - Faster Amazon Review Analysis | ReviewAI',
  description: 'Tired of ReviewMeta\'s slow speeds? ReviewAI analyzes Amazon reviews in 10 seconds with real-time results. Get BUY/SKIP/CAUTION verdicts, not just adjusted ratings.',
  keywords: 'reviewmeta alternative, amazon review analyzer, fast review checker, real-time review analysis',
  openGraph: {
    title: 'ReviewMeta Alternative - Faster Amazon Review Analysis',
    description: 'Get AI-powered purchase decisions in 10 seconds. Real-time analysis, not cached results.',
    type: 'website',
    url: 'https://reviewai.pro/reviewmeta-alternative',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReviewMeta Alternative - ReviewAI',
    description: 'Faster, real-time Amazon review analysis. BUY/SKIP/CAUTION verdicts in 10 seconds.',
  },
};

export default function ReviewMetaAlternativePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              Tired of Waiting? Get Results in 10 Seconds
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              ReviewMeta Alternative - Faster, Real-Time Analysis
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stop waiting 60+ seconds for outdated cached results. Get <span className="font-semibold text-blue-600">real-time AI-powered verdicts</span> in 10 seconds with actionable purchase decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/dashboard">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Try ReviewAI Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#comparison">
                <Button variant="outline" className="border-2 border-gray-300 px-8 py-6 text-lg rounded-xl hover:border-blue-500 transition-all">
                  See Speed Comparison
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>6x faster than ReviewMeta</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-green-500" />
                <span>Real-time, not cached</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Why ReviewMeta Users Are Switching
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <Clock className="h-8 w-8 text-red-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Too Slow</h3>
              <p className="text-sm text-gray-600">30-60+ seconds per analysis. Time adds up when comparing products.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <AlertCircle className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Outdated Results</h3>
              <p className="text-sm text-gray-600">Cached data from months ago. You're not seeing current reviews.</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <X className="h-8 w-8 text-yellow-600 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">No Clear Decision</h3>
              <p className="text-sm text-gray-600">Adjusted ratings don't tell you if you should buy or skip.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Comparison */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Speed Matters When You're Shopping
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
              <div className="text-center mb-4">
                <div className="text-sm font-semibold text-gray-500 mb-2">ReviewMeta</div>
                <div className="text-6xl font-bold text-gray-400 mb-2">60s</div>
                <div className="text-sm text-gray-500">Average analysis time</div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Slow processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Cached results</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-500" />
                  <span>Frequent timeouts</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl border-2 border-blue-400 shadow-xl">
              <div className="text-center mb-4">
                <div className="text-sm font-semibold text-blue-100 mb-2">ReviewAI</div>
                <div className="text-6xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <Zap className="h-12 w-12" />
                  10s
                </div>
                <div className="text-sm text-blue-100">Average analysis time</div>
              </div>
              <div className="space-y-2 text-sm text-white">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Lightning fast</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Real-time analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Always reliable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            ReviewAI vs ReviewMeta: Feature Comparison
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            See why thousands are switching from ReviewMeta to ReviewAI.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">ReviewMeta</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">ReviewAI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-blue-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Analysis Speed</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-red-600 font-semibold">30-60+ seconds</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center text-sm font-semibold text-green-600">
                        <Zap className="h-4 w-4 mr-1" /> ~10 seconds
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Real-Time Results</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                      <span className="block text-xs text-gray-500 mt-1">Cached data</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-gray-600 mt-1">Always current</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Output Type</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Adjusted Rating</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-blue-600">BUY/SKIP/CAUTION Verdict</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Fake Review Detection</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Trust Score</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                      <span className="block text-xs text-gray-600 mt-1">+ Confidence Score</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">AI Reasoning</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Basic</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Advanced LLM-driven</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Fit Analysis (Perfect For / Avoid If)</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Buyer Psychology Insights</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Conflicting Review Handling</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Weak</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Strong (USP)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Human-Readable Explanations</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Medium</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Strong & Clear</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Emotional Clarity</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Low</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">High</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Reliability</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Frequent downtime</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">99.9% uptime</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Free</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">Free (10/month) + Pro</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


      {/* Unique Features */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What ReviewAI Does Better
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <Zap className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">6x Faster Analysis</h3>
              <p className="text-gray-600 text-sm">
                Get results in 10 seconds, not 60+. Compare multiple products without wasting time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-green-100 hover:border-green-300 transition-colors">
              <RefreshCw className="h-10 w-10 text-green-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-Time Results</h3>
              <p className="text-gray-600 text-sm">
                Always analyzing current reviews. No outdated cached data from months ago.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-colors">
              <Check className="h-10 w-10 text-purple-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Clear Decisions</h3>
              <p className="text-gray-600 text-sm">
                BUY/SKIP/CAUTION verdicts, not just adjusted ratings. Know exactly what to do.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-colors">
              <AlertCircle className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Conflicting Review Analysis</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI handles contradictory reviews intelligently. Our USP.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-pink-100 hover:border-pink-300 transition-colors">
              <svg className="h-10 w-10 text-pink-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Human-Readable Reports</h3>
              <p className="text-gray-600 text-sm">
                Clear, emotional clarity in explanations. Not just numbers and charts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 transition-colors">
              <svg className="h-10 w-10 text-indigo-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-lg font-bold text-gray-900 mb-2">99.9% Uptime</h3>
              <p className="text-gray-600 text-sm">
                Reliable service. No more "ReviewMeta is down" frustrations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Why is ReviewAI so much faster than ReviewMeta?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                ReviewAI uses modern AI infrastructure optimized for speed. We analyze reviews in real-time without relying on cached results, and our algorithms are designed for efficiency. ReviewMeta's older architecture and caching system slow it down significantly.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Does ReviewAI have adjusted ratings like ReviewMeta?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We go beyond adjusted ratings. Instead of just recalculating stars, we give you a clear BUY/SKIP/CAUTION verdict with detailed reasoning. This is more actionable than an adjusted rating—you know exactly what to do.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Is ReviewAI as accurate as ReviewMeta?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                ReviewAI uses advanced LLM-driven analysis that goes deeper than ReviewMeta's basic algorithms. We analyze 15+ signals including language patterns, reviewer behavior, timing anomalies, and emotional clarity. Our accuracy is equal or better, with the added benefit of real-time data.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Can I use ReviewAI for free like ReviewMeta?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! ReviewAI offers 10 free analyses per month with full report access. No credit card required. For unlimited analyses and advanced features, Pro plans start at $9/month.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Stop Waiting. Start Shopping Smarter.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands who switched from ReviewMeta for faster, better analysis.
          </p>
          
          <Link href="/dashboard">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
              Try ReviewAI Free - Get Results in 10 Seconds
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 mt-8">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>6x faster than ReviewMeta</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-500" />
              <span>Real-time analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-500" />
              <span>No credit card required</span>
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
            "description": "Fast, real-time Amazon review analysis and purchase decision tool",
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
                "name": "Why is ReviewAI so much faster than ReviewMeta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ReviewAI uses modern AI infrastructure optimized for speed. We analyze reviews in real-time without relying on cached results."
                }
              },
              {
                "@type": "Question",
                "name": "Does ReviewAI have adjusted ratings like ReviewMeta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We go beyond adjusted ratings. Instead of just recalculating stars, we give you a clear BUY/SKIP/CAUTION verdict with detailed reasoning."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}

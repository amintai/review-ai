import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Zap, Target, Brain, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fakespot Alternative - Best Amazon Review Checker 2026 | ReviewAI',
  description: 'Fakespot shut down? ReviewAI is the best alternative. Get AI-powered BUY/SKIP/CAUTION verdicts, not just fake review detection. Free Amazon review analysis in 10 seconds.',
  keywords: 'fakespot alternative, fakespot replacement, amazon review checker, fake review detector, amazon product analysis',
  openGraph: {
    title: 'Fakespot Alternative - Best Amazon Review Checker 2026',
    description: 'Get AI-powered purchase decisions in seconds. Not just fake review detection—actual BUY/SKIP/CAUTION verdicts.',
    type: 'website',
    url: 'https://reviewai.pro/fakespot-alternative',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fakespot Alternative - ReviewAI',
    description: 'AI-powered Amazon purchase decisions. BUY/SKIP/CAUTION verdicts in 10 seconds.',
  },
};

export default function FakespotAlternativePage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
              Fakespot Shut Down? We've Got You Covered
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Best Fakespot Alternative for 2026
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get AI-powered Amazon purchase decisions in seconds. Not just fake review detection—actual <span className="font-semibold text-orange-600">BUY/SKIP/CAUTION</span> verdicts with evidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/dashboard">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  Try ReviewAI Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#comparison">
                <Button variant="outline" className="border-2 border-gray-300 px-8 py-6 text-lg rounded-xl hover:border-orange-500 transition-all">
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>10,000+ analyses run</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happened to Fakespot Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What Happened to Fakespot?
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-500">2023</div>
                <div className="flex-1">
                  <p className="text-gray-700">Mozilla acquires Fakespot</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-500">2024</div>
                <div className="flex-1">
                  <p className="text-gray-700">Integration into Firefox only</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-orange-600">July 2025</div>
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold">Standalone service shut down</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24 text-sm font-semibold text-gray-500">Now</div>
                <div className="flex-1">
                  <p className="text-gray-700">Millions of users searching for alternatives</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-lg text-gray-600">
            If you're one of them, <span className="font-semibold text-orange-600">you're in the right place</span>.
          </p>
        </div>
      </section>


      {/* Comparison Table Section */}
      <section id="comparison" className="py-16 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Why ReviewAI is Better Than Fakespot
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We've built everything Fakespot users loved, plus features they never had.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-500">Fakespot</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">ReviewAI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Status</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        Shut Down
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        ✓ Active & Growing
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Analysis Type</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Fake Detection Only</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-orange-600">Purchase Decision Intelligence</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Output</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Letter Grade (A-F)</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-semibold text-orange-600">BUY/SKIP/CAUTION + Trust + Confidence</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Analysis Speed</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">~15 seconds</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center text-sm font-semibold text-orange-600">
                        <Zap className="h-4 w-4 mr-1" /> ~10 seconds
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Chrome Extension</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Coming Soon (P0)
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Persona-Based Verdicts</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Product Comparison</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Similar Product Recommendations</td>
                    <td className="px-6 py-4 text-center">
                      <X className="h-5 w-5 text-red-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Was Free</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-orange-600">Free (10/month) + Pro Plans</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            What Makes ReviewAI Different
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            We're not just a fake review detector. We're an AI Shopping Decision Copilot.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Actionable Verdicts</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get clear <span className="font-semibold text-orange-600">BUY/SKIP/CAUTION</span> decisions, not just trust scores. We tell you what to do, backed by evidence.
              </p>
              <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                <span className="px-2 py-1 bg-orange-100 rounded">UNIQUE</span>
                <span>No competitor has this</span>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dual Scoring System</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Trust Score</span> (review authenticity) + <span className="font-semibold">Confidence Score</span> (verdict strength). Competitors only have one or the other.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                <span className="px-2 py-1 bg-blue-100 rounded">UNIQUE</span>
                <span>No competitor has this</span>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500 rounded-xl">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Fit Analysis</h3>
              </div>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">"Perfect For"</span> who should buy, <span className="font-semibold">"Avoid If"</span> who shouldn't, and <span className="font-semibold">"Deal Breakers"</span> critical flaws.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                <span className="px-2 py-1 bg-green-100 rounded">UNIQUE</span>
                <span>No competitor has this</span>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Buyer Psychology</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Understand why people buy despite objections, what almost stops purchases, and honest objections to consider.
              </p>
              <div className="flex items-center gap-2 text-sm text-purple-600 font-semibold">
                <span className="px-2 py-1 bg-purple-100 rounded">UNIQUE</span>
                <span>No competitor has this</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Coming Soon Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Coming Soon: Features Fakespot Never Had
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            We're building the future of Amazon shopping intelligence.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <div className="flex items-start gap-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">P1 - THIS MONTH</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🎭 Persona-Based Verdicts</h3>
                  <p className="text-gray-600">
                    Choose your buyer persona: Budget Buyer, Durability Focused, Risk-Averse, Tech Enthusiast. Get verdicts tailored to YOUR priorities.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
              <div className="flex items-start gap-4">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">P1 - THIS MONTH</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">⚠️ Risk Scoring Layer</h3>
                  <p className="text-gray-600">
                    4 risk dimensions: Durability Risk, Return Risk, Quality Inconsistency, Overhype Risk. Know exactly what you're getting into.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <div className="flex items-start gap-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">P2 - NEXT QUARTER</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">⚖️ Product Comparison Mode</h3>
                  <p className="text-gray-600">
                    Compare two products side-by-side with verdicts, risk scores, and recommendations. Perfect for choosing between finalists.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <div className="flex items-start gap-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">P2 - NEXT QUARTER</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">🔄 Similar Product Recommendations</h3>
                  <p className="text-gray-600">
                    "Skip this, buy that instead" with rationale. We'll show you better alternatives when we recommend skipping a product.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Is ReviewAI really better than Fakespot?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                ReviewAI goes beyond fake review detection to give you actual purchase decisions. While Fakespot only told you if reviews were suspicious, we tell you whether to BUY, SKIP, or approach with CAUTION—backed by evidence. Plus, we're actively developing features Fakespot never had, like persona-based verdicts and product comparisons.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Will ReviewAI have a browser extension like Fakespot?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! A Chrome extension is our #1 priority (P0 on our roadmap). It will show verdicts directly on Amazon product pages, just like Fakespot did. We're building it to be even faster and more feature-rich than Fakespot's extension ever was.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Is ReviewAI free?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! Our free tier includes 10 analyses per month with full report access. No credit card required to try. For unlimited analyses and advanced features like persona-based verdicts and comparison mode, we offer Pro plans starting at $9/month.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Does ReviewAI work on all Amazon domains?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! ReviewAI works on all major Amazon marketplaces including Amazon.com (US), Amazon.co.uk (UK), Amazon.de (Germany), Amazon.in (India), and more. Just paste any Amazon product URL and we'll analyze it.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">How is ReviewAI different from RateBud or ReviewMeta?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                RateBud and ReviewMeta focus on detecting fake reviews and giving you trust scores. ReviewAI is an AI Shopping Decision Copilot—we tell you whether to buy or skip a product, who it's perfect for, what the deal-breakers are, and why people buy despite objections. We're solving a different problem: helping you make purchase decisions, not just spotting fakes.
              </p>
            </details>

            <details className="group bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-gray-900">Can I trust ReviewAI's analysis?</h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We're fully transparent about our methodology. We analyze 15+ signals including language patterns, reviewer behavior, timing anomalies, and verified purchase ratios. We don't accept payment from sellers, don't manipulate results, and don't sell your data. Check our <Link href="/methodology" className="text-orange-600 hover:underline">methodology page</Link> for full details on how we work.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Make Smarter Amazon Purchases?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of smart shoppers using ReviewAI to make confident purchase decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/dashboard">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                Try ReviewAI Free - No Credit Card Required
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>10 free analyses per month</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Full report access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>No signup required to try</span>
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
            "description": "AI-powered Amazon review analysis and purchase decision tool",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
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
                "name": "Is ReviewAI really better than Fakespot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "ReviewAI goes beyond fake review detection to give you actual purchase decisions. While Fakespot only told you if reviews were suspicious, we tell you whether to BUY, SKIP, or approach with CAUTION—backed by evidence."
                }
              },
              {
                "@type": "Question",
                "name": "Will ReviewAI have a browser extension like Fakespot?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! A Chrome extension is our #1 priority (P0 on our roadmap). It will show verdicts directly on Amazon product pages, just like Fakespot did."
                }
              },
              {
                "@type": "Question",
                "name": "Is ReviewAI free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our free tier includes 10 analyses per month with full report access. No credit card required to try."
                }
              }
            ]
          })
        }}
      />
    </main>
  );
}

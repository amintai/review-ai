import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BackgroundRippleEffect from "@/components/ui/background-ripple-effect";

export const metadata = {
    title: "Contact Us | ReviewAI - Amazon Intelligence Support",
    description: "Get in touch with the ReviewAI team. We're here to help you shop smarter and get the most out of our Amazon review analyzer.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white font-sans selection:bg-blue-100 flex flex-col">
            <Navbar />

            <div className="relative flex-grow flex items-center justify-center py-20 px-6">
                <BackgroundRippleEffect />

                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">

                    {/* Left Content */}
                    <div className="flex-1 space-y-8 mt-10">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                                Get in Touch
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Have questions about our pricing, features, or just want to say hi?
                                Drop us a message and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                                    <p className="text-gray-600">amin.tai.work@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="flex-1 w-full">
                        <ContactForm />
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}

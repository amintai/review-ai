"use client";

import CookieConsent from "react-cookie-consent";
import Link from "next/link";

export default function CookieConsentBanner() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="Accept All"
            declineButtonText="Strictly Necessary"
            enableDeclineButton
            cookieName="reviewai-consent"
            style={{
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(8px)",
                color: "#1f2937",
                borderTop: "1px solid #e5e7eb",
                padding: "1rem 2rem",
                fontSize: "14px",
                boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1)"
            }}
            buttonStyle={{
                background: "#2563eb",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "0.5rem",
                padding: "0.5rem 1.5rem"
            }}
            declineButtonStyle={{
                background: "transparent",
                color: "#4b5563",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                border: "1px solid #d1d5db"
            }}
            expires={150}
        >
            We use cookies to enhance your experience, analyze site traffic, and support our marketing efforts. By clicking "Accept All", you agree to our use of cookies as described in our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
            </Link>.
        </CookieConsent>
    );
}

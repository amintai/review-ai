"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;

export default function GoogleAnalytics() {
    const [loadGA, setLoadGA] = useState(false);

    useEffect(() => {
        const triggerGA = () => setLoadGA(true);

        // Load GA after user interaction OR idle
        window.addEventListener("scroll", triggerGA, { once: true });
        window.addEventListener("click", triggerGA, { once: true });

        if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(() => setLoadGA(true));
        } else {
            setTimeout(() => setLoadGA(true), 3500);
        }

        return () => {
            window.removeEventListener("scroll", triggerGA);
            window.removeEventListener("click", triggerGA);
        };
    }, []);

    if (!loadGA) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
            </Script>
        </>
    );
}

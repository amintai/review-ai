"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!;

export default function FacebookPixel() {
    const [loadPixel, setLoadPixel] = useState(false);

    useEffect(() => {
        const triggerPixel = () => setLoadPixel(true);

        // Load only on meaningful interaction
        window.addEventListener("scroll", triggerPixel, { once: true });
        window.addEventListener("click", triggerPixel, { once: true });

        // Fallback: load after idle
        if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(() => setLoadPixel(true));
        } else {
            setTimeout(() => setLoadPixel(true), 4000);
        }

        return () => {
            window.removeEventListener("scroll", triggerPixel);
            window.removeEventListener("click", triggerPixel);
        };
    }, []);

    if (!loadPixel || process.env.NODE_ENV !== "production") return null;

    return (
        <>
            <Script
                id="fb-pixel-script"
                strategy="lazyOnload"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
                }}
            />
        </>
    );
}

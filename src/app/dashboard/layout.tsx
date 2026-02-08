export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // The layout is now handled entirely within the page.tsx component to support 
        // the flexible sidebar/full-screen interactions required for the chat interface.
        // We render children directly without wrapping in a persistent layout shell.
        <>
            {children}
        </>
    );
}

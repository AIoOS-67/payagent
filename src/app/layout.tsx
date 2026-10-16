import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayAgent · Autonomous Agentic Commerce & Instant PayPal Settlement",
  description: "PayPal AI Hackathon 2026 Winner Entry: Multi-agent autonomous commerce negotiation and instant PayPal Orders v2 settlement for local micro-merchants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-paypal-sky selection:text-white">
        {children}
      </body>
    </html>
  );
}

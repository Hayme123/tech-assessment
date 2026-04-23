import type { PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';

type AppLayoutProps = PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            <main className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
            <Toaster richColors closeButton position="top-right" />
        </div>
    );
}

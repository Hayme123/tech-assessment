import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import type { ComponentType } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title: string) => (title ? `${title} - ${appName}` : appName),
    resolve: (name: string) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({
        el,
        App,
        props,
    }: {
        el: Element | null;
        App: ComponentType<Record<string, unknown>>;
        props: Record<string, unknown>;
    }) {
        if (el) {
            createRoot(el as HTMLElement).render(<App {...props} />);

            return;
        }

        return <App {...props} />;
    },
    progress: {
        color: '#4B5563',
    },
});

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            flash: {
                message?: string;
            };
            [key: string]: unknown;
        };
    }
}

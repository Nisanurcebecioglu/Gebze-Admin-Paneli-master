/**
 * HTML Include Utility for Gebze Admin Panel
 * Dynamically loads HTML fragments and reinitializes components
 */
interface IncludeOptions {
    cache?: boolean;
    timeout?: number;
}
declare class HTMLInclude {
    private static instance;
    private includeCache;
    private constructor();
    static getInstance(): HTMLInclude;
    /**
     * Include a HTML fragment into an element
     */
    includeFragment(element: HTMLElement, options?: IncludeOptions): Promise<void>;
    /**
     * Fetch HTML content from URL
     */
    private fetchHTML;
    /**
     * Reinitialize components after includes are loaded
     */
    private reinitializeComponents;
    /**
     * Reinitialize sidebar menu functionality
     */
    private reinitializeSidebar;
    /**
     * Reinitialize header toggle functionality
     */
    private reinitializeHeader;
    /**
     * Setup responsive behavior
     */
    private setupResponsive;
    /**
     * Dispatch custom event
     */
    private dispatchEvent;
    /**
     * Run the include process
     */
    run(): Promise<void>;
}
declare const htmlInclude: HTMLInclude;
//# sourceMappingURL=html-include.d.ts.map
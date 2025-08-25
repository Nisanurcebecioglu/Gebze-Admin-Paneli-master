/**
 * HTML Include Utility for Gebze Admin Panel
 * Dynamically loads HTML fragments and reinitializes components
 */

interface IncludeOptions {
    cache?: boolean;
    timeout?: number;
}

class HTMLInclude {
    private static instance: HTMLInclude;
    private includeCache: Map<string, string> = new Map();

    private constructor() { }

    public static getInstance(): HTMLInclude {
        if (!HTMLInclude.instance) {
            HTMLInclude.instance = new HTMLInclude();
        }
        return HTMLInclude.instance;
    }

    /**
     * Include a HTML fragment into an element
     */
    public async includeFragment(element: HTMLElement, options: IncludeOptions = {}): Promise<void> {
        const src = element.getAttribute('data-include');
        if (!src) return;

        try {
            const html = await this.fetchHTML(src, options);
            element.outerHTML = html;
        } catch (error) {
            console.error('Include failed for', src, error);
        }
    }

    /**
     * Fetch HTML content from URL
     */
    private async fetchHTML(url: string, options: IncludeOptions): Promise<string> {
        const cacheKey = `${url}_${JSON.stringify(options)}`;

        if (options.cache !== false && this.includeCache.has(cacheKey)) {
            return this.includeCache.get(cacheKey)!;
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || 10000);

        try {
            const response = await fetch(url, {
                cache: options.cache === false ? 'no-cache' : 'default',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();

            if (options.cache !== false) {
                this.includeCache.set(cacheKey, html);
            }

            return html;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    /**
     * Reinitialize components after includes are loaded
     */
    private reinitializeComponents(): void {
        // Reinitialize Feather icons
        if (window.feather && typeof window.feather.replace === 'function') {
            try {
                window.feather.replace();
            } catch (error) {
                console.warn('Feather icons reinitialization failed:', error);
            }
        }

        // Reinitialize jQuery components
        if (window.jQuery && window.$) {
            this.reinitializeSidebar();
            this.reinitializeHeader();
            this.setupResponsive();
        }

        // Dispatch custom event
        this.dispatchEvent('includes:loaded');
    }

    /**
     * Reinitialize sidebar menu functionality
     */
    private reinitializeSidebar(): void {
        try {
            const $sidebarMenu = $('.sidebar-menu');

            if ($sidebarMenu.length) {
                $sidebarMenu.off('click.sidebarMenu').on('click.sidebarMenu', 'li a', (e: any) => {
                    const $this = $(e.currentTarget);
                    const checkElement = $this.next();
                    const subMenuSelector = '.sidebar-submenu';

                    if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
                        checkElement.slideUp(300, () => {
                            checkElement.removeClass('menu-open');
                        });
                        checkElement.parent("li").removeClass("active");
                    }
                    else if (checkElement.is(subMenuSelector) && !checkElement.is(':visible')) {
                        const parent = $this.parents('ul').first();
                        const ul = parent.find('ul:visible').slideUp(300);
                        ul.removeClass('menu-open');
                        const parentLi = $this.parent("li");
                        checkElement.slideDown(300, () => {
                            checkElement.addClass('menu-open');
                            parent.find('li.active').removeClass('active');
                            parentLi.addClass('active');
                        });
                    }
                });
            }
        } catch (error) {
            console.warn('Sidebar reinitialization failed:', error);
        }
    }

    /**
     * Reinitialize header toggle functionality
     */
    private reinitializeHeader(): void {
        try {
            const $nav = $('.page-sidebar');
            const $header = $('.page-main-header');
            const $toggle = $('#sidebar-toggle');

            if ($toggle.length) {
                $toggle.off('click._includeRebind').on('click._includeRebind', () => {
                    $nav.toggleClass('open');
                    $header.toggleClass('open');
                });
            }
        } catch (error) {
            console.warn('Header reinitialization failed:', error);
        }
    }

    /**
     * Setup responsive behavior
     */
    private setupResponsive(): void {
        try {
            const $nav = $('.page-sidebar');
            const $toggle = $('#sidebar-toggle');
            const w = $(window).width() || 0;

            if (w + 17 <= 991) {
                $toggle.addClass('open');
                $nav.addClass('open');
            } else {
                $toggle.removeClass('open');
                $nav.removeClass('open');
            }
        } catch (error) {
            console.warn('Responsive setup failed:', error);
        }
    }

    /**
     * Dispatch custom event
     */
    private dispatchEvent(eventName: string): void {
        try {
            const event = new Event(eventName);
            document.dispatchEvent(event);
        } catch (error) {
            try {
                const event = document.createEvent('Event');
                event.initEvent(eventName, true, true);
                document.dispatchEvent(event);
            } catch (fallbackError) {
                console.warn('Event dispatch failed:', fallbackError);
            }
        }
    }

    /**
     * Run the include process
     */
    public async run(): Promise<void> {
        const nodes = document.querySelectorAll('[data-include]');
        const tasks: Promise<void>[] = [];

        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i] as HTMLElement;
            tasks.push(this.includeFragment(element));
        }

        await Promise.all(tasks);
        this.reinitializeComponents();
    }
}

// Initialize when DOM is ready
const htmlInclude = HTMLInclude.getInstance();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => htmlInclude.run());
} else {
    htmlInclude.run();
} 
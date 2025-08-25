/**
 * Main Entry Point for Gebze Admin Panel
 * Initializes all components and services
 */

import { NewsTable } from './components/news-table';
import { newsService } from './services/news-service';

// Global application state
interface AppState {
    currentPage: string;
    user: {
        id: string;
        name: string;
        role: string;
    } | null;
}

class GebzeAdminApp {
    private static instance: GebzeAdminApp;
    private state: AppState;
    private components: Map<string, any> = new Map();

    private constructor() {
        this.state = {
            currentPage: window.location.pathname,
            user: null
        };

        this.initialize();
    }

    public static getInstance(): GebzeAdminApp {
        if (!GebzeAdminApp.instance) {
            GebzeAdminApp.instance = new GebzeAdminApp();
        }
        return GebzeAdminApp.instance;
    }

    /**
     * Initialize the application
     */
    private initialize(): void {
        console.log('Gebze Admin Panel başlatılıyor...');

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupComponents());
        } else {
            this.setupComponents();
        }

        // Setup global event listeners
        this.setupGlobalEvents();
    }

    /**
     * Setup page-specific components
     */
    private setupComponents(): void {
        const currentPage = this.getCurrentPage();

        switch (currentPage) {
            case 'haberler':
                this.setupNewsPage();
                break;
            case 'etkinlikler':
                this.setupEventsPage();
                break;
            case 'hizmetler':
                this.setupServicesPage();
                break;
            case 'yonetim':
                this.setupManagementPage();
                break;
            default:
                this.setupDefaultPage();
                break;
        }
    }

    /**
     * Setup news page components
     */
    private setupNewsPage(): void {
        const newsContainer = document.querySelector('#news-container') || document.querySelector('.page-body');
        if (newsContainer) {
            const newsTable = new NewsTable(newsContainer as HTMLElement, {
                enableSearch: true,
                enableFiltering: true,
                enablePagination: true,
                itemsPerPage: 15
            });

            this.components.set('newsTable', newsTable);
            console.log('Haberler sayfası bileşenleri yüklendi');
        }
    }

    /**
     * Setup events page components
     */
    private setupEventsPage(): void {
        // Implementation for events page
        console.log('Etkinlikler sayfası bileşenleri yüklendi');
    }

    /**
     * Setup services page components
     */
    private setupServicesPage(): void {
        // Implementation for services page
        console.log('Hizmetler sayfası bileşenleri yüklendi');
    }

    /**
     * Setup management page components
     */
    private setupManagementPage(): void {
        // Implementation for management page
        console.log('Yönetim sayfası bileşenleri yüklendi');
    }

    /**
     * Setup default page components
     */
    private setupDefaultPage(): void {
        // Implementation for default/home page
        console.log('Ana sayfa bileşenleri yüklendi');
    }

    /**
 * Setup global event listeners
 */
    private setupGlobalEvents(): void {
        // Handle navigation
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href]');

            if (link && link.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                this.handleInternalNavigation(link.getAttribute('href')!);
            }
        });

        // Handle sidebar menu
        this.setupSidebarMenu();

        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle beforeunload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    /**
     * Setup sidebar menu functionality
     */
    private setupSidebarMenu(): void {
        // Sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                const pageSidebar = document.querySelector('.page-sidebar');
                const pageMainHeader = document.querySelector('.page-main-header');
                if (pageSidebar && pageMainHeader) {
                    pageSidebar.classList.toggle('open');
                    pageMainHeader.classList.toggle('open');
                }
            });
        }

        // Submenu toggle
        const submenuItems = document.querySelectorAll('.sidebar-item.has-sub');
        submenuItems.forEach(item => {
            const link = item.querySelector('.sidebar-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const submenu = item.querySelector('.submenu');
                    if (submenu) {
                        submenu.classList.toggle('open');
                        item.classList.toggle('open');
                    }
                });
            }
        });

        // Mobile menu toggle
        const mobileMenuIcon = document.querySelector('.header-mobile-icon i');
        if (mobileMenuIcon) {
            mobileMenuIcon.addEventListener('click', () => {
                const pageSidebar = document.querySelector('.page-sidebar');
                const pageMainHeader = document.querySelector('.page-main-header');
                if (pageSidebar && pageMainHeader) {
                    pageSidebar.classList.toggle('open');
                    pageMainHeader.classList.toggle('open');
                }
            });
        }
    }

    /**
     * Handle internal navigation
     */
    private handleInternalNavigation(hash: string): void {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Handle window resize
     */
    private handleResize(): void {
        // Update responsive components
        this.components.forEach(component => {
            if (component.handleResize && typeof component.handleResize === 'function') {
                component.handleResize();
            }
        });
    }

    /**
     * Get current page identifier
     */
    private getCurrentPage(): string {
        const path = window.location.pathname;
        const filename = path.split('/').pop()?.replace('.html', '') || '';

        // Map filenames to page identifiers
        const pageMap: Record<string, string> = {
            'Haberler': 'haberler',
            'Etkinlikler': 'etkinlikler',
            'Hizmetler': 'hizmetler',
            'kurumsalYonetim': 'yonetim',
            'index': 'home'
        };

        return pageMap[filename] || 'default';
    }

    /**
     * Get application state
     */
    public getState(): AppState {
        return { ...this.state };
    }

    /**
     * Update application state
     */
    public setState(updates: Partial<AppState>): void {
        this.state = { ...this.state, ...updates };
        this.notifyStateChange();
    }

    /**
     * Notify components of state change
     */
    private notifyStateChange(): void {
        this.components.forEach(component => {
            if (component.onStateChange && typeof component.onStateChange === 'function') {
                component.onStateChange(this.state);
            }
        });
    }

    /**
     * Get component by name
     */
    public getComponent(name: string): any {
        return this.components.get(name);
    }

    /**
     * Register a component
     */
    public registerComponent(name: string, component: any): void {
        this.components.set(name, component);
    }

    /**
     * Unregister a component
     */
    public unregisterComponent(name: string): void {
        this.components.delete(name);
    }

    /**
     * Cleanup before page unload
     */
    private cleanup(): void {
        this.components.forEach(component => {
            if (component.destroy && typeof component.destroy === 'function') {
                component.destroy();
            }
        });

        this.components.clear();
    }

    /**
     * Show notification
     */
    public showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
        // Implementation for showing notifications
        console.log(`[${type.toUpperCase()}] ${message}`);

        // You can integrate with your preferred notification library here
        if (window.jQuery && window.$) {
            // Example with SweetAlert2 if available
            try {
                if ((window as any).Swal) {
                    (window as any).Swal.fire({
                        title: type.charAt(0).toUpperCase() + type.slice(1),
                        text: message,
                        icon: type,
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            } catch (error) {
                console.warn('Notification library not available:', error);
            }
        }
    }

    /**
     * Handle errors globally
     */
    public handleError(error: Error, context?: string): void {
        console.error(`[${context || 'App'}] Error:`, error);

        this.showNotification(
            `Bir hata oluştu: ${error.message}`,
            'error'
        );
    }
}

// Initialize the application
const app = GebzeAdminApp.getInstance();

// Export for global access
(window as any).gebzeAdminApp = app;

// Global error handler
window.addEventListener('error', (event) => {
    app.handleError(event.error || new Error(event.message), 'Global');
});

window.addEventListener('unhandledrejection', (event) => {
    app.handleError(new Error(event.reason), 'Promise');
});

console.log('Gebze Admin Panel TypeScript uygulaması başlatıldı'); 
/**
 * Main Entry Point for Gebze Admin Panel
 * Initializes all components and services
 */
import { NewsTable } from './components/news-table';
class GebzeAdminApp {
    constructor() {
        this.components = new Map();
        this.state = {
            currentPage: window.location.pathname,
            user: null
        };
        this.initialize();
    }
    static getInstance() {
        if (!GebzeAdminApp.instance) {
            GebzeAdminApp.instance = new GebzeAdminApp();
        }
        return GebzeAdminApp.instance;
    }
    /**
     * Initialize the application
     */
    initialize() {
        console.log('Gebze Admin Panel başlatılıyor...');
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupComponents());
        }
        else {
            this.setupComponents();
        }
        // Setup global event listeners
        this.setupGlobalEvents();
    }
    /**
     * Setup page-specific components
     */
    setupComponents() {
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
    setupNewsPage() {
        const newsContainer = document.querySelector('#news-container') || document.querySelector('.page-body');
        if (newsContainer) {
            const newsTable = new NewsTable(newsContainer, {
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
    setupEventsPage() {
        // Implementation for events page
        console.log('Etkinlikler sayfası bileşenleri yüklendi');
    }
    /**
     * Setup services page components
     */
    setupServicesPage() {
        // Implementation for services page
        console.log('Hizmetler sayfası bileşenleri yüklendi');
    }
    /**
     * Setup management page components
     */
    setupManagementPage() {
        // Implementation for management page
        console.log('Yönetim sayfası bileşenleri yüklendi');
    }
    /**
     * Setup default page components
     */
    setupDefaultPage() {
        // Implementation for default/home page
        console.log('Ana sayfa bileşenleri yüklendi');
    }
    /**
 * Setup global event listeners
 */
    setupGlobalEvents() {
        // Handle navigation
        document.addEventListener('click', (e) => {
            var _a;
            const target = e.target;
            const link = target.closest('a[href]');
            if (link && ((_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.startsWith('#'))) {
                e.preventDefault();
                this.handleInternalNavigation(link.getAttribute('href'));
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
    setupSidebarMenu() {
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
    handleInternalNavigation(hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    /**
     * Handle window resize
     */
    handleResize() {
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
    getCurrentPage() {
        var _a;
        const path = window.location.pathname;
        const filename = ((_a = path.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace('.html', '')) || '';
        // Map filenames to page identifiers
        const pageMap = {
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
    getState() {
        return { ...this.state };
    }
    /**
     * Update application state
     */
    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.notifyStateChange();
    }
    /**
     * Notify components of state change
     */
    notifyStateChange() {
        this.components.forEach(component => {
            if (component.onStateChange && typeof component.onStateChange === 'function') {
                component.onStateChange(this.state);
            }
        });
    }
    /**
     * Get component by name
     */
    getComponent(name) {
        return this.components.get(name);
    }
    /**
     * Register a component
     */
    registerComponent(name, component) {
        this.components.set(name, component);
    }
    /**
     * Unregister a component
     */
    unregisterComponent(name) {
        this.components.delete(name);
    }
    /**
     * Cleanup before page unload
     */
    cleanup() {
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
    showNotification(message, type = 'info') {
        // Implementation for showing notifications
        console.log(`[${type.toUpperCase()}] ${message}`);
        // You can integrate with your preferred notification library here
        if (window.jQuery && window.$) {
            // Example with SweetAlert2 if available
            try {
                if (window.Swal) {
                    window.Swal.fire({
                        title: type.charAt(0).toUpperCase() + type.slice(1),
                        text: message,
                        icon: type,
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            }
            catch (error) {
                console.warn('Notification library not available:', error);
            }
        }
    }
    /**
     * Handle errors globally
     */
    handleError(error, context) {
        console.error(`[${context || 'App'}] Error:`, error);
        this.showNotification(`Bir hata oluştu: ${error.message}`, 'error');
    }
}
// Initialize the application
const app = GebzeAdminApp.getInstance();
// Export for global access
window.gebzeAdminApp = app;
// Global error handler
window.addEventListener('error', (event) => {
    app.handleError(event.error || new Error(event.message), 'Global');
});
window.addEventListener('unhandledrejection', (event) => {
    app.handleError(new Error(event.reason), 'Promise');
});
console.log('Gebze Admin Panel TypeScript uygulaması başlatıldı');
//# sourceMappingURL=main.js.map
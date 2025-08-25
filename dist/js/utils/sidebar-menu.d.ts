/**
 * Sidebar Menu Management for Gebze Admin Panel
 * Handles sidebar menu interactions and animations
 */
interface SidebarMenuOptions {
    animationSpeed?: number;
    subMenuSelector?: string;
}
declare class SidebarMenu {
    private static instance;
    private options;
    private $menu;
    private constructor();
    static getInstance(menu: string, options?: SidebarMenuOptions): SidebarMenu;
    /**
     * Initialize sidebar menu functionality
     */
    private initialize;
    /**
     * Handle menu item click
     */
    private handleMenuClick;
    /**
     * Close submenu with animation
     */
    private closeSubmenu;
    /**
     * Open submenu with animation
     */
    private openSubmenu;
    /**
     * Destroy menu functionality
     */
    destroy(): void;
}
export type { SidebarMenu, SidebarMenuOptions };
//# sourceMappingURL=sidebar-menu.d.ts.map
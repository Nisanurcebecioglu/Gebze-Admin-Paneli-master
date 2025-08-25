/**
 * Sidebar Menu Management for Gebze Admin Panel
 * Handles sidebar menu interactions and animations
 */

interface SidebarMenuOptions {
    animationSpeed?: number;
    subMenuSelector?: string;
}

class SidebarMenu {
    private static instance: SidebarMenu;
    private options: Required<SidebarMenuOptions>;
    private $menu: JQuery;

    private constructor(menu: string, options: SidebarMenuOptions = {}) {
        this.options = {
            animationSpeed: options.animationSpeed || 300,
            subMenuSelector: options.subMenuSelector || '.sidebar-submenu'
        };

        this.$menu = $(menu);
        this.initialize();
    }

    public static getInstance(menu: string, options?: SidebarMenuOptions): SidebarMenu {
        if (!SidebarMenu.instance) {
            SidebarMenu.instance = new SidebarMenu(menu, options);
        }
        return SidebarMenu.instance;
    }

    /**
     * Initialize sidebar menu functionality
     */
    private initialize(): void {
        this.$menu.on('click', 'li a', (e: any) => {
            e.preventDefault();
            this.handleMenuClick($(e.currentTarget));
        });
    }

    /**
     * Handle menu item click
     */
    private handleMenuClick($element: JQuery): void {
        const checkElement = $element.next();
        const { subMenuSelector, animationSpeed } = this.options;

        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            // Close submenu
            this.closeSubmenu(checkElement);
        } else if (checkElement.is(subMenuSelector) && !checkElement.is(':visible')) {
            // Open submenu
            this.openSubmenu(checkElement, $element);
        }
    }

    /**
     * Close submenu with animation
     */
    private closeSubmenu($submenu: JQuery): void {
        const { animationSpeed } = this.options;

        $submenu.slideUp(animationSpeed, () => {
            $submenu.removeClass('menu-open');
        });
        $submenu.parent("li").removeClass("active");
    }

    /**
     * Open submenu with animation
     */
    private openSubmenu($submenu: JQuery, $parentElement: JQuery): void {
        const { animationSpeed } = this.options;
        const parent = $parentElement.parents('ul').first();

        // Close other open submenus
        const $otherSubmenus = parent.find('ul:visible').slideUp(animationSpeed);
        $otherSubmenus.removeClass('menu-open');

        // Open current submenu
        const parentLi = $parentElement.parent("li");
        $submenu.slideDown(animationSpeed, () => {
            $submenu.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parentLi.addClass('active');
        });
    }

    /**
     * Destroy menu functionality
     */
    public destroy(): void {
        this.$menu.off('click');
    }
}

// Extend jQuery
$.fn.sidebarMenu = function (options?: SidebarMenuOptions): SidebarMenu {
    return SidebarMenu.getInstance('', options);
};

$.sidebarMenu = function (selector: string, options?: SidebarMenuOptions): SidebarMenu {
    return SidebarMenu.getInstance(selector, options);
};

// Initialize default sidebar menu
$(document).ready(() => {
    $.sidebarMenu('.sidebar-menu');
});

// Export for module usage
export type { SidebarMenu, SidebarMenuOptions }; 
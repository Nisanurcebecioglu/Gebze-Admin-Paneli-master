/**
 * Sidebar Menu Management for Gebze Admin Panel
 * Handles sidebar menu interactions and animations
 */
class SidebarMenu {
    constructor(menu, options = {}) {
        this.options = {
            animationSpeed: options.animationSpeed || 300,
            subMenuSelector: options.subMenuSelector || '.sidebar-submenu'
        };
        this.$menu = $(menu);
        this.initialize();
    }
    static getInstance(menu, options) {
        if (!SidebarMenu.instance) {
            SidebarMenu.instance = new SidebarMenu(menu, options);
        }
        return SidebarMenu.instance;
    }
    /**
     * Initialize sidebar menu functionality
     */
    initialize() {
        this.$menu.on('click', 'li a', (e) => {
            e.preventDefault();
            this.handleMenuClick($(e.currentTarget));
        });
    }
    /**
     * Handle menu item click
     */
    handleMenuClick($element) {
        const checkElement = $element.next();
        const { subMenuSelector, animationSpeed } = this.options;
        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            // Close submenu
            this.closeSubmenu(checkElement);
        }
        else if (checkElement.is(subMenuSelector) && !checkElement.is(':visible')) {
            // Open submenu
            this.openSubmenu(checkElement, $element);
        }
    }
    /**
     * Close submenu with animation
     */
    closeSubmenu($submenu) {
        const { animationSpeed } = this.options;
        $submenu.slideUp(animationSpeed, () => {
            $submenu.removeClass('menu-open');
        });
        $submenu.parent("li").removeClass("active");
    }
    /**
     * Open submenu with animation
     */
    openSubmenu($submenu, $parentElement) {
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
    destroy() {
        this.$menu.off('click');
    }
}
// Extend jQuery
$.fn.sidebarMenu = function (options) {
    return SidebarMenu.getInstance('', options);
};
$.sidebarMenu = function (selector, options) {
    return SidebarMenu.getInstance(selector, options);
};
// Initialize default sidebar menu
$(document).ready(() => {
    $.sidebarMenu('.sidebar-menu');
});
export {};
//# sourceMappingURL=sidebar-menu.js.map
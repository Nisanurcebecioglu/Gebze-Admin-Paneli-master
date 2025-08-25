// Global type definitions for Gebze Admin Panel

declare global {
    interface Window {
        feather: {
            replace: () => void;
        };
        $: JQuery;
        jQuery: JQuery;
    }

    interface JQuery {
        sidebarMenu: (options?: any) => any;
        slideUp: (duration?: number, callback?: () => void) => JQuery;
        slideDown: (duration?: number, callback?: () => void) => JQuery;
        is: (selector: string) => boolean;
        next: () => JQuery;
        parent: (selector?: string) => JQuery;
        parents: (selector?: string) => JQuery;
        find: (selector: string) => JQuery;
        first: () => JQuery;
        removeClass: (className: string) => JQuery;
        addClass: (className: string) => JQuery;
        toggleClass: (className: string) => JQuery;
        off: (eventName: string) => JQuery;
        on: (eventName: string, selector: string, handler: (e: any) => void) => JQuery;
        length: number;
        width: () => number;
    }

    interface JQueryStatic {
        sidebarMenu: (selector: string, options?: any) => any;
    }

    // Custom interfaces for the project
    interface NewsItem {
        id: string;
        title: string;
        category: string;
        date: string;
        description: string;
        imageUrl: string;
    }

    interface EventItem {
        id: string;
        title: string;
        date: string;
        time: string;
        imageUrl: string;
    }

    interface User {
        id: string;
        name: string;
        role: string;
        avatar: string;
    }

    // Utility types
    type Category = 'yonetim' | 'baskanlik' | 'halk' | 'genel';
    type ActionType = 'add' | 'edit' | 'delete' | 'view';
}

export { }; 
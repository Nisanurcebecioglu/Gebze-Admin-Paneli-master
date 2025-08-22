(function () {
    function includeFragment(el) {
        var src = el.getAttribute('data-include');
        if (!src) return Promise.resolve();
        return fetch(src, { cache: 'no-cache' })
            .then(function (res) { return res.text(); })
            .then(function (html) { el.outerHTML = html; })
            .catch(function (err) { console.error('Include failed for', src, err); });
    }

    function run() {
        var nodes = document.querySelectorAll('[data-include]');
        var tasks = [];
        for (var i = 0; i < nodes.length; i++) {
            tasks.push(includeFragment(nodes[i]));
        }
        return Promise.all(tasks).then(function () {
            if (window.feather && typeof window.feather.replace === 'function') {
                try { window.feather.replace(); } catch (e) { }
            }
            if (window.jQuery && window.$) {
                try {
                    // Sidebar menü başlatma
                    if (typeof $.sidebarMenu === 'function') {
                        $('.sidebar-menu').off('click.sidebarMenu').on('click.sidebarMenu', 'li a', function (e) {
                            var $this = $(this);
                            var checkElement = $this.next();
                            var subMenuSelector = '.sidebar-submenu';

                            if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
                                checkElement.slideUp(300, function () {
                                    checkElement.removeClass('menu-open');
                                });
                                checkElement.parent("li").removeClass("active");
                            }
                            else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
                                var parent = $this.parents('ul').first();
                                var ul = parent.find('ul:visible').slideUp(300);
                                ul.removeClass('menu-open');
                                var parent_li = $this.parent("li");
                                checkElement.slideDown(300, function () {
                                    checkElement.addClass('menu-open');
                                    parent.find('li.active').removeClass('active');
                                    parent_li.addClass('active');
                                });
                            }
                        });
                    }

                    // Header toggle
                    var $nav = $('.page-sidebar');
                    var $header = $('.page-main-header');
                    var $toggle = $('#sidebar-toggle');
                    if ($toggle.length) {
                        $toggle.off('click._includeRebind').on('click._includeRebind', function () {
                            $nav.toggleClass('open');
                            $header.toggleClass('open');
                        });
                    }

                    // Responsive
                    var w = $(window).width();
                    if (w + 17 <= 991) {
                        $toggle.addClass('open');
                        $nav.addClass('open');
                    } else {
                        $toggle.removeClass('open');
                        $nav.removeClass('open');
                    }
                } catch (e) { }
            }
            var evt;
            try {
                evt = new Event('includes:loaded');
            } catch (e) {
                evt = document.createEvent('Event');
                evt.initEvent('includes:loaded', true, true);
            }
            document.dispatchEvent(evt);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})(); 
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const ltrDir = path.join(projectRoot, 'ltr');

const headerInclude = '<div data-include="partials/header.html"></div>';
const sidebarInclude = '<div data-include="partials/sidebar.html"></div>';
const includeScriptTag = '<script src="../assets/js/html-include.js"></script>';

function processFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Replace header block between comments
    html = html.replace(/<!--\s*Page Header Start\s*-->[\s\S]*?<!--\s*Page Header Ends\s*-->/i, function (match) {
        return '<!-- Page Header Start-->\n    ' + headerInclude + '\n    <!-- Page Header Ends -->';
    });

    // Replace sidebar block between comments
    html = html.replace(/<!--\s*Page Sidebar Start\s*-->[\s\S]*?<!--\s*Page Sidebar Ends\s*-->/i, function (match) {
        return '<!-- Page Sidebar Start-->\n      ' + sidebarInclude + '\n      <!-- Page Sidebar Ends-->';
    });

    // Ensure include script exists (before Theme js if possible)
    if (!html.includes('assets/js/html-include.js')) {
        html = html.replace(/<!--\s*Plugins JS Ends\s*-->/i, function (match) {
            return match + '\n        ' + includeScriptTag;
        });
        if (!html.includes('assets/js/html-include.js')) {
            // Fallback: inject before closing body
            html = html.replace(/<\/body>/i, '  ' + includeScriptTag + '\n</body>');
        }
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Updated:', path.basename(filePath));
}

function run() {
    const files = fs.readdirSync(ltrDir).filter(f => f.endsWith('.html'));
    files.forEach(f => {
        try {
            processFile(path.join(ltrDir, f));
        } catch (e) {
            console.error('Failed:', f, e.message);
        }
    });
}

run(); 
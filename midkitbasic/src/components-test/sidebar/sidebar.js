// components-test/sidebar.js
const Sidebar = (function() {
  function create(items) {
    if (!Array.isArray(items)) {
      throw new Error("Items must be an array.");
    }

    let html = '<aside><ul>';
    items.forEach(item => {
      html += `<li><a href="${item}">${item}</a></li>`;
    });
    html += '</ul></aside>';

    return html;
  }

  return {
    create
  };
})();

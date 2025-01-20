// components-test/sidebar.js
var Sidebar = (function() {
  function create(items) {
    var html = '<aside><ul>';
    items.forEach(function(item) {
      html += `<li><a href="${item}">${item}</a></li>`;
    });
    html += '</ul></aside>';
    return html;
  }

  return {
    create: create
  };
})();
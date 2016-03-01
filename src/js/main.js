(function () {
  // Open external links in new tabs.
  document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('a[href^="//"], a[href^="http://"], a[href^="https://"]');
    for (var i = 0, len = links.length; i < len; ++i) {
      links[i].setAttribute('target', '_blank');
    }
  });
})();

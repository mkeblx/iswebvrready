(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Open external links in new tabs.
    var links = document.querySelectorAll('a[href^="//"], a[href^="http://"], a[href^="https://"]');
    for (var i = 0, len = links.length; i < len; ++i) {
      links[i].setAttribute('target', '_blank');
    }

    // Strip `.html` from ugly URLs (when served on GitHub Pages).
    if (location.hostname === 'iswebvrready.org') {
      var relativeLinks = document.querySelectorAll('a[href$=".html"]:not([href^="//"]):not([href^="http://"]):not([href^="https://"])');
      for (i = 0, len = relativeLinks.length; i < len; ++i) {
        relativeLinks[i].setAttribute('href', relativeLinks[i].getAttribute('href').replace(/.html$/, ''));
      }
    }
  });
})();

/* global ga */
(function () {

function initGAScript (id) {
  (function (c, v, a, n) {
    c.GoogleAnalyticsObject = n;

    c[n] = c[n] || function () {
      (c[n].q = c[n].q || []).push(arguments);
    };
    c[n].l = 1 * new Date();

    var s = v.createElement('script');
    s.async = true;
    s.src = a;

    v.head.appendChild(s);
  })(window, document, 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', id, 'auto');
  ga('send', 'pageview');
}

function initGAEvents () {
  var body = document.body;

  ga('send', 'event', 'pageload.querystring', window.location.search);
  ga('send', 'event', 'pageload.hash', window.location.hash);

  ga('send', 'event', 'supports.getVRDevices', 'getVRDevices' in navigator);
  ga('send', 'event', 'supports.getVRDisplays', 'getVRDisplays' in navigator);

  body.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a') || e.target;
    if (!a) { return; }
    if (a.matches('.wordmark')) {
      ga('send', 'event', 'click.nav.wordmark_link', getLinkText(a));
    } else if (a.matches('.external-links a')) {
      ga('send', 'event', 'click.nav.section_link', getLinkText(a));
    } else if (a.matches('.feature header a')) {
      ga('send', 'event', 'click.feature.' + a.closest('.feature').id + '.header_link', getLinkText(a));
    } else if (a.matches('.feature .details a')) {
      ga('send', 'event', 'click.feature.' + a.closest('.feature').id + '.details_link', getLinkText(a));
    } else if (a.matches('.mozvr-wordmark')) {
      ga('send', 'event', 'click.footer.mozvr_link', getLinkText(a));
    }
  });
}

function getLinkText (a) {
  var txt = a.textContent.trim();
  if (txt) {
    return txt;
  }

  var img = a.querySelector('img');
  if (img) {
    return img.getAttribute('alt');
  }

  return '';
}

initGAScript('UA-74058648-1');
document.addEventListener('DOMContentLoaded', initGAEvents);

})();

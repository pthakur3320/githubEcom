// js/digitalData.js
(function () {
  function getPageType(pathname) {
    if (pathname === "/githubEcom/" || pathname === "/githubEcom/index.html") return "home";
    if (pathname.indexOf("/shop.html") !== -1) return "plp";
    if (pathname.indexOf("/single-product.html") !== -1) return "pdp";
    if (pathname.indexOf("/cart.html") !== -1) return "cart";
    if (pathname.indexOf("/blog.html") !== -1) return "articles";
    if (pathname.indexOf("/contact.html") !== -1) return "contact";
    if (pathname.indexOf("/account.html") !== -1) return "account";
    return "other";
  }

  // Ensure base objects exist early
  window.digitalData = window.digitalData || {};
  window.digitalData.page = window.digitalData.page || {};
  window.digitalData.user = window.digitalData.user || { isLoggedIn: false, userID: null, profile: {} };
  window.digitalData.events = window.digitalData.events || [];

  // Helper to push behavioral events
  if (typeof window.digitalData.pushEvent !== "function") {
    window.digitalData.pushEvent = function (eventName, eventInfo) {
      var evt = Object.assign({ event: eventName, timestamp: new Date().toISOString() }, eventInfo || {});
      window.digitalData.events.push(evt);
      // Optional: notify any listeners (e.g., Launch custom code)
      try { window.dispatchEvent(new CustomEvent("digitalData:eventPushed", { detail: evt })); } catch (e) {}
    };
  }

  // Fill page info when DOM is ready (so document.title is populated)
  document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname || "/";
    var pageType = getPageType(path);
    var rawTitle = document.title || pageType || "page";
    var pageName = rawTitle
      .toLowerCase()
      .trim()
      .replace(/[|]+/g, " ")     // remove pipes
      .replace(/\s+/g, "-")      // spaces -> hyphen
      .replace(/[^a-z0-9-]/g, "")// strip other chars
      .replace(/-+/g, "-");      // collapse multiple -

    window.digitalData.page = {
      pageName: pageName,
      pageType: pageType,
      language: document.documentElement.lang || "en"
    };
  });
})();

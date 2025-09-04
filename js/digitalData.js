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

  // Initialize digitalData if not already present
  window.digitalData = window.digitalData || {};

  // Add a safe events array
  window.digitalData.events = window.digitalData.events || [];

  // Small helper to push events
  window.digitalData.pushEvent = function (eventName, eventInfo) {
    var evt = {
      name: eventName,
      info: eventInfo || {},
      timestamp: new Date().toISOString()
    };
    window.digitalData.events.push(evt);
    console.log("📌 digitalData Event:", evt);
  };

  // Default anonymous user
  window.digitalData.user = {
    isLoggedIn: false,
    userID: null,
    profile: {}
  };

  // Wait until DOM is ready so document.title is available
  document.addEventListener("DOMContentLoaded", function () {
    var path = window.location.pathname || "/";
    var pageType = getPageType(path);
    var pageName = (document.title || pageType || "page")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    window.digitalData.page = {
      pageName: pageName,
      pageType: pageType,
      language: document.documentElement.lang || "en"
    };

    console.log("📄 digitalData.page:", window.digitalData.page);
  });
})();

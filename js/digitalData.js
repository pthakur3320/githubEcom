(function () {
  function getPageType(pathname) {
    if (pathname === "/" || pathname === "/index.html") return "home";
    if (pathname.indexOf("/shop.html") !== -1) return "plp";
    if (pathname.indexOf("/single-product.html") !== -1) return "pdp";
    if (pathname.indexOf("/cart.html") !== -1) return "cart";
    if (pathname.indexOf("/blog.html") !== -1) return "articles";
    if (pathname.indexOf("/contact.html") !== -1) return "contact";
    if (pathname.indexOf("/account.html") !== -1) return "account";
    return "other";
  }

  window.digitalData = window.digitalData || {};
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
})();

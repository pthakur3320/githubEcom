window.dataLayer = window.dataLayer || [];

function getPageType(pathname) {
  if (pathname === "/githubEcom/" || pathname === "/githubEcom/index.html") {
    return "home";
  } else if (pathname.indexOf("shop.html") !== -1) {
    return "plp";
  } else if (pathname.indexOf("single-product.html") !== -1) {
    return "pdp";
  } else if (pathname.indexOf("cart.html") !== -1) {
    return "cart";
  } else if (pathname.indexOf("blog.html") !== -1) {
    return "articles";
  } else if (pathname.indexOf("contact.html") !== -1) {
    return "contact";
  } else if (pathname.indexOf("account.html") !== -1) {
    return "account";
  } else {
    return "other";
  }
}

// Push page attributes to GTM dataLayer
document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname || "/";
  var pageType = getPageType(path);
  var pageName = document.title || pageType || "page";

  dataLayer.push({
    event: "virtual_page_view",
    page: {
      pageName: pageName,
      pageType: pageType,
    }
  });
});

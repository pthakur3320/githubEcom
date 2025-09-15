window.dataLayer = window.dataLayer || [];

// Get page type based on pathname
function getPageType(pathname) {
  if (pathname === "/githubEcom/" || pathname === "/githubEcom/index.html") return "home";
  if (pathname.indexOf("shop.html") !== -1) return "plp";
  if (pathname.indexOf("single-product.html") !== -1) return "pdp";
  if (pathname.indexOf("cart.html") !== -1) return "cart";
  if (pathname.indexOf("blog.html") !== -1) return "articles";
  if (pathname.indexOf("contact.html") !== -1) return "contact";
  if (pathname.indexOf("account.html") !== -1) return "account";
  return "other";
}

document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname || "/";
  var pageType = getPageType(path);
  var pageName = document.title || pageType || "page";

  // Push virtual page view
  dataLayer.push({
    event: "virtual_page_view",
    page: { pageName, pageType }
  });

  // Push view_item only on PDP pages
  if (pageType === "pdp") {
    dataLayer.push({ ecommerce: null }); // Clear previous ecommerce

    var name = document.querySelector(".product-title")?.innerText.trim() || "Unknown";
    var sku = document.querySelector(".product-sku a")?.innerText.trim() || "No SKU";
    var price = parseFloat(document.querySelector(".new-price")?.innerText.replace(/[^0-9.]/g, "") || "0");
    var category = document.querySelector(".product-categories a")?.innerText.trim() || "Uncategorized";
    var brand = "GitHub Ecom";
    var quantity = 1;

    dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "USD",
        value: price,
        items: [{ item_id: sku, item_name: name, item_brand: brand, item_category: category, price, quantity }]
      }
    });

    console.log("GA4 view_item pushed:", name, price, sku, category);
  }
});

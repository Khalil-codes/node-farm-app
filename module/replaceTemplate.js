export default (tempCard, product) =>
    tempCard
        .replaceAll("{{ PRODUCT_ID }}", product.id)
        .replaceAll("{{ PRODUCT_NAME }}", product.productName)
        .replaceAll("{{ PRODUCT_IMAGE }}", product.image)
        .replaceAll("{{ PRODUCT_FROM }}", product.from)
        .replaceAll("{{ PRODUCT_NUTRIENTS }}", product.nutrients)
        .replaceAll("{{ PRODUCT_QUANTITY }}", product.quantity)
        .replaceAll("{{ PRODUCT_QUANTITY }}", product.quantity)
        .replaceAll("{{ PRODUCT_PRICE }}", product.price)
        .replaceAll("{{ NOT_ORGANIC }}", product.organic ? "" : "not-organic")
        .replaceAll("{{ PRODUCT_DESCRIPTION }}", product.description);

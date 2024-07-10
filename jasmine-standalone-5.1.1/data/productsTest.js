import { Product, Clothing, Appliance } from "../../data/products.js";

describe("test suite: Product", () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37,
      },
      priceCents: 2067,
      keywords: ["plates", "kitchen", "dining"],
    });
  });

  it("has the correct propertues", () => {
    expect(product.id).toEqual("3ebe75dc-64d2-4137-8860-1f5a963e534b");
    expect(product.image).toEqual(
      "images/products/6-piece-white-dinner-plate-set.jpg"
    );
    expect(product.name).toEqual("6 Piece White Dinner Plate Set");
    expect(product.rating).toEqual({
      stars: 4,
      count: 37,
    });
    expect(product.priceCents).toEqual(2067);
  });

  it("gets the star url", () => {
    expect(product.getStarUrl()).toEqual(`images/ratings/rating-40.png`);
  });

  it("gets the price", () => {
    expect(product.getPrice()).toEqual("$20.67");
  });

  it("gets the info HTML ", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("test suite: Clothing", () => {
  let product;

  beforeEach(() => {
    product = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  it("has the correct properties", () => {
    expect(product.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(product.image).toEqual(
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    );
    expect(product.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 56,
    });
    expect(product.priceCents).toEqual(799);
  });

  it("gets the star url", () => {
    expect(product.getStarUrl()).toEqual(`images/ratings/rating-45.png`);
  });

  it("gets the price", () => {
    expect(product.getPrice()).toEqual("$7.99");
  });

  it("gets the info HTML ", () => {
    expect(product.extraInfoHTML()).toContain(
      `<a href="images/clothing-size-chart.png" target="_blank">`
    );

    expect(product.extraInfoHTML()).toContain("Size Chart");
  });
});

describe("test suite: Appliance", () => {
  let product;

  beforeEach(() => {
    product = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      priceCents: 1899,
      keywords: ["toaster", "kitchen", "appliances"],
      type: "appliance",
      instructionLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });
  });

  it("has the correct propertues", () => {
    expect(product.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(product.image).toEqual("images/products/black-2-slot-toaster.jpg");
    expect(product.name).toEqual("2 Slot Toaster - Black");
    expect(product.rating).toEqual({
      stars: 5,
      count: 2197,
    });
    expect(product.priceCents).toEqual(1899);
  });

  it("gets the star url", () => {
    expect(product.getStarUrl()).toEqual(`images/ratings/rating-50.png`);
  });

  it("gets the price", () => {
    expect(product.getPrice()).toEqual("$18.99");
  });

  it("displays instructions and warranty in extraInfoHTML", () => {
    expect(product.extraInfoHTML()).toContain(
      `<a href="images/appliance-instructions.png" target="_blank">`
    );
    expect(product.extraInfoHTML()).toContain("Instructions");

    expect(product.extraInfoHTML()).toContain(
      `<a href="images/appliance-warranty.png" target="_blank">`
    );
    expect(product.extraInfoHTML()).toContain("Warranty");
  });
});

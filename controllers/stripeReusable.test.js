const { total } = require("./stripeReusable.js");
const products = [
  {
    id: 1,
    name: "ZIP MOCK NECK T-SHIRT",
    description: "Mock neck T-shirt with front zip closure and short sleeves",
    price: 40,
    imageName: "zipBlack",
    size: "medium",
    qty: 4,
  },
  {
    id: 2,
    name: "ZIP MOCK NECK T-SHIRT",
    description: "Mock neck T-shirt with front zip closure and short sleeves",
    price: 40,
    qty: 2,
    imageName: "zipBlue",
    size: "medium",
  },
  {
    id: 3,
    name: "ZIP MOCK NECK T-SHIRT",
    description: "Mock neck T-shirt with front zip closure and short sleeves",
    price: 40,
    qty: 3,
    imageName: "zipGreen",
    size: "medium",
  },
];

test("return total function total", () => {
  const result = total(products);
  expect(result).toBe(360);
});

describe("stripe intent payment testing", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("unit test paymentIntent ", async () => {
    const sum = total(products);

    const items = {
      amount: sum,
      currency: "usd",
      payment_method_types: ["card"],
    };
    jest.doMock("stripe", () => {
      return jest.fn(() => ({
        // when the function be called, it return an object
        paymentIntents: {
          create: jest.fn(() =>
            Promise.resolve({
              client_secret: "123456",
            })
          ),
        },
      }));
    });
    const { PaymentIntent } = require("./stripeReusable.js");
    const item = await PaymentIntent(items);
    expect(item).toBe("123456");
  });
});

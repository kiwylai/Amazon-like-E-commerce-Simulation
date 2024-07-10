import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export let deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOption[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let today = dayjs(); // Start from today
  let deliveryDate = today;
  let daysAdded = 0; // Counter for added days

  // Add days one by one and skip weekends
  while (daysAdded < deliveryOption.deliveryDays) {
    deliveryDate = deliveryDate.add(1, "day"); // Add one day
    const dayOfWeek = deliveryDate.day(); // Get the day of the week (0 = Sunday, 6 = Saturday)

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Check if it's not a weekend
      daysAdded++; // Increment the days added only if it's a weekday
    }
  }

  let dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}

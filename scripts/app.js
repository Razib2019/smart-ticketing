const couponSection = document.getElementById("coupon-section");
couponSection.classList.add("disabled");

const nextBtn = document.getElementById("next-btn");
nextBtn.classList.add("disabled");

document
  .getElementById("go-to-buy-ticket")
  .addEventListener("click", function () {
    document
      .getElementById("buy-ticket")
      .scrollIntoView({ behavior: "smooth" });
  });

const seats = document.getElementsByClassName("seat");
for (const seat of seats) {
  seat.addEventListener("click", function (event) {
    const name = event.target.innerText;

    if (getConvertedValue("seat-count") + 1 > 4) {
      alert("You Already Selected 4 Seats. You can't select more than 4 seats");
      return;
    }

    const couponSection = document.getElementById("coupon-section");
    if (getConvertedValue("seat-count") + 1 === 4) {
      couponSection.classList.remove("disabled");
    }

    const nextBtn = document.getElementById("next-btn");
    document
      .getElementById("phone-number")
      .addEventListener("input", function () {
        const phoneNumber = document.getElementById("phone-number").value;
        console.log(phoneNumber);
        if (getConvertedValue("seat-count") + 1 >= 1 && phoneNumber) {
          nextBtn.classList.remove("disabled");
        }
      });

    event.target.setAttribute("disabled", true);
    event.target.style.backgroundColor = "#1DD100";
    event.target.style.color = "white";

    const seatCount = getConvertedValue("seat-count");
    document.getElementById("seat-count").innerText = seatCount + 1;

    const seatLeft = getConvertedValue("seat-left");
    document.getElementById("seat-left").innerText = seatLeft - 1;

    const selectedSeatsContainer = document.getElementById(
      "selected-seats-container"
    );

    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "justify-between",
      "text-[#03071299]",
      "text-base",
      "font-normal",
      "mb-4"
    );

    const seatName = document.createElement("h1");
    seatName.innerText = name;
    div.appendChild(seatName);

    const seatClass = document.createElement("h1");
    seatClass.innerText = "Economy";
    div.appendChild(seatClass);

    const seatPrice = document.createElement("h1");
    const perSeatPrice = 550;
    seatPrice.innerText = perSeatPrice;
    div.appendChild(seatPrice);

    selectedSeatsContainer.appendChild(div);
    updateTotalPrice(perSeatPrice);
    updateGrandTotal();
  });
}

function updateTotalPrice(value) {
  const totalPrice = getConvertedValue("total-price");
  const sum = totalPrice + value;
  document.getElementById("total-price").innerText = sum;
}

function updateGrandTotal(status) {
  const totalPrice = getConvertedValue("total-price");
  if (status == undefined) {
    document.getElementById("grand-total").innerText = totalPrice;
  } else {
    const couponCode = document.getElementById("coupon-code").value;
    if (couponCode == "NEW15") {
      const discountedPrice = totalPrice * 0.15;
      document.getElementById("grand-total").innerText =
        totalPrice - discountedPrice;
      createDiscountedPriceSection(discountedPrice);
      const couponSection = document.getElementById("coupon-section");
      couponSection.classList.add("hidden");
    } else if (couponCode == "Couple20") {
      const discountedPrice = totalPrice * 0.2;
      document.getElementById("grand-total").innerText =
        totalPrice - discountedPrice;
      createDiscountedPriceSection(discountedPrice);
      const couponSection = document.getElementById("coupon-section");
      couponSection.classList.add("hidden");
    } else {
      alert("Please Provide a Valid Coupon Code");
    }
  }
}

function createDiscountedPriceSection(value) {
  const discountedSection = document.getElementById("discounted-section");

  const div = document.createElement("div");
  div.classList.add(
    "flex",
    "justify-between",
    "text-[#030712]",
    "text-base",
    "font-medium",
    "mt-6"
  );

  const name = document.createElement("h1");
  name.innerText = "Discounted Price";
  div.appendChild(name);

  const price = document.createElement("h1");
  price.innerText = value;
  div.appendChild(price);

  discountedSection.appendChild(div);
}

function getConvertedValue(id) {
  const value = document.getElementById(id).innerText;
  const convertedValue = parseInt(value);
  return convertedValue;
}

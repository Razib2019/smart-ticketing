document
  .getElementById("go-to-buy-ticket")
  .addEventListener("click", function () {
    document
      .getElementById("buy-ticket")
      .scrollIntoView({ behavior: "smooth" });
  });

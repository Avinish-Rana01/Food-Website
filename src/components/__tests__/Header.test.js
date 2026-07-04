import { fireEvent, screen, render } from "@testing-library/react";
import Header from "../Header";
import appStore from "../../utlis/appStore";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";

test("Should renders header component with login button", () => {
  render(
    <Provider store={appStore}>
      <Header />
    </Provider>,
  );

  const loginBtn = screen.getByRole("button", { name: "Login" });
//   const loginBtn = screen.getByText("Login");
  expect(loginBtn).toBeInTheDocument();
});

test("Should renders the cart", () => {
  render(
    <Provider store={appStore}>
      <Header />
    </Provider>,
  );
  //Here I used regex to find the element that contains the text "Cart" 
  //because the cart items count is dynamic and can change based on the state of the application.
  // It is case sensitive and will match any element that contains the text "Cart", 
  // regardless of the number of items in the cart.
  const CartItems = screen.getByText(/Cart/);
//   const loginBtn = screen.getByText("Login");
  expect(CartItems).toBeInTheDocument();
});

test("Should Change login button to logout onClick", () => {
  render(
    <Provider store={appStore}>
      <Header />
    </Provider>,
  );

    const loginBtn = screen.getByRole("button", { name: "Login" });
    // Simulate a click event on the login button
    fireEvent.click(loginBtn);
    // After clicking the login button, we expect it to change to "Logout"
    const logoutBtn = screen.getByRole("button", { name: "Logout" });
    expect(logoutBtn).toBeInTheDocument();
});
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

// Describe block is used to group related tests together. 
// It helps in organizing tests and making the test output more readable. 
// In this case, we are grouping all tests related to the Contact component within a describe block. 
// This way, when we run our tests, we can easily see that these tests are specifically for the Contact component, 
// and it provides a clear structure to our test suite.
describe("Contact Component", () => {
  test("renders contact form", () => {
    render(<Contact />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("should load button", () => {
    render(<Contact />);

    const button = screen.getByRole("button");
    // const buttonText = screen.getByText("Random Text");
  });
  // We can also write "it" instead of "test". The "it" is just an alias for "test" and can be used interchangeably. 
  // Some developers prefer to use "it" because it can make test descriptions read more naturally, like "it should load button". 
  // However, both "test" and "it" serve the same purpose in Jest and can be used based on personal preference or team conventions.
  // In Industry, both "test" and "it" are commonly used, and you may see either one in different codebases.
  // But it is used more in industry because it makes the test descriptions read more naturally, like "it should load button".
  it("should load input fields", () => {
    render(<Contact />);
    const inputFields = screen.getAllByRole("textbox");
    expect(inputFields.length).toBe(3);
  });
});

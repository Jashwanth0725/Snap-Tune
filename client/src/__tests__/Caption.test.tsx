import { render, screen } from "@testing-library/react";
import Caption from "@/components/ai/caption.tsx";

describe("Caption Component", () => {
  test("renders Upload Image button", () => {
    render(<Caption />);
    const button = screen.getByText(/Upload Image/i);
    expect(button).toBeInTheDocument();
  });
});

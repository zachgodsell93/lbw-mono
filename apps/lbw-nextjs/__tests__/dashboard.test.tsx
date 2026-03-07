import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ResultsChart from "@/components/dashboard/results-chart";
import MetricsTop from "@/components/dashboard/metrics-top";
import UpcomingOrders from "@/components/dashboard/upcoming-orders";
import ResultedOrders from "@/components/dashboard/resulted-orders";

// Path: components/dashboard/results-chart.tsx
describe("Result Chart", () => {
  it("Renders Result Chart", () => {
    render(<ResultsChart />);

    const chart = screen.getByTestId("line-chart");

    expect(chart).toBeInTheDocument();
  });
});

// Path: components/dashboard/metrics-top.tsx
describe("Metrics Top", () => {
  it("Renders Metrics Top", () => {
    render(<MetricsTop />);

    const profit = screen.getByText("Profit");
    const match = screen.getByText("Match");
    const backs = screen.getByText("Backs");
    const lays = screen.getByText("Lays");

    expect(profit).toBeInTheDocument();
    expect(match).toBeInTheDocument();
    expect(backs).toBeInTheDocument();
    expect(lays).toBeInTheDocument();
  });
});

// Path: components/dashboard/upcoming-orders.tsx
describe("Upcoming Orders", () => {
  it("Renders Upcoming Orders", () => {
    render(<UpcomingOrders />);

    const title = screen.getByText("Pending Orders");

    expect(title).toBeInTheDocument();
  });
});

describe("Resulted Orders", () => {
  it("Renders Resulted Orders", () => {
    render(<ResultedOrders />);

    const title = screen.getByText("Resulted Orders");

    expect(title).toBeInTheDocument();
  });
});

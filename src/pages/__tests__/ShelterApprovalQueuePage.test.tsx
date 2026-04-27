import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, describe, beforeEach, vi } from "vitest";
import React from "react";

// Mock useNavigate BEFORE importing (hoisted)
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the adoptionService module - define mock inside the factory
vi.mock("../api/adoptionService", () => ({
  adoptionService: {
    getAdminApprovalQueue: vi.fn(),
  },
}));

import ShelterApprovalQueuePage from "../ShelterApprovalQueuePage";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { adoptionService } from "../../api/adoptionService";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
);

describe("ShelterApprovalQueuePage", () => {
  beforeEach(() => {
    queryClient.clear();
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("renders the shelter approval queue with items", async () => {
    // Mock the API response using the imported adoptionService
    (adoptionService.getAdminApprovalQueue as any).mockResolvedValue({
      items: [
        { 
          id: "1", 
          shelter: "Happy Paws Shelter",
          pet: "Buddy (Golden Retriever)", 
          adopter: "John Doe", 
          submitted: "2026-04-23T00:00:00Z", 
          shelterApproved: false,
          daysWaiting: 4,
          isOverdue: false
        },
        { 
          id: "2", 
          shelter: "Happy Paws Shelter",
          pet: "Luna (Siamese Cat)", 
          adopter: "Jane Smith", 
          submitted: "2026-04-26T00:00:00Z", 
          shelterApproved: false,
          daysWaiting: 1,
          isOverdue: false
        },
        { 
          id: "3", 
          shelter: "Happy Paws Shelter",
          pet: "Max (German Shepherd)", 
          adopter: "Robert Brown", 
          submitted: "2026-04-22T00:00:00Z", 
          shelterApproved: false,
          daysWaiting: 5,
          isOverdue: true
        },
        { 
          id: "4", 
          shelter: "Happy Paws Shelter",
          pet: "Bella (Beagle)", 
          adopter: "Emily White", 
          submitted: "2026-04-27T00:00:00Z", 
          shelterApproved: false,
          daysWaiting: 0,
          isOverdue: false
        },
      ],
      nextCursor: undefined,
    });

    render(<ShelterApprovalQueuePage />, { wrapper });

    expect(screen.getByText(/Pending Shelter Approvals/i)).toBeInTheDocument();
    
    // Wait for loading to finish
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));
    
    // Check for pet names
    expect(screen.getByText(/Buddy \(Golden Retriever\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Luna \(Siamese Cat\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Max \(German Shepherd\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Bella \(Beagle\)/i)).toBeInTheDocument();
  });

  it("shows empty state when no items", async () => {
    (adoptionService.getAdminApprovalQueue as any).mockResolvedValue({
      items: [],
      nextCursor: undefined,
    });

    render(<ShelterApprovalQueuePage />, { wrapper });
    
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));
    
    expect(screen.getByText(/No pending approvals/i)).toBeInTheDocument();
  });

  it("navigates to adoption detail on row click", async () => {
    const user = userEvent.setup();
    
    (adoptionService.getAdminApprovalQueue as any).mockResolvedValue({
      items: [
        { 
          id: "123", 
          shelter: "Happy Paws Shelter",
          pet: "Buddy (Golden Retriever)", 
          adopter: "John Doe", 
          submitted: "2026-04-23T00:00:00Z", 
          shelterApproved: false,
          daysWaiting: 4,
          isOverdue: false
        },
      ],
      nextCursor: undefined,
    });

    render(<ShelterApprovalQueuePage />, { wrapper });
    
    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));
    
    const petCell = screen.getByText(/Buddy \(Golden Retriever\)/i);
    const row = petCell.closest("tr")!;
    
    await user.click(row);
    
    // Verify navigation to correct path with id and anchor
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/adoption/123#approvals");
  });
});


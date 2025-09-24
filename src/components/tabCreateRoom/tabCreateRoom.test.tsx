import { render, screen, fireEvent } from "@testing-library/react";
import {
  ChakraProvider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from "@chakra-ui/react";
import TabCreateRoom from "./tabCreateRoom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../../configs/fireBaseConfigs", () => ({
  addRoom: vi.fn(),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>
    <Tabs>
      <TabList>
        <Tab>Test Tab</Tab>
      </TabList>
      <TabPanels>{children}</TabPanels>
    </Tabs>
  </ChakraProvider>
);

describe("TabCreateRoom", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders pseudo input", () => {
    render(
      <TestWrapper>
        <TabCreateRoom />
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText("Choisissez votre pseudo");
    expect(input).toBeInTheDocument();
  });

  test("generates room ID when clicking generate button", () => {
    render(
      <TestWrapper>
        <TabCreateRoom />
      </TestWrapper>
    );

    const generateButton = screen.getByText("Generate code");
    fireEvent.click(generateButton);

    const roomId = screen.getByText(/ROOM-/);
    expect(roomId).toBeInTheDocument();
  });

  test("copies room ID to clipboard when clicking on room ID", async () => {
    const mockClipboard = {
      writeText: vi.fn(),
    };
    Object.assign(navigator, {
      clipboard: mockClipboard,
    });

    render(
      <TestWrapper>
        <TabCreateRoom />
      </TestWrapper>
    );

    const generateButton = screen.getByText("Generate code");
    fireEvent.click(generateButton);

    const roomId = screen.getByText(/ROOM-/);
    fireEvent.click(roomId);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});

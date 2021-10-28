import { renderHook } from "@testing-library/react-hooks";
import { useWallet } from "renft-front/hooks/store/useWallet";

jest.mock("firebase/app");
jest.mock("react-ga");
jest.mock("@ethersproject/providers");
jest.mock("web3modal");
jest.mock("zustand");

describe("useWallet", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it("should return default state", async () => {
    global.window.ethereum = undefined;
    const { result, waitFor } = renderHook(() => useWallet());

    await waitFor(() => {
      expect(result.current.address).toBe("");
      expect(result.current.network).toBe("");
      expect(result.current.signer).toBe(undefined);
    });
  });

  it("should show empty address when not connected before", async () => {
    global.window.ethereum = {
      request: jest.fn().mockReturnValue(
        Promise.resolve([
          {
            caveats: [],
          },
        ])
      ),
    };
    const { result, waitFor } = renderHook(() => useWallet());
    await waitFor(() => {
      expect(result.current.address).toBe("");
      expect(result.current.network).toBe("");
      expect(result.current.signer).toBe(undefined);
    });
  });

  it("should return address if connected before", async () => {
    global.window.ethereum = {
      request: jest.fn().mockReturnValue(
        Promise.resolve([
          {
            caveats: ["", { value: ["incorrect value"] }],
          },
        ])
      ),
    };
    const { result, waitFor } = renderHook(() => useWallet());
    await waitFor(() => {
      expect(result.current.address).toBe(
        "889714669db168bbdb3894929de608e57959fefc"
      );

      expect(result.current.network).toBe("mainnet");
      expect(result.current.signer).not.toBe(null);
    });
  });

  it("should connect when click on button and accept wallet permission", async () => {
    global.window.ethereum = {
      request: jest.fn().mockReturnValue(
        Promise.resolve([
          {
            caveats: [],
          },
        ])
      ),
    };
    const { result, waitFor } = renderHook(() => useWallet());

    global.window.ethereum = {
      request: jest.fn().mockReturnValue(
        Promise.resolve([
          {
            caveats: ["", { value: ["incorrect value"] }],
          },
        ])
      ),
    };

    await waitFor(() => {
      expect(result.current.address).toBe(
        "889714669db168bbdb3894929de608e57959fefc"
      );
      expect(result.current.network).toBe("mainnet");
      expect(result.current.signer).not.toBe(null);
    });
  });
});

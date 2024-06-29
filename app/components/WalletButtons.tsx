import { useCallback } from "react";
import { useAccount, useConnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { secondaryBtnClasses } from "./Styles";

export const WalletButtons = () => {
  const { connectors, connect } = useConnect();
  const account = useAccount();

  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK",
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
  }, [connectors, connect]);

  return (
    <>
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        chainStatus={"none"}
        label={"Connect"}
        showBalance={false}
      />

      {!account.isConnected && (
        <button
          type="button"
          className={secondaryBtnClasses}
          onClick={createWallet}
        >
          Create wallet
        </button>
      )}
    </>
  );
};

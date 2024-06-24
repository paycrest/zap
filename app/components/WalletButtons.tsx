import { ConnectButton } from "@rainbow-me/rainbowkit";
import { secondaryBtnClasses } from "./Styles";

export const WalletButtons = () => {
  return (
    <>
      <ConnectButton accountStatus={"avatar"} chainStatus={"none"} />

      <button type="button" className={secondaryBtnClasses}>
        Create Wallet
      </button>
    </>
  );
};

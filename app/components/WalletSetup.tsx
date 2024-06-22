import { primaryBtnClasses, secondaryBtnClasses } from "./Styles";

export const WalletSetup = () => {
  return (
    <>
      <button type="button" className={primaryBtnClasses}>
        Connect Wallet
      </button>

      <button type="button" className={secondaryBtnClasses}>
        Create Wallet
      </button>
    </>
  );
};

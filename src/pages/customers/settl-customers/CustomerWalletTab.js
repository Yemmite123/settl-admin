import React from "react";
import WalletTransactionHistoryTable from "./WalletTransactionHistoryTable";
import WalletDistribution from "./WalletDistribution";
import WalletCard from "./WalletCard";

export default function CustomerWalletTab({ data }) {
  const { transVol, percentTransVol, transValue, percentTransValue } = data;

  const {
    primaryWalletAmount,
    targetedSavings,
    kidswallet,
    percentPrimary,
    percentTargeted,
    percentKid,
  } = data;
  return (
    <>
      <WalletCard
        walletData={{
          transVol,
          percentTransVol,
          transValue,
          percentTransValue,
        }}
      />
      <WalletDistribution
        walletDistribution={{
          primaryWalletAmount,
          targetedSavings,
          kidswallet,
          percentPrimary,
          percentTargeted,
          percentKid,
        }}
      />
      <WalletTransactionHistoryTable tableData={data.consumertransinfo} />
    </>
  );
}

import React from "react";
import TransactionCard from "../../../components/TransactionCard";
import { useAPI } from "../../../contexts/WalletContext";

const Statistics = () => {
  const { walletData } = useAPI();

  const transactions = [
    {
      name: "Total Volume of Users Saving ",
      total_amount: walletData.totalSavingsVol,
      percentage: walletData.percentSavingVol,
    },
    {
      name: "Total Value of all Savings",
      total_amount: walletData.totalSavingsValue,
      percentage: walletData.percentSavingvalue,
    },
    {
      name: "Total Savings Interest ",
      total_amount: walletData.totalSavingsInterest,
      percentage: walletData.percentageSavingInterest,
    },
  ];

  return (
    <div className="transaction_body">
      {transactions.map((transaction, i) => (
        <TransactionCard
          key={i}
          name={transaction.name}
          total_amount={transaction.total_amount}
          percentage={transaction.percentage}
        />
      ))}
    </div>
  );
};

export default Statistics;

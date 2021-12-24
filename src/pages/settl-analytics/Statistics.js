import React from "react";
import TransactionCard from "../../components/TransactionCard";

const Statistics = ({ stats, index }) => {
  const transactions = [
    {
      name: "Total Transaction Volume",
      total_amount: stats.totalTransactionVolume,
      percentage: `${stats.percentTransactionVol}`,
    },
    {
      name: "Total Transaction Value",
      total_amount: stats.totalTransactionValue,
      percentage: `${stats.percentTransactionValue}`,
    },
    {
      name: index === 0 ? "Total Settl Customers" : "Total Settl Agents",
      total_amount:
        index === 0 ? stats.settlCustomers.total : stats.settlAgents.total,
      percentage:
        index === 0
          ? `${stats.settlCustomers.percentageChange}`
          : `${stats.settlAgents.percentageChange}`,
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
          icon={transaction.icon}
        />
      ))}
    </div>
  );
};

export default Statistics;

import React from "react";
import TransactionCard from "./TransactionCard";
import { one, two, three, four, five } from "../../../assets/img/dashboard";

const Statistics = ({ index, data }) => {
  const transactions = [
    {
      name: ["Total Transaction Volume", "Total Transaction Volume"],
      total_amount: data.totalTransactionVolume,
      percentage: +data.percentTransactionVol,
      icon: one,
    },
    {
      name: ["Total Transaction Value", "Total Transaction Volume"],
      total_amount: data.totalTransactionValue,
      percentage: +data.percentTransactionValue,
      icon: two,
    },
    {
      name: ["Total Settl Customers", "Total Settl Agents"],
      total_amount:
        index === 0 ? data.settlCustomers.total : data.settlAgents.total,
      percentage:
        index === 0
          ? data.settlCustomers.percentageChange
          : data.settlAgents.percentageChange,
      icon: three,
    },
    {
      name: ["Active Customers", "Active Agents"],
      total_amount:
        index === 0 ? data.activeCustomers.total : data.activeAgents.total,
      percentage:
        index === 0
          ? data.activeCustomers.percentageChange
          : data.activeAgents.percentageChange,
      icon: four,
    },
    {
      name: ["Inactive Customers", "Inactive Agents"],
      total_amount:
        index === 0 ? data.inActiveCustomers.total : data.inActiveAgents.total,
      percentage:
        index === 0
          ? data.inActiveCustomers.percentageChange
          : data.inActiveAgents.percentageChange,
      icon: one,
    },
    {
      name: ["New Customers", "New Agents"],
      total_amount:
        index === 0 ? data.newCustomers.total : data.newAgents.total,
      percentage:
        index === 0
          ? data.newCustomers.percentageChange
          : data.newAgents.percentageChange,
      icon: five,
    },
  ];
  return (
    <div className="transaction_body">
      {transactions.map((transaction, i) => (
        <TransactionCard
          key={i}
          name={transaction.name[index]}
          total_amount={transaction.total_amount}
          percentage={transaction.percentage}
          icon={transaction.icon}
        />
      ))}
    </div>
  );
};

export default Statistics;

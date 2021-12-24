import React from "react";
import TransactionCard from "../../../components/TransactionCard";

const Statistics = (props) => {
  return (
    <div className="transaction_body">
      {props.transactions.map((transaction, i) => (
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

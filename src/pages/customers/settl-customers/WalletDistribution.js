import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Calendar } from "react-feather";
import Chart from "react-apexcharts";

export default function WalletDistribution({ walletDistribution }) {
  const data = [
    walletDistribution.primaryWalletAmount,
    walletDistribution.targetedSavings,
    walletDistribution.kidswallet,
  ];

  const options = {
    dataLabels: {
      enabled: true,
      textAnchor: "middle",
    },
    chart: {
      width: "250px",
    },
    labels: ["Primary wallet", "Targeted Savings Wallet", "Kids wallet"],
    colors: ["#00BE7C", "#29E4F0", "#1668E2"],
    legend: {
      horizontalAlign: "center",
    },
  };
  return (
    <>
      <div className="admin-body mb-3">
        <div className="all-admins pr-3">
          <div className="d-flex align-items-center justify-content-between mb-3 wallet-distribution">
            <div>
              <h6>Wallet distribution</h6>
            </div>
            <div>
              <UncontrolledDropdown className="d-inline filter-dropdown">
                <DropdownToggle caret color="light" className="shadow-sm">
                  <Calendar className="feather align-middle mt-n1" />
                  Jan 04, 2019 - Dec 04 2019
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Seperated link</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </div>
          <hr style={{ marginRight: "-1rem" }} />
          <div className="d-flex donut-flex">
            <div>
              <Chart
                options={options}
                series={data}
                type="donut"
                width="450px"
              />
            </div>
            <div className="text-right w-100 mt-4">
              <p>N {walletDistribution.primaryWalletAmount}</p>
              <p>N {walletDistribution.targetedSavings}</p>
              <p>N {walletDistribution.kidswallet}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

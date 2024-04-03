import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./components/overview";
import { useEffect, useState } from "react";
import BankCard from "@/assets/bank-card.png";
import DataBank from '../Data/DataBank.json'
// import axios from "axios";

export default function Dashboard() {
  // const [bankAccountData, setBankAccountData] = useState(null);

  // useEffect(() => {
  //  // Fetch the JSON data from the API or file
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("../../Data/DataBank.json");
  //     // Convert JSON response to JavaScript object
  //     const jsonData = JSON.parse(response.data);
  //     setBankAccountData(jsonData.bank_account);
  //   } catch (error) {
  //     console.error("Error fetching bank account data:", error);
  //   }
  // };

  //   fetchData();
  // }, []);
  const [bankAccountData, setBankAccountData] = useState(null);

  useEffect(() => {
    setBankAccountData(DataBank.bank_account);
  }, []);
 {
  return (
    <>
     {bankAccountData && (<div className="flex-col flex">
        <div className="border-b"></div>
        <div className="w-[95vw] md:ml-auto md:flex-1 -ml-2 xs:space-y-4 xs:p-8 pt-6">
          <div className="md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="my-4 md:my-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Account Holder Name
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                 Mr {bankAccountData.account_holder_name}
                </div>
                <p className="font-light text-xs">{bankAccountData.account_number}</p>
              </CardContent>
            </Card>
            <Card className="my-4 md:my-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Current Balance
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bankAccountData.current_balance.toFixed(2) + ' MAD'}
                </div>
              </CardContent>
            </Card>

            <Card className="my-4 md:my-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {bankAccountData.total_income.toFixed(2) + ' MAD'}
                </div>
              </CardContent>
            </Card>
            <Card className="my-4 md:my-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Expenses
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                   {bankAccountData.total_expenses.toFixed(2) + ' MAD'}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 md:grid md:gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-4 my-4 md:my-auto">
              <CardHeader>
                <CardTitle>Overview Of Spending Patterns</CardTitle>
              </CardHeader>
              <CardContent className="pl-2 xs:h-[275px] sm:h-[375px]">
                <Overview />
              </CardContent>
            </Card>
            <div className="md:col-span-4 lg:col-span-3 space-y-6 my-4 md:my-auto">
              {/* <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions </CardTitle>
                  <CardDescription>
                    You made
                    <ul>
                      {bankAccountData.transactions.map((transaction) => (
                        <li key={transaction.id}>
                          Type: {transaction.type}, Amount: {transaction.amount}
                          , Date: {transaction.date}
                          {transaction.type === "Transfer" && (
                            <p>
                              Recipient: {transaction.recipient}, Recipient
                              Account: {transaction.recipient_account}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card> */}
              <Card>
                <CardHeader>
                  <CardTitle>Credit Card</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-center pt-10 ">
                      <img src={BankCard} alt="Logo" className="w-96" />
                    </div>
                    .
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
     )}
    </>
  );
}

}

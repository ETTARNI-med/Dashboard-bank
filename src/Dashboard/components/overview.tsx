import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import DataBank from "../../Data/DataBank.json";

export function Overview() {
  const [data, setData] = useState<{ date: string; total: number }[]>([]);
  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState<number>(0);
  const [totalTransfers, setTotalTransfers] = useState<number>(0);

  useEffect(() => {
    const transactions = DataBank.bank_account.transactions;

    // Calculate total deposits, withdrawals, and transfers
    const deposits = transactions.filter((transaction) => transaction.type === "Deposit");
    const totalDeposits = deposits.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalDeposits(totalDeposits);

    const withdrawals = transactions.filter((transaction) => transaction.type === "Withdrawal");
    const totalWithdrawals = withdrawals.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalWithdrawals(totalWithdrawals);

    const transfers = transactions.filter((transaction) => transaction.type === "Transfer");
    const totalTransfers = transfers.reduce((total, transaction) => total + transaction.amount, 0);
    setTotalTransfers(totalTransfers);

    // Group transactions by date and calculate total amount for each date
    const groupedData = transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      const amount = transaction.amount;

      if (!acc[date]) {
        acc[date] = amount;
      } else {
        acc[date] += amount;
      }

      return acc;
    }, {});

    const formattedData = Object.keys(groupedData).map((date) => ({
      date,
      total: groupedData[date],
    }));

    setData(formattedData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={true} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} label={{ value: "MAD", position: "top" }} />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

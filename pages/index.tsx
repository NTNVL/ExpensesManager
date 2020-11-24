import React from 'react';
import { ExpenseTable } from '../components/ExpenseTable';

const essencialExpenses = [
  {
    description: 'Energia',
    value: 150,
  },
  {
    description: 'Água',
    value: 50,
  },
];

const essencialExpensesTable = (
  <ExpenseTable title="Essencial" expenses={essencialExpenses} />
);

function Home(): JSX.Element {
  return <div>{essencialExpensesTable}</div>;
}

export default Home;

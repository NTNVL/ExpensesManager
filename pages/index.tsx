import { ExpenseTable } from '../components/ExpenseTable';

let essencialExpenses = [
  {
    description: "Energia",
    value: 150
  },
  {
    description: "Água",
    value: 50
  },
];

let essencialExpensesTable = <ExpenseTable
  title="Essencial"
  expenses={ essencialExpenses } />

function Home() {
  return (
    <div>
      { essencialExpensesTable }
    </div>
  );
}

export default Home;

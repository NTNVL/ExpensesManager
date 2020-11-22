import styles from './ExpenseTable.module.css';
import React from 'react';

export type Expense = {
  description: string,
  value: number
}

type Props = {
  title: string,
  expenses: Expense[]
}

type State = {
  expenses: Expense[]
}

const ExpenseRow = (props: { expense: Expense }) => (
  <tr>
    <td className={ styles.td }>{ props.expense.description }</td>
    <td className={ styles.td }>$ { props.expense.value }</td>
  </tr>
);


export class ExpenseTable extends React.Component<Props, State> {
  public readonly state: State = { expenses: [] }
  title: string;

  constructor(props: Props) {
    super(props);

    this.title = props.title;
    this.state = { expenses: props.expenses };
  }

  getTotalExpenses(): number {
    let total = 0;
    this.state.expenses.forEach(expense => { total += expense.value })

    return total;
  }

  addExpense(expense: Expense) {
    let new_expenses = this.state;
    new_expenses.expenses.push(expense);

    this.setState(new_expenses);
  }

  render() {
    const titleRow = <tr><th className={ styles.th } colSpan={ 2 }>{ this.title }</th></tr>;
    const expensesRows = this.state.expenses.map(
      (expense, index) => <ExpenseRow 
        key = {index}
        expense = {expense} />)
    const totalRow = <ExpenseRow
      expense={{
        description: "total",
        value: this.getTotalExpenses()
      }}
    />

    return (
      <table className={ styles.table }>
        <thead>
          { titleRow }
        </thead>
        <tbody>
          { expensesRows }
          { totalRow }
        </tbody>
      </table>
    );
  }
}

import styles from './ExpenseTable.module.css';
import React, { MouseEvent } from 'react';

export type Expense = {
  description: string,
  value: number
}

type Props = {
  title: string,
  expenses: Expense[]
}

type State = {
  expenses: Expense[],
  newExpense: Expense
}

const ExpenseRow = (props: { expense: Expense }) => (
  <tr>
    <td className={ styles.td }>{ props.expense.description }</td>
    <td className={ styles.td }>$ { props.expense.value }</td>
  </tr>
);


export class ExpenseTable extends React.Component<Props, State> {
  public readonly state: State = {
    expenses: [],
    newExpense: {
      description: "",
      value: 0
    }
  }
  titleRow: JSX.Element;

  constructor(props: Props) {
    super(props);

    this.titleRow = (
      <tr><th
        className={ styles.th }
        colSpan={ 2 }>
          { props.title }
      </th></tr>);

    this.state = {
      expenses: props.expenses,
      newExpense: {
        description: "",
        value: 0
      }
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleAddExpense = this.handleAddExpense.bind(this);
  }

  getTotalExpenses(): number {
    let total = 0;
    this.state.expenses.forEach(expense => { total += expense.value })

    return total;
  }

  addExpense(expense: Expense) {
    let new_expenses = this.state;
    new_expenses.expenses.push(expense);
    new_expenses.newExpense = {description: "", value: 0}

    this.setState(new_expenses);
  }

  handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newExpense: {
        description: event.target.value,
        value: this.state.newExpense.value
      }
    })
  }

  handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newExpense: {
        description: this.state.newExpense.description,
        value: event.target.valueAsNumber
      }
    })
  }

  handleAddExpense(event: React.MouseEvent) {
    event.preventDefault();

    if (this.state.newExpense.description == "") {
      alert("Por favor, digite uma descrição para a nova despesa.");
    } else if (this.state.newExpense.value == 0) {
      alert("Por favor, digite um valor diferente de zero para a nova despesa.");
    } else {
      this.addExpense(this.state.newExpense);

      let newState = this.state;
      newState.newExpense = { description: "", value: 0 };
      this.setState(newState);
    }
  }

  render() {
    const expensesRows = this.state.expenses.map(
      (expense, index) => <ExpenseRow 
        key = {index}
        expense = {expense} />);

    const totalRow = (
      <tr>
        <td className={ styles.td }>Total</td>
        <td className={ styles.td }>$ { this.getTotalExpenses() }</td>
      </tr>);

    const descriptionInput = (
      <input
        id="getDescription"
        type="text"
        placeholder="Descrição"
        value={ this.state.newExpense.description }
        onChange={ this.handleDescriptionChange }>
      </input>);

    const valueInput = (
      <input
        id="getValue"
        type="number"
        placeholder="Valor"
        min="0"
        step="0.1"
        value={ this.state.newExpense.value }
        onChange={ this.handleValueChange }>
      </input>
    );

    const expenseBtn = (
      <button
        onClick={ this.handleAddExpense}>
          +
      </button>
    )

    return (
      <div>
        <table className={ styles.table }>
          <thead>
            { this.titleRow }
          </thead>
          <tbody>
            { expensesRows }
            { totalRow }
            <tr>
              <td>{ descriptionInput }</td>
              <td>{ valueInput }</td>
              <td>{ expenseBtn }</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

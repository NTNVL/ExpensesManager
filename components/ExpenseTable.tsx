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
  title: string;

  constructor(props: Props) {
    super(props);

    this.title = props.title;
    this.state = {
      expenses: props.expenses,
      newExpense: {
        description: "",
        value: 0
      }
    };

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
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
      <div>
        <table className={ styles.table }>
          <thead>
            { titleRow }
          </thead>
          <tbody>
            { expensesRows }
            { totalRow }
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input
                  id="getDescription"
                  type="text"
                  placeholder="Descrição"
                  value={this.state.newExpense.description}
                  onChange={this.handleDescriptionChange}>
                </input>
              </td>
              <td>
                <input
                  id="getValue"
                  type="number"
                  placeholder="Valor"
                  min="0"
                  step="0.1"
                  value={this.state.newExpense.value}
                  onChange={this.handleValueChange}>
                </input>
              </td>
              <button
                onClick={(e) => this.addExpense(this.state.newExpense)}>+
              </button>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

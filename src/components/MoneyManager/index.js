import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const initialTransactions = []

// Write your code here
class MoneyManager extends Component {
  state = {
    income: 0,
    expense: 0,
    updateBalance: 0,
    transactions: initialTransactions,
    title: '',
    amount: '',
    type: 'INCOME',
  }

  onTitleChange = event => {
    console.log(event.target.value)
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    console.log(event.target.value)
    this.setState({amount: parseInt(event.target.value, 10)})
  }

  onTypeChange = event => {
    console.log('transaction Type')
    console.log(event.target.value)
    if (event.target.value === 'EXPENSES') {
      this.setState({type: 'Expenses'})
    }
    if (event.target.value === 'INCOME') {
      this.setState({type: 'Income'})
    }
  }

  onDeleteTransaction = id => {
    console.log(id)
    const {transactions, income} = this.state
    const deletedTransaction = transactions.find(each => each.id === id)
    console.log('deletedTransaction')
    console.log(deletedTransaction)
    const filteredTransactions = transactions.filter(each => each.id !== id)
    console.log(deletedTransaction.type)
    if (deletedTransaction.type === 'Expenses') {
      const newBalance = deletedTransaction.amount
      console.log(newBalance)
      this.setState(prevState => ({
        expense: prevState.expense - deletedTransaction.amount,
        transactions: filteredTransactions,
        updateBalance: newBalance,
      }))
    } else if (deletedTransaction.type === 'Income') {
      console.log('hi')
      // Check if there are other Income transactions
      const remainingIncome = filteredTransactions.reduce((acc, curr) => {
        if (curr.type === 'Income') {
          return acc + curr.amount
        }
        return acc
      }, 0)
      this.setState({
        transactions: filteredTransactions,
        income: remainingIncome, // Update income with remainingIncome
      })
    }
  }

  onClickAdd = event => {
    event.preventDefault()
    const {title, amount, income} = this.state
    let {type} = this.state
    if (type === 'INCOME') {
      type = 'Income'
    }
    if (type === '') {
      type = 'Income'
    }
    console.log('state type')
    console.log(type)
    console.log(type)
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    console.log('New Transaction-------')
    console.log(newTransaction)
    this.setState(prevState => {
      let newExpense = 0
      let newIncome = 0
      if (newTransaction.type === 'Expenses') {
        newExpense = prevState.expense + newTransaction.amount
        return {
          transactions: [...prevState.transactions, newTransaction],
          expense: newExpense,
          title: '',
          amount: '',
          type: 'Income',
        }
      }
      if (newTransaction.type === 'Income') {
        newIncome = newTransaction.amount + income
        return {
          transactions: [...prevState.transactions, newTransaction],
          income: newIncome,
          title: '',
          amount: '',
          type: 'Income',
        }
      }
      return null
    })
  }

  render() {
    const {
      income,
      expense,
      title,
      amount,
      type,
      transactions,
      updateBalance,
    } = this.state

    console.log('income inside render')
    console.log(income)
    console.log('transactions inside render')
    console.log(transactions)

    return (
      <div>
        <div className="nameContainer">
          <h1>Hi,Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="moneyManager">Money Manger</span>
          </p>
        </div>
        <ul className="moneyDetails">
          <MoneyDetails
            income={income}
            expense={expense}
            updatedBalance={updateBalance}
          />
        </ul>
        <div className="transContainer">
          <div className="form-container">
            <form onSubmit={this.onClickAdd}>
              <h1>Add Transaction</h1>
              <label htmlFor="input1">TITLE</label>
              <input
                type="text"
                id="input1"
                name="input1"
                placeholder="TITLE"
                value={title}
                onChange={this.onTitleChange}
              />
              <label htmlFor="input2">AMOUNT</label>
              <input
                type="text"
                id="input2"
                name="input2"
                placeholder="AMOUNT"
                value={amount}
                onChange={this.onAmountChange}
              />
              <label htmlFor="transactionType">TYPE</label>
              <select
                id="transactionType"
                name="transactionType"
                onChange={this.onTypeChange}
                value={type}
              >
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </div>
          <div className="transactions-table">
            <h1>Transaction History</h1>
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>
                    <p>Title</p>
                  </th>
                  <th>
                    <p>Amount</p>
                  </th>
                  <th>
                    <p>Type</p>
                  </th>
                  <th> </th>
                </tr>
              </thead>
              {transactions.map(each => (
                <TransactionItem
                  key={each.id}
                  transactions={each}
                  deleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager

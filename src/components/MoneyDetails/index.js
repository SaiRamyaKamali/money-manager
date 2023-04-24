// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {income, expense} = props
  console.log('income')
  console.log(income)
  let balance
  if (income === 0) {
    balance = 0
  } else {
    balance = income - expense
  }
  return (
    <li className="moneyDetails">
      <div className="list-item">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
          alt="balance"
        />
        <div>
          <p className="b">Your Balance</p>
          <p className="money" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image"
        />
        <div>
          <p className="b">Your Income</p>
          <p className="money" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="list-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          alt="expenses"
          className="image"
        />
        <div>
          <p className="b">Your Expenses</p>
          <p className="money" data-testid="expensesAmount">
            Rs {expense}
          </p>
        </div>
      </div>
    </li>
  )
}

export default MoneyDetails

/* eslint-disable react/button-has-type */
// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactions, deleteTransaction} = props
  const {id, title, amount, type} = transactions

  const onClickDelete = () => {
    deleteTransaction(id)
  }

  return (
    <tbody>
      <tr>
        <td>{title}</td>
        <td>{amount}</td>
        <td>{type}</td>
        <td>
          <button
            className="deleteButton"
            onClick={onClickDelete}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
              className="delete"
            />
          </button>
        </td>
      </tr>
    </tbody>
  )
}

export default TransactionItem

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  editInActive,
  updateTransaction,
} from "../features/transaction/transactionSlice";

export default function Form() {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.transaction);
  const { editing } = useSelector((state) => state.transaction) || {};

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };

  // listen for edit mode active
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateTransaction({
        id: editing?.id,
        data: {
          name: name,
          amount: amount,
          type: type,
        },
      })
    );
    setEditMode(false);
    reset();
  };

  const cancelEditMode = () => {
    reset();
    setEditMode(false);
    dispatch(editInActive());
  };

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              name="transaction_type"
              id="income"
              value="income"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <label htmlFor="income">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              name="transaction_type"
              id="expense"
              value="expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            <label htmlFor="expense">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className="btn" type="submit">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {!isLoading && isError && (
          <p className="error">There was an error occured</p>
        )}
      </form>

      {editMode && (
        <button className="btn cancel_edit" onClick={cancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  );
}

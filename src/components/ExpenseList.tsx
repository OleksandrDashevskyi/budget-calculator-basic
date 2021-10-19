import React from 'react';
import {IExpense} from "../interfaces";
import {ExpenseItem} from "./ExpenseItem";
import {MdDelete} from 'react-icons/md';

type ExpenseItemListProps = {
    expenses: IExpense[],
    clearAllItems(): void,
    handleDelete(id: string): void
    handleEdit(id: string): void
    handleAlert(alertItems: object): void
}

export const ExpenseList: React.FC<ExpenseItemListProps> = ({expenses, clearAllItems, handleEdit, handleDelete}) => {

    return (
        <React.Fragment>
            <ul className="list">
                {expenses.map(expense => {
                    return <ExpenseItem key={expense.id}
                                        expense={expense}
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}/>
                })}
            </ul>
            {expenses.length > 0
            &&
            <button className='btn' onClick={clearAllItems}>clear expenses
                <MdDelete className="btn-icon"/>
            </button>}
        </React.Fragment>
    )
}
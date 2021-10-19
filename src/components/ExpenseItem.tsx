import React from 'react';
import {IExpense} from "../interfaces";
import {MdDelete, MdEdit} from "react-icons/md";

type EItemProps = {
    expense: IExpense,
    handleDelete(id: string): void
    handleEdit(id: string): void
}

export const ExpenseItem: React.FC<EItemProps> = ({expense, handleDelete, handleEdit}) => {

    const {id, title, amount} = expense;

    return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>
                    {title}
                </span>
                <span className='amount'>
                    ${amount}
                </span>
            </div>

            <div>
                <button className='edit-btn' aria-label="edit button" onClick={() => handleEdit(id)}>
                    <MdEdit/>
                </button>
                <button className='clear-btn' aria-label="delete button" onClick={() => handleDelete(id)}>
                    <MdDelete/>
                </button>
            </div>
        </li>
    )
}
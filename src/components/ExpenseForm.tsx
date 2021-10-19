import React from 'react';
import {MdSend} from "react-icons/md"

type ExpenseHandlesProps = {
    title: string,
    amount: string,
    edit: boolean
    handleAmount(event: React.ChangeEvent<HTMLInputElement>): void
    handleCharge(event: React.ChangeEvent<HTMLInputElement>): void
    handleSubmit(event: React.SyntheticEvent): void
}

export const ExpenseForm: React.FC<ExpenseHandlesProps> = ({
                                                               title,
                                                               amount,
                                                               edit,
                                                               handleAmount,
                                                               handleCharge,
                                                               handleSubmit
                                                           }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">charge</label>
                    <input type="text"
                           className="form-control"
                           id="charge"
                           name="charge"
                           placeholder="e.g. rent"
                           value={title}
                           onChange={handleCharge}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input type="number"
                           className="form-control"
                           id="amount"
                           name="amount"
                           placeholder="e.g. 100"
                           value={amount}
                           onChange={handleAmount}
                    />
                </div>
            </div>
            <button type="submit" className="btn">
                {edit ? 'edit' : 'submit'}
                <MdSend className="btn-icon"/>
            </button>
        </form>
    )
}
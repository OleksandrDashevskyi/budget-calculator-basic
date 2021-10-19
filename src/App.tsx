import React, {useState, useEffect} from 'react';
import './App.css';
import {Alert} from "./components/Alert";
import {ExpenseForm} from "./components/ExpenseForm";
import {ExpenseList} from "./components/ExpenseList";
import {IAlert, IExpense} from "./interfaces";
import {v4 as uuidv4} from 'uuid'


const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses') as string) : []

const App: React.FC = () => {

// ************* state values ********************

// all expenses, add expenses
    const [expenses, setExpenses] = useState<IExpense[]>(initialExpenses);
// single expenses
    const [title, setTitle] = useState<string>('');
// single amount
    const [amount, setAmount] = useState<any>('');
// alert
    const [alert, setAlert] = useState<IAlert>({show: false, type: '', text: ''});
// edit
    const [edit, setEdit] = useState<boolean>(false);
// edit item
    const [id, setId] = useState<string>('');

    useEffect(() => {
        console.log('we called useEffect')
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }, [expenses])


// ************* functionality **********************

    const handleCharge = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)

    };

    const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value)

    };

    const handleAlert = ({type, text}: IAlert) => {
        setAlert({text, type, show: true});
        setTimeout(() => {
            setAlert({text: "", type: "", show: false})
        }, 10000)
    }

    const handleDelete = (id: string) => {
        const newExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(newExpenses);
        handleAlert({show: true, type: 'danger', text: 'Item deleted!'})
    }

    const handleEdit = (id: string) => {
        let expense: IExpense = expenses.find(item => item.id === id) as IExpense
        setTitle(expense.title)
        setAmount(expense.amount)
        setEdit(true)
        setId(id)
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (title !== '' && amount > 0) {
            if (edit) {
                let tempExpenses = expenses.map(expense => {
                    return expense.id === id ? {...expense, title, amount} : expense;
                })
                setExpenses(tempExpenses)
                setEdit(false)
                handleAlert({show: true, type: 'success', text: 'Item edited!'})
            } else {
                const newSingleExpense: IExpense = {id: uuidv4(), title, amount};
                setExpenses([...expenses, newSingleExpense])
                handleAlert({show: true, type: 'success', text: 'item added'})
            }
            setTitle('')
            setAmount('')
        } else {
            handleAlert({
                show: true,
                type: 'danger',
                text: `charge can't be empty value and amount value has to be bigger than 0`
            })
        }
    };

    const clearAllItems = () => {
        setExpenses([]);
        handleAlert({show: true, type: 'danger', text: 'Items deleted!'})
    }

    return (
        <div>
            {alert.show && <Alert type={alert.type} text={alert.text}/>}
            <h1>budget calculator</h1>
            <main className="App">
                <ExpenseForm
                    title={title}
                    amount={amount}
                    handleAmount={handleAmount}
                    handleCharge={handleCharge}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
                <ExpenseList
                    expenses={expenses}
                    clearAllItems={clearAllItems}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleAlert={handleAlert}
                />
            </main>
            <h1>
                total spending: <span className='total'>
                $ {expenses.reduce((acc, curr) => {
                return (acc += parseInt(curr.amount))
            }, 0)}
            </span>
            </h1>

        </div>
    )


}

export default App;

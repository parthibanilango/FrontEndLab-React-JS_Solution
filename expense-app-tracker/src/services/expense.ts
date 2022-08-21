import axios from 'axios';
import IExpense from '../models/IExpense';

const getExpenses = (category : string) => {
    return axios.get<IExpense[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}`)
            .then(response => response.data)
};



const addExpenseItem = ( expense : Omit<IExpense, 'id'>) => {
    return axios.post<IExpense>( 
        `${process.env.REACT_APP_API_BASE_URL}/items`,
        expense,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then( response => response.data )
};

export {
    getExpenses,
    addExpenseItem
}
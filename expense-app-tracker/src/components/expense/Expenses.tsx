import React,{ Component} from 'react';
import { Row, Alert, Col } from 'react-bootstrap';
import IExpense from '../../models/IExpense';
import {LoadingStatus} from '../../models/types';
import LoadingIndicator  from '../common/LoadingIndicator';
import { getExpenses } from '../../services/expense';

type Props = {
   category : string
};

type State = {
    status? : LoadingStatus,
    expenses? : IExpense[],
    error? : Error,
    category : string,
    rahulspent : number,
    rameshspent : number,
    sum : number
    
};

class Expenses extends Component<Props,State>{

    props: Props = {
        category : this.props.category
    }

     state : State = {
        status : 'LOADING',
        category :this.props.category,
        rahulspent : 0,
        rameshspent : 0,
        sum : 0
        
    }

    render() {
        
        let el;
        const { status, expenses, error } = this.state;

        switch(status){
            case 'LOADING': 
                el = (
                    <LoadingIndicator 
                        size = "large"
                        message = "We are fetching the expenses. Please wait..."
                    />
                );
                break;
            case 'LOADED': 
                el = (
                    <>
                        <h3>Expenses</h3>
                        <hr />
                        <div className="use-inline date header-color">Date</div>
                        <div className="use-inline header-color">Product Purchased</div>
                        <div className="use-inline price header-color">Price</div>
                        <div className="use-inline header-color" style={{width: 112}}>Payee</div>
                    {
                    (expenses !== undefined && expenses.length > 0) ? (
                       expenses?.map((expense,idx) => (
                            <div key={idx}>
                                <div className="use-inline date">{expense.setDate}</div>
                                <div className="use-inline">{expense.product}</div>
                                <div className="use-inline price">{expense.price}</div>
                                <div className={`use-inline wid25 ${expense.payeeName}`}>{expense.payeeName}</div>
                            </div>
                            )
                            )
                    ) : (
                        <div>
                        No Data found 
                        </div>
                    )
                    }
                    <hr />
            
                    <div className="use-inline ">Total: </div>
                    <span className="use-inline total wid15">{this.state.sum}</span> <br />
                    <div className="use-inline ">Rahul paid: </div>
                    <span className="use-inline total Rahul wid15">{this.state.rahulspent}</span> <br />
                    <div className="use-inline ">Ramesh paid: </div>
                    <span className="use-inline total Ramesh wid15">{this.state.rameshspent}</span> <br />
                    <span className="use-inline payable">{this.state.rahulspent>this.state.rameshspent? "Pay Rahul " : "Pay Ramesh"}</span>
                    <span className="use-inline payable price wid15"> {Math.abs((this.state.rahulspent-this.state.rameshspent)/2)}</span>
                    </>
                );
                break; 
            case 'ERROR_LOADING': 
                el = (
                    <Alert variant="danger my-3">
                        {error?.message}
                    </Alert>
                );
                break;
        }
        return el;
    }

   
    async componentDidMount(){
        this.setState({
                status :'LOADING'
        });
        let categgory = this.props.category;
        try{
            const data = await getExpenses(categgory);
           
            let total = data.reduce((result,v) =>  result = result + v.price , 0 );
           
            let rahulspent1 =0;
            let rameshspent1 = 0;
            data.map(
                sams => (
                    sams.payeeName === "Rahul" ? (
                        rahulspent1 = rahulspent1 + sams.price
                    ):
                    (
                        rameshspent1 = rameshspent1 + sams.price
                    )
                )
            )


            this.setState({
                status :'LOADED',
                expenses: data,
                rahulspent : rahulspent1,
                rameshspent : rameshspent1,
                sum : total
            });
        }catch(error){
            this.setState({
                status : 'ERROR_LOADING',
                error : new Error("Error in fetching expenses")
            });
        }
       
    }
};

export default Expenses;
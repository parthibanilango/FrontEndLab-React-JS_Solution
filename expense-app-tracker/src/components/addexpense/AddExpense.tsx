import React, { Component } from 'react';
import { Row, Col, Form, Button, Toast, ToastContainer} from 'react-bootstrap';
import { addExpenseItem } from '../../services/expense';

type Props = {
    
}

type State = {
    values : {
        product : string,
        price : string,
        payeeName : string,
        setDate : string
    },
    errors  : {
        product : string[],
        price : string[],
        payeeName : string[],
        setDate : string[]

    },
    isValid : boolean,
    responseState  : 'initial' | 'success' | 'error',
    toastMessage : String,
    show : boolean
}

class AddExpense extends Component<Props, State> {
    state: State = {
        values : {
            product : '',
            price : '',
            payeeName : '',
            setDate : ''
        },
        errors  : {
            product : [],
            price : [],
            payeeName : [],
            setDate : []
    
        },
        isValid : false,
        responseState  : 'initial',
        toastMessage : '',
        show : false
    }

    validate(nameOfInput? : keyof State['values']) {
        const errors : State['errors'] ={
            product : [],
            price : [],
            payeeName : [],
            setDate : []
        }
        let isValid = true;

        const {
            product,
            price,
            payeeName,
            setDate
        } = this.state.values;

        if(product.trim() === ''){
            errors.product.push ( 'Product name cannot be empty');
            isValid = false;
        }

        if(payeeName.trim() === ''){
            errors.payeeName.push ( 'Payee name cannot be empty');
            isValid = false;
        }

        if(setDate === undefined || setDate === null){
            errors.setDate.push ( 'Date cannot be empty');
            isValid = false;
        }

        if( price.trim() === '' ){
            errors.price.push ( 'Price should be more than zero');
            isValid = false;
        }

        if(nameOfInput) {
            this.setState(
                state => {
                return {
                    errors:{
                        ...state.errors,
                        [nameOfInput] : errors[nameOfInput]
                    },
                    isValid
                };
            }
        );
            return errors[nameOfInput].length === 0;
        }else {
            this.setState(
                {
                    errors,
                    isValid
                }
            );
            return isValid;
        }
        
    }

    updateValue = ( event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const { name, value } = event.target;

        this.setState(
            state => {
                return {
                    values: {
                        ...state.values,
                        [name]: value
                    }
                };
            },
            () => {
                this.validate( name as keyof State['values'] );
            }
        )
    }
    
    addExpenseToItems = async ( event : React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if( !this.validate() ) {
            return;
        }

        const expenseItem = {
            ...this.state.values,
            price: parseFloat( this.state.values.price )
        };

        try {
            this.setState({
                responseState: 'initial'
            });

            const data = await addExpenseItem(expenseItem);
            this.setState({
                responseState: 'success',
                toastMessage: `A Expense item with has been added successfully`,
                show: true
            });
        } catch( error ) {
            this.setState({
                responseState: 'error',
                toastMessage: 'Error message while submitting',
                show: true
            });
        }

    }


    render(){

        const {
            product,
            price,
            payeeName,
            setDate
        } = this.state.values;

        const {
            product : productErrs,
            price : priceErrs,
            payeeName : payeeNameErrs,
            setDate : setDateErrs
        } = this.state.errors;

        const isValid = this.state.isValid;
        const { responseState, toastMessage, show} = this.state;

        return (
            <>
                <Row>
                    <Col xs={12}>
                        <h3>Add a Expense Item</h3>
                        <hr/>
                    </Col>
                    <Col xs={12}>
                    <Form onSubmit={this.addExpenseToItems}>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="product"
                            >
                                <Form.Label column sm={3}>Product</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="product"
                                        value={product}
                                        onChange={this.updateValue}
                                        aria-describedby="productHelp"
                                        isInvalid={productErrs.length !== 0}
                                    />
                                    <Form.Text id="productHelp" muted>
                                        Product
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            productErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="price"
                            >
                                <Form.Label column sm={3}>Price</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                       type="number"
                                        max-length="100"
                                        name="price"
                                        value={price}
                                        onChange={this.updateValue}
                                        aria-describedby="priceHelp"
                                        isInvalid={priceErrs.length !== 0}
                                    />
                                    <Form.Text id="priceHelp" muted>
                                        Price should be in Indian Rupees (a currency value)
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            priceErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="payeeName"
                            >
                                <Form.Label column sm={3}>Payee Name</Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="payeeName"
                                        value={payeeName}
                                        onChange={this.updateValue}
                                        aria-describedby="payeeNameHelp"
                                        isInvalid={payeeNameErrs.length !== 0}
                                    />
                                    <Form.Text id="payeeNameHelp" muted>
                                        Payee Name
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            payeeNameErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="setDate"
                            >
                                <Form.Label column sm={3}>Date </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="date"
                                        name="setDate"
                                        value={setDate}
                                        onChange={this.updateValue}
                                        aria-describedby="setDateHelp"
                                        isInvalid={setDateErrs.length !== 0}
                                    />
                                    <Form.Text id="setDateHelp" muted>
                                        Date in which this transaction happened
                                    </Form.Text>
                                    <Form.Control.Feedback type="invalid">
                                        {
                                            setDateErrs.map(
                                                err => <div key={err}>{err}</div>
                                            )
                                        }
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="my-3"
                                controlId="butsub"
                            >
                                <Col sm={{ offset: 3, span: 9 }}>
                                    <Button type="submit" disabled={!isValid}>Add Expense</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {
                    responseState !== 'initial' && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg={responseState === 'success' ? 'success' : 'danger'}
                            show={show}
                            autohide
                            delay={5000}
                            onClose={() => this.setState( { show: false } )}
                        >
                            <Toast.Header closeButton={false}>
                                { responseState === 'success' ? 'Success' : 'Error'}
                            </Toast.Header>
                            <Toast.Body>
                                {toastMessage}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
                }

            </>
        )

    }
}

export default AddExpense;

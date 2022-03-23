import { Stack, Form, Button } from "react-bootstrap";
import React, { Component } from 'react'

class GetRow extends Component {

    getRowInputOrderIds = 0;
    getRowInputPrevOrderIds = 0;

    removeDublicates(data) {
        return data.filter((value, index) => data.indexOf(value) === index);
    }

    returnAuthorisedIds() {/* 
        console.log('this.props._authorisedIds', this.props._authorisedIds) */
        this.getRowInputOrderIds = this.removeDublicates(this.props._authorisedIds)/* 
        console.log('this.getRowInputOrderIds new:', this.getRowInputOrderIds) */

        for (var i = 0; i < this.getRowInputOrderIds.length; i++) {/* 
            console.log(this.getRowInputOrderIds[i]); */
            return this.getRowInputOrderIds.map((authorisedId) => <li key={authorisedId}>{authorisedId}</li>);
        }


    }

    returnPrevOrderIds() {/* 
        console.log('this.props._prevOrderIds', this.props._prevOrderIds) */
        this.getRowInputPrevOrderIds = this.removeDublicates(this.props._prevOrderIds)/* 
        console.log('this.getRowInputPrevOrderIds new:', this.getRowInputPrevOrderIds) */

        for (var i = 0; i < this.getRowInputPrevOrderIds.length; i++) {/* 
            console.log(this.getRowInputPrevOrderIds[i]); */
            return this.getRowInputPrevOrderIds.map((prevOrderId) => <li key={prevOrderId}>{prevOrderId}</li>);
        }


    }

    cancelInput = () => {
        document.getElementById("_inputOrderId").reset();
    }

    render() {
        return (
            <div id="getrow-table">
                <div className="bg-white" style={{ width: '100%' }}>
                    <Form id="_inputOrderId" style={{ width: '100%' }}>
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control style={{ width: '100%' }} ref={(input) => this.inputOrderId = input} placeholder="Add your Order-ID here..." required />
                            <Button variant="secondary" onClick={(event) => {
                                event.preventDefault()
/*                             console.log('this.inputOrderId.value', this.inputOrderId.value)
 */                            this.props.getRow(this.inputOrderId.value)
                            }}>Submit</Button>
                            <Button variant="outline-danger" onClick={(event) => {
                                this.cancelInput()
                            }}>Reset</Button>
                        </Stack>
                    </Form>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Variablename</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">orderId</th>
                            <td>{this.props._orderId}</td>
                        </tr>
                        <tr>
                            <th scope="row">senderId</th>
                            <td>{this.props._senderId}</td>
                        </tr>
                        <tr>
                            <th scope="row">authorisedIds</th>
                            <td>{this.returnAuthorisedIds()}</td>
                        </tr>
                        <tr>
                            <th scope="row">batchNumber</th>
                            <td>{this.props._batchNumber}</td>
                        </tr>
                        <tr>
                            <th scope="row">prevOrderIds</th>
                            <td>{this.returnPrevOrderIds()}</td>
                        </tr>
                        <tr>
                            <th scope="row">shipmentDate</th>
                            <td>{this.props._shipmentDate}</td>
                        </tr>
                        <tr>
                            <th scope="row">workPerformed</th>
                            <td>{this.props._workPerformed}</td>
                        </tr>
                        <tr>
                            <th scope="row">article</th>
                            <td>{this.props._article}</td>
                        </tr>
                        <tr>
                            <th scope="row">receiverId</th>
                            <td>{this.props._receiverId}</td>
                        </tr>
                        <tr>
                            <th scope="row">deliveryConfirmation</th>
                            <td>{this.props._deliveryConfirmation}</td>
                        </tr>
                    </tbody>
                </table>

            </div >
        );
    }
}

export default GetRow;
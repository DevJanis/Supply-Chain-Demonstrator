import { Stack, Form, Button } from "react-bootstrap";
import React, { Component } from 'react'

class ChangeRow extends Component {

    changeRowInputOrderIds = 0;
    changeRowInputPrevOrderIds = 0;

    removeDublicates(data) {
        return data.filter((value, index) => data.indexOf(value) === index);
    }

    returnAuthorisedIds() {/* 
        console.log('this.props._authorisedIds', this.props._authorisedIds) */
        this.changeRowInputOrderIds = this.removeDublicates(this.props._authorisedIds)/* 
        console.log('this.changeRowInputOrderIds new:', this.changeRowInputOrderIds) */

        for (var i = 0; i < this.changeRowInputOrderIds.length; i++) {/* 
            console.log(this.changeRowInputOrderIds[i]); */
            return this.changeRowInputOrderIds.map((authorisedId) => <li key={authorisedId}>{authorisedId}</li>);
        }


    }

    returnPrevOrderIds() {/* 
        console.log('this.props._prevOrderIds', this.props._prevOrderIds) */
        this.changeRowInputPrevOrderIds = this.removeDublicates(this.props._prevOrderIds)/* 
        console.log('this.changeRowInputPrevOrderIds new:', this.changeRowInputPrevOrderIds) */

        for (var i = 0; i < this.changeRowInputPrevOrderIds.length; i++) {/* 
            console.log(this.changeRowInputPrevOrderIds[i]); */
            return this.changeRowInputPrevOrderIds.map((prevOrderId) => <li key={prevOrderId}>{prevOrderId}</li>);
        }


    }

    cancelOrderId = () => {
        document.getElementById("_changeOrderId").reset();
    }

    cancelInput = () => {
        document.getElementById("resetConfirmation").reset();
    }

    render() {
        return (
            <div id="changerow-table">
                <div className="bg-white" style={{ width: '100%' }}>
                    <Form id="_changeOrderId" style={{ width: '100%' }}>
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control style={{ width: '100%' }} id="_inputOrderId" className="form-control" ref={(input) => this.inputOrderId = input} placeholder="Add your Order-ID here..." required />
                            <Button variant="secondary" onClick={(event) => {
                                event.preventDefault()
/*                             console.log('this.inputOrderId.value', this.inputOrderId.value)
 */                            this.props.getRow(this.inputOrderId.value)
                            }}>Submit</Button>
                            <Button variant="outline-danger" onClick={(event) => {
                                this.cancelOrderId()
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
                            <td>
                                <Form id="resetConfirmation" style={{ width: '100%' }}>
                                    <Form.Control id="_deliveryConfirmation" className="form-control" ref={(input) => this.inputDeliveryConfirmation = input} placeholder="Enter 'true' here..." required />
                                </Form>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="secondary" onClick={(event) => {
                        event.preventDefault()
                        console.log('this.inputDeliveryConfirmation.value', this.inputDeliveryConfirmation.value)
                        this.props.changeRow(
                            this.props._orderId,
                            this.inputDeliveryConfirmation.value)
                    }}>Submit</Button>
                    <Button variant="outline-danger" onClick={(event) => {
                        this.cancelInput()
                    }}>Reset</Button>
                </Stack>

            </div >
        );
    }
}

export default ChangeRow;
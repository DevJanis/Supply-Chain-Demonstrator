import { Stack, Form, Button } from "react-bootstrap";
import React, { Component } from 'react'

class AddToList extends Component {

    cancelMember = () => {
        document.getElementById("inputMember").reset();
    }

    render() {
        return (
            <div id="addToList-table">
                <div className="bg-white" style={{ width: '100%' }}>
                    <Form id="inputMember" style={{ width: '100%' }}>
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control id="_inputAllowedEntry" className="form-control" ref={(input) => this.inputAllowedEntry = input} placeholder="Add new Member-ID here..." required />
                            <Button variant="secondary" onClick={(event) => {
                                event.preventDefault()
                                console.log('this.inputAllowedEntry.value', this.inputAllowedEntry.value)
                                this.props.addToList(this.inputAllowedEntry.value)
                            }}>Submit</Button>
                            <Button variant="outline-danger" onClick={(event) => {
                                this.cancelMember()
                            }}>Reset</Button>
                        </Stack>
                    </Form>
                </div>
            </div >
        );
    }
}

export default AddToList;
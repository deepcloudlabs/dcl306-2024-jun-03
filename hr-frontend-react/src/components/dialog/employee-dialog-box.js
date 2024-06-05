import Hr from "../hr/hr";
import {Button, Modal} from "react-bootstrap";

export default function EmployeeDialogBox() {
    return (
        <Modal>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Hr></Hr>
            </Modal.Body>
            <Modal.Footer>
                <Button >Save</Button>
                <Button>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}

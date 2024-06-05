import Hr from "../hr/hr";
import {Button, Modal} from "react-bootstrap";
import {useHrDispatch, useShowDialog} from "../hr/provider/hr-provider";

export default function EmployeeDialogBox() {
    const showDialog = useShowDialog();
    const dispatchHr = useHrDispatch();
    function closeDialog(e){
        dispatchHr({type: "CLOSE_DIALOG"});
    }
    return (
        <Modal show={showDialog}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Hr></Hr>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger">Save</Button>
                <Button variant="primary"
                        onClick={closeDialog}
                >Close</Button>
            </Modal.Footer>
        </Modal>
    )

}

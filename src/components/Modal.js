import classes from "./styles/modal.module.css";
import ReactDOM from "react-dom";
const Backdrop = (props) => {
    return(
        <div className={classes.backdrop} onClick={props.onClick}></div>
    )
}

const ModalContent  = (props) => {
    return(
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return(
        <>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>,portalElement)}
            {ReactDOM.createPortal(<ModalContent>{props.children}</ModalContent>,portalElement)}

        </>)
}
export default Modal;

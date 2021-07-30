import Modal from "./Modal";
const Error = (props) => {
    const hideError = () => {
        props.setError(null)
    }
    return(<Modal>
                <div>{props.message}</div>
                <button onClick={hideError}>OK</button>
            </Modal>)
}
export default Error;
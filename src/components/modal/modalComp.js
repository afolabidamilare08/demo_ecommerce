import './modalComp.css';
import './cartModal.css';
import './loginModal.css'

export const ModalComp = ({content,openModal}) => {

    return (

        <div className='modalBox' style={{
            display: openModal ? 'flex' : 'none'
        }} >
            
            { content }

        </div>

    );

}
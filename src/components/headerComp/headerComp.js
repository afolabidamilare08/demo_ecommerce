import './headerComp.css';
import Logoimg from '../../assets/images/logo.png';
import {AiOutlineUser} from 'react-icons/ai';
import {BiChevronDown} from 'react-icons/bi';
import {CgShoppingCart} from 'react-icons/cg';

export const HeaderComp = () => {

    return (

        <div className='headerComp' >
            
            <img src={Logoimg} alt="logo" className="headerComp_logo" />

            <div className='searchDiv' >

            </div>

            <div className='accountDiv' >

                <AiOutlineUser className='accountDiv-acc' />

                <span className='accountDiv-txt' >My Account</span>

                <BiChevronDown className='accountDiv-down' />

            </div>

            <div className='cartDiv' >

                <CgShoppingCart className='cartDiv-ic' />

                <span className='cartDiv-txt' >My Cart</span>

            </div>

        </div>

    );

}
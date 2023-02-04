import './headerComp.css';
import Logoimg from '../../assets/images/logo.png';
import {AiOutlineUser} from 'react-icons/ai';
import {BiChevronDown,BiSearchAlt2} from 'react-icons/bi';
import {CgShoppingCart} from 'react-icons/cg';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/AppContext';

export const HeaderComp = ({openMycart,openLogin}) => {

    const [ AccountOpen, setAccountOpen ] = useState(false)
    const { UserBasicDetails } = useContext(AppContext)

    const links = [
        'Clothing',
        'Shoes',
        'Watches',
        'Accessories',
        'Sport'
    ]

    useEffect( () => {
        console.log(UserBasicDetails)
    }, [UserBasicDetails] )

    return (

        <>

            <div className='headerComp' >
                
                <img src={Logoimg} alt="logo" className="headerComp_logo" />

                <div className='searchDiv' >
                    <input type={"search"} 
                        className={"searchDiv-input"} 
                        placeholder={"Search entire shop here ..."}
                    />
                    <button className='searchDiv-btn' >
                        <BiSearchAlt2 className='searchDiv-btn-ic' />
                    </button>
                </div>

                <div className='accountDiv' onClick={ () => setAccountOpen(!AccountOpen) } >

                    <AiOutlineUser className='accountDiv-acc' />

                    <span className='accountDiv-txt' > {UserBasicDetails ? UserBasicDetails.username : "My Account" }</span>

                    <BiChevronDown className='accountDiv-down' />

                    { AccountOpen ? <div className='accountDiv-hov' >

                        { UserBasicDetails ?
                        
                            <>
                                <div className='accountDiv-hov-link' >Welcome {UserBasicDetails.username}</div>
                            </>

                        : <>
                        
                            <div className='accountDiv-hov-link' onClick={ openLogin } >Login</div>
                        <div className='accountDiv-hov-link' onClick={ openLogin } >Register</div>
                        </> }

                    </div>: ""}

                </div>

                <div className='cartDiv'onClick={ openMycart } >

                    <CgShoppingCart className='cartDiv-ic' />

                    <span className='cartDiv-txt' >My Cart</span>

                </div>

            </div>

            <div className='underHeader' >

                { 
                
                    links.map( (dlink,index) => {
                        return (
                            <div key={index} className='underHeader-link' >
                                <span className='underHeader-link-txt' >{dlink}</span>
                                <BiChevronDown className='underHeader-link-ic' />
                            </div>
                        );
                    } )

                } 

            </div>
        </>
    );

}
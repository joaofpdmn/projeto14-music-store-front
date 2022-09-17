import React, { useState } from "react"
import Button from "../components/Button"
import {  AiOutlineDelete, AiOutlineArrowLeft, AiFillCheckSquare } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { IoIosAddCircleOutline} from 'react-icons/io';
import  {RiCheckboxBlankFill} from 'react-icons/ri'
import Img  from '../assets/images/exemplo.png'
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import * as C from '../Common/CartStyles'

export default function Cart(){
     
    const [ summary, setSummary] = useState( [
        {id: '1', name: 'Air pods max by Apple', price: "150", image:Img},
        {id: "2", name: 'Air pods max by Apple', price: "200", image:Img},
        {id: "3", name: 'Air pods max by Apple', price: "500", image:Img},     
        ])
    
        
    let remove = []
    
        function Summary (props){
            
        function FeleteItem (){
            Swal.fire({
                title: 'Gostaria de excluir esse item?',
                text: "Você poderá adicioná-lo novamente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, deletar item!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Item excluído com Sucesso.',
                    'success'
                                  
                  )
                  const filterId = summary.filter((item)=> item.id !== props.id)
                  setSummary(filterId)
                }
              })
          
        }
        const [isOpen, setIsOpen] = useState(false);
        const toggle = () => setIsOpen(!isOpen);
        
        
      
        return(
            <>
            
             <C.DivSummary>
                <C.DivCheckboxImg>
                {isOpen ? <AiFillCheckSquare   className="check" onClick={ toggle } /> : <RiCheckboxBlankFill className="Nocheck" onClick={toggle} />}
               
                    <img src={props.image} />
                </C.DivCheckboxImg>
                <C.DivName>               
                        <p>{props.name} </p>     
                        <p>$ {props.price}</p>                                                                                                    
                </C.DivName>  
                <AiOutlineDelete onClick={ FeleteItem } className="delete" 
                    
                 />
             
              </C.DivSummary> 
             
            </>
            
        )
        
        
    }
   const [ isMenu, setIsMenu] = useState(false)
  
   function showMenu (){

    setIsMenu(!isMenu)
  
   }
   const [newAddress, setNewAddress ] = useState([])
   console.log(newAddress)
  async function btt ( ){
    const { value: formValues } = await Swal.fire({
        title: 'Multiple inputs',
        html:
          '<input required placeholder="Digite seu endereço" id="swal-input1" class="swal2-input">' 
           ,
        focusConfirm: false,
        preConfirm: () => {
            const address =   
              (document.getElementById('swal-input1').value)
              setNewAddress(address)
          return address
        }
      })
      
      if (formValues) {
        Swal.fire(JSON.stringify(formValues))
      }
   }

   
    return (
        <C.Container>
            <C.DivCart> 
                <C.DivDisplayed>
                    <AiOutlineArrowLeft/>
                    <p>Seu Carrinho</p>
                    
                </C.DivDisplayed >
                {/* <GiHamburgerMenu onClick={showMenu} className="car"/>  */}         
                <div className="index" onClick={showMenu}>
                        <div className={isMenu ? "activeTablet" : "tablet"}/>
                 </div>   
                <C.Mobile isMenu={isMenu}>
                    <ul className="subMenu">
                       <Link to={'/'}>
                       <li>Home</li>
                       </Link> 
                       <Link to={'/requests'}>
                         <li>Pedidos</li>
                       </Link> 
                        <li>Pagamentos</li>
                        <li>Endereços</li>
                        <li>Cupons</li>
                    </ul>
                </C.Mobile>

            </C.DivCart >
            <C.DivAddress>
               <p>Endereço de Entrega:</p>
               {newAddress}
                
               
              
               <IoIosAddCircleOutline className="add" onClick={btt}/>
               
            </C.DivAddress>
            <>
            { summary.map(i => <Summary name={i.name} image={i.image} price={i.price} id={i.id}  />) } 
            </ >
            <C.DivBase>                
                <C.DivBaseTotal>
                    <p>Total</p> <p>$ 00.00</p>
                </C.DivBaseTotal>
                <Button />
            </C.DivBase>
           
        </C.Container>

         
    )
}

 


import React, { useState,useEffect,createContext } from 'react'
import Cookies from 'js-cookie'
const axios = require('axios');


const WalletContext = createContext();


 const DataProvider =  (props) =>{
  
    const [users, setUsers] = useState([])
    const [currentuser, setCurrentUser] = useState([])
    const [catLog, setCatLog] = useState([])
    const [settled, setSettled] = useState([])
    const [payment, setPayment] = useState()
    const [userAction, setUserAction] = useState([])
    const [creditAccount, setCreditAccount] = useState([])
    const [EditAccount, setEditAccount] = useState([])
    const userId =window.localStorage.getItem('userId');
   
    useEffect( () => {
      getData( )
        },[])
       
        const getData = async ()=>{
          const token = Cookies.get('token')
          const config = {
            headers: { 
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
              Authorization: `Bearer ${token}` }
        }
         
          axios.get(`https://limitless-escarpment-58685.herokuapp.com/api/user/auth/getMe/${userId}`,
          config
          )
          .then(function (response) {
            // handle success
            if(response.data.success){
              setCurrentUser([response.data.msg]);
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
        
      }
      
 
      
            return(
                <WalletContext.Provider value={{
                    users,
                    setUsers,
                    currentuser,
                    setCurrentUser,
                    setCatLog:setCatLog,
                    catLog,
                    payment,
                     setPayment,
                     setUserAction,
                     userAction,
                     creditAccount,
                     setCreditAccount,
                     setEditAccount,
                     EditAccount,
                     setSettled,
                     settled
                     }}> 
                        {props.children}
                </WalletContext.Provider>
            )
        }


        export {DataProvider,WalletContext}






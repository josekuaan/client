import React,{useContext,useState} from 'react'
import * as moment from 'moment'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {WalletContext} from '../../../pageContext'


export default function Items() {
    
    const {users,setUsers}= useContext(WalletContext)
    const [status, setStatus] = useState(false)
    const token = Cookies.get('token')
    const config = {
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
          Authorization: `Bearer ${token}` }
    }
    const handleDelete = id => async () => {
     
        axios({
            method:'delete',
            url:`https://limitless-escarpment-58685.herokuapp.com/api/user/auth/delete/${id}`,
            headers:config.headers
        }).then((response)=>{
            if(response.data.success){
                window.location.reload()
                
               }
        }).catch((error)=>{
            console.log(error)
        })
    
       
       
    }
    const approveHandler = id => async () => {
      console.log(id,users)
      const action= users.filter( i =>(i._id == id))

      console.log(action)
      const data = {status:!action[0].status}
      console.log(data)

      axios({
          method:'put',
          url:`https://limitless-escarpment-58685.herokuapp.com/api/user/auth/update/${id}`,
          data,
          headers:config.headers
      }).then((response)=>{
        if(response.data.success){
            console.log(response.data)
             axios(`https://limitless-escarpment-58685.herokuapp.com/api/user/auth/get-users`, {
              method:'get', 
              data,
              headers:config.headers
            }).then((response)=>{
                if(response.data.success){
                    setUsers(response.data.msg)
                       
                  } 
            }).catch((error)=>{
                console.log(error)
            })
        }
      }).catch((error)=>{
        console.log(error)
    })
    }
     
    return (    
       <>    
           {
            
            users.map( (lo,index) =>(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{lo._id.slice(5,12)}</td>
                    <td>{`${lo.fullName}`}</td>
                    <td>{`${lo.email}`}</td>
                    <td>{`${lo.userName}`}</td>
                     <td>{moment(`${lo.createdAt}`).format('DD/ MM /YYYY')}</td>
                    { <td style={{display:"flex",justifyContent:"space-around"}}>
                    <Link to="#" rel="tooltip" title="delete user"  onClick={handleDelete(lo._id)}>
                    <i className= "fill2  fa fa-close"></i></Link>
                    <Link to={`/admin/dashboard/edit-user/${lo._id}`}
                     rel="tooltip" title="edit user"
                      >
                    <i className="fill fa fa-pencil"></i></Link>
                    <Link to="#" rel="tooltip"  onClick={approveHandler(lo._id)}
                     title="Approved"><i className={` ${lo.status ? " fill": "fill2 "} fa fa-check`}></i></Link>
                    </td>
                    }  
                    
                </tr>  
             ))
           }
       </>
    )
}

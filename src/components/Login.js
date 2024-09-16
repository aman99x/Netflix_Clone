import { useState } from 'react';
import Header from './Header';
import axios from "axios";
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {setLoading, setUser } from '../redux/userSlice';

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch  = useDispatch();

    const isLoading = useSelector(store=>store.app.isLoading)

    const loginhandler = () =>{
        setIsLogin(!isLogin)
    }

    const getInputData = async(e) =>{
         e.preventDefault();
         dispatch(setLoading(true));
         //login
         if(isLogin){
            const user = {email,password};
            try{
                const res = await axios.post(`${API_END_POINT}/login`, user,{
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                });
                console.log(res);
                if(res.data.success){
                    toast.success(res.data.message);
                }
                dispatch(setUser(res.data.user));
                navigate('/browse')
            }catch(error){
                toast.error(error.response.data.message)
                console.log(error);
            }finally{
                dispatch(setLoading(false));
            }
         }else{
            //register
            dispatch(setLoading(true));
            const user = {fullName, email, password};        
            try{
                const res = await axios.post(`${API_END_POINT}/register`, user,{
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                });
                console.log(res);
                if(res.data.success){
                    toast.success(res.data.message);
                }
                setIsLogin(true);
             }catch(error){
                toast.error(error.response.data.message)
                console.log(error)
             }finally{
                dispatch(setLoading(false));
            }

         }
        
         setFullName("")
         setEmail("")
         setPassword("")
    }
    return(
    <div>  
        <Header/>
        <div className='absolute'>
            <img src='https://wallpapers.com/images/hd/netflix-background-6eijmcazwfrb9u6w.jpg' alt='banner'/>
        </div>
        <form onSubmit={getInputData} className='flex flex-col p-12 w-3/12 my-36 left-0 right-0 mx-auto items-center justify-center absolute bg-black opacity-90 rounded-md'>
            <h1 className=' text-3xl text-white mb-3 font-bold'>{isLogin ? "Login": "SignUp"}</h1>
            <div className='flex flex-col'>
                {
                    !isLogin && <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type='text' placeholder='Full Name' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
                }
                
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white'/>
                <button type="submit" className='bg-red-600 mt-6 p-1 text-white'>{`${isLoading ? "loading...":(isLogin?"Login":"SignUp")}`}</button>
                <p className='text-white mt-3'>{isLogin ? "New to Netflix?" : "Already have an account?"}<span onClick={loginhandler} className='ml-2 text-blue-900 cursor-pointer'>{isLogin?"SignUp" : "Login"}</span></p>
            </div>
        </form>
    </div>   
    )
}

export default Login
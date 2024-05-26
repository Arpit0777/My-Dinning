// Making custom hook to send request at backend
// creating a helper function:
import {useState,useEffect,useCallback} from 'react';
async function sendHttpRequest(url,config){
    const response = await fetch(url,config);
    const resdata = response.json();

    if(!response.ok){
        throw new Error('Error : failed to fetch due to some issues');
    }
    return resdata;
}
// This helper function is for sending request.

export default function useHttp(url,config,initialVal){
//    This sendRequest function will be responsible for updating the state based on some request.
   const [error,setError] = useState();
   const [data,setData]  = useState(initialVal);
   const [isLoading,setIsLoading] = useState(false);

   function clearInterval(){
    setData(initialVal);
   }

   const sendRequest = useCallback(async function sendRequest(data){
       setIsLoading(true);
       try{
        const resdata = await sendHttpRequest(url,{...config,body:data}); 
        setData(resdata);

       }catch(error){
        setError(error.message || 'Something went wrong');
       } 
       setIsLoading(false);   
   },[url,config]);

   useEffect(()=>{
    if((config&&(config.method==='GET'|| !config.method)|| !config)){
        sendRequest();
    }
    
   },[sendRequest]);
//we could have returned sendRequest from our useHttp hook for component to use it,But we are using useEffect to call sendRequest inside hook.
   return {
    error,
    data,
    isLoading,
    sendRequest,
    clearInterval,
   }
}
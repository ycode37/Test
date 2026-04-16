import { useCallback, useState } from "react";

export function useToast(){
    // we are creating state of an empty array here
    const[toasts,setToasts]=useState([])

    const addToast = useCallback((message, type="info")=>{
        // we are generating new ids here
        const id=Date.now()+Math.random();
    })
}
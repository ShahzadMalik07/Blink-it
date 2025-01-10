import React, { useEffect, useState } from "react"

const useMobile = (breakpoint = 768) => {
    const [isMobile, setisMobile] = useState(window.innerWidth < breakpoint)

const HandleResize = ()=>{
    const checkPoint = window.innerWidth < breakpoint
    setisMobile(checkPoint)
}

useEffect(()=>{
    HandleResize()
    window.addEventListener("resize",HandleResize)

    return ()=>{
        window.removeEventListener("resize",HandleResize)
    }
},[])



    return [isMobile]

}
export default useMobile
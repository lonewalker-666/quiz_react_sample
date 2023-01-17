import { cloneElement } from "react"


const SiteLayout = (props:any) => {
return(
    <div className="layout">
       <h1 className="header">
         Quiz Master</h1>
        <div>{cloneElement(props.children)}</div>
    </div>
)
}

export default SiteLayout
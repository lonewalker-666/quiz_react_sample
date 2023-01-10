

export const Modal = (props:any) => {
    const {header,body,footer} = props
    return(
        <div className="modal-container">
      <div className= "modal">
        <div className="modal_header">{header}</div>
        <div className="modal-body">
            {body}
        </div>
        <div className="modal-footer">
           {footer}
        </div>
    </div>
    </div>
    )
}
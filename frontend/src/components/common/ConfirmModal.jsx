import React from 'react';

export default class ConfirmModal extends React.Component {

    /*
        deve receber no props:
            id (.click() no id para mostrar)
            title
            text
            onConfirm
    */

    afterConfirm(){

        this.props.onConfirm();

        document.getElementById(this.props.id).click();
    }

    render(){
        return (
            <React.Fragment>
                
                <button id={this.props.id} type='button' className='d-none' data-toggle="modal" data-target="#confirm-modal-component" />
                
                <div className="modal fade" id="confirm-modal-component" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            
                            <div className="modal-body">
                                {this.props.text}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary mr-5" data-dismiss="modal">Cancelar</button>
                                <button type="button" className={`btn btn-${this.props.btnColor}`} onClick={() => this.afterConfirm()}>
                                    {this.props.btnText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
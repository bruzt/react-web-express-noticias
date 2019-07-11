import React from 'react';
import { RichUtils } from 'draft-js';

export default class Toolbar extends React.Component {

    constructor(props){
        super(props);

        this.inlineStyles = [
            {
                label: 'bold',
                style: 'BOLD',
                icon: <i className='fa fa-bold' />
            },
            {
                label: 'italic',
                style: 'ITALIC',
                icon: <i className='fa fa-italic' />
            },
            {
                label: 'underline',
                style: 'UNDERLINE',
                icon: <i className='fa fa-underline' />
            }
        ];
    }

    applyStyle(style){

        this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, style));
    }

    isActive(style){

        const currentStyle = this.props.editorState.getCurrentInlineStyle();
        return currentStyle.has(style);
    }

    renderItem(){
        return this.inlineStyles.map( (item, index) => {
            return (
                <div className={`${(this.isActive(item.style)) ? 'active' : ''}`} onClick={() => this.applyStyle(item.style)} key={index} className='d-flex justify-content-center' style={{ width: '28px', height: '27px', cursor: 'pointer' }}>
                    {item.icon || item.label}
                </div>
            );
        })
    }

    render(){
        return (
            <React.Fragment>

                {this.renderItem()}
                
            </React.Fragment>
        );
    }
}
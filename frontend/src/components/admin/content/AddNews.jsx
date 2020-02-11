import React from 'react';
import Quill from 'quill';
import './quill.css';
import axios from 'axios';

//import Toolbar from './draftTextArea/Toolbar';

export default class AddNews extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            sources: '',
            tags: ''
        };
    }

    componentDidMount(){

        new Quill('#quill', {
            theme: 'snow'
        });
    }

    handleChange(event){

        switch(event.target.name){

            case 'title':
                this.setState({ title: event.target.value });
            break;

            case 'sources':
                this.setState({ sources: event.target.value });
            break;

            case 'tags':
                this.setState({ tags: event.target.value });
            break;

            default:
            break;
        }
    }

    async saveNews(){

        const token = JSON.parse(sessionStorage.getItem('_userLogin') || localStorage.getItem('_userLogin')).token;

        const bearerToken = "Bearer " + token;

        const news = {
            userId: JSON.parse(sessionStorage.getItem('_userLogin') || localStorage.getItem('_userLogin')).id,
            title: this.state.title,
            news: document.getElementById('quill').querySelector('.ql-editor').innerHTML, //convertToRaw(this.state.editorState.getCurrentContent()),
            tags: this.state.tags.split(','),
            sources: this.state.sources.split(',')
        }

        try {

            await axios.post('http://localhost:3001/api/news', news, {
                headers: { 
                    authorization: bearerToken 
                }
            });
            
        } catch (error) {
            
            console.error(error.response.data.errors)
        }
    }

    render(){

        return (
            <React.Fragment>

                <div className="col mt-3">
                    <div className="row">
                        
                            <div className="row w-100 justify-content-center">
                                <h4 className=''>Adicione uma noticia</h4>
                            </div>

                            <div className="row w-100 justify-content-center mt-3">
                                <label>Titulo: &nbsp;</label>
                                <input type="text" className='w-50' name='title' value={this.state.title} onChange={(event) => this.handleChange(event)} />
                            </div>

                            {/*<div className="row w-100 justify-content-center mt-3">
                                <Toolbar onChangeEditor={this.onChangeEditor} editorState={this.state.editorState} />
                            </div>*/}

                            <div className="row w-100 justify-content-center mt-2">
                                <div className='bg-light' style={{ minHeight: '250px', width: '75%', border: '1px solid black' }}>
                                    
                                    <div 
                                        id='quill' 
                                        style={{ height: "250px" }}
                                    >
                                        
                                    </div>

                                    {/*
                                    <Editor
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        editorState={this.state.editorState}
                                        onEditorStateChange={this.onChangeEditor}
                                    />
                                    */}
                                    {/*<Editor 
                                        editorState={this.state.editorState} 
                                        onChangeEditor={this.onChangeEditor} 
                                    />*/}
                                </div>
                            </div>
                            <div className="row w-100 justify-content-center my-1">
                                <label>Fonte:&nbsp;</label>
                                <input className='w-50' type="text" name='sources' value={this.state.sources} onChange={(event) => this.handleChange(event)} />
                            </div>

                            <div className="row w-100 justify-content-center">
                                <label>Tags: &nbsp;</label>
                                <input className='w-50' type="text" name='tags' value={this.state.tags} onChange={(event) => this.handleChange(event)} />
                            </div>

                            <div className="row w-100 justify-content-center my-3">
                                <button type='button' className='btn btn-success' onClick={() => this.saveNews()}>
                                    Salvar
                                </button>
                            </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
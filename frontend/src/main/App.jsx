import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router';

import '../dependencies/jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import HomeOrSearch from '../components/public/HomeOrSearch';
import LoginPageOrAdminPage from '../components/admin/Login/LoginPageOrAdminPage';
import NewsPage from '../components/public/content/NewsPage';

export default class App extends React.Component {

    constructor(props){
        super(props);

        this.init();
    }

    init(){

        document.title = 'Site Home';

        document.getElementById('mainBody').classList.add('bg-dark');
    }

    componentDidMount(){
        
        this.disqus();
    }

    disqus() {

        /*var disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = `${this.props.match.params.id}-${this.props.match.params.title}`;
        };*/

        (function () { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://teste-oeqnydpmup.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                                
                    <Route exact path='/' component={HomeOrSearch} />
                    <Route path='/busca/:search' component={HomeOrSearch} />
                    <Route path='/noticias/:id/:title' component={NewsPage} />

                    <Route path='/admin' component={LoginPageOrAdminPage} />

                    <Redirect from='*' to='/' />

                </Switch>
            </BrowserRouter>
        );
    }
}
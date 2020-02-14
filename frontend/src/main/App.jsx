import React from 'react';

import '../dependencies/jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import GlobalStyle from './GlobalStyle';
import Routes from './Routes';

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
            <>
                <GlobalStyle />

                <Routes />
            </>
        );
    }
}
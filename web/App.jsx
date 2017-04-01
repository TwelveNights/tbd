import NavBar from './nav/components/NavBar';
import ProductContainer from './product/containers/ProductContainer';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            err: "",
            view: ProductContainer
        };

        this.error = this.error.bind(this);
        this.changeView = this.changeView.bind(this);
    }

    error(err) {
        this.setState({ err });
    }

    changeView(view) {
        this.setState({ err: "" });
        this.setState({ view });
    }

    render() {
        return (
            <div>
                <NavBar changeView={ this.changeView } />
                <div className="container mt-5">
                    <h1 className="text-center">Product Parser</h1>
                    { this.state.err ?
                        <div className="alert alert-danger" role="alert">
                            { this.state.err }.
                        </div> : null
                    }
                    <this.state.view error={ this.error } />
                </div>
            </div>
        );
    }
}

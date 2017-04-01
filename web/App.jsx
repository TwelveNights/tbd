import NavBar from './nav/components/NavBar';
import ProductContainer from './product/containers/ProductContainer';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            err: "",
        };

        this.error = this.error.bind(this);
    }

    error(err) {
        this.setState({ err });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="container mt-5">
                    <h1 className="text-center">Product Parser</h1>
                    { this.state.err ?
                        <div className="alert alert-danger" role="alert">
                            { this.state.err }.
                        </div> : null
                    }
                    <ProductContainer error={ this.error } />
                </div>
            </div>
        );
    }
}

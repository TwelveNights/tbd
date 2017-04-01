import ProductSummary from '../../product/components/ProductSummary';
import ProductContainer from '../../product/containers/ProductContainer';

export default class NavBar extends React.Component {

    toSummary() {
        this.props.changeView(ProductSummary);
    }

    toContainer() {
        this.props.changeView(ProductContainer);
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-primary bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">TBD</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={ this.toContainer.bind(this) } href="#">Parser <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={ this.toSummary.bind(this) } href="#">Products</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
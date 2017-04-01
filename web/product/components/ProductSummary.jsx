import http from '../../common/http';
import ProductCard from './ProductCard';

export default class ProductSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };

        this.clear = this.clear.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    clear() {
        if (confirm("Are you sure you want to clear all of the options?")) {
            http.delete("/products", { id: 0 }).then(() => {
                this.setState({ products: [] });
            });
        }
    }

    removeProduct(id) {
        let state = this.state.products.filter((k) => {
            return k._id !== id;
        })

        http.delete("/products", { id }).then(() => {
            this.setState({ products: state });
        }).catch((e) => {
            this.props.error(e.message);
        });
    }

    componentDidMount() {
        http.get("/products").then((result) => {
            this.setState({ products: result });
        });
    }

    renderProducts() {
        return this.state.products.map((p) => {
            return <ProductCard remove={ this.removeProduct } product={ p } key={ p._id } />
        });
    }

    render() {
        return (
            <div className="text-center">
                <row>
                    <button className="btn btn-success">Push to BestBuy</button>
                    <button onClick={ this.clear } className="btn btn-danger">Clear</button>
                </row>
                <div id="accordion" role="tablist" aria-multiselectable="true">
                    { this.renderProducts() }
                </div>
            </div>
        )
    }
}
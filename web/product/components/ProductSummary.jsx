import http from '../../common/http';
import ProductCard from './ProductCard';

export default class ProductSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };

        this.removeProduct = this.removeProduct.bind(this);
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
            <div id="accordion" role="tablist" aria-multiselectable="true">
                { this.renderProducts() }
            </div>
        )
    }
}
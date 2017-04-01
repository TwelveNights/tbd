import http from '../../common/http';
import Query from '../../query/components/Query';
import Product from '../components/Product';

export default class ProductContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };

        this.update = this.update.bind(this);
    }

    update(products) {
        this.setState({ products });
    }

    confirm(k) {
        let product = this.state.products[k];
        http.product(product); // TODO: handle messages
    }

    renderProducts() {
        return this.state.products.map((d, k) => {
            return <Product
                key={ k }
                product={ d }
                confirm={ this.confirm.bind(this, k) }/>
        });
    }

    render() {
        return (
            <div>
                <Query update={ this.update } error={ this.props.error } />
                { this.state.products ? this.renderProducts() : null }
            </div>
        );
    }
}
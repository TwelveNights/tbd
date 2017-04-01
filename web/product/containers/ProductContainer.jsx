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
        http.post("/products", product).then((result) => {
            this.setState({ products: [] });
            this.props.success("Succesfully queued new object to be pushed");
        });
    }

    addSpec(i, value) {
        let obj = {}
        obj[value] = ""
        this.state.products[i].specifications.push(obj);
        this.setState({ products: this.state.products });
    }

    removeSpec(i, k) {
        let product = this.state.products[i];
        product.specifications.splice(k, 1)
        if (product.specifications.length == 0) {
            this.state.products.splice(i, 1);
        }

        this.setState({ products: this.state.products });
    }

    changeSpec(i, k, e) {
        let product = this.state.products[i];
        let key = Object.keys(product.specifications[k])[0];
        product.specifications[k][key] = e.currentTarget.value;

        this.setState({ products: this.state.products });
    }

    renderProducts() {
        return this.state.products.map((d, k) => {
            return <Product
                key={ k }
                product={ d }
                addSpec={ this.addSpec.bind(this, k) }
                changeSpec={ this.changeSpec.bind(this, k) }
                removeSpec={ this.removeSpec.bind(this, k) }
                confirm={ this.confirm.bind(this, k) }/>
        });
    }

    render() {
        return (
            <div>
                <Query update={ this.update } success={ this.props.success } error={ this.props.error } />
                { this.state.products ? this.renderProducts() : null }
            </div>
        );
    }
}
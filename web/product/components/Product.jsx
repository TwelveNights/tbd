import Specification from './Specification';

export default class Product extends React.Component {
    changeSpec(k, e) {
        this.props.changeSpec(k, e);
    }

    removeSpec(k) {
        this.props.removeSpec(k);
    }

    renderSpecs() {
        return this.props.product.specifications.map((spec, k) => {
            return <Specification changeSpec={ this.changeSpec.bind(this, k) } removeSpec={ this.removeSpec.bind(this, k) } key={ k } data={ spec } />
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">{ this.props.product.name }</h2>
                <form>
                    { this.renderSpecs() }
                    <div className="form-group text-center">
                        <button className="btn btn-primary" onClick={ this.props.confirm }>Confirm</button>
                    </div>
                </form>
            </div>
        );
    }
}
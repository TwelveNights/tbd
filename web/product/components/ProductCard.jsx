import SpecificationList from './SpecificationList';

export default class ProductCard extends React.Component {
    remove() {
        this.props.remove(this.props.product._id);
    }

    render() {
        return (
            <div className="card mt-5">
                <div className="card-header" role="tab" id={ this.props.product.name }>
                <h5 className="mb-0">
                    <a data-toggle="collapse" data-parent="#accordion" href={ "#" + this.props.product._id } aria-expanded="true" aria-controls={ this.props.product._id }>
                    { this.props.product.name }
                    </a>
                <button type="button" onClick={ this.remove.bind(this) } className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </h5>
                </div>

                <div id={ this.props.product._id } className="collapse show" role="tabpanel" aria-labelledby={ this.props.product.name }>
                    <div className="card-block">
                        <SpecificationList specifications={ this.props.product.specifications } />
                    </div>
                </div>
            </div>
        )
    }
}
export default class SpecificationEntry extends React.Component {
    render() {
        let key = Object.keys(this.props.data)[0];
        return (
            <tr>
                <td>{ key }</td>
                <td>{ this.props.data[key] }</td>
            </tr>
        );
    }
}
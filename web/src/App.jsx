import Query from './query/components/Query';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="text-center">Parser</h1>
                <Query />
            </div>
        );
    }
}

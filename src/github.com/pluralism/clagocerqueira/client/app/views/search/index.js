import React from 'react';
import { connect } from 'react-redux';
import HeaderLinks from '../../components/common/headerLinks';
import Footer from '../../components/common/footer';



class SearchView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }


    render() {
        return (
            <main>
                <HeaderLinks />
                <Footer />
            </main>
        );
    }
}


const mapStateToProps = (state) => ({
});


export default connect(mapStateToProps)(SearchView);
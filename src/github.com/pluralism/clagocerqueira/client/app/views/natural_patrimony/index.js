import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { isActiveTab } from '../../utils/index';
import HeaderLinks from '../../components/common/header_links';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';



class NaturalPatrimonyView extends React.Component {
    constructor(props) {
        super(props);

        this.currentName = Constants.NATURAL_PATRIMONY.BROOKS;

        this.state = {
            activeTab: Constants.NATURAL_PATRIMONY.BROOKS,
            canSwitchPage: true,
        };
    }


    renderUpperSection() {
        return (
            <section id="patrimonio_natural_data">
                <div className="g-pt-40">
                    <div className="text-center g-mb-30">
                        <div className="g-mb-30">
                            <h2><span className="g-color-default">Património Natural</span></h2>
                        </div>
                        <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
                            Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
                    </div>


                    <div className="search_on_list g-mb-30 text-center font-main">
                        <input type="text" placeholder="Pesquisar no património natural&#8230;" />
                    </div>
                </div>
            </section>
        );
    }


    render() {
        return (
            <div>
                <main className="container-fluid">
                    <HeaderLinks />

                    <Footer />
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(NaturalPatrimonyView);
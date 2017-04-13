import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { Constants } from '../../constants/index';



class CityCouncilView extends React.Component {
    constructor(props) {
        super(props);

        this.currentDate = Constants.DATES.d1976_2013;
        this.dateAndPageMappings = {
            [Constants.DATES.d1976_2013]: {
                mapping: 'data1976_2013',
                page: 1
            },
        };


        this.state = {
            activeTab: this.currentDate,
            canSwitchPage: true,
        };
    }
}
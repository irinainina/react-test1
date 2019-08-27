import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Button, div } from '@material-ui/core';

import SimpleSlider from '../../components/Slider/Slider';
import MainPageNavigation from '../../components/MainPageNavigation/MainPageNavigation';
import MainPageSliderNavigation from '../../components/MainPageSliderNavigation/MainPageSliderNavigation';

import Avatar from '../../components/Avatar/Avatar';

import Description from '../../components/Description/Description';

import Developers from '../../components/Developers/Developers';

import GridGallery from '../../components/GridGalery/GridGalery';
import people from '../../data';
import store from '../../store/store';
import DatePicker from '../../components/DatePicker/DatePicker';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      authorDay: '',
      day: '',
    };
    this.data = people[this.props.lang];
  }

  componentWillMount() {
    const day = this.getDay().split('-')[2] % 8;
    this.setState({ profile: this.data[day], authorDay: day });
  }

  componentWillUnmount() {
    this.setState(null);
  }

  getDay() {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    this.setState({ day });
    return `${year}-${month}-${day}`;
  }

  onChange(event) {
    const day = event.target.value.split('-')[2] % 8 || this.getDay().split('-')[2] % 8;
    this.setState({ day, authorDay: day, profile: this.data[day] });
  }

  render() {
    return (
      <>
        <div className="main-page" id="home">

          <section className="main-page-title">
            <p>
              <span className="portal">
                <FormattedMessage id="headerSubtitleSpan" />
              </span>
              <span className="portal-subtitle">
                <FormattedMessage id="headerSubtitle" />
              </span>
            </p>
            <MainPageSliderNavigation />
          </section>
          <SimpleSlider />
          <MainPageNavigation />

          <section className="author-day" id="author">
            <h2>
              <FormattedMessage id="todayAuthor" />
            </h2>
            <div className="avatar-description">
              <div className="avatar-datepicker">
                <Avatar data={this.state.profile} />
                <DatePicker onChange={e => this.onChange(e)} />
              </div>
              <div className="description-button">
                <Description data={this.state.profile} />
                <Button variant="contained" className="author-day-btn">
                  <FormattedMessage id="toAuthorPage">
                    {text => (
                      <Link
                        to={`/${this.props.lang}/personalpage/person${this.state.authorDay}`}
                        className="author-day-btn-text"
                        id={this.state.authorDay}
                        onClick={(e) => {
                          store.dispatch({
                            type: 'page',
                            value: `/${this.props.lang}/personalpage/person${this.state.authorDay}`,
                          });
                          localStorage.setItem(
                            'page',
                            `/${this.props.lang}/personalpage/person${this.state.authorDay}`,
                          );
                          this.props.onButtonClick(e);
                        }}
                      >
                        {text}
                      </Link>
                    )}
                  </FormattedMessage>
                </Button>
              </div>
            </div>
          </section>

          <section className="description-mainpage" id="project-info">
            <h2>
              <FormattedMessage id="infoAboutPortal" />
            </h2>
            <FormattedHTMLMessage id="welcome" />
            <GridGallery />
          </section>
        </div>
        <Developers />
      </>
    );
  }
}

MainPage.propTypes = {
  lang: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ lang: state.locales.lang });
export default connect(mapStateToProps)(MainPage);

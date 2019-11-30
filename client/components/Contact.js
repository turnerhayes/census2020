import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './Contact.scss';
import './Headers.scss';

import TextInput from './TextInput';
import { sendContactForm } from '../api/contact';
import LocaleContext from './LocaleContext';
import Checkbox from './Checkbox';
import {
  supportedLocales
} from '../../i18n/supported-locales';
import contactFormImageSrc from '../images/contact-form.jpg';

class Contact extends Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired
    }).isRequired,
    currentLocale: PropTypes.oneOf(supportedLocales)
  }

  static getInitialState (defaults = {}) {
    return Object.assign(
      {
        firstName: '',
        lastName: '',
        email: '',
        comment: '',
        interests: new Set(),
        validEmail: true
      },
      defaults
    );
  }

  constructor (props) {
    super(props);
    this.state = Contact.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  notifySubmitSuccess () {
    toast(
      this.props.intl.formatMessage({
        id: 'components.Contact.submitSuccessToast',
        description: 'Message shown to users in a popup when the contact form has been successfully submitted',
        defaultMessage: 'Your request for information has been submitted'
      }),
      {
        type: toast.TYPE.SUCCESS,
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 8000,
        hideProgressBar: true
      }
    );
  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCheck (event) {
    const interestName = event.target.value;
    this.setState(({ interests }) => {
      const newInterests = new Set(interests);
      if (newInterests.has(interestName)) {
        newInterests.delete(interestName);
      } else {
        newInterests.add(interestName);
      }

      return {
        interests: newInterests
      };
    });
  }

  clearForm () {
    this.setState(Contact.getInitialState());
  }

  validateEmail () {
    const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email);
    if (isValidEmail !== this.state.validEmail) {
      this.setState({
        validEmail: isValidEmail
      });
    }
    return isValidEmail;
  }

  async handleSubmit (event) {
    event.preventDefault();
    if (this.state.validEmail && this.state.email.length > 0) {
      await sendContactForm({
        ...this.state,
        language: this.props.currentLocale
      });

      this.notifySubmitSuccess();
      this.clearForm();
    }
  }

  render () {
    const {
      firstName,
      lastName,
      email,
      comment,
      interests
    } = this.state;

    const options = [
      {
        value: 'volunteer',
        label: this.props.intl.formatMessage({
          key: 'volunteer',
          id: 'components.Contact.fields.interest.options.volunteer',
          defaultMessage: 'Volunteer to help',
          description: "'Volunteer to help' option for the Interest field in the Contact form"
        }),
        name: 'volunteer',
        checked: interests.has('volunteer')
      },
      {
        value: 'presentation',
        label: this.props.intl.formatMessage({
          key: 'requestPresentation',
          id: 'components.Contact.fields.interest.options.requestPresentation',
          defaultMessage: 'Request a presentation',
          description: "'Request a Presentation' option for the Interest field in the Contact form"
        }),
        name: 'presentation',
        checked: interests.has('presentation')
      },
      {
        value: 'information',
        label: this.props.intl.formatMessage({
          key: 'information',
          id: 'components.Contact.fields.interest.options.information',
          defaultMessage: 'Request more information',
          description: "'Request more information' option for the Interest field in the Contact form"
        }),
        name: 'information',
        checked: interests.has('information')
      },
      {
        value: 'other',
        label: this.props.intl.formatMessage({
          key: 'other',
          id: 'components.Contact.fields.interest.options.other',
          defaultMessage: 'Other',
          description: "'Other' option for the Interest field in the Contact form"
        }),
        name: 'other',
        checked: interests.has('other')
      }
    ];

    let emailWarning;
    if (!this.state.validEmail) {
      emailWarning = (
        <span className="c_contact__content__form_col__form__warning">Please enter a valid email address</span>
      );
    } else {
      emailWarning = null;
    }

    return (
      <div>
        <div className="c_headers__goldHeader"></div>
        <div className="c_contact">
          <h1 className="c_contact__headline">
            <FormattedMessage
              id="components.Contact.getInvolved.header"
              defaultMessage="Get Involved"
            />
          </h1>
          <div className="c_contact__content">
            <div className="c_contact__content__col">
              <img className="c_contact__content__col__contact_image" src={contactFormImageSrc}></img>
              <div className="c_contact__content__col__blurb">
                <h3 className="c_contact__content__col__blurb__headline">
                  <FormattedMessage
                    id="components.Contact.workingForCensus.header"
                    defaultMessage="Interested in working for the Census?"
                  />
                </h3>
                <p className="c_contact__content__col__blurb__info">
                  <FormattedMessage
                    id="components.Contact.workingForCensus"
                    defaultMessage="Find more information {link}"
                    values={{
                      link: (
                        <a className="c_contact__content__col__blurb__info__link"
                          href="https://2020census.gov/en/jobs">
                          <FormattedMessage
                            id="components.Contact.workingForCensus.link"
                            defaultMessage="here"
                          />
                        </a>
                      )
                    }}
                  />
                </p>
              </div>
              <div className="c_contact__content__col__blurb">
                <h3 className="c_contact__content__col__blurb__headline">
                  <FormattedMessage
                    id="components.Contact.needMoreInformation"
                    defaultMessage="Need more information?"
                  />
                </h3>
                <p className="c_contact__content__col__blurb__info">
                  <FormattedMessage
                    id="components.Contact.visitFaq"
                    defaultMessage="Visit our {link} or submit your question and a San Jose Census organizer will get back to you within 2 business days."
                    values={{
                      link: (
                        <a className="c_contact__content__col__blurb__info__link" href="/faq">
                          <FormattedMessage
                            id="components.Contact.visitFaq.link"
                            defaultMessage="FAQ"
                          />
                        </a>
                      )
                    }}
                  />
                </p>
              </div>
            </div>
            <div className="c_contact__content__form_col">
              <h2 className="c_contact__content__form_col__form_title">
                <FormattedMessage
                  id="components.Contact.form.title"
                  defaultMessage="Contact Form"
                />
              </h2>
              <form onSubmit={this.handleSubmit}>
                <div className="c_contact__content__form_col__form">
                  <div className="c_contact__content__form_col__form__row">
                    <div className="c_contact__content__form_col__form__row__half">
                      <h6 className="c_contact__content__form_col__form__row__label">
                        <span className="c_contact__content__form_col__form__row__label__required">* </span>
                        <FormattedMessage
                          id="components.Contact.fields.firstName"
                          defaultMessage="First Name"
                          description="Label for the First Name field in the Contact form"
                        />
                      </h6>
                      <TextInput
                        onChange={this.handleChange}
                        name='firstName'
                        className='c_contact__content__form_col__form__field'
                        value={firstName}
                        type='text'
                      />
                    </div>
                    <div className="c_contact__content__form_col__form__row__gutter"></div>
                    <div className="c_contact__content__form_col__form__row__half">
                      <h6 className="c_contact__content__form_col__form__row__label">
                        <span className="c_contact__content__form_col__form__row__label__required">* </span>
                        <FormattedMessage
                          id="components.Contact.fields.lastName"
                          defaultMessage="Last Name"
                          description="Label for the Last Name field in the Contact form"
                        />
                      </h6>
                      <TextInput
                        onChange={this.handleChange}
                        name='lastName'
                        className='c_contact__content__form_col__form__field'
                        value={lastName}
                        type='text'
                      />
                    </div>
                  </div>
                  <h6 className="c_contact__content__form_col__form__row__label">
                    <span className="c_contact__content__form_col__form__row__label__required">* </span>
                    <FormattedMessage
                      id="components.Contact.fields.email"
                      defaultMessage="Email"
                      description="Label for the Email field in the Contact form"
                    />
                    {emailWarning}
                  </h6>
                  <TextInput
                    onChange={this.handleChange}
                    validateEmail={this.validateEmail}
                    name='email'
                    className='c_contact__content__form_col__form__field'
                    value={email}
                    type='text'
                  />
                  <h6 className="c_contact__content__form_col__form__row__label">
                    <span className="c_contact__content__form_col__form__row__label__required">* </span>
                    <FormattedMessage
                      id="components.Contact.fields.interest"
                      defaultMessage="I would like to:"
                      description="Label for the Interest field in the Contact form"
                    />
                  </h6>
                  {
                    options.map((option, i) => {
                      return (
                        <Checkbox
                          className='c_contact__content__form_col__form__checkbox'
                          onCheck={this.handleCheck}
                          checked={option.checked}
                          label={option.label}
                          name={option.name}
                          value={option.value}
                          id={`checkbox-${option.value}-${i}`}
                          key={i}
                        />
                      );
                    })
                  }
                  <h6 className="c_contact__content__form_col__form__row__label">
                    <FormattedMessage
                      id="components.Contact.fields.comment"
                      defaultMessage="Comment"
                      description="Label for the Comment field in the Contact form"
                    />
                    <span className="c_contact__content__form_col__form__row__label__optional"> (<FormattedMessage
                      id="components.Contact.optional"
                      defaultMessage="Optional"
                    />)</span>
                  </h6>
                  <TextInput
                    onChange={this.handleChange}
                    name='comment'
                    className='c_contact__content__form_col__form__textarea'
                    rows={4}
                    value={comment}
                    type='textarea'
                  />
                </div>
                <button
                  className="c_contact__content__form_col__form__submit"
                  type="submit"
                >
                  <FormattedMessage
                    id="components.Contact.submitButton"
                    description="Button that submits the Contact form"
                    defaultMessage="Submit"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedContact = injectIntl(
  (props) => (
    <LocaleContext.Consumer>
      {
        ({ currentLocale }) => (
          <Contact
            {...props}
            currentLocale={currentLocale}
          />
        )
      }
    </LocaleContext.Consumer>
  )
);

export default WrappedContact;

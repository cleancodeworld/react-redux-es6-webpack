import React, {Component, PropTypes} from 'react';
import validate from './validate';
import {reduxForm, Field} from 'redux-form';
import Select from 'react-select';
import moment from 'moment';
import range from 'lodash/range';

require('moment-range');

@reduxForm({
  form: 'CallForm',
  validate
})

export default class CallForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  componentDidMount() {
    const datetime = moment().set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
    const start = datetime.clone().startOf('day');
    const end = datetime.clone().endOf('day');
    const hours = [];
    moment()
      .range(start, end)
      .by('hours', hour => {
        hours.push({
          moment: hour,
          label: hour.format('h:mm a')
        });
        const halfHour = hour.clone().add(30, 'minutes');
        hours.push({
          moment: halfHour,
          label: halfHour.format('h:mm a')
        });
      });
    this.hours = hours;
    this.countries = [
      { name: 'Afghanistan', code: 'AF' },
      { name: 'land Islands', code: 'AX' },
      { name: 'Albania', code: 'AL' },
      { name: 'Algeria', code: 'DZ' },
      { name: 'American Samoa', code: 'AS' },
      { name: 'AndorrA', code: 'AD' },
      { name: 'Angola', code: 'AO' },
      { name: 'Anguilla', code: 'AI' },
      { name: 'Antarctica', code: 'AQ' },
      { name: 'Antigua and Barbuda', code: 'AG' },
      { name: 'Argentina', code: 'AR' },
      { name: 'Armenia', code: 'AM' },
      { name: 'Aruba', code: 'AW' },
      { name: 'Australia', code: 'AU' },
      { name: 'Austria', code: 'AT' },
      { name: 'Azerbaijan', code: 'AZ' },
      { name: 'Bahamas', code: 'BS' },
      { name: 'Bahrain', code: 'BH' },
      { name: 'Bangladesh', code: 'BD' },
      { name: 'Barbados', code: 'BB' },
      { name: 'Belarus', code: 'BY' },
      { name: 'Belgium', code: 'BE' },
      { name: 'Belize', code: 'BZ' },
      { name: 'Benin', code: 'BJ' },
      { name: 'Bermuda', code: 'BM' },
      { name: 'Bhutan', code: 'BT' },
      { name: 'Bolivia', code: 'BO' },
      { name: 'Bosnia and Herzegovina', code: 'BA' },
      { name: 'Botswana', code: 'BW' },
      { name: 'Bouvet Island', code: 'BV' },
      { name: 'Brazil', code: 'BR' },
      { name: 'British Indian Ocean Territory', code: 'IO' },
      { name: 'Brunei Darussalam', code: 'BN' },
      { name: 'Bulgaria', code: 'BG' },
      { name: 'Burkina Faso', code: 'BF' },
      { name: 'Burundi', code: 'BI' },
      { name: 'Cambodia', code: 'KH' },
      { name: 'Cameroon', code: 'CM' },
      { name: 'Canada', code: 'CA' },
      { name: 'Cape Verde', code: 'CV' },
      { name: 'Cayman Islands', code: 'KY' },
      { name: 'Central African Republic', code: 'CF' },
      { name: 'Chad', code: 'TD' },
      { name: 'Chile', code: 'CL' },
      { name: 'China', code: 'CN' },
      { name: 'Christmas Island', code: 'CX' },
      { name: 'Cocos (Keeling) Islands', code: 'CC' },
      { name: 'Colombia', code: 'CO' },
      { name: 'Comoros', code: 'KM' },
      { name: 'Congo', code: 'CG' },
      { name: 'Congo, The Democratic Republic of the', code: 'CD' },
      { name: 'Cook Islands', code: 'CK' },
      { name: 'Costa Rica', code: 'CR' },
      { name: 'Cote D"Ivoire', code: 'CI' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Cuba', code: 'CU' },
      { name: 'Cyprus', code: 'CY' },
      { name: 'Czech Republic', code: 'CZ' },
      { name: 'Denmark', code: 'DK' },
      { name: 'Djibouti', code: 'DJ' },
      { name: 'Dominica', code: 'DM' },
      { name: 'Dominican Republic', code: 'DO' },
      { name: 'Ecuador', code: 'EC' },
      { name: 'Egypt', code: 'EG' },
      { name: 'El Salvador', code: 'SV' },
      { name: 'Equatorial Guinea', code: 'GQ' },
      { name: 'Eritrea', code: 'ER' },
      { name: 'Estonia', code: 'EE' },
      { name: 'Ethiopia', code: 'ET' },
      { name: 'Falkland Islands (Malvinas)', code: 'FK' },
      { name: 'Faroe Islands', code: 'FO' },
      { name: 'Fiji', code: 'FJ' },
      { name: 'Finland', code: 'FI' },
      { name: 'France', code: 'FR' },
      { name: 'French Guiana', code: 'GF' },
      { name: 'French Polynesia', code: 'PF' },
      { name: 'French Southern Territories', code: 'TF' },
      { name: 'Gabon', code: 'GA' },
      { name: 'Gambia', code: 'GM' },
      { name: 'Georgia', code: 'GE' },
      { name: 'Germany', code: 'DE' },
      { name: 'Ghana', code: 'GH' },
      { name: 'Gibraltar', code: 'GI' },
      { name: 'Greece', code: 'GR' },
      { name: 'Greenland', code: 'GL' },
      { name: 'Grenada', code: 'GD' },
      { name: 'Guadeloupe', code: 'GP' },
      { name: 'Guam', code: 'GU' },
      { name: 'Guatemala', code: 'GT' },
      { name: 'Guernsey', code: 'GG' },
      { name: 'Guinea', code: 'GN' },
      { name: 'Guinea-Bissau', code: 'GW' },
      { name: 'Guyana', code: 'GY' },
      { name: 'Haiti', code: 'HT' },
      { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
      { name: 'Holy See (Vatican City State)', code: 'VA' },
      { name: 'Honduras', code: 'HN' },
      { name: 'Hong Kong', code: 'HK' },
      { name: 'Hungary', code: 'HU' },
      { name: 'Iceland', code: 'IS' },
      { name: 'India', code: 'IN' },
      { name: 'Indonesia', code: 'ID' },
      { name: 'Iran, Islamic Republic Of', code: 'IR' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Ireland', code: 'IE' },
      { name: 'Isle of Man', code: 'IM' },
      { name: 'Israel', code: 'IL' },
      { name: 'Italy', code: 'IT' },
      { name: 'Jamaica', code: 'JM' },
      { name: 'Japan', code: 'JP' },
      { name: 'Jersey', code: 'JE' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kazakhstan', code: 'KZ' },
      { name: 'Kenya', code: 'KE' },
      { name: 'Kiribati', code: 'KI' },
      { name: 'Korea, Democratic People"S Republic of', code: 'KP' },
      { name: 'Korea, Republic of', code: 'KR' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Kyrgyzstan', code: 'KG' },
      { name: 'Lao People"S Democratic Republic', code: 'LA' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Lesotho', code: 'LS' },
      { name: 'Liberia', code: 'LR' },
      { name: 'Libyan Arab Jamahiriya', code: 'LY' },
      { name: 'Liechtenstein', code: 'LI' },
      { name: 'Lithuania', code: 'LT' },
      { name: 'Luxembourg', code: 'LU' },
      { name: 'Macao', code: 'MO' },
      { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
      { name: 'Madagascar', code: 'MG' },
      { name: 'Malawi', code: 'MW' },
      { name: 'Malaysia', code: 'MY' },
      { name: 'Maldives', code: 'MV' },
      { name: 'Mali', code: 'ML' },
      { name: 'Malta', code: 'MT' },
      { name: 'Marshall Islands', code: 'MH' },
      { name: 'Martinique', code: 'MQ' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Mauritius', code: 'MU' },
      { name: 'Mayotte', code: 'YT' },
      { name: 'Mexico', code: 'MX' },
      { name: 'Micronesia, Federated States of', code: 'FM' },
      { name: 'Moldova, Republic of', code: 'MD' },
      { name: 'Monaco', code: 'MC' },
      { name: 'Mongolia', code: 'MN' },
      { name: 'Montenegro', code: 'ME' },
      { name: 'Montserrat', code: 'MS' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Mozambique', code: 'MZ' },
      { name: 'Myanmar', code: 'MM' },
      { name: 'Namibia', code: 'NA' },
      { name: 'Nauru', code: 'NR' },
      { name: 'Nepal', code: 'NP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Netherlands Antilles', code: 'AN' },
      { name: 'New Caledonia', code: 'NC' },
      { name: 'New Zealand', code: 'NZ' },
      { name: 'Nicaragua', code: 'NI' },
      { name: 'Niger', code: 'NE' },
      { name: 'Nigeria', code: 'NG' },
      { name: 'Niue', code: 'NU' },
      { name: 'Norfolk Island', code: 'NF' },
      { name: 'Northern Mariana Islands', code: 'MP' },
      { name: 'Norway', code: 'NO' },
      { name: 'Oman', code: 'OM' },
      { name: 'Pakistan', code: 'PK' },
      { name: 'Palau', code: 'PW' },
      { name: 'Palestinian Territory, Occupied', code: 'PS' },
      { name: 'Panama', code: 'PA' },
      { name: 'Papua New Guinea', code: 'PG' },
      { name: 'Paraguay', code: 'PY' },
      { name: 'Peru', code: 'PE' },
      { name: 'Philippines', code: 'PH' },
      { name: 'Pitcairn', code: 'PN' },
      { name: 'Poland', code: 'PL' },
      { name: 'Portugal', code: 'PT' },
      { name: 'Puerto Rico', code: 'PR' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Reunion', code: 'RE' },
      { name: 'Romania', code: 'RO' },
      { name: 'Russian Federation', code: 'RU' },
      { name: 'RWANDA', code: 'RW' },
      { name: 'Saint Helena', code: 'SH' },
      { name: 'Saint Kitts and Nevis', code: 'KN' },
      { name: 'Saint Lucia', code: 'LC' },
      { name: 'Saint Pierre and Miquelon', code: 'PM' },
      { name: 'Saint Vincent and the Grenadines', code: 'VC' },
      { name: 'Samoa', code: 'WS' },
      { name: 'San Marino', code: 'SM' },
      { name: 'Sao Tome and Principe', code: 'ST' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Senegal', code: 'SN' },
      { name: 'Serbia', code: 'RS' },
      { name: 'Seychelles', code: 'SC' },
      { name: 'Sierra Leone', code: 'SL' },
      { name: 'Singapore', code: 'SG' },
      { name: 'Slovakia', code: 'SK' },
      { name: 'Slovenia', code: 'SI' },
      { name: 'Solomon Islands', code: 'SB' },
      { name: 'Somalia', code: 'SO' },
      { name: 'South Africa', code: 'ZA' },
      { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sri Lanka', code: 'LK' },
      { name: 'Sudan', code: 'SD' },
      { name: 'Suriname', code: 'SR' },
      { name: 'Svalbard and Jan Mayen', code: 'SJ' },
      { name: 'Swaziland', code: 'SZ' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'Syrian Arab Republic', code: 'SY' },
      { name: 'Taiwan, Province of China', code: 'TW' },
      { name: 'Tajikistan', code: 'TJ' },
      { name: 'Tanzania, United Republic of', code: 'TZ' },
      { name: 'Thailand', code: 'TH' },
      { name: 'Timor-Leste', code: 'TL' },
      { name: 'Togo', code: 'TG' },
      { name: 'Tokelau', code: 'TK' },
      { name: 'Tonga', code: 'TO' },
      { name: 'Trinidad and Tobago', code: 'TT' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'Turkey', code: 'TR' },
      { name: 'Turkmenistan', code: 'TM' },
      { name: 'Turks and Caicos Islands', code: 'TC' },
      { name: 'Tuvalu', code: 'TV' },
      { name: 'Uganda', code: 'UG' },
      { name: 'Ukraine', code: 'UA' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
      { name: 'United States Minor Outlying Islands', code: 'UM' },
      { name: 'Uruguay', code: 'UY' },
      { name: 'Uzbekistan', code: 'UZ' },
      { name: 'Vanuatu', code: 'VU' },
      { name: 'Venezuela', code: 'VE' },
      { name: 'Viet Nam', code: 'VN' },
      { name: 'Virgin Islands, British', code: 'VG' },
      { name: 'Virgin Islands, U.S.', code: 'VI' },
      { name: 'Wallis and Futuna', code: 'WF' },
      { name: 'Western Sahara', code: 'EH' },
      { name: 'Yemen', code: 'YE' },
      { name: 'Zambia', code: 'ZM' },
      { name: 'Zimbabwe', code: 'ZW' }
    ];
  }

  messageField = (field) =>( <div>
    <textarea rows="2" cols="2" className="form-control"
              placeholder="Please enter a reason for the call" {...field.input}></textarea>
    {field.touched && field.error && <label className="validation-error-label">{field.error}</label>}
  </div>)

  render() {
    return (
      <div className="row">
        <div className="col-lg-9">
          <div className="panel panel-flat">
            <div className="panel-body">
              <form className="form-horizontal" action="#">
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">1</b></span> Provide Call Information
                  </legend>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Message to Adrian</label>
                    <div className="col-lg-10">
                      <Field name="message" component={this.messageField}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Set Estimated Length</label>
                    <div className="col-lg-10">
                      <Field name="language" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={['15 minutes ($75.00)', '30 minutes ($150.00)', '1 hour ($300.00)'].map( value => ({ value: value, label: value}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>
                  <div className="help-block">You will be charged <strong>$75.00</strong> for the current scheduled
                    call
                    length. If the call goes over over the scheduled time, you will be charged the balance at a rate
                    of
                    <strong>$5/min</strong>. If the call gose less than the scheduled time, you will be refunded the
                    balance.
                  </div>
                  <div className="help-block">Notifications will be sent to <b>+1 5127397250</b> and <b>john.curtis@quotient.net</b>.
                    <a href="#">Edit</a></div>
                </fieldset>
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">2</b></span> Suggest Times When You're Free to Talk
                  </legend>
                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <input type="text" className="form-control datepicker hasDatepicker"
                               placeholder="Pick a date…"
                               id="dp1472575066648"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Field name="time1" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.hours && this.hours.map( value => ({ value: value.label, label: value.label}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <input type="text" className="form-control datepicker hasDatepicker"
                               placeholder="Pick a date…"
                               id="dp1472575066649"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Field name="time2" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.hours && this.hours.map( value => ({ value: value.label, label: value.label}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/></div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <input type="text" className="form-control datepicker hasDatepicker"
                               placeholder="Pick a date…"
                               id="dp1472575066650"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <Field name="time3" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.hours && this.hours.map( value => ({ value: value.label, label: value.label}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>
                  <div className="help-block">Please note that the times you choose will be 1 hour later for Adrian
                    (EDT) <br/><a href="#">Change my timezone (currently CDT)</a></div>
                </fieldset>
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large">
                    <span className="label bg-blue-400 mr-5 pl-10 pr-10"><b className="text-size-large">3</b></span>
                    Payment Details
                    <div className="pull-right"><img alt="" src="assets/images/placeholder.jpg"
                                                     style={{height: 28, width: 40}}/></div>
                  </legend>
                  <div className="form-group">
                    <label className="control-label col-lg-2">Credit Card</label>
                    <div className="col-lg-7">
                      <input type="text" className="form-control" name="format-credit-card"
                             placeholder="Card number"/>
                    </div>
                    <div className="col-lg-3">
                      <input type="text" className="form-control" placeholder="CVV"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Expiration</label>
                    <div className="col-lg-7">
                      <Field name="month" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={range(1, 12).map( value => ({ value: value, label: value}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/></div>
                    <div className="col-lg-3">
                      <Field name="year" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={range(2016, 2035).map( value => ({ value: value, label: value}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>

                  <div className="help-block">Your information is kept 100% private!</div>
                </fieldset>

                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span
                    className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">4</b></span> Billing Address
                  </legend>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Address line 1 <code
                      className="no-padding bg-white">*</code></label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" placeholder="123 Smith St."/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Address line 2</label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" placeholder="Optional"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">City <code
                      className="no-padding bg-white">*</code></label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" placeholder="New York"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">State/Province <code
                      className="no-padding bg-white">*</code></label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" placeholder="NY"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Postal Code / ZIP <code
                      className="no-padding bg-white">*</code></label>
                    <div className="col-lg-10">
                      <input type="text" className="form-control" placeholder="10001"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Country <code
                      className="no-padding bg-white">*</code></label>
                    <div className="col-lg-10">
                      <Field name="country" component={estimated =>
                        <div>
                        <Select
                          {...estimated.input}
                          onBlur={() => {}}
                          onBlurResetsInput={false}
                          value={estimated.input.value}
                          searchable={false}
                          options={this.countries && this.countries.map( value => ({ value: value.code, label: value.name}))}
                          />
                          {estimated.touched && estimated.error && <label className="validation-error-label">{estimated.error}</label>}
                        </div>
                      }/>
                    </div>
                  </div>
                </fieldset>
                <button type="submit" className="btn btn-primary content-group">Book Now <i
                  className="icon-arrow-right14 position-right"></i></button>

                <div className="help-block">By scheduling a call you agree with our <a target="_blank" href="#">Terms
                  of
                  Service</a>.
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="media-list panel">
            <div className="media p-15 pr-10">
              <div className="media-left"><a href="#"><img src="assets/images/placeholder.jpg" className="img-circle"
                                                           alt=""/></a></div>
              <div className="media-body">
                <span className="media-heading text-semibold">Adrian Salamunovic</span>
                <span className="text-muted display-block">Los Angeles and Ottawa, Canada $5/min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

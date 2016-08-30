import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import validate from './validate';

@reduxForm({
  form: 'AnswerForm',
  validate
})

export default class CallForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    success: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-9">
          <div className="panel panel-flat">
            <div className="panel-body">
              <form className="form-horizontal" action="#">
                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">1</b></span> Provide Call Information
                  </legend>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Message to Adrian <a href="#">Examples</a></label>
                    <div className="col-lg-10">
                      <textarea rows="2" cols="2" className="form-control"
                                placeholder="Please enter a reason for the call"></textarea>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Set Estimated Length</label>
                    <div className="col-lg-10">
                      <select className="select select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="15">15 minutes ($75.00)</option>
                        <option value="30">30 minutes ($150.00)</option>
                        <option value="60">1 hour ($300.00)</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr"
                                     style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-ecdc-container"><span
                      className="select2-selection__rendered" id="select2-ecdc-container" title="15 minutes ($75.00)">15 minutes ($75.00)</span><span
                      className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span
                      className="dropdown-wrapper" aria-hidden="true"></span></span>
                    </div>
                  </div>

                  <div className="help-block">You will be charged <strong>$75.00</strong> for the current scheduled call
                    length. If the call goes over over the scheduled time, you will be charged the balance at a rate of
                    <strong>$5/min</strong>. If the call gose less than the scheduled time, you will be refunded the
                    balance.
                  </div>

                  <div className="help-block">Notifications will be sent to <b>+1 5127397250</b> and <b>john.curtis@quotient.net</b>.
                    <a href="#">Edit</a></div>
                </fieldset>

                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span className="label bg-blue-400 mr-5 pl-10 pr-10"><b
                    className="text-size-large">2</b></span> Suggest Times When You're Free to Talk
                  </legend>

                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <input type="text" className="form-control datepicker hasDatepicker" placeholder="Pick a date…"
                               id="dp1472575066648"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <select className="select select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="1:30">1:30 PM</option>
                        <option value="2:00">2:00 PM</option>
                        <option value="2:30">2:30 PM</option>
                        <option value="3:00">3:00 PM</option>
                        <option value="3:30">3:30 PM</option>
                        <option value="4:00">4:00 PM</option>
                        <option value="4:30">4:30 PM</option>
                        <option value="5:00">5:00 PM</option>
                        <option value="5:30">5:30 PM</option>
                        <option value="6:00">6:00 PM</option>
                        <option value="6:30">6:30 PM</option>
                        <option value="7:00">7:00 PM</option>
                        <option value="7:30">7:30 PM</option>
                        <option value="8:00">8:00 PM</option>
                        <option value="8:30">8:30 PM</option>
                        <option value="9:00">9:00 PM</option>
                        <option value="9:30">9:30 PM</option>
                        <option value="10:00">10:00 PM</option>
                        <option value="10:30">10:30 PM</option>
                        <option value="11:00">11:00 PM</option>
                        <option value="11:30">11:30 PM</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr"
                                     style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-ti6o-container"><span
                      className="select2-selection__rendered" id="select2-ti6o-container" title="3:00 PM">3:00 PM</span><span
                      className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span
                      className="dropdown-wrapper" aria-hidden="true"></span></span>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <input type="text" className="form-control datepicker hasDatepicker" placeholder="Pick a date…"
                               id="dp1472575066649"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <select className="select select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="1:30">1:30 PM</option>
                        <option value="2:00">2:00 PM</option>
                        <option value="2:30">2:30 PM</option>
                        <option value="3:00">3:00 PM</option>
                        <option value="3:30">3:30 PM</option>
                        <option value="4:00">4:00 PM</option>
                        <option value="4:30">4:30 PM</option>
                        <option value="5:00">5:00 PM</option>
                        <option value="5:30">5:30 PM</option>
                        <option value="6:00">6:00 PM</option>
                        <option value="6:30">6:30 PM</option>
                        <option value="7:00">7:00 PM</option>
                        <option value="7:30">7:30 PM</option>
                        <option value="8:00">8:00 PM</option>
                        <option value="8:30">8:30 PM</option>
                        <option value="9:00">9:00 PM</option>
                        <option value="9:30">9:30 PM</option>
                        <option value="10:00">10:00 PM</option>
                        <option value="10:30">10:30 PM</option>
                        <option value="11:00">11:00 PM</option>
                        <option value="11:30">11:30 PM</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr"
                                     style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-md2d-container"><span
                      className="select2-selection__rendered" id="select2-md2d-container" title="3:30 PM">3:30 PM</span><span
                      className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span
                      className="dropdown-wrapper" aria-hidden="true"></span></span>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-lg-8">
                      <div className="input-group">
                        <span className="input-group-addon"><i className="icon-calendar"></i></span>
                        <input type="text" className="form-control datepicker hasDatepicker" placeholder="Pick a date…"
                               id="dp1472575066650"/>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <select className="select select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="1:30">1:30 PM</option>
                        <option value="2:00">2:00 PM</option>
                        <option value="2:30">2:30 PM</option>
                        <option value="3:00">3:00 PM</option>
                        <option value="3:30">3:30 PM</option>
                        <option value="4:00">4:00 PM</option>
                        <option value="4:30">4:30 PM</option>
                        <option value="5:00">5:00 PM</option>
                        <option value="5:30">5:30 PM</option>
                        <option value="6:00">6:00 PM</option>
                        <option value="6:30">6:30 PM</option>
                        <option value="7:00">7:00 PM</option>
                        <option value="7:30">7:30 PM</option>
                        <option value="8:00">8:00 PM</option>
                        <option value="8:30">8:30 PM</option>
                        <option value="9:00">9:00 PM</option>
                        <option value="9:30">9:30 PM</option>
                        <option value="10:00">10:00 PM</option>
                        <option value="10:30">10:30 PM</option>
                        <option value="11:00">11:00 PM</option>
                        <option value="11:30">11:30 PM</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr"
                                     style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-c0dq-container"><span
                      className="select2-selection__rendered" id="select2-c0dq-container" title="4:00 PM">4:00 PM</span><span
                      className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span
                      className="dropdown-wrapper" aria-hidden="true"></span></span>
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
                      <input type="text" className="form-control" name="format-credit-card" placeholder="Card number"/>
                    </div>
                    <div className="col-lg-3">
                      <input type="text" className="form-control" placeholder="CVV"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-lg-2">Expiration</label>
                    <div className="col-lg-7">
                      <select className="select-search select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="">Month</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr"
                                     style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-0jn6-container"><span
                      className="select2-selection__rendered" id="select2-0jn6-container"
                      title="Month">Month</span><span className="select2-selection__arrow" role="presentation"><b
                      role="presentation"></b></span></span></span><span className="dropdown-wrapper"
                                                                         aria-hidden="true"></span></span>
                    </div>
                    <div className="col-lg-3">
                      <select className="select-search select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="">Year</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                        <option value="2034">2034</option>
                        <option value="2035">2035</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr"
                                     style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-omd7-container"><span
                      className="select2-selection__rendered" id="select2-omd7-container" title="Year">Year</span><span
                      className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span
                      className="dropdown-wrapper" aria-hidden="true"></span></span>
                    </div>
                  </div>

                  <div className="help-block">Your information is kept 100% private!</div>
                </fieldset>

                <fieldset className="content-group">
                  <legend className="text-bold text-size-large"><span className="label bg-blue-400 mr-5 pl-10 pr-10"><b
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
                      <select className="select-search select2-hidden-accessible" tabIndex="-1" aria-hidden="true">
                        <option value="">Choose Country</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AX">Åland Islands</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia, Plurinational State of</option>
                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo, the Democratic Republic of the</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curaçao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">Heard Island and McDonald Islands</option>
                        <option value="VA">Holy See (Vatican City State)</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran, Islamic Republic of</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">Korea, Democratic People's Republic of</option>
                        <option value="KR">Korea, Republic of</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Lao People's Democratic Republic</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia, Federated States of</option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">Palestinian Territory, Occupied</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="RE">Réunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russian Federation</option>
                        <option value="RW">Rwanda</option>
                        <option value="BL">Saint Barthélemy</option>
                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="MF">Saint Martin (French part)</option>
                        <option value="PM">Saint Pierre and Miquelon</option>
                        <option value="VC">Saint Vincent and the Grenadines</option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SX">Sint Maarten (Dutch part)</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syrian Arab Republic</option>
                        <option value="TW">Taiwan, Province of China</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania, United Republic of</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UM">United States Minor Outlying Islands</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                        <option value="VN">Viet Nam</option>
                        <option value="VG">Virgin Islands, British</option>
                        <option value="VI">Virgin Islands, U.S.</option>
                        <option value="WF">Wallis and Futuna</option>
                        <option value="EH">Western Sahara</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select><span className="select2 select2-container select2-container--default" dir="ltr" style={{width: '100%'}}><span className="selection"><span
                      className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true"
                      aria-expanded="false" tabIndex="0" aria-labelledby="select2-369w-container"><span
                      className="select2-selection__rendered" id="select2-369w-container" title="Choose Country">Choose Country</span><span
                      className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span
                      className="dropdown-wrapper" aria-hidden="true"></span></span>
                    </div>
                  </div>
                </fieldset>

                <button type="submit" className="btn btn-primary content-group">Book Now <i
                  className="icon-arrow-right14 position-right"></i></button>

                <div className="help-block">By scheduling a call you agree with our <a target="_blank" href="#">Terms of
                  Service</a>.
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="media-list panel">
            <div className="media p-15 pr-10">
              <div className="media-left"><a href="#"><img src="assets/images/placeholder.jpg" className="img-circle" alt=""/></a></div>
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

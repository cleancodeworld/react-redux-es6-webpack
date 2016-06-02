/* global $ */
import React, { Component, PropTypes} from 'react';
import scriptLoader from 'react-async-script-loader';

@scriptLoader(
  '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js',
  '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js',
  '//cdnjs.cloudflare.com/ajax/libs/ckeditor/4.4.5/ckeditor.js',
  '//cdnjs.cloudflare.com/ajax/libs/ckeditor/4.4.5/adapters/jquery.js'
)
export default class PageBuilder extends Component {
  static propTypes = {
    isScriptLoaded: PropTypes.bool,
  }

  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) {
      if (isScriptLoadSucceed) {
        this.appendTemplates();
        this.runPageBuilder();
      }
    }
  }

  appendTemplates() {
    $('#flyer').append(' <script data-template="header" type="text/template"> <section id="header" data-template="header"> <div class="edit" style="display: none;"> <form> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview > h1"> </div> <div class="form-group"> <label>Subtitle</label> <input type="text" class="form-control input-sm" data-selector=".preview > h3"> </div> <footer class="form-group"> <button type="button" class="btn btn-link btn-sm" data-action="cancel">Cancel</button> <button type="submit" class="btn btn-default btn-sm pull-right">Done</button> </footer> </form> </div> <div class="preview"> <h1>Local News Update</h1> <h3 class="dashed" style="margin: 0; padding: 5px;">Add Subtitle</h3> </div> </section> </script> <script data-template="title" type="text/template"> <section data-template="title"> <div class="edit" style="display: none;"> <form> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview > h2"> </div> <footer class="form-group"> <button type="button" class="btn btn-link btn-sm" data-action="cancel">Cancel</button> <button type="submit" class="btn btn-default btn-sm pull-right">Done</button> </footer> </form> </div> <div class="preview dashed"> <button type="button" class="close" data-action="dismiss">&times;</button> <h2 style="color: #bdbcbe; text-align: center; text-transform: uppercase; margin: 0;">Sample Title</h2> </div> </section> </script> <script data-template="text" type="text/template"> <section data-template="text"> <div class="edit" style="display: none;"> <form> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview > h3"> </div> <div class="form-group"> <label>Text</label> <textarea class="form-control" rows="4" data-selector=".preview > .editable" data-richtext="true"></textarea> </div> <footer class="form-group"> <button type="button" class="btn btn-link btn-sm" data-action="cancel">Cancel</button> <button type="submit" class="btn btn-default btn-sm pull-right">Done</button> </footer> </form> </div> <div class="preview dashed"> <button type="button" class="close" data-action="dismiss">&times;</button> <h3 style="color: #bdbcbe; text-transform: uppercase; margin-top: 0;">Sample Paragraph</h3> <div class="editable" style="color: #bdbcbe;"> Click on this text to edit it. You can add content easily by clicking on the "Add Content" bar at the bottom of the page. Drag this and other boxes around to re-order them. When you are finished, you can play with different designs by using the theme picker on the right. </div> </div> </section> </script> <script data-template="gallery" type="text/template"> <section data-template="gallery"> <div class="edit" style="display: none;"> <form> <div class="row"> <div class="col-md-4"> <img src="//placehold.it/240x160" class="img-responsive img-thumbnail"> </div> <div class="col-md-8"> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview .col-md-4:nth-child(1) > h5"> </div> <div class="form-group"> <label>Description</label> <textarea class="form-control input-sm" rows="2" data-selector=".preview .col-md-4:nth-child(1) > .editable"></textarea> </div> </div> </div> <hr> <div class="row"> <div class="col-md-4"> <img src="//placehold.it/240x160" class="img-responsive img-thumbnail"> </div> <div class="col-md-8"> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview .col-md-4:nth-child(2) > h5"> </div> <div class="form-group"> <label>Description</label> <textarea class="form-control input-sm" rows="2" data-selector=".preview .col-md-4:nth-child(2) > .editable"></textarea> </div> </div> </div> <hr> <div class="row"> <div class="col-md-4"> <img src="//placehold.it/240x160" class="img-responsive img-thumbnail"> </div> <div class="col-md-8"> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview .col-md-4:nth-child(3) > h5"> </div> <div class="form-group"> <label>Description</label> <textarea class="form-control input-sm" rows="2" data-selector=".preview .col-md-4:nth-child(3) > .editable"></textarea> </div> </div> </div> <footer class="form-group"> <button type="button" class="btn btn-link btn-sm" data-action="cancel">Cancel</button> <button type="submit" class="btn btn-default btn-sm pull-right">Done</button> </footer> </form> </div> <div class="preview dashed"> <button type="button" class="close" data-action="dismiss">&times;</button> <div class="row"> <div class="col-md-4"> <img src="//placehold.it/240x160" class="img-responsive img-thumbnail"> <h5 style="color: #bdbcbe; text-transform: uppercase;">Add a Title</h5> <div class="editable" style="color: #bdbcbe;"> </div> </div> <div class="col-md-4"> <img src="//placehold.it/240x160" class="img-responsive img-thumbnail"> <h5 style="color: #bdbcbe; text-transform: uppercase;">Add a Title</h5> <div class="editable" style="color: #bdbcbe;"> </div> </div> <div class="col-md-4"> <img src="//placehold.it/240x160" class="img-responsive img-thumbnail"> <h5 style="color: #bdbcbe; text-transform: uppercase;">Add a Title</h5> <div class="editable" style="color: #bdbcbe;"> </div> </div> </div> </div> </section> </script> <script data-template="about" type="text/template"> <section data-template="about"> <div class="edit" style="display: none;"> <form> <div class="form-group"> <label>Title</label> <input type="text" class="form-control" data-selector=".preview h3"> </div> <div class="form-group"> <label>Description</label> <textarea class="form-control" rows="3" data-selector=".preview .editable"></textarea> </div> <div class="row"> <div class="col-md-6"> <div class="form-group"> <label>Address</label> <div class="input-group input-group-sm"> <span class="input-group-addon"> <i class="icon-fixed-width icon-map-marker"></i> </span> <input type="text" class="form-control input-sm" data-selector=".preview .contacts .address > small"> </div> </div> <div class="form-group"> <label>Phone</label> <div class="input-group input-group-sm"> <span class="input-group-addon"> <i class="icon-fixed-width icon-phone"></i> </span> <input type="text" class="form-control input-sm" data-selector=".preview .contacts .phone > small"> </div> </div> <div class="form-group"> <label>Website</label> <div class="input-group input-group-sm"> <span class="input-group-addon"> <i class="icon-fixed-width icon-globe"></i> </span> <input type="text" class="form-control input-sm" data-selector=".preview .contacts .website > small"> </div> </div> </div> <div class="col-md-6"> <div class="form-group"> <label>Email</label> <div class="input-group input-group-sm"> <span class="input-group-addon"> <i class="icon-fixed-width icon-envelope"></i> </span> <input type="text" class="form-control input-sm" data-selector=".preview .contacts .email > small"> </div> </div> <div class="form-group"> <label>Facebook</label> <div class="input-group input-group-sm"> <span class="input-group-addon"> <i class="icon-fixed-width icon-facebook"></i> </span> <input type="text" class="form-control input-sm" data-selector=".preview .contacts .facebook > small"> </div> </div> <div class="form-group"> <label>Twitter</label> <div class="input-group input-group-sm"> <span class="input-group-addon"> <i class="icon-fixed-width icon-twitter"></i> </span> <input type="text" class="form-control input-sm" data-selector=".preview .contacts .twitter > small"> </div> </div> </div> </div> <footer class="form-group"> <button type="button" class="btn btn-link btn-sm" data-action="cancel">Cancel</button> <button type="submit" class="btn btn-default btn-sm pull-right">Done</button> </footer> </form> </div> <div class="preview dashed"> <button type="button" class="close" data-action="dismiss">&times;</button> <div class="row"> <div class="col-md-4"> <img src="//placehold.it/240x180" class="img-responsive img-thumbnail"> </div> <div class="col-md-8"> <h3 style="color: #bdbcbe; text-transform: uppercase; margin-top: 0;">About Us</h3> <div class="editable" style="color: #bdbcbe;"> I am the one who knocks. Go science! </div> <div class="contacts"> <div class="address"> <i class="icon-fixed-width icon-map-marker"></i> <small class="text-muted">123 Main St.</small> </div> <div class="email"> <i class="icon-fixed-width icon-envelope"></i> <small class="text-muted">contact@yourwebsite.com</small> </div> <div class="phone"> <i class="icon-fixed-width icon-phone"></i> <small class="text-muted">(206) 555-1234</small> </div> <div class="facebook"> <i class="icon-fixed-width icon-facebook"></i> <small class="text-muted">facebook.com/example</small> </div> <div class="website"> <i class="icon-fixed-width icon-globe"></i> <small class="text-muted">yourwebsite.com</small> </div> <div class="twitter"> <i class="icon-fixed-width icon-twitter"></i> <small class="text-muted">@twitter_handle</small> </div> </div> </div> </div> </div> </section> </script>');
  }

  runPageBuilder() {
    $('#flyer').on('click', '.preview', ()=> {
      const section = $(this).closest('section');

      if (section.length > 0) {
        $('[data-selector]', section).each(()=> {
          const target = section.find($(this).data('selector'));

          if ($(this).is('input') === true) {
            $(this).val(target.text());
          } else if ($(this).is('textarea') === true) {
            $(this).val($.trim(target.html()));

            if ($(this).attr('data-richtext') === 'true') {
              $('textarea[data-richtext]').ckeditor();
            }
          }
        });

        $(this).hide();
        section.find('.edit').show().addClass('animated bounceIn');
      }
    });

    $('#flyer').on('click', '.preview button[data-action="dismiss"]', (event) => {
      const section = $(this).closest('section');

      if (section.length > 0) {
        section.slideUp(250, ()=> {
          section.remove();
        });
      }

      event.stopImmediatePropagation();
    });

    $('#flyer').on('submit', '.edit form', (event) => {
      const section = $(this).closest('section');

      if (section.length > 0) {
        $('[data-selector]', section).each(()=> {
          section.find($(this).data('selector')).html($(this).val());
        });

        $(this).closest('.edit').hide();
        section.find('.preview').show().addClass('animated bounceIn');
      }

      event.preventDefault();
    });

    $('#flyer').on('click', '.edit form button[data-action="cancel"]', () => {
      const section = $(this).closest('section');

      if (section.length > 0) {
        $(this).closest('.edit').hide();
        section.find('.preview').show().addClass('animated bounceIn');
      }
    });

    $('#sortable').sortable({
      distance: 25,
      placeholder: 'dashed'
    }).disableSelection();

    $('.widget').click(()=> {
      const template = $('script[data-template="' + $(this).data('template') + '"]');

      if (template.length > 0) {
        $('#sortable').append(template.html());
        $('#sortable > section').last().show().addClass('animated bounceIn');
      }

      $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
    });

    $('[data-action="clear"]').click(()=> {
      $('#sortable').empty();
    });

    $('[data-action="export"]').click(() => {
      const json = [];

      $('#flyer section[data-template]').each(() => {
        const self = this;
        const section = {
          id: $(self).data('template'),
          data: []
        };

        $(self).find('.edit [data-selector]').each(() => {
          section.data.push($.trim($(self).find($(this).data('selector')).html()));
        });

        json.push(section);
      });

      $.ajax({
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(json),
        dataType: 'json',
        type: 'POST',
        url: 'https://httpbin.org/post'
      }).done((data) => {
        alert('https://httpbin.org/post (POST): ' + data.data);
      });
    });

    $('[data-action="import"]').click(() => {
      $.getJSON('./data/data.json', (json) => {
        $('#sortable').empty();

        $.each(json, ()=> {
          const self = this;
          const template = $('script[data-template="' + this.id + '"]');

          if (template.length > 0) {
            if (this.id !== 'header') {
              $('#sortable').append(template.html());
            }

            const section = $('#flyer section[data-template]').last();

            section.find('[data-selector]').each(()=> {
              $(this).val(self.data.shift());
            });
          }
        });

        $('#flyer .edit form').submit();
      });
    });
  }

  render() {
    return ( <div>
        <div id="flyer" className="clearfix">
          <section id="header" data-template="header">
            <div className="edit" style={{display: 'none'}}>
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" data-selector=".preview > h1"/>
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <input type="text" className="form-control input-sm" data-selector=".preview > h3"/>
                </div>
                <footer className="form-group">
                  <button type="button" className="btn btn-link btn-sm" data-action="cancel">Cancel</button>
                  <button type="submit" className="btn btn-default btn-sm pull-right">Done</button>
                </footer>
              </form>
            </div>
            <div className="preview">
              <h1>Local News Update</h1>
              <h3 className="dashed" style={{margin: 0, padding: 5}}>Add Subtitle</h3>
            </div>
          </section>

          <div id="sortable">
            <section data-template="gallery">
              <div className="edit" style={{display: 'none'}}>
                <form>
                  <div className="row">
                    <div className="col-md-4">
                      <img src="//placehold.it/240x160" className="img-responsive img-thumbnail"/>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control"
                               data-selector=".preview .col-md-4:nth-child(1) > h5"/>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                            <textarea className="form-control input-sm" rows="2"
                                      data-selector=".preview .col-md-4:nth-child(1) > .editable"></textarea>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-md-4">
                      <img src="//placehold.it/240x160" className="img-responsive img-thumbnail"/>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control"
                               data-selector=".preview .col-md-4:nth-child(2) > h5"/>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                              <textarea className="form-control input-sm" rows="2"
                                        data-selector=".preview .col-md-4:nth-child(2) > .editable"></textarea>
                      </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-md-4">
                      <img src="//placehold.it/240x160" className="img-responsive img-thumbnail"/>
                    </div>
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control"
                               data-selector=".preview .col-md-4:nth-child(3) > h5"/>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                                <textarea className="form-control input-sm" rows="2"
                                          data-selector=".preview .col-md-4:nth-child(3) > .editable"></textarea>
                      </div>
                    </div>
                  </div>
                  <footer className="form-group">
                    <button type="button" className="btn btn-link btn-sm" data-action="cancel">Cancel</button>
                    <button type="submit" className="btn btn-default btn-sm pull-right">Done</button>
                  </footer>
                </form>
              </div>
              <div className="preview dashed">
                <button type="button" className="close" data-action="dismiss">&times;</button>
                <div className="row">
                  <div className="col-md-4">
                    <img src="//placehold.it/240x160" className="img-responsive img-thumbnail"/>
                    <h5 style={{color: '#bdbcbe', textTransform: 'uppercase'}}>Add a Title</h5>
                    <div className="editable" style={{color: '#bdbcbe'}}>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src="//placehold.it/240x160" className="img-responsive img-thumbnail"/>
                    <h5 style={{color: '#bdbcbe', textTransform: 'uppercase'}}>Add a Title</h5>
                    <div className="editable" style={{color: '#bdbcbe'}}>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src="//placehold.it/240x160" className="img-responsive img-thumbnail"/>
                    <h5 style={{color: '#bdbcbe', textTransform: 'uppercase'}}>Add a Title</h5>
                    <div className="editable" style={{color: '#bdbcbe'}}>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section data-template="text">
              <div className="edit" style={{display: 'none'}}>
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" data-selector=".preview > h3"/>
                  </div>
                  <div className="form-group">
                    <label>Text</label>
                        <textarea className="form-control" rows="4" data-selector=".preview > .editable"
                                  data-richtext="true"></textarea>
                  </div>
                  <footer className="form-group">
                    <button type="button" className="btn btn-link btn-sm" data-action="cancel">Cancel</button>
                    <button type="submit" className="btn btn-default btn-sm pull-right">Done</button>
                  </footer>
                </form>
              </div>
              <div className="preview dashed">
                <button type="button" className="close" data-action="dismiss">&times;</button>
                <h3 style={{color: '#bdbcbe', textTransform: 'uppercase', marginTop: 0}}>Sample Paragraph</h3>
                <div className="editable" style={{color: '#bdbcbe'}}>
                  Click on this text to edit it. You can add content easily by clicking on the "Add Content" bar at
                  the bottom of the page. Drag this and other boxes around to re-order them. When you are finished,
                  you can play with different designs by using the theme picker on the right.
                </div>
              </div>
            </section>

            <section data-template="title">
              <div className="edit" style={{display: 'none'}}>
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" data-selector=".preview > h2"/>
                  </div>
                  <footer className="form-group">
                    <button type="button" className="btn btn-link btn-sm" data-action="cancel">Cancel</button>
                    <button type="submit" className="btn btn-default btn-sm pull-right">Done</button>
                  </footer>
                </form>
              </div>
              <div className="preview dashed">
                <button type="button" className="close" data-action="dismiss">&times;</button>
                <h2 style={{color: '#bdbcbe', textAlign: 'center', textTransform: 'uppercase', margin: 0}}>Sample
                  Title</h2>
              </div>
            </section>

            <section data-template="text">
              <div className="edit" style={{display: 'none'}}>
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" data-selector=".preview > h3"/>
                  </div>
                  <div className="form-group">
                    <label>Text</label>
                        <textarea className="form-control" rows="4" data-selector=".preview > .editable"
                                  data-richtext="true"></textarea>
                  </div>
                  <footer className="form-group">
                    <button type="button" className="btn btn-link btn-sm" data-action="cancel">Cancel</button>
                    <button type="submit" className="btn btn-default btn-sm pull-right">Done</button>
                  </footer>
                </form>
              </div>
              <div className="preview dashed">
                <button type="button" className="close" data-action="dismiss">&times;</button>
                <h3 style={{color: '#bdbcbe', textTransform: 'uppercase', marginTop: 0}}>Another Sample Paragraph</h3>
                <div className="editable" style={{color: '#bdbcbe'}}>
                  Click on this text to edit it. You can add content easily by clicking on the "Add Content" bar at
                  the bottom of the page. Drag this and other boxes around to re-order them. When you are finished,
                  you can play with different designs by using the theme picker on the right.
                </div>
              </div>
            </section>

            <section data-template="about">
              <div className="edit" style={{display: 'none'}}>
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" data-selector=".preview h3"/>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" rows="3" data-selector=".preview .editable"></textarea>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Address</label>
                        <div className="input-group input-group-sm">
														<span className="input-group-addon">
															<i className="icon-fixed-width icon-map-marker"></i>
														</span>
                          <input type="text" className="form-control input-sm"
                                 data-selector=".preview .contacts .address > small"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <div className="input-group input-group-sm">
														<span className="input-group-addon">
															<i className="icon-fixed-width icon-phone"></i>
														</span>
                          <input type="text" className="form-control input-sm"
                                 data-selector=".preview .contacts .phone > small"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Website</label>
                        <div className="input-group input-group-sm">
														<span className="input-group-addon">
															<i className="icon-fixed-width icon-globe"></i>
														</span>
                          <input type="text" className="form-control input-sm"
                                 data-selector=".preview .contacts .website > small"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <div className="input-group input-group-sm">
														<span className="input-group-addon">
															<i className="icon-fixed-width icon-envelope"></i>
														</span>
                          <input type="text" className="form-control input-sm"
                                 data-selector=".preview .contacts .email > small"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Facebook</label>
                        <div className="input-group input-group-sm">
														<span className="input-group-addon">
															<i className="icon-fixed-width icon-facebook"></i>
														</span>
                          <input type="text" className="form-control input-sm"
                                 data-selector=".preview .contacts .facebook > small"/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Twitter</label>
                        <div className="input-group input-group-sm">
														<span className="input-group-addon">
															<i className="icon-fixed-width icon-twitter"></i>
														</span>
                          <input type="text" className="form-control input-sm"
                                 data-selector=".preview .contacts .twitter > small"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="form-group">
                    <button type="button" className="btn btn-link btn-sm" data-action="cancel">Cancel</button>
                    <button type="submit" className="btn btn-default btn-sm pull-right">Done</button>
                  </footer>
                </form>
              </div>
              <div className="preview dashed">
                <button type="button" className="close" data-action="dismiss">&times;</button>
                <div className="row">
                  <div className="col-md-4">
                    <img src="//placehold.it/240x180" className="img-responsive img-thumbnail"/>
                  </div>
                  <div className="col-md-8">
                    <h3 style={{color: '#bdbcbe', textTransform: 'uppercase', marginTop: 0}}>About Us</h3>
                    <div className="editable" style={{color: '#bdbcbe'}}>
                      I am the one who knocks. Go science!
                    </div>
                    <div className="contacts">
                      <div className="address">
                        <i className="icon-fixed-width icon-map-marker"></i>
                        <small className="text-muted">123 Main St.</small>
                      </div>
                      <div className="email">
                        <i className="icon-fixed-width icon-envelope"></i>
                        <small className="text-muted">contact@yourwebsite.com</small>
                      </div>
                      <div className="phone">
                        <i className="icon-fixed-width icon-phone"></i>
                        <small className="text-muted">(206) 555-1234</small>
                      </div>
                      <div className="facebook">
                        <i className="icon-fixed-width icon-facebook"></i>
                        <small className="text-muted">facebook.com/example</small>
                      </div>
                      <div className="website">
                        <i className="icon-fixed-width icon-globe"></i>
                        <small className="text-muted">yourwebsite.com</small>
                      </div>
                      <div className="twitter">
                        <i className="icon-fixed-width icon-twitter"></i>
                        <small className="text-muted">@twitter_handle</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <footer>
            <div className="row" style={{marginBottom: '10px'}}>
              <div className="col-md-2">
                <div className="widget" data-template="text">
                  <span className="fa-stack fa-2x" style={{color: '#639ac2'}}>
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className="fa fa-file-text fa-stack-1x fa-inverse"></i>
                  </span>
                  <br/>
                  <small>Text</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="picture">
										<span className="fa-stack fa-2x" style={{color: '#63a064'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-picture-o fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Picture</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="event">
										<span className="fa-stack fa-2x" style={{color: '#dd9329'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-calendar fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Event</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="audio">
										<span className=" fa-stack fa-2x" style={{color: '#cb4c58'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-play-circle fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Audio</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="link">
										<span className=" fa-stack fa-2x" style={{color: '#878787'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-link fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Embed Link</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="form">
										<span className=" fa-stack fa-2x" style={{color: '#c94990'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-list-alt fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Form</small>
                </div>
              </div>
            </div>

            <div className=" row">
              <div className=" col-md-2">
                <div className=" widget" data-template="title">
										<span className=" fa-stack fa-2x" style={{color: '#639ac2'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-font fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Title</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget" data-template="gallery">
										<span className=" fa-stack fa-2x" style={{color: '#63a064'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-th fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Gallery</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget" data-template="about">
										<span className=" fa-stack fa-2x" style={{color: '#dd9329'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-user fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>About Us</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="video">
										<span className=" fa-stack fa-2x" style={{color: '#cb4c58'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-youtube-play fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Video</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="button">
										<span className=" fa-stack fa-2x" style={{color: '#878787'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-check fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Button</small>
                </div>
              </div>
              <div className=" col-md-2">
                <div className=" widget disabled" data-template="payment">
										<span className=" fa-stack fa-2x" style={{color: '#c94990'}}>
											<i className="fa fa-circle fa-stack-2x"></i>
											<i className="fa fa-credit-card fa-stack-1x fa-inverse"></i>
										</span>
                  <br/>
                  <small>Payment</small>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

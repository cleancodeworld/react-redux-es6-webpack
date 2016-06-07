/* global $ */
import React, { Component, PropTypes} from 'react';
import TinyMCE from 'react-tinymce';
import scriptLoader from 'react-async-script-loader';
import {clientSideOnly} from 'hoc';

@clientSideOnly
@scriptLoader(
  '//cdn.tinymce.com/4/tinymce.min.js',
  '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'
)
export default class PageBuilder extends Component {
  static propTypes = {
    isScriptLoaded: PropTypes.bool,
  }


  handleEditorChange(event) {
    console.log(event.target.getContent());
  }

  render() {
    const { isScriptLoaded } = this.props;
    if (!isScriptLoaded) return <div>Loading</div>;
    return (
      <div>
        <iframe id="form_target" name="form_target" style={{display: 'none'}}></iframe>
        <form id="my_form" action="/upload/" target="form_target" method="post" encType="multipart/form-data"
              style={{width: '0', height: '0', overflow: 'hidden'}}>
          <input name="image" type="file" onChange="$('#my_form').submit();this.value='';"/>
        </form>
        <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'autolink link image lists print preview media',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
            images_upload_url: 'postAcceptor.php',
            images_upload_base_path: '/some/basepath',
            images_upload_credentials: true,
            file_browser_callback: (fieldName, url, type) =>{
              if (type === 'image') $('#my_form input').click();
            }
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

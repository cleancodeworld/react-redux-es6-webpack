/* global $ */
import React, { Component, PropTypes} from 'react';
import TinyMCE from 'react-tinymce';
import scriptLoader from 'react-async-script-loader';
import Dropzone from 'react-dropzone';
import {clientSideOnly} from 'hoc';
import superagent from 'superagent';

@clientSideOnly
@scriptLoader(
  '//cdn.tinymce.com/4/tinymce.min.js',
  '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'
)
export default class PageBuilder extends Component {
  static propTypes = {
    isScriptLoaded: PropTypes.bool,
  }

  onDrop = (files)=> {
    const req = superagent.post('/upload');
    files.forEach((file)=> {
      req.attach('thumbnail', file);
    });
    req.end((err, { body } = {})=> {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        $('div[aria-label="Insert/edit image"] input.mce-textbox').first().val(body.url);
      }
    });
  }

  handleEditorChange(event) {
    console.log(event.target.getContent());
  }

  render() {
    const { isScriptLoaded } = this.props;
    if (!isScriptLoaded) return <div>Loading</div>;
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop} style={{display: 'none'}}/>
        <TinyMCE
          content="<p>This is the initial content of the editor</p>"
          config={{
            plugins: 'autolink link image lists print preview media',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright',
            images_upload_url: 'postAcceptor.php',
            images_upload_base_path: '/some/basepath',
            images_upload_credentials: true,
            height:480,
            file_browser_callback: (fieldName, url, type) =>{
              if (type === 'image') this.refs.dropzone.open();
            }
          }}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

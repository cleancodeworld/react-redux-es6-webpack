import React, { Component, PropTypes} from 'react';
import TinyMCE from 'react-tinymce';
import scriptLoader from 'react-async-script-loader';
import {clientSideOnly} from 'hoc';

@clientSideOnly
@scriptLoader(
  '//tinymce.cachefly.net/4.2/tinymce.min.js'
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
      <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'autolink link image lists print preview media',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

import React from 'react';

const QuestionView = ()=> {
  return (<div className="panel panel-flat">
      <div className="panel-heading">
        <h5 className="panel-title">Canvas clipping region and the canvas stack</h5>
      </div>

      <div className="panel-body">
        <div>
          Question
        </div>

        <div className="content-group">
          <button type="button" className="btn btn-default btn-sm legitRipple" data-popup="popover" title=""
                  data-placement="bottom" data-trigger="hover"
                  data-content="JavaScript (not to be confused with Java) is a dynamic, weakly-typed language used for client-side as well as server-side scripting. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script). Unless another tag for a framework/library is also included, a pure JavaScript answer is expected."
                  data-original-title="287.9k followers, 1.1m questions">javascript
          </button>
          <button type="button" className="btn btn-default btn-sm legitRipple" data-popup="popover" title=""
                  data-placement="bottom" data-trigger="hover"
                  data-content="HTML5 (Hyper Text Markup Language, version 5) is an umbrella term for recent web technologies. It is also the latest iteration of HTML. It became a W3C Recommendation in October 2014, introducing new elements and APIs."
                  data-original-title="64k followers, 90.1k questions">html5
          </button>
          <button type="button" className="btn btn-default btn-sm legitRipple" data-popup="popover" title=""
                  data-placement="bottom" data-trigger="hover"
                  data-content="Canvas is a drawing element introduced to web development with HTML5. For Android or WPF, use android-canvas or WPF-controls."
                  data-original-title="1.3k followers, 21.4k questions">canvas
          </button>
          <button type="button" className="btn btn-default btn-sm legitRipple" data-popup="popover" title=""
                  data-placement="bottom" data-trigger="hover"
                  data-content="Canvas is an HTML element that allows for dynamic, scriptable rendering of 2D shapes, and bitmap images."
                  data-original-title="1.5k followers, 6.1k questions">html5-canvas
          </button>
        </div>

        <div className="row">
          <div className="col-md-4">
            <a title="short permalink to this question" href="#">share</a>
            <span className="lsep">|</span>
            <a title="" href="#">improve this question</a>
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <blockquote className="no-margin no-padding-top">
              <header className="mb-5">asked 14 hours ago</header>
              <img src="http://placehold.it/40x40" alt="" className="mr-10"/>
              <a href="#">momotaro</a>
              <div className="content-group no-margin">28 &nbsp;<span className="status-mark bg-danger"></span> 5</div>
            </blockquote>
          </div>
        </div>

        <hr/>

        <ol>
          <li>
            Comment
            <div className="media-annotation display-block mt-5 text-right">
              <span className="ml-20">14 hours ago <a href="#"><i
                className="icon-pin-alt position-right text-muted"></i></a></span>
              <span className="ml-20">Blindman67 <a href="#"><i className="icon-user position-right text-muted"></i></a></span>
            </div>
          </li>
        </ol>
        <hr/>
        <h6 className="text-semibold no-margin"><a href="#"><i className="icon-pencil7 position-left"></i> Add a comment</a>
        </h6>
      </div>
    </div>
  );
};

export default QuestionView;

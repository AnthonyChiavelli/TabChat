DataSources = new Meteor.Collection ("data_sources")

/*
 Text blob widget
 */
function TextBlob () {
  var title;
  var body;
}

TextBlob.prototype.name = function () {
  return "TextBlob";
};

TextBlob.prototype.render = function () {
  return "<textarea></textarea>";
};

TextBlob.prototype.onClick = function () {
  alert ("clicked a text blob");
};

/*
 Image Widget
 */
function ImageFrame (url) {
  var title;
  this.url = url;
}

ImageFrame.prototype.render = function () {
  var html =
    "<img src='"
    + this.url
    + "'/>";
  return html;
}

/*
 Youtube widget
 */
function YoutubeView (url) {
  var title;
  this.code = url.split("=")[1]
}

YoutubeView.prototype.render = function () {
  var html =
    "<iframe width='420' height='315' src='http://www.youtube.com/embed/"
    + this.code
    + "'frameborder='0'</iframe>";
  console.log(html)
  return html;
}

/*
  Whiteboard Widget
 */

function Whiteboard () {
  var title;
}

Whiteboard.prototype.render = function () {
  return "<canvas id='temp_id' width='300' height='225'></canvas>";
}

Whiteboard.prototype.postRender = function () {
  console.log("post render");
  var canvas = $('temp_id');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    console.log("rendering...")
    ctx.beginPath();
    ctx.arc(75,75,50,0,Math.PI*2,true); // Outer circle
    ctx.moveTo(110,75);
    ctx.arc(75,75,35,0,Math.PI,false);   // Mouth (clockwise)
    ctx.moveTo(65,65);
    ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye
    ctx.moveTo(95,65);
    ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye
    ctx.stroke();
  }
}

Meteor.startup (function () {
  $ (document).ready (function () {

    //Initialize Jquery UI stuff once DOM is loaded
    $ ("#tabs").tabs ();

    $ ("#widget_layout").sortable ();
    $ ("#widget_layout").disableSelection ();

  });


});

Template.widget.widgets = function () {
  var datasources = DataSources.find ({}, {});

  var widgets = datasources.map (function (datasource) {

    if (datasource.type === "text") {
      var new_widget = new TextBlob();
      new_widget.title = datasource.data.title;
      new_widget.src = new_widget.render();

    }
    else if (datasource.type === "image") {
      var new_widget = new ImageFrame();
      new_widget.url = datasource.data.url;
      new_widget.src = new_widget.render();
    }
    else if (datasource.type === "video") {
      var new_widget = new YoutubeView(datasource.data.url);
      new_widget.src = new_widget.render();
    }
    else if (datasource.type === "whiteboard") {
      console.log("rendering whiteboard")
      var new_widget = new Whiteboard();
      new_widget.src = new_widget.render();
//      new_widget.postRender()
    }


    return new_widget;
  });

  return widgets;
}

Template.editor.events ({
  "click #btn_add_textblob": function () {
    DataSources.insert ({
        type: "text",
        data: {
          title: $ ("#input_widget_title").val ()
        }
      }
    )
  }
});

Template.editor.events ({
  "click #btn_add_image": function () {
    DataSources.insert ({
        type: "image",
        data: {
          url: $ ("#input_image_url").val ()
        }
      }
    )
  }
});

Template.editor.events ({
  "click #btn_add_video": function () {
    DataSources.insert ({
        type: "video",
        data: {
          url: $ ("#input_video_url").val ()
        }
      }
    )
  }
});

Template.editor.events ({
  "click #btn_add_whiteboard": function () {
    console.log("adding whiteboard")
    DataSources.insert ({
        type: "whiteboard",
        data: {
          title: $ ("#input_whiteboard_title").val ()
        }
      }
    )
  }
});

Template.editor.events ({
  "click #btn_widget_delete": function (t) {
    Meteor.call ("remove_widget", event.target.name)
  }
});

DataSources = new Meteor.Collection("data_sources")


//    var sprintf = function()
//    {
//        var args = [].slice.call(arguments);
//        if(this.toString() != '[object Object]')
//        {
//            args.unshift(this.toString());
//        }
//
//        var pattern = new RegExp('{([1-' + args.length + '])}','g');
//        return String(args[0]).replace(pattern, function(match, index) { return args[index]; });
//    }



function TextBlob() {
    var title


}

a = TextBlob();
b = TextBlob();

TextBlob.prototype.name = function() {
    return "TextBlob";
}

TextBlob.prototype.render = function() {
    return "<textarea></textarea>";
}

TextBlob.prototype.onClick = function() {
    alert("clicked");
}


function ImageFrame(url) {
    var title;
    var url;
    this.url = url;
}

ImageFrame.prototype.render = function() {

    var s = "<img src='https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-frc3/t1.0-9/563144_10152531527490136_2106807081_n.jpg'/>";
    alert(s);
//    return s;
//    s = "<img/>"

    return s;
}


  Meteor.startup(function () {
    $(document).ready(function() {

      //Initialize Jquery UI stuff once DOM is loaded
      $("#tabs").tabs();

      $("#widget_layout").sortable();
      $("#widget_layout").disableSelection();

    });


  });

  Template.widget.widgets = function() {
      var datasources = DataSources.find({}, {});
      alert("Sdafds")

      var widgets = datasources.map(function(datasource) {
          if (datasource.title === "textb") {
              var newTextBlob = new TextBlob();
              newTextBlob.title = datasource.title;
              newTextBlob.src = newTextBlob.render();
              alert("hereo");
              return newTextBlob;
          }
          else {
              var newImageFrame = new ImageFrame(datasource.title);
              alert("here");
              newImageFrame.title = datasource.title
              newImageFrame.src = newImageFrame.render();
              return newImageFrame;
          }

      });

      return widgets;


  }

  Template.editor.events({
    "click #btn_add_widget": function() {
      DataSources.insert({title : $("#input_widget_title").val()})
    }
  });


  Template.editor.events({
    "click #btn_widget_delete": function(t) {
      Meteor.call("remove_widget", event.target.name)
    }
  });
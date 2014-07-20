Widgets = new Meteor.Collection("widgets")


  Meteor.startup(function () {
    $(document).ready(function() {

      //Initialize Jquery UI stuff once DOM is loaded
      $("#tabs").tabs();

      $("#widget_layout").sortable();
      $("#widget_layout").disableSelection();

    });


  });

  Template.text_blob.text_blobs = function() {
      return Widgets.find({}, {})
  }

  Template.editor.events({
    "click #btn_add_text_blob": function() {
      Widgets.insert({title : $("#textblob_name_box").val()})
    }
  });


  Template.editor.events({
    "click #btn_textblob_remove": function(t) {
      Meteor.call("remove_blob", event.target.name)
    }
  });
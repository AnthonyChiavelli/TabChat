Widgets = new Meteor.Collection("widgets")


Meteor.startup(function () {
  // code to run on server at startup
    Meteor.methods({
      'remove_blob' : function(t) {
          Widgets.remove({"title" : t})
      }
    })
});
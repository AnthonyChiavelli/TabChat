DataSources = new Meteor.Collection("data_sources")


Meteor.startup(function () {
  // code to run on server at startup
    Meteor.methods({
      'remove_widget' : function(t) {
          DataSources.remove({"title" : t})
      }
    })
});
Items = new Meteor.Collection("items");

if (Meteor.isClient) {  
  Template.itemsTemplate.created = function () {
    this.searchQuery = new ReactiveVar("");
  };

  Template.itemsTemplate.helpers({
    searchQuery: function () {
      return Template.instance().searchQuery.get();
    },
	items: function() {
		var regex =  new RegExp(Template.instance().searchQuery.get(), "i");
		return Items.find( { $or: [{ name: regex }, {description: regex}] } );
	}
  });

  Template.itemsTemplate.events({
    'keyup input': function (event, template) {
      template.searchQuery.set(event.currentTarget.value);
    }
  });

if ( Items.find().count() === 0 ) {
	Items.insert({ name: "Pena", description: "Erkki" });
	Items.insert({ name: "Mauri", description: "Mikkonen" });
}
}

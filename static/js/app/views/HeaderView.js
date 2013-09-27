define([ 'marionette', 'hbs!templates/header.html'],
function (Marionette, template) {

    return Marionette.ItemView.extend({
        template: template
    });

});

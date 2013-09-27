define( [ 'marionette', 'models/Model', 'hbs!templates/welcome.html'],
function( App, Marionette, Model, template) {
    //ItemView provides some default rendering logic
    return Marionette.ItemView.extend({

        // hbs plugin precompiles our template
        template: template,

        model: new Model({
            // foo: App.mobile
        }),

        // View Event Handlers
        events: {

        }

    });
});

App = Ember.Application.create();

App.Router.map(function() {
    this.resource('index', { 'path': '/' });
    this.resource('list', { path: '/list/:themeId' }, function(){
        this.resource('resource', { path: '/resource/:resource'}, function(){
            this.route('learnings')
        });
    });
});

Ember.Route.reopen({
    getData: function(endPoint, params, parseMethod, onFail){
        return $.get("http://127.0.0.1/PrivateBacklogService/%@".fmt(endPoint), params)
            .done(function (data) {
                if (parseMethod !== undefined)
                    return parseMethod(data);
                return data;
            })
            .fail(function () {
                if (onFail !== undefined)
                    onFail();
                else
                    alert("error");
            }
        )
    }
})

Ember.Controller.reopen({
    postData: function(endPoint, params){
        return $.post("http://127.0.0.1/PrivateBacklogService/%@".fmt(endPoint), params)
            .done(function (data) {
                return data;
            })
            .fail(function () {
                alert("error");
             });
    }
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
      return this.getData("Themes", {});
  }
});

App.ListRoute = Ember.Route.extend({
    model: function (params) {
        return this.getData("List", params);
    }
});

App.ResourceController = Ember.ObjectController.extend({});

App.ResourceLearningsController = Ember.ArrayController.extend({
    needs: 'resource',
    inserting: false,
    editing: false,
    insert: function(){
        this.set('inserting', true)
    },
    edit: function(){
        this.set('editing', true)
    },
    doneInserting: function() {
        this.save("AddLearning");
    },
    doneEditing: function() {
        this.save("SaveLearning");
    },
    save: function(endPoint){
        this.set('inserting', false);
        this.set('editing', false);
        this.postData(AddLearning, {
                resourceId: this.get('controllers.resource').get("model").Id,
                text: this.get("model").Text,
                tweet: this.get("model").Tweet,
                blog: this.get("model").Blog,
                todo: this.get("model").ToDo
            }
        );
    }
});

Resource = Ember.Object.extend({});

Learning = Ember.Object.extend({
    Tweet: "tweet",
    Blog: "blog",
    ToDo: "todo"});

App.ResourceRoute = Ember.Route.extend({
    model: function (params) {
        return this.getData("Resource", params);
    }
});

App.ResourceLearningsRoute = Ember.Route.extend({
    model : function() {
        return this.modelFor("resource").Learnings;
    }
});

Ember.Handlebars.helper('format-date', function(date) {
    return moment(date).fromNow();
});
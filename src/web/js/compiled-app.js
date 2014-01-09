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
this["Ember"] = this["Ember"] || {};
this["Ember"]["TEMPLATES"] = this["Ember"]["TEMPLATES"] || {};

this["Ember"]["TEMPLATES"]["resource"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashContexts, hashTypes, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"bs-docs-section\">\r\n    <div class=\"page-header\">\r\n\r\n        <h1><a target=\"_blank\" ");
  hashContexts = {'href': depth0};
  hashTypes = {'href': "ID"};
  options = {hash:{
    'href': ("model.Url")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "model.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("</a></h1>\r\n\r\n        <p>");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['format-date'] || depth0['format-date']),stack1 ? stack1.call(depth0, "model.Date", options) : helperMissing.call(depth0, "format-date", "model.Date", options))));
  data.buffer.push("</p>\r\n\r\n        ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "outlet", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("\r\n    </div>\r\n</div>");
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["resource/learnings"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n        <li>");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "Text", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "edit", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push("> edit</button></li>\r\n    ");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    <label for=\"text\">Learning</label>\r\n    ");
  hashContexts = {'value': depth0,'cols': depth0,'name': depth0,'rows': depth0};
  hashTypes = {'value': "ID",'cols': "STRING",'name': "STRING",'rows': "STRING"};
  options = {hash:{
    'value': ("Text"),
    'cols': ("80"),
    'name': ("Text"),
    'rows': ("6")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.textarea || depth0.textarea),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
  data.buffer.push("\r\n    <br>\r\n    <label for=\"tweet\">Tweet</label>\r\n    ");
  hashContexts = {'type': depth0,'name': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'value': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'name': ("Tweet"),
    'value': ("Tweet")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    <label for=\"blog\">Blog</label>\r\n    ");
  hashContexts = {'type': depth0,'name': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'value': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'name': ("Blog"),
    'value': ("Blog")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    <label for=\"todo\">To do</label>\r\n    ");
  hashContexts = {'type': depth0,'name': depth0,'value': depth0};
  hashTypes = {'type': "STRING",'name': "STRING",'value': "STRING"};
  options = {hash:{
    'type': ("checkbox"),
    'name': ("ToDo"),
    'value': ("ToDo")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers.input || depth0.input),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\r\n    <br>\r\n    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "doneInserting", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Done</button>\r\n");
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push("\r\n    <button ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "insert", {hash:{},contexts:[depth0],types:["STRING"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(">Insert</button>\r\n");
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = '', stack1, hashContexts, hashTypes, options;
  data.buffer.push("\r\n    ");
  hashContexts = {'model': depth0};
  hashTypes = {'model': "ID"};
  options = {hash:{
    'model': ("item")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['learn-resource'] || depth0['learn-resource']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "learn-resource", options))));
  data.buffer.push("\r\n");
  return buffer;
  }

  data.buffer.push("<h2>Learnings</h2>\r\n<ol>\r\n    ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n</ol>\r\n\r\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers['if'].call(depth0, "editing", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n\r\n");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "Resources", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  return buffer;
  
});

this["Ember"]["TEMPLATES"]["components/side-bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, hashTypes, hashContexts, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, stack2, hashContexts, hashTypes, options;
  data.buffer.push("\r\n                    <li ");
  hashContexts = {'class': depth0};
  hashTypes = {'class': "STRING"};
  options = {hash:{
    'class': ("item.Active:active")
  },contexts:[],types:[],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  data.buffer.push(escapeExpression(((stack1 = helpers['bind-attr'] || depth0['bind-attr']),stack1 ? stack1.call(depth0, options) : helperMissing.call(depth0, "bind-attr", options))));
  data.buffer.push(">");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "list", "item.Name", options) : helperMissing.call(depth0, "link-to", "list", "item.Name", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        <ul>\r\n                            ");
  hashTypes = {};
  hashContexts = {};
  stack2 = helpers.each.call(depth0, "resource", "in", "item.Items", {hash:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                        </ul>\r\n                    </li>\r\n                ");
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "item.Active", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = '', stack1, stack2, hashTypes, hashContexts, options;
  data.buffer.push("\r\n                                <li class=\"resourceItem\">\r\n                                    ");
  hashTypes = {};
  hashContexts = {};
  options = {hash:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0,depth0,depth0],types:["STRING","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data};
  stack2 = ((stack1 = helpers['link-to'] || depth0['link-to']),stack1 ? stack1.call(depth0, "resource", "item.Name", "resource.Id", options) : helperMissing.call(depth0, "link-to", "resource", "item.Name", "resource.Id", options));
  if(stack2 || stack2 === 0) { data.buffer.push(stack2); }
  data.buffer.push("\r\n                                </li>\r\n                            ");
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = '', hashTypes, hashContexts;
  data.buffer.push(" ");
  hashTypes = {};
  hashContexts = {};
  data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "resource.Name", {hash:{},contexts:[depth0],types:["ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data})));
  data.buffer.push(" ");
  return buffer;
  }

  data.buffer.push("    <div class=\"col-md-3\" role=\"complementary\">\r\n        <div class=\"bs-sidebar\">\r\n            <ul class=\"nav bs-sidenav\">\r\n                ");
  hashTypes = {};
  hashContexts = {};
  stack1 = helpers.each.call(depth0, "item", "in", "model", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],hashContexts:hashContexts,hashTypes:hashTypes,data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\r\n            </ul>\r\n        </div>\r\n    </div>\r\n");
  return buffer;
  
});
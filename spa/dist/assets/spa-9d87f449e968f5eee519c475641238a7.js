"use strict"
define("spa/adapters/application",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.JSONAPIAdapter.extend({namespace:"api",host:"http://homestead.test"})}),define("spa/adapters/task",["exports","spa/adapters/application"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.extend({})}),define("spa/app",["exports","spa/resolver","ember-load-initializers","spa/config/environment"],function(e,t,n,a){Object.defineProperty(e,"__esModule",{value:!0})
var i=Ember.Application.extend({modulePrefix:a.default.modulePrefix,podModulePrefix:a.default.podModulePrefix,Resolver:t.default});(0,n.default)(i,a.default.modulePrefix),e.default=i}),define("spa/components/task-item",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({tagName:"li",isEditing:!1,isFinished:Ember.computed("task.finished",function(){return!!this.get("task.finished")}),classNameBindings:["isFinished:finished:unfinished"],endEditingAlreadyHandled:!1,myIndex:Ember.computed("index",function(){return this.get("index")+1}),didReceiveAttrs:function(){this._super.apply(this,arguments),this.set("isEditing",this.get("task.isNew"))},didRender:function(){this.$(".task-name-editor").focus()},actions:{checkboxClick:function(e){this.get("toggleIsFinished")(this.get("task"),e.target.checked)},startEditing:function(){this.set("isEditing",!0),this.set("endEditingAlreadyHandled",!1)},endEditing:function(e){if(13===e.keyCode||"blur"===e.type){if(this.get("endEditingAlreadyHandled"))return
this.set("endEditingAlreadyHandled",!0),e.target.value.trim()?(this.set("isEditing",!1),this.get("editName")(this.get("task"),e.target.value)):this.get("task.isNew")?this.get("task").deleteRecord():alert("שם לא יכול להיות ריק!")}},deleteTask:function(){this.get("deleteTask")(this.get("task"))}}})}),define("spa/components/task-list",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Component.extend({finishedCount:Ember.computed("model.@each.finished",function(){return this.get("model").filterBy("finished",!0).length}),unfinishedCount:Ember.computed("model.@each.finished",function(){return this.get("model").filterBy("finished",!1).length}),actions:{toggleIsFinished:function(e,t){this.get("toggleIsFinished")(e,t)},editName:function(e,t){this.get("editName")(e,t)},addTask:function(){this.get("addTask")()},deleteTask:function(e){this.get("deleteTask")(e)}}})}),define("spa/controllers/tasks",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Controller.extend({actions:{toggleIsFinished:function(e,t){e.set("finished",t),e.save().then(function(e){})},editName:function(e,t){e.set("name",t),e.save()},addTask:function(){this.get("store").createRecord("task",{name:"",finished:!1})},deleteTask:function(e){e.deleteRecord(),e.save()}}})}),define("spa/helpers/app-version",["exports","spa/config/environment","ember-cli-app-version/utils/regexp"],function(e,t,n){function a(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.default.APP.version,s=a.versionOnly||a.hideSha,l=a.shaOnly||a.hideVersion,o=null
return s&&(a.showExtended&&(o=i.match(n.versionExtendedRegExp)),o||(o=i.match(n.versionRegExp))),l&&(o=i.match(n.shaRegExp)),o?o[0]:i}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=a,e.default=Ember.Helper.helper(a)}),define("spa/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("spa/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("spa/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","spa/config/environment"],function(e,t,n){Object.defineProperty(e,"__esModule",{value:!0})
var a=void 0,i=void 0
n.default.APP&&(a=n.default.APP.name,i=n.default.APP.version),e.default={name:"App Version",initialize:(0,t.default)(a,i)}}),define("spa/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("spa/initializers/data-adapter",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"data-adapter",before:"store",initialize:function(){}}}),define("spa/initializers/ember-data",["exports","ember-data/setup-container","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("spa/initializers/export-application-global",["exports","spa/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var a,i=t.default.exportApplicationGlobal
a="string"==typeof i?i:Ember.String.classify(t.default.modulePrefix),n[a]||(n[a]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[a]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("spa/initializers/injectStore",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"injectStore",before:"store",initialize:function(){}}}),define("spa/initializers/store",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"store",after:"ember-data",initialize:function(){}}}),define("spa/initializers/transforms",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"transforms",before:"store",initialize:function(){}}}),define("spa/instance-initializers/ember-data",["exports","ember-data/initialize-store-service"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"ember-data",initialize:t.default}}),define("spa/models/task",["exports","ember-data"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default.Model.extend({name:t.default.attr(),finished:t.default.attr("boolean")})}),define("spa/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=t.default}),define("spa/router",["exports","spa/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0})
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){this.route("tasks",{path:"/"})}),e.default=n}),define("spa/routes/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({})}),define("spa/routes/tasks",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.Route.extend({model:function(){return this.get("store").findAll("task")}})}),define("spa/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("spa/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"gjW5LLWF",block:'{"symbols":[],"statements":[[1,[18,"outlet"],false]],"hasEval":false}',meta:{moduleName:"spa/templates/application.hbs"}})}),define("spa/templates/components/task-item",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"PApf9Bky",block:'{"symbols":[],"statements":[[6,"label"],[9,"class","cb-label"],[7],[0,"\\n  "],[6,"input"],[9,"type","checkbox"],[9,"name","finished"],[10,"onchange",[25,"action",[[19,0,[]],"checkboxClick"],null],null],[10,"checked",[20,["task","finished"]],null],[9,"class","checkbox-finished"],[7],[8],[0,"\\n  "],[6,"span"],[9,"class","cb-custom"],[7],[8],[0,"\\n"],[8],[0,"\\n"],[6,"span"],[9,"class","task-name-container"],[7],[0,"\\n"],[4,"if",[[20,["isEditing"]]],null,{"statements":[[0,"  "],[6,"input"],[10,"onkeyup",[25,"action",[[19,0,[]],"endEditing"],null],null],[10,"onblur",[25,"action",[[19,0,[]],"endEditing"],null],null],[10,"value",[26,[[20,["task","name"]]]]],[9,"class","task-name-editor"],[7],[8],[0,"\\n"]],"parameters":[]},{"statements":[[6,"b"],[7],[1,[18,"myIndex"],false],[0,"."],[8],[6,"span"],[3,"action",[[19,0,[]],"startEditing"],[["on"],["doubleClick"]]],[7],[1,[20,["task","name"]],false],[8],[0,"\\n"]],"parameters":[]}],[8],[0,"\\n"],[6,"button"],[9,"class","button-delete"],[3,"action",[[19,0,[]],"deleteTask"]],[7],[0,"x"],[8]],"hasEval":false}',meta:{moduleName:"spa/templates/components/task-item.hbs"}})}),define("spa/templates/components/task-list",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"2pQrdaX3",block:'{"symbols":["task","index"],"statements":[[6,"div"],[9,"class","tasks-header"],[7],[0,"\\n"],[6,"span"],[9,"class","main-title"],[7],[0,"משימות"],[8],[0,"\\n"],[6,"button"],[9,"class","button-add"],[3,"action",[[19,0,[]],"addTask"]],[7],[6,"div"],[7],[0,"+"],[8],[8],[0,"\\n"],[8],[0,"\\n"],[6,"ul"],[9,"class","task-list"],[7],[0,"\\n"],[4,"each",[[20,["model"]]],null,{"statements":[[0,"    "],[1,[25,"task-item",null,[["task","index","toggleIsFinished","editName","deleteTask"],[[19,1,[]],[19,2,[]],[25,"action",[[19,0,[]],"toggleIsFinished"],null],[25,"action",[[19,0,[]],"editName"],null],[25,"action",[[19,0,[]],"deleteTask"],null]]]],false],[0,"\\n"]],"parameters":[1,2]},null],[8],[0,"\\n"],[6,"section"],[9,"class","totals"],[7],[0,"\\n  "],[6,"span"],[9,"class","to-finish"],[7],[0,"לסיום:\\n    "],[6,"b"],[7],[1,[18,"unfinishedCount"],false],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"span"],[9,"class","finished"],[7],[0,"הושלמו:\\n    "],[6,"b"],[7],[1,[18,"finishedCount"],false],[8],[0,"\\n  "],[8],[0,"\\n  "],[6,"span"],[9,"class","total"],[7],[0,"סה\\"כ:\\n    "],[6,"b"],[7],[1,[20,["model","length"]],false],[8],[0,"\\n  "],[8],[0,"\\n"],[8]],"hasEval":false}',meta:{moduleName:"spa/templates/components/task-list.hbs"}})}),define("spa/templates/tasks",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=Ember.HTMLBars.template({id:"Fse4HCCv",block:'{"symbols":[],"statements":[[6,"section"],[9,"class","tasks-container"],[7],[0,"\\n"],[1,[25,"task-list",null,[["model","toggleIsFinished","editName","addTask","deleteTask"],[[20,["model"]],[25,"action",[[19,0,[]],"toggleIsFinished"],null],[25,"action",[[19,0,[]],"editName"],null],[25,"action",[[19,0,[]],"addTask"],null],[25,"action",[[19,0,[]],"deleteTask"],null]]]],false],[0,"\\n"],[8]],"hasEval":false}',meta:{moduleName:"spa/templates/tasks.hbs"}})}),define("spa/config/environment",[],function(){try{var e="spa/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),n={default:JSON.parse(unescape(t))}
return Object.defineProperty(n,"__esModule",{value:!0}),n}catch(a){throw new Error('Could not read config from meta tag with name "'+e+'".')}}),runningTests||require("spa/app").default.create({name:"spa",version:"0.0.0+fceab1e0"})
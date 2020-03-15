(this.webpackJsonpboda_aa_app=this.webpackJsonpboda_aa_app||[]).push([[0],{34:function(e,t,n){e.exports=n(61)},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(30),i=n.n(o),u=n(10),c=n(8),s=n(9),l=n(14),m=n(13),d=n(15),g=n(7);function p(){return r.a.createElement("div",null,r.a.createElement("h1",null,"CreateUser"))}function h(){return r.a.createElement("div",null,r.a.createElement("h1",null,"AdminHome"))}function f(){return r.a.createElement("div",null,r.a.createElement("h1",null,"UserHome"))}var b=n(19),v=n(31),E=n.n(v),A=new(function(){function e(){Object(c.a)(this,e),this.auth=E.a.create({baseURL:"https://boda-aa.herokuapp.com/",withCredentials:!0})}return Object(s.a)(e,[{key:"createUser",value:function(e){var t=e.username,n=e.password,a=e.userType;return this.auth.post("/auth/create-user",{username:t,password:n,userType:a}).then((function(e){return e.data}))}},{key:"login",value:function(e){var t=e.username,n=e.password;return this.auth.post("/auth/login",{username:t,password:n}).then((function(e){return e.data}))}},{key:"logout",value:function(){return this.auth.post("/auth/logout",{}).then((function(e){return e.data}))}},{key:"me",value:function(){return this.auth.get("/auth/me").then((function(e){return e.data}))}}]),e}()),j=r.a.createContext(),O=j.Consumer,L=j.Provider,y=function(e){return function(t){function n(){return Object(c.a)(this,n),Object(l.a)(this,Object(m.a)(n).apply(this,arguments))}return Object(d.a)(n,t),Object(s.a)(n,[{key:"render",value:function(){var t=this;return r.a.createElement(O,null,(function(n){return r.a.createElement(e,Object.assign({login:n.login,signup:n.signup,user:n.user,logout:n.logout,isLoggedin:n.isLoggedin,isAdminAccount:n.isAdminAccount},t.props))}))}}]),n}(a.Component)},w=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={isLoggedin:!1,isAdminAccount:!1,user:null,isLoading:!0},n.login=function(e){var t=e.username,a=e.password;A.login({username:t,password:a}).then((function(e){"admin"===e.userType?n.setState({isLoggedin:!0,user:e,isAdminAccount:!0}):n.setState({isLoggedin:!0,user:e})})).catch((function(){}))},n.logout=function(){A.logout().then((function(){n.setState({isLoggedin:!1,user:null,isAdminAccount:!1})})).catch((function(){}))},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;A.me().then((function(t){"admin"===t.userType?e.setState({isLoggedin:!0,user:t,isLoading:!1,isAdminAccount:!0}):e.setState({isLoggedin:!0,user:t,isLoading:!1})})).catch((function(){e.setState({isLoggedin:!1,user:null,isLoading:!1})}))}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.isLoggedin,a=e.user,o=e.isAdminAccount;return t?r.a.createElement("div",null,"Loading"):r.a.createElement(L,{value:{isLoggedin:n,isAdminAccount:o,user:a,login:this.login,logout:this.logout}},this.props.children)}}]),t}(a.Component),k=y((function(e){var t=Object(a.useState)(""),n=Object(b.a)(t,2),o=n[0],i=n[1],u=Object(a.useState)(""),c=Object(b.a)(u,2),s=c[0],l=c[1];return r.a.createElement("article",{className:"hero-search"},r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var n={username:o,password:s};e.login(n)},autoComplete:"off"},r.a.createElement("input",{name:"username",id:"username",type:"text",value:o,placeholder:"username",onChange:function(e){return i(e.target.value)}}),r.a.createElement("input",{name:"password",id:"password",type:"password",value:s,placeholder:"password",onChange:function(e){return l(e.target.value)}}),r.a.createElement("button",{type:"submit"},"Submit")))})),C=n(11);var S=y((function(e){var t=e.component,n=e.isLoggedin,a=e.isAdminAccount,o=Object(C.a)(e,["component","isLoggedin","isAdminAccount"]);return r.a.createElement(g.b,Object.assign({},o,{render:function(e){return n?n&&a?r.a.createElement(t,e):r.a.createElement(g.a,{to:"/home"}):r.a.createElement(g.a,{to:"/login"})}}))}));var x=y((function(e){var t=e.component,n=e.isLoggedin,a=e.isAdminAccount,o=Object(C.a)(e,["component","isLoggedin","isAdminAccount"]);return r.a.createElement(g.b,Object.assign({},o,{render:function(e){return n?n&&!a?r.a.createElement(t,e):r.a.createElement(g.a,{to:"/admin"}):r.a.createElement(g.a,{to:"/login"})}}))}));var T=y((function(e){var t=e.component,n=e.isLoggedin,a=e.isAdminAccount,o=Object(C.a)(e,["component","isLoggedin","isAdminAccount"]);return r.a.createElement(g.b,Object.assign({},o,{render:function(e){return n?n&&a?r.a.createElement(g.a,{to:"/admin"}):r.a.createElement(g.a,{to:"/home"}):r.a.createElement(t,e)}}))})),U=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(w,null,r.a.createElement(g.d,null,r.a.createElement(T,{path:"/login",component:k,exact:!0}),r.a.createElement(S,{path:"/admin",component:h,exact:!0}),r.a.createElement(S,{path:"/create-user",component:p,exact:!0}),r.a.createElement(x,{path:"/home",component:f,exact:!0})))}}]),t}(a.Component);i.a.render(r.a.createElement(u.a,null,r.a.createElement(U,null)),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.e2cadd35.chunk.js.map
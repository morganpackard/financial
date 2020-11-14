(this.webpackJsonpfinancial_estimations=this.webpackJsonpfinancial_estimations||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n(0),o=n.n(r),i=n(8),c=n.n(i),l=(n(39),n(16)),s=n(11),u=n(23),h=n(26),f=n(27),b=(n(40),function(e){var t=e.wealth,n=t.reduce((function(e,t){return e>t?e:t}),0);return Object(a.jsxs)(a.Fragment,{children:[t.map((function(e,t){return Object(a.jsx)("div",{style:{display:"inline-block",width:"".concat(1,"px"),height:"".concat(100*e/n,"px"),backgroundColor:"#cccccc",borderLeft:"solid 1px #ffffff"}},t)})),Object(a.jsxs)("div",{children:["Max:"," ",new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n)]})]})}),v=n(79),j=n(74),m=function(){function e(t){var n=t.initialValue,a=t.growthPerYear;Object(h.a)(this,e),this.value=n,this.growthPerYear=a}return Object(f.a)(e,[{key:"tick",value:function(){this.value=this.value+this.value*this.growthPerYear/12}},{key:"add",value:function(e){this.value+=e}},{key:"subtract",value:function(e){this.value-=e}}]),e}(),d=function(){function e(t){var n=t.monthlyPayment;Object(h.a)(this,e),this.monthsElapsed=0,this.monthlyPayment=n}return Object(f.a)(e,[{key:"tick",value:function(){this.monthsElapsed++<360?this.value=this.monthlyPayment:this.value=0}}]),e}(),y={Description:{val:"Enter description here",type:"freeText"},"Inl Stock Value":{val:5e5},"Home Purchase Price":{val:1e6},"House Appreciation":{val:.03},Inflation:{val:.03},"Stock Market Return":{val:.06},"Monthly Rent Collected":{val:2e3},"Down Payment":{val:2e5},"Household Expenses":{val:4500},"Yearly Health Ins":{val:18e3},"Income Tax on Rent":{val:.2},"Property Tax Rate":{val:.015},"Tax Rate on Stock Sale":{val:.2},"Mortgage Payment":{val:4e3},"Annual Maintenance % of Value":{val:.005},"Years of Ownership":{val:30}};var p=function(){var e=function(){try{return JSON.parse(decodeURI(window.location.hash).substr(1))}catch(e){return{}}}(),t=Object(r.useState)(Object(s.a)(Object(s.a)({},Object.entries(y).reduce((function(e,t){var n=Object(u.a)(t,2),a=n[0],r=n[1];return Object(s.a)(Object(s.a)({},e),{},Object(l.a)({},a,r.val))}),{})),e)),n=Object(u.a)(t,2),o=n[0],i=n[1];Object(r.useEffect)((function(){var e=encodeURI(JSON.stringify(o));window.location.hash=e}));var c=function(e){if(e in o)return parseFloat(o[e]);throw new Error("no var named ".concat(e," defined"))},h={stock:new m({initialValue:c("Inl Stock Value")-c("Down Payment"),growthPerYear:c("Stock Market Return")}),monthlyCostOfLiving:new m({initialValue:c("Household Expenses")+c("Yearly Health Ins")/12,growthPerYear:c("Inflation")}),mortgage:new d({monthlyPayment:c("Mortgage Payment")}),rentCollected:new m({initialValue:c("Monthly Rent Collected"),growthPerYear:.02}),homeValue:new m({initialValue:c("Home Purchase Price"),growthPerYear:c("House Appreciation")}),propertyTaxPerMonth:new m({initialValue:c("Home Purchase Price")*c("Property Tax Rate")/12,growthPerYear:c("Inflation")}),maintenancePerMonth:new m({initialValue:c("Home Purchase Price")*c("Annual Maintenance % of Value")/12,growthPerYear:c("Inflation")})},f=c("Home Purchase Price")-c("Down Payment"),p=new Array(660).fill(0).map((function(e,t){var n=.03*f/12,a=c("Mortgage Payment")-n;f-=a;return Math.max(0,function(){Object.values(h).forEach((function(e){return e.tick()}));var e=12*c("Years of Ownership"),n=(t<=e?h.rentCollected.value:0)+(t===e?h.homeValue.value-f:0),a=n-(h.monthlyCostOfLiving.value+(t<=e?h.mortgage.value:0)+(t<=e?n*c("Income Tax on Rent"):0)+h.maintenancePerMonth.value+h.propertyTaxPerMonth.value);return h.stock.add(a+(a<0?a*c("Tax Rate on Stock Sale"):0)),h.stock.value}())}));return Object(a.jsxs)("div",{className:"App",style:{padding:"20px"},children:[Object(a.jsx)(j.a,{container:!0,spacing:2,children:Object.entries(y).map((function(e){var t=Object(u.a)(e,2),n=t[0],r=t[1];return Object(a.jsx)(j.a,{item:!0,xs:"freeText"===r.type?12:2,children:Object(a.jsx)(v.a,{id:"standard-basic",label:n,fullWidth:"freeText"===r.type,value:o[n],onChange:function(e){return i(Object(s.a)(Object(s.a)({},o),{},Object(l.a)({},n,e.target.value)))}})},n)}))}),Object(a.jsxs)("div",{children:[Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),"total cash after home sale:",new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(p[12*c("Years of Ownership")]),Object(a.jsx)("br",{}),Object(a.jsx)("br",{})]}),Object(a.jsx)(b,{wealth:p}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),"Disclaimers: There are probably bugs in this thing! For now, just pay attention UP TO the point of selling the house. I think I am m still subtracting property tax after the sale of the house."]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,81)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),o(e),i(e)}))};c.a.render(Object(a.jsx)(o.a.StrictMode,{children:Object(a.jsx)(p,{})}),document.getElementById("root")),O()}},[[44,1,2]]]);
//# sourceMappingURL=main.d0233c75.chunk.js.map
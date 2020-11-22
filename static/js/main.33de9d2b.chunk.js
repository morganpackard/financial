(this.webpackJsonpfinancial_estimations=this.webpackJsonpfinancial_estimations||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(0),i=n.n(r),o=n(8),c=n.n(o),l=(n(39),n(40),n(16)),u=function(e){var t=e.wealth,n=e.maxVal,i=void 0===n?4e6:n,o=e.title,c=Object(r.useState)(""),u=Object(l.a)(c,2),s=u[0],h=u[1];return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("h2",{children:o}),t.map((function(e,t){return Object(a.jsx)("div",{onMouseOver:function(){return h("Year: ".concat(Math.floor(t/12)," ").concat(new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(e)))},style:{display:"inline-block",width:"".concat(1,"px"),height:"".concat(100*Math.min(e,i)/i,"px"),backgroundColor:t%12===0?"#ff8400":"#cccccc",borderLeft:"solid 1px #ffffff"}},t)})),Object(a.jsx)("div",{children:s}),Object(a.jsxs)("div",{children:[Object(a.jsx)("br",{}),Object(a.jsx)("br",{})]})]})},s=n(17),h=n(11),d=n(79),f=n(74),m=function(e){var t=e.children,n={Description:{val:"Enter description here",type:"freeText"},"Inl Stock Value":{val:5e5},"Home Purchase Price":{val:1e6},"House Appreciation":{val:.03},Inflation:{val:.03},"Stock Market Return":{val:.06},"Monthly Rent Collected":{val:2e3},"Down Payment":{val:2e5},"Household Expenses":{val:4500},"Yearly Health Ins":{val:18e3},"Income Tax on Rent":{val:.2},"Property Tax Rate":{val:.015},"Mortgage Payment":{val:4e3},"Annual Maintenance % of Value":{val:.005}},i=function(){try{return JSON.parse(decodeURI(window.location.hash).substr(1))}catch(e){return{}}}(),o=Object(r.useState)(Object(h.a)(Object(h.a)({},Object.entries(n).reduce((function(e,t){var n=Object(l.a)(t,2),a=n[0],r=n[1];return Object(h.a)(Object(h.a)({},e),{},Object(s.a)({},a,r.val))}),{})),i)),c=Object(l.a)(o,2),u=c[0],m=c[1];Object(r.useEffect)((function(){var e=encodeURI(JSON.stringify(u));window.location.hash=e}));return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(f.a,{container:!0,spacing:2,children:Object.entries(n).map((function(e){var t=Object(l.a)(e,2),n=t[0],r=t[1];return Object(a.jsx)(f.a,{item:!0,xs:"freeText"===r.type?12:2,children:Object(a.jsx)(d.a,{id:"standard-basic",label:n,fullWidth:"freeText"===r.type,value:u[n],onChange:function(e){return m(Object(h.a)(Object(h.a)({},u),{},Object(s.a)({},n,e.target.value)))}})},n)}))}),t((function(e){if(e in u)return parseFloat(u[e]);throw new Error("no var named ".concat(e," defined"))}))]})},v=n(23),j=n(24),b=function(){function e(t){var n=t.initialValue,a=t.growthPerPeriod;if(Object(v.a)(this,e),"undefined"===typeof a)throw new Error("growthPerPeriod is required for growers");if("undefined"===typeof n)throw new Error("initialValue is required for growers");this.initialValue=n,this.value=n,this.growthPerPeriod=a,this.count=0}return Object(j.a)(e,[{key:"tick",value:function(){this.count++,this.value=Math.max(0,this.value*(1+this.growthPerPeriod))}},{key:"add",value:function(e){this.value+=e}},{key:"subtract",value:function(e){this.value-=e}}]),e}(),O=function(){function e(t){var n=t.monthlyPayment,a=t.amount,r=t.rate;Object(v.a)(this,e),this.monthsElapsed=0,this.monthlyPayment=n,this.amountOwed=a,this.rate=r}return Object(j.a)(e,[{key:"tick",value:function(){if(this.monthsElapsed++<360){this.value=this.monthlyPayment;var e=this.amountOwed*this.rate/12;this.amountOwed=Math.max(0,this.amountOwed-(this.value-e))}else this.value=0}}]),e}(),P=function(e){var t=e.getVarVal,n={stock:new b({initialValue:t("Inl Stock Value")-t("Down Payment"),growthPerPeriod:t("Stock Market Return")/12}),monthlyCostOfLiving:new b({initialValue:t("Household Expenses")+t("Yearly Health Ins")/12,growthPerPeriod:t("Inflation")/12}),mortgage:new O({rate:.03,amount:t("Home Purchase Price")-t("Down Payment"),monthlyPayment:t("Mortgage Payment")}),rentalIncome:new b({initialValue:t("Monthly Rent Collected"),growthPerPeriod:t("Inflation")/12}),homeValue:new b({initialValue:t("Home Purchase Price"),growthPerPeriod:t("House Appreciation")/12}),propertyTaxPerMonth:new b({initialValue:t("Home Purchase Price")*t("Property Tax Rate")/12,growthPerPeriod:t("Inflation")/12}),maintenancePerMonth:new b({initialValue:t("Home Purchase Price")*t("Annual Maintenance % of Value")/12,growthPerPeriod:t("Inflation")/12})};return new Array(660).fill(0).map((function(){Object.values(n).forEach((function(e){return e.tick()}));var e=n.monthlyCostOfLiving.value+n.mortgage.value+n.propertyTaxPerMonth.value+n.maintenancePerMonth.value,a=n.rentalIncome.value*(1-t("Income Tax on Rent"));return n.stock.add(a-e),{liquid:Math.max(0,n.stock.value),homeValue:n.homeValue.value,amountOwed:n.mortgage.amountOwed,netWorth:Math.max(0,n.stock.value)+n.homeValue.value-n.mortgage.amountOwed}})).filter((function(e){return e.liquid>0}))};var w=function(){return Object(a.jsx)("div",{className:"App",style:{padding:"20px"},children:Object(a.jsx)(m,{children:function(e){var t=P({getVarVal:e});return Object.keys(t[0]).map((function(e){return Object(a.jsx)(u,{title:e,wealth:t.map((function(t){return t[e]}))},e)}))}})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,81)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),r(e),i(e),o(e)}))};c.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(w,{})}),document.getElementById("root")),g()}},[[44,1,2]]]);
//# sourceMappingURL=main.33de9d2b.chunk.js.map
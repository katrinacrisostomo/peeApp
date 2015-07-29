var data = [4, 8, 10, 16, 23, 20, 27];


//model

var pee = {
	getData: function(peeDate, peeTime) {
		this.dateObj = m.prop(new Date(peeDate + " " + peeTime));
		return {person: m.prop(''), peed: m.prop(this.dateObj), saved: m.prop(false), error: m.prop('')}
	},
	setData: function(data) {
		return m.request({method: "POST", url: "index.html/user", data: {person: data.person(), peed: data.peed()}})
			.then(data.saved.bind(this, true), data.error)
	}
};

//for d3 graph
var x = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, 420]);


//controller

pee.controller = function() {
	this.date1 = m.prop();
	this.date2 = m.prop();
	this.data = pee.getData(this.date1, this.date2);

	this.save = function() {
		pee.setData(this.data);
	}.bind(this)
};

//view

pee.view = function(ctrl) {
	return [
	m("h1", "My Fun Pee App"),
		m("div.float#day-labels", [
			m("ul.days", [
				m("li.day", "M"),
				m("li.day", "T"),
				m("li.day", "W"),
				m("li.day", "Th"),
				m("li.day", "F"),
				m("li.day", "S"),
				m("li.day", "S")
			])
		]),
		m("div.float", [
			m("div.chart", {
				config : function(element, init) {
					if (init) return;
					d3.select(element)
						.selectAll("div")
							.data(data)
						.enter().append("div")
							.style("width", function(d) {
								return x(d) + "px";
							})
							.text(function(d) {
								return d;
							});
				}
			}, '')
		]),
		m("div.clear", ''),
		m("br", ''),
		m("br", ''),
		m("form#submit-peetime", [
			m("p",[
				"Date:",
				m("input#datepicker[type=text]", {
                    config : function(element, init) {
                        if (init) return;
                        $(element).datepicker();
                    }
                }, 
                {oninput: m.withAttr("value", ctrl.date1)},
                ctrl.data.peed(), 
                '')
			]),
			m("p",[
				"Time:",
				m("input#timepicker[type=text]", {
					config : function(element, init) {
						if (init) return;
						$(element).timepicker({ 'timeFormat': 'h:i a' });
					}
				},
				{oninput: m.withAttr("value", ctrl.date2)},
				ctrl.data.peed(), 
				'')
			]),
			m("button[type=submit]", {onclick: ctrl.save}, "Submit Pee Time"),
			ctrl.data.saved() ? "Saved!" : "",
			ctrl.data.error() || "" //show error if any
		]),
		m("br", ''),
		m("br", ''),
		m("p", "List of Past Pees:")
	]
};
// module.exports.Router = require('./Router/index');

var data = [4, 8, 10, 16, 23, 20, 27];

	// var x = d3.scale.linear()
	// 	.domain([0, d3.max(data)])
	// 	.range([0, 420]);

	// d3.select(".chart")
	// 	.selectAll("div")
	// 		.data(data)
	// 	.enter().append("div")
	// 		.style("width", function(d) {
	// 			return x(d) + "px";
	// 		})
	// 		.text(function(d) {
	// 			return d;
	// 		});

// $('#datepicker').datepicker();

// $('#timepicker').timepicker();


// $('#submit-peetime').submit(function(event) {

// 	//Prevents page reload.
// 	event.preventDefault();

// 	//Grab all inputs.
// 	var date = $('#datepicker').val();
// 	var time = $('#timepicker').val();

// 	console.log(date);
// 	console.log(time);

// });


// mithril MVC begins


//model

var pee = {};


pee.Pee = function() {
	this.dateObj = m.prop(new Date(peeDate + " " + peeTime));
	this.person = m.prop('');
	this.peed = m.prop(dateObj);
};

pee.PeeList = Array;

/////////////
var x = new pee.Pee({person: "Kat", peed: new Date()});
/////////////


//view-model

pee.vm = {
	init: function() {
		//a running list of pees
		pee.vm.list = new pee.PeeList();

		//slots to store person and time before it is created
		pee.vm.person = m.prop('');
		pee.vm.peed = m.prop();

		//adds a pee to the list, and clears the description field for user convenience
		pee.vm.add = function(person) {
			if (person()) {
				pee.vm.list.push(new pee.Pee({person: person()}));
				pee.vm.person('');
			}
		};
		pee.vm.add = function(peed) {
			if (peed()) {
				pee.vm.list.push(new pee.Pee({peed: peed()}));
				pee.vm.peed();
			}
		};
	}
};


//controller

pee.controller = function() {
	pee.vm.init();
	return pee.vm;
};

//for d3 graph
var x = d3.scale.linear()
		.domain([0, d3.max(data)])
		.range([0, 420]);




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
                { value: peeDate('') }, 
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
				{ value: peeTime('') }, 
				'')
			]),
			m("button[type=submit]", {onclick: console.log(pee.Pee.person)}, "Submit Pee Time")
		]),
		m("br", ''),
		m("br", ''),
		m("p", "List of Past Pees:")
	]
};



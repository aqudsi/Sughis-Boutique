// Dependencies
// ============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {
	//home page
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/main_page/home.html"))
	});
	app.get("/home", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/main_page/home.html"))
	});
	//about page with more information about the boutique
	app.get("/about", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/main_page/about.html"))
	});
	app.get("/contact", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/main_page/contact.html"))
	});	


	//men's collection page, with all men's styles
	app.get("/mens_collection", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/mens_collection/mens_collection.html"))
	});
	app.get("/mens_collection/mens_casual_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/mens_collection/mens_casual_wear.html"))
	});
	app.get("/mens_collection/mens_formal_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/mens_collection/mens_formal_wear.html"))
	});
	app.get("/mens_collection/mens_wedding_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/mens_collection/mens_wedding_wear.html"))
	});
	

	//women's collection page, with all women's styles	
	app.get("/womens_collection", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/womens_collection/womens_collection.html"))
	});
	app.get("/womens_collection/womens_casual_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/womens_collection/womens_casual_wear.html"))
	});
	app.get("/womens_collection/womens_evening_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/womens_collection/womens_evening_wear.html"))
	});
	app.get("/womens_collection/womens_party_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/womens_collection/womens_party_wear.html"))
	});
	app.get("/womens_collection/womens_wedding_wear", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/womens_collection/womens_wedding_wear.html"))
	});


	//sale page, with all items on sale
	app.get("/sale_collection", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/sale_collection/sale_collection.html"))
	});		
	app.get("/womens_collection/womens_clearance", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/sale_collection/womens_clearance.html"))
	});
	app.get("/mens_collection/mens_clearance", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/sale_collection/mens_clearance.html"))
	});


	//admin pages, with admin login and portal page
	app.get("/admin_login", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/admin_page/admin_login.html"))
	});

	app.get("/admin_portal", function(req, res) {
		res.sendFile(path.join(__dirname, "../../public/pages/admin_page/admin_portal.html"))
	});
	
}
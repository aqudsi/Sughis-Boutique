// Dependencies
// =============================================================
import path from ("path");


// Routes
// =============================================================
export default function(app) {
	//home page
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/home.html")
	});
	//about page with more information about the boutique
	app.get("/about", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/about.html")
	});
	//men's collection page, with all men's styles
	app.get("/mens_collection", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/mens_collection.html")
	});
	//women's collection page, with all women's styles	
	app.get("/womens_collection", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/womens_collection.html")
	});
	//sale page, with all items on sale
	app.get("/sale_collection", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/sale_collection.html")
	});		

	app.get("/admin_login", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/admin_login.html")
	});

	app.get("/admin_portal", function(req, res) {
		res.sendFile(path.join(__dirname, "./public/pages/admin_portal.html")
	});		
}
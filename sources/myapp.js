import "./styles/app.css";
import {JetApp, plugins} from "webix-jet";

webix.ready(() => {
	let app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		start:	"/top/contacts"
	});
	app.render();
	app.use(plugins.Locale);

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});

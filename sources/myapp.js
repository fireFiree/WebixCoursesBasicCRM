import "./styles/app.css";
import {JetApp} from "webix-jet";

webix.ready(() => {
	webix.i18n.parseFormat = "%d-%m-%Y";
	webix.i18n.setLocale();
	let app = new JetApp({
		id:			APPNAME,
		version:	VERSION,
		start:	"/top/contacts"
	});
	app.render();

	app.attachEvent("app:error:resolve", (name, error) => {
		window.console.error(error);
	});
});

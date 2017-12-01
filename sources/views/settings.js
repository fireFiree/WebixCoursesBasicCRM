import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		let header = {view: "label", label: "Settings", css: "center"};

		let settings = {view: "select", label: "Language", options: ["English", "Русский"]};

		let ui = {rows: [header, settings, {}]};

		return ui;
	}
}

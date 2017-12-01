import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		let header = {view: "label", label: _("Settings"), css: "center"};
		let language = {name: "lang",
			optionWidth: 120,
			view: "segmented",
			label: _("Language"),
			options: [
				{id: "en", value: "English"},
				{id: "ru", value: "Русский"}
			],
			click: () => this.toggleLanguage(),
			value: lang
		};


		let ui = {rows: [header, language, {}]};

		return ui;
	}
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({name: "lang"}).getValue();
		langs.setLang(value);
	}
}

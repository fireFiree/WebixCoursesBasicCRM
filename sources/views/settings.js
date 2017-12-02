import {JetView} from "webix-jet";
import {types} from "models/activityTypes";
import {statuses} from "models/statuses";
import StatusView from "views/settingsStatus";
import TypeView from "views/settingsType";


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

		let addStatusBtn = {view: "button",
			label: _("AddStatus"),
			type: "icon",
			autoWidth: true,
			maxWidth: 200,
			icon: "plus-square",
			click: () => {
				this.StatusView.showWindow();
			}
		};

		let addTypeBtn = {view: "button",
			label: _("AddType"),
			type: "icon",
			autoWidth: true,
			maxWidth: 200,
			icon: "plus-square",
			click: () => {
				this.TypeView.showWindow();
			}
		};

		let statusTable = {rows: [
			{view: "label", label: _("Statuses"), align: "center"},
			{view: "datatable",
				id: "setting:statustable",
				width: 350,
				scrollX: false,
				margin: 20,
				columns: [
					{id: "Value", header: [_("Value"), {content: "textFilter"}], sort: "text", width: 150},
					{id: "Icon", header: [_("Icon"), {content: "textFilter"}], width: 100, sort: "text", template: "<span class='webix_icon fa-#Icon#'></span>"},
					{id: "editCell", 	header: "", 	template: "<span class='webix_icon fa-edit'></span>", width: 40},
					{id: "deleteCell", 	header: "", 	template: "<span class='webix_icon fa-trash-o'></span>", width: 40}
				],
				onClick: {
					"fa-trash-o": (ev, id) => {
						webix.confirm({
							text: _("AreYouSure"),
							ok: _("Yes"),
							cancel: _("Cancel"),
							callback: (res) => {
								if (res) {
									statuses.remove(id);
								}
							}
						});
					},
					"fa-edit": (ev, id) => { this.StatusView.showWindow(id); }
				}
			},
			addStatusBtn
		]};

		let typeTable = {rows: [
			{view: "label", label: _("Types"), align: "center"},
			{view: "datatable",
				id: "setting:typetable",
				width: 350,
				scrollX: false,
				margin: 20,
				columns: [
					{id: "Value", header: [_("Value"), {content: "textFilter"}], sort: "text", width: 150},
					{id: "Icon", header: [_("Icon"), {content: "textFilter"}], width: 100, sort: "text", template: "<span class='webix_icon fa-#Icon#'></span>"},
					{id: "editCell", 	header: "", 	template: "<span class='webix_icon fa-edit'></span>", width: 40},
					{id: "deleteCell", 	header: "", 	template: "<span class='webix_icon fa-trash-o'></span>", width: 40}
				],
				onClick: {
					"fa-trash-o": (ev, id) => {
						webix.confirm({
							text: _("AreYouSure"),
							ok: _("Yes"),
							cancel: _("Cancel"),
							callback: (res) => {
								if (res) {
									types.remove(id);
								}
							}
						});
					},
					"fa-edit": (ev, id) => { this.TypeView.showWindow(id); }
				}
			},
			addTypeBtn
		]};

		let ui = {rows: [header, language, {cols: [statusTable, typeTable, {}]}, {}]};

		return ui;
	}

	init() {
		$$("setting:typetable").parse(types);
		$$("setting:statustable").parse(statuses);

		this.StatusView = this.ui(StatusView);
		this.TypeView = this.ui(TypeView);
	}
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({name: "lang"}).getValue();
		langs.setLang(value);
	}
}

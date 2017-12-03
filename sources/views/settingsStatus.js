import {JetView} from "webix-jet";
import {statuses} from "models/statuses";


export default class StatusView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const form = {
			view: "form",
			id: "setting:status:form",
			borderless: true,
			width: 400,
			elementsConfig: {
				labelWidth: 100
			},
			elements: [
				{view: "text",
					label: _("Value"),
					name: "Value"
				},
				{view: "text",
					label: _("Icon"),
					name: "Icon"
				},
				{cols: [{},
					{view: "button",
						value: _("Save"),
						click: () => {
							this.saveActivity();
						},
						btn: "save"},
					{view: "button", value: _("Cancel"), click: () => this.closeWindow()}]}
			],
			rules: {
				Value: webix.rules.isNotEmpty,
				Icon: webix.rules.isNotEmpty
			}
		};

		const popup = {id: "status:popup",
			view: "window",
			position: "center",
			modal: true,
			head: {view: "template", template: _("Status"), type: "header"},
			body: form
		};

		return popup;
	}

	showWindow(id) {
		const _ = this.app.getService("locale")._;
		this.getRoot().show();


		let popupHeader = $$("status:popup").queryView({type: "header"});
		let form = $$("setting:status:form");
		form.clear();
		form.clearValidation();

		if (id !== undefined) {
			popupHeader.define("template", _("EditStatus"));
			popupHeader.refresh();
			form.setValues(statuses.getItem(id.row));
		}
		else {
			popupHeader.define("template", _("AddStatus"));
			popupHeader.refresh();
		}
	}

	saveActivity() {

		let form = $$("setting:status:form");
		if (form.validate()) {
			let obj = form.getValues();
			if (obj.id === undefined) {
				statuses.add(obj);
			}
			else {
				statuses.updateItem(obj.id, obj);
			}
			this.getRoot().hide();
		}
	}

	closeWindow() {
		this.getRoot().hide();
	}
}

import {JetView} from "webix-jet";
import {types} from "models/activityTypes";


export default class TypeView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const form = {
			view: "form",
			id: "setting:type:form",
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

		const popup = {id: "type:popup",
			view: "window",
			position: "center",
			modal: true,
			head: {view: "template", template: _("Type"), type: "header"},
			body: form
		};

		return popup;
	}

	showWindow(id) {
		const _ = this.app.getService("locale")._;
		this.getRoot().show();


		let popup = $$("type:popup");
		let form = $$("setting:type:form");
		form.clear();
		form.clearValidation();

		if (id !== undefined) {
			popup.queryView({type: "header"}).define("template", _("EditType"));
			popup.queryView({type: "header"}).refresh();
			form.setValues(types.getItem(id.row));
		}
		else {
			popup.queryView({type: "header"}).define("template", _("AddType"));
			popup.queryView({type: "header"}).refresh();
		}
	}

	saveActivity() {

		let form = $$("setting:type:form");
		if (form.validate()) {
			let obj = form.getValues();
			if (obj.id === undefined) {
				types.add(obj);
			}
			else {
				types.updateItem(obj.id, obj);
			}
			this.getRoot().hide();
		}
	}

	closeWindow() {
		this.getRoot().hide();
	}
}

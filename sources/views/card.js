import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import TabView from "views/tabview";


function spanIcon(icon, text) {
	return `<span class='webix_icon fa-${icon} info'></span>${text}<br/>`;
}

function contactDetailsToHtml(obj) {
	let html = `<div class='column'><p><b class='bigText'>${obj.FirstName} ${obj.LastName}</b></p><img src='${obj.Photo}' style='width:170px; height:250px;'/><br/>Status: ${obj.StatusID}</div><div class='columns'><p></p><p></p>`;
	if (obj.Skype) { html += spanIcon("skype", obj.Skype); }
	if (obj.Website) { html += spanIcon("globe", obj.Website); }
	if (obj.Email) { html += spanIcon("envelope", obj.Email); }
	if (obj.Phone) { html += spanIcon("phone", obj.Phone); }
	if (obj.Company) { html += spanIcon("building", obj.Company); }
	if (obj.Job) { html += spanIcon("universal-access", obj.Job); }
	if (obj.Birthday) { html += spanIcon("birthday-cake", obj.Birthday); }

	return `${html}</div>`;
}
let conctactDescription = {view: "template",
	id: "contactDescription",
	borderless: true,
	template: obj => contactDetailsToHtml(obj)
};

let buttons = {cols: [
	{view: "button", type: "icon", icon: "edit", label: "Edit", width: 130},
	{view: "button", label: "Delete", type: "icon", icon: "trash-o", width: 130}
]};


export default class CardView extends JetView {
	config() {
		return {rows: [
			{cols: [conctactDescription, {rows: [buttons, {}]}]},
			TabView
		]};
	}

	urlChange(view, url) {
		let id = url[0].params.id;
		if (id) {
			$$("contactDescription").setValues(contacts.getItem(id));
		}
	}
}

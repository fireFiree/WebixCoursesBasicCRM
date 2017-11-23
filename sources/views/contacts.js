import {JetView} from "webix-jet";
import {getContacts} from "models/contacts";


export default class ContactsView extends JetView{
	config(){
		
		function listTemplate(obj){
			return "<img src='" + obj.Photo + "' class='round'/><div class='shortDescription'><b>" + obj.FirstName + " " + obj.LastName + "</b><br/>"+obj.Email+"</div>";
		}

		var contactsList = { view: "list",
			id:"contactsList", 
			borderless:true,   
			template: listTemplate,
			width: 300,
			type: { height: 70 },
			select:true,
			on: { 
				onAfterSelect: function(){
					var item = $$("contactsList").getSelectedItem();
					$$("contactDescription").parse(item);
				},
				onAfterLoad: function(){
					var id = this.getFirstId();
					this.select(id);
				}
			}
		};

		var conctactDescription = { view: "template",
			id: "contactDescription",
			borderless: true,
			template: function( obj ){
				return contactDetailsToHtml(obj);
			}

		};

		var buttons = { cols:[
			{view:"button", type:"icon", icon:"edit", label: "Edit", width: 130},
			{view:"button", label: "Delete", type:"icon", icon:"trash-o", width: 130}
		]};

		var ui = { cols:[ contactsList,  conctactDescription, {rows: [buttons, {}]} ] };
		return ui;
	}
	init(view){
		view.queryView({ view:"list"}).parse(getContacts());
	}	
}
import {JetView} from "webix-jet";


export default class ContactsView extends JetView{
	config(){
		
		function spanIcon(icon, text){
			return "<span class='webix_icon fa-" + icon + " info'></span>"+ text + "<br/>";
		}
		
		function contactDetailsToHtml(obj){
			var html = "<div class='column'><p><b class='bigText'>" + obj.FirstName + " " + obj.LastName +"</b></p><img src='"+ obj.Photo +"' style='width:200px; height:300px;'/><br/>"+ obj.Status + "</div><div class='columns'><p></p><p></p>";
			if (obj.Skype)
				html += spanIcon("skype", obj.Skype);
			if (obj.Website)
				html += spanIcon("globe", obj.Website);
			if (obj.Email)
				html += spanIcon("envelope", obj.Email);
			if (obj.Phone)
				html += spanIcon("phone", obj.Phone);
			if (obj.Company)
				html += spanIcon("building", obj.Company);
			if (obj.Company)
				html += spanIcon("universal-access", obj.Job);

			return html + "</div>";
		}

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
			url:"http://localhost:8096/api/v1/contacts/",
			on: { 
				onAfterSelect: function(){
					var item = $$("contactsList").getSelectedItem();
					$$("contactDescription").parse(item);
				}
			}
		};

		var conctactDescription = { view: "template",
			id: "contactDescription",
			borderless: true,
			//url:"http://localhost:8096/api/v1/contacts/",
			template: function( obj ){
				return contactDetailsToHtml(obj);
			}

		};

		var buttons = { cols:[
			{view:"button", type:"icon", icon:"edit", label: "Edit", width: 100},
			{view:"button", label: "Delete", type:"icon", icon:"trash-o", width: 100}
		]};

		var ui = { cols:[ contactsList,  conctactDescription, {rows: [buttons, {}]} ] };
		return ui;
	}
	init(view){
		
	}	
}
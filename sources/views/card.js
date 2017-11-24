import {JetView} from "webix-jet";
import {getContactItem} from "models/contacts";


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
	if (obj.Job)
		html += spanIcon("universal-access", obj.Job);
	if (obj.Birthday)
		html += spanIcon("birthday-cake", obj.Birthday);

	return html + "</div>";
}
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


export default class CardView extends JetView{
	config(){
		return { cols:[conctactDescription, { rows: [buttons, {}] } ]};
	}
	init(){

	}

	urlChange(view,url){
		var id = url[0].params.id;
		if( id ){
			view.queryView({ view:"template"}).setValues( getContactItem(id) );
		}
	}
}
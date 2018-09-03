$(document).ready(function() {

	var list = function() {
		$.ajax({
			method:"GET",
			url: "http://localhost:8888/rest/matiere", 
			success: function(result){

				var tableauMatieres = $("#tableau-matieres tbody");

				tableauMatieres.empty();

				for(var el of result) {
					var ligne = $("<tr><td>"+el.id+"</td><td>"+el.version+"</td><td>"+el.nom+"</td><td>"+el.duree+"</td><td>"+el.difficulte+"</td><td><div class='btn-group btn-group-sm'><button id='edit"+el.id+"' type='button' class='btn btn-primary'>Editer</button><button id='delete"+el.id+"' type='button' class='btn btn-danger'>Supprimer</button></div></td></tr>");

					tableauMatieres.append(ligne);

					$("#edit"+el.id).click({id: el.id}, function(e){
						edit(e.data.id);
					});

					$("#delete"+el.id).click({id: el.id}, function(e){
						remove(e.data.id);
					});
				}


			}});
	};

	var add = function() {
		$("#formulaire-matieres").show();
	};

	var edit = function(id) {
		$.ajax({
			method:"GET",
			url: "http://localhost:8888/rest/matiere/"+id, 
			success: function(result){

				$("#id").val(result.id);
				$("#version").val(result.version);
				$("#nom").val(result.nom);
				$("#duree").val(result.duree);
				$("#difficulte").val(result.difficulte);

				$("#formulaire-matieres").show();
			}});
	};

	var save = function() {
		var matiere = {};
		matiere.id = $("#id").val();
		matiere.version = $("#version").val();
		matiere.nom = $("#nom").val();
		matiere.duree = $("#duree").val();
		matiere.difficulte = $("#difficulte").val();

		if(matiere.id) {
			$.ajax({
				method:"PUT",
				url: "http://localhost:8888/rest/matiere/"+matiere.id, 
				data : JSON.stringify(matiere),
				contentType: "application/json; charset=utf-8",
				success:function(result) {
					list();
					cancel();
				}
				});
		} else {
			$.ajax({
				method:"POST",
				url: "http://localhost:8888/rest/matiere", 
				data : JSON.stringify(matiere),
				contentType: "application/json; charset=utf-8",
				success:function() {
					list();
					cancel();
				}
				});
		}
	};

	var remove = function(id) {
		$.ajax({
			method:"DELETE",
			url: "http://localhost:8888/rest/matiere/"+id, 
			success: function(result){
				list();
			}});
	}
	
	var cancel = function() {
		$("#formulaire-matieres").hide();
		
		$("#id").val("");
		$("#version").val("");
		$("#nom").val("");
		$("#duree").val("");
		$("#difficulte").val("");
	}

	$("#add").click(function(){
		add();
	});

	$("#save").click(function(){
		save();
	});
	
	$("#cancel").click(function(){
		cancel();
	});

	list();

});
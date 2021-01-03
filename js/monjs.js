/* Les variables permettent la création d'id pour les row et colonne dans la zone de drop */
var irow = 1;
var icol = 1;
/* Récupère la valeur de la class d'une balise */
var tagclassname;
/* Sert d'affichage pour les col */
var displayclassname;
/* Permet de determiner l'utilisation de la fonction de modification de row */
var clickrowmodif = 0;
/* Permet de determiner l'utilisation de la fonction de modification de col */
var colModif = 0;
/* sert à transporter l'id d'une row */
var clickrowid;
/* définit si on modal/popup et actif */
var modalActive = 0;
/* Variable pour le paramètre d'une sortie de code complète */
var flagparamNewPage = 0;
/* Variable connaitre l'état de la fonction de suppression */
var delMode = 0;
$(document).ready(function() {
  $("#bootstrapOffset").hide();
  $("#modenormal").hide();

  $("#coinBox").mouseover(function(){
    $("#insertCoin").css("margin-top", "8px");
  });
  $("#coinBox").mouseleave(function(){
    $("#insertCoin").css("margin-top", "-27px");
  });
});

/* bloc pour le drag and drop */
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  tagclassname = ev.target.className;
  $("#autoScrollUp").mouseover(function() {
    var moveDown =  $(document).scrollTop() + 5;
    $(document).scrollTop(moveDown);
  });
}

function activeCol(id){
  if (colModif == 0){

  }
  else if (colModif == 1) {

  }
}

function activeRow(id){
  if (delMode == 0) {
    if ((clickrowmodif == 0) && (clickrowid == null)) {
      clickrowmodif = 1;
      clickrowid = id;
      $("#row"+ id +"").css("border", "1px #00ff0a solid");
      $("#dropzone").removeAttr("ondrop");
      $("#dropzone").removeAttr("ondragover");
      $("#row"+ id).attr("ondrop", "rowDrop(event, id)");
      $("#row"+ id).attr("ondragover", "allowDrop(event, id)");
    }
    else if ((clickrowmodif == 1) && (clickrowid == id)) {
      clickrowmodif = 0;
      clickrowid = null;
      $("#row"+ id).css("border", "1px black dashed");
      $("#dropzone").attr("ondrop", "drop(event)");
      $("#dropzone").attr("ondragover", "allowDrop(event)");
      $("#row"+ id).removeAttr("ondrop");
      $("#row"+ id).removeAttr("ondragover");
    }
  }
}

function rowDrop(ev, id){
  ev.preventDefault();
  displayclassname = tagclassname.substring(11);
  var colId = displayclassname.substring(4);
  if ($("#"+ id).text() == "row") {
    $("#"+ id).empty();
    $("#"+ id).css("overflow", "auto");
    $("#"+ id).css("height", "auto");
  }
  /* Ajoute des bloc dans les container en vérifiant si il y a des row */
  if (displayclassname == "exrow") {
    $("#"+ id).append('<div onclick="activeRow('+ irow +')" id="row'+ irow +'"class="'+ tagclassname +' dropped">row</div>');
    irow ++;
  }
  else {
    $("#"+ id).append('<div id="col_'+ icol +'" class="'+ tagclassname +' dropped">'+ displayclassname +'</div>');
    icol ++;
  }
}

function drop(ev) {
  ev.preventDefault();
  /* Découpe la class du l'élément html récupérer */
  displayclassname = tagclassname.substring(11);
  var colId = displayclassname.substring(4);

  /* Ajoute des bloc dans les container en vérifiant si il y a des row */
  if (displayclassname == "exrow") {
    $("#dropzone").append('<div onclick="activeRow('+ irow +')" id="row'+ irow +'"class="'+ tagclassname +' dropped">row</div>');
    irow ++;
  }
  else {
    $("#dropzone").append('<div id="col_'+ icol +'" class="'+ tagclassname +' dropped">'+ displayclassname +'</div>');
    icol ++;
  }

  /* Supprime l'image de + */
  if ($("#imgplus").is(":visible")) {
    $("#imgplus").remove();
  }
}

/* boutons switch entre le mode offset et le mode normal */
function modeswitch(){
  $('#bootstrapOffset, #bootstrap, #modeoffset, #modenormal').toggle();
}

function codewrite(){
  var parametres = "";
  // Fait une copie de la dropzone
  var htmldropzone = $('#dropzone').html();
  // Ajout des classes manquant pour former un code bootstrap et supprime les id et classes inutiles
  $("#dropzone .exrow").addClass("row");
  $("#dropzone div").removeAttr("id onclick style ondrop ondragover");
  $("#dropzone div").removeClass("exempleRow exempleCol exrow dropped");
  // Fait sortir dans une variable le cade propre
  if (flagparamNewPage == 1) {
    var parametres = parametres + '<!DOCTYPE html><html lang="fr"><head>';
    if (paramMeta == 1) {
      var parametres = parametres + '<meta charset="UTF-8"><meta name="description" content=""><meta name="keywords" content=""><meta name="author" content=""><meta name="viewport" content="">';
    }
    if (paramBootstrap == 1) {
      var parametres = parametres + '\<script src="js/jquery-min.js"\>\<\/script\>';
      var parametres = parametres + '\<script src="js/bootstrap.js"\>\<\/script\>';
      var parametres = parametres + '<link href="css/bootstrap.css" rel="stylesheet" type="text/css">';
      var parametres = parametres + '<link href="css/bootstrap.map" rel="stylesheet" type="text/css">';
    }
    if (paramVotreCss == 1) {
      var parametres = parametres + '<link href="css/css.css" rel="stylesheet" type="text/css">';
    }
    if (paramVotreJs == 1) {
      var parametres = parametres + '\<script src="js/js.js"\>\<\/script\>';
    }
    if (paramApiGoogle == 1) {
      var parametres = parametres + '\<script src="https://www.google.com/recaptcha/api.js"\>\<\/script\>';
    }
    var codeAvant = parametres + '</head><body><div class="container">';
    var codeApres = '</div></body></html>';
  }
  else {
    var codeAvant = '<div class="container">';
    var codeApres = '</div>';
  }
  var codeout = codeAvant +''+ $('#dropzone').html() +''+ codeApres;
  // Affiche le code propre dans La zone de text
  $("#outputCode").text(codeout);
  // Vide la zone de drop
  $("#dropzone").empty();
  // Remplissage de la zone de drop avec le code initial
  $("#dropzone").append(htmldropzone);
}
/* activation des paramètres via des flags */
function paramNewPage(){
  if (flagparamNewPage == 0) {
    flagparamNewPage = 1;
  }
  else {
    flagparamNewPage = 0;
  }
}
function paramBootstrap(){
  if (paramBootstrap == 0) {
    paramBootstrap = 1;
  }
  else {
    paramBootstrap = 0;
  }
}
function paramMeta(){
  if (paramMeta == 0) {
    paramMeta = 1;
  }
  else {
    paramMeta = 0;
  }
}
function paramVotreCss(){
  if (paramVotreCss == 0) {
    paramVotreCss = 1;
  }
  else {
    paramVotreCss = 0;
  }
}
function paramVotreJs(){
  if (paramVotreJs == 0) {
    paramVotreJs = 1;
  }
  else {
    paramVotreJs = 0;
  }
}
function paramApiGoogle(){
  if (paramVotreJs == 0) {
    paramVotreJs = 1;
  }
  else {
    paramVotreJs = 0;
  }
}
/* roation du rouage dans paramètres */
var value = 0
$("#cog").rotate({
  bind:{
    click: function(){
      value +=90;
      $(this).rotate({ animateTo:value})
    }
  }
});
/* function du easter egg paramètre */
$(".modal-footer").mouseover(function(){
  $("#tryto").stop();
  $("#tryto").fadeIn(500);
});
$(".modal-footer").mouseleave(function(){
  $("#tryto").stop();
  $("#tryto").fadeOut(500);
});
/* bloc pour la suppression des éléments
function modeActive(event){
  var e = event || window.event;
  var key = e.keyCode || e.which;
  console.log("clé: "+ key);
  // activation de la touche delete
  if (key == 46) {
    delMode = 1;
    $(".exempleRow").click(function(){
      if (delMode == 1) {
        $("#"+ idremove).remove();
        console.log("suppression Row");
      }
    });
    $("#dropzone").attr("ondrop", "drop(event)");
    $("#dropzone").attr("ondragover", "allowDrop(event)");
    $("#dropzone .exempleRow").css("border", " solid 2px red");
  }
  // activation de la touche backspace
  else if (key == 8) {
    delMode = 1;
    $("#dropzone .exempleCol").click(function(){
      if (delMode == 1) {
        var idremove = this.id;
        $("#"+ idremove).remove();
        console.log("suppression Col");
      }
    });
    $("#dropzone").attr("ondrop", "drop(event)");
    $("#dropzone").attr("ondragover", "allowDrop(event)");
    $("#dropzone .exempleCol").css("border", "solid 2px red");
  }
  }
function modeDesactive(event){
  var e = event || window.event;
  var key = e.keyCode || e.which;
  // Désactivation de la touche delete
  if (key == 46) {
    delMode = 0;
    $(".exempleRow").css("border", " dashed 1px black");
  }
  // Désactivation de la touche backspace
  else if (key == 8) {
    delMode = 0;
    $(".exempleCol").css("border", " solid 1px black");
  }
}*/

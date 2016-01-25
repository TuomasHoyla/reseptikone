$(function() {

    var haettavatAineet =[];
    
    //TODO: AJAX-back-end query for ruokaAineet & receipes
    //Receipes on /json/ingredients.json
    var obj = $.parseJSON(receipes);
    
    
function haeAineet() {

    //Tulostaa true vain jos n on h:n osajoukko n = haettavataineet, h = receipes.ainekset
    //True, if set needles is a subset of haystack    
    function containsAll(needles, haystack){ 
        for(var i = 0 , len = needles.length; i < len; i++){
            if($.inArray(needles[i], haystack) == -1) return false;
        }
        return true;
    }
    

    /**jos haettavista aineista loytyy yksikin listalta, lisaa se resepteihin
    Tama kutsu vois olla natimpikin
    **/
    
    $(obj.reseptit).each(function( index ) {
    if (containsAll(haettavatAineet, obj.reseptit[index].ainekset)) {
        $( "#receipes" ).append("<h4>"+obj.reseptit[index].nimi+"</h4>"+
                                obj.reseptit[index].ainekset+"<li>"+obj.reseptit[index].ohje
                                +"</li>");
    }
    });
 
    
    
    /** avaa resepti
        jos resepti pitää sisällään kaikki haettavat aineet, palauta reseptin nimi
    **/
    $( "#content" ).empty();
    $(haettavatAineet).each(function ( index ) {
        $( "#content" ).append('<span class="label label-success">'+haettavatAineet[index]+'</span>');
    });
      
    
    }
  

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};


$('#the-basics .typeahead').typeahead({
    hint: true,
    autoselect: true,
    highlight: true,
    minLength: 1
},
{
  name: 'ingredients',
  source: substringMatcher(ingredients)
});
    
    /*
    $(function(){

$("input[name=name]").val("somename");
$("input[name=email]").val("323@ds.com");
$('#aweberform').submit();

});
*/
    
function refresh() {
        //tyhjenna reseptit naytolta
        $( "#receipes" ).empty();
        
        //hae kayttajan pyytama ruoka-aine
    var addedstate = $('#datainput').val();
        //tarkista että ruoka-aines on ennalta maaritetyssa aines-listassa
    var ingredientId = $.inArray(addedstate, ingredients);
        
    if (ingredientId != -1) {
        //jos ruoka-aines ei ole jo lisatty..
        if($.inArray(ingredients[ingredientId], haettavatAineet) == -1){
            //lisaa ruoka-aines listaan:
            haettavatAineet.push(ingredients[ingredientId]);       
        }
        //hae reseptit
        haeAineet();
    }
    $( "#datainput" ).val('');
}
    
    $("#submitbutton").click(function(){
        refresh();
});
    /** remove ingredients by clicking **/
    $('body').on('click', 'span.label-success', function() {
        haettavatAineet.splice($.inArray($(this).text() ,haettavatAineet),1);
        $(this).remove();
        $( "#receipes" ).empty();
        haeAineet();
        //tassa voisi klikattaessa päivittää reseptit poistetun mukaan
    });

    
        
    $("#clearbutton").click(function(){
        $( "#receipes" ).empty();
        $( "#content" ).empty();
        haettavatAineet = []; //clear the array
        
    });
    
});
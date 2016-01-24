$(function() {

    var haettavatAineet =[];
    
    var haettavat = ['Peruna', 'Pippuri']
    //TODO: AJAX-back-end query for ruokaAineet & receipes
    var ruokaAineet = ['Hunaja', 'Kaurahiutale', 'Kauraryyni', 'Ohrajauho', 'Ruisjauho', 'vehnäjauho', 'riisi', 'Sokeri', 'Voi', 'Öljy', 'Suola', 'Pippuri', 'Bulgur', 'Maizena-suuruste', 'Bearnaisekastikejauhe', 'Ahven', 'Anjovis', 'Artisokka', 'Appelsiini', 'Aprikoosi', 'Ananas', 'Avokado', 'Seitan', 'Peruna', 'tofu', 'Kaali', 'Kyssäkaali', 'Keräkaali', 'Kiinankaali', 'Jauheliha', 'Palsternakka', 'Punajuuri'
    ];
    
    //NOTE! CASE-SENSITIVE
    var receipes = '{ "reseptit" : [' +
'{ "nimi":"Hedelmä-jälkiruoka" , "ohje":"sekoita keskenään 1" ,"ainekset":["Appelsiini", "Aprikoosi", "Ananas"] },' +
'{ "nimi":"Perunavuoka" , "ohje":"Voitele vuoka, lisää aineet", "ainekset":["Peruna", "Jauheliha", "maito", "Pippuri"] },' +
'{ "nimi":"Uunivihannekset" , "ohje":"Laita uuni 200 asteeseen ja laita aineet pellille", "ainekset":["Peruna", "Palsternakka", "punajuuri"] },' +
'{ "nimi":"Jauhelihakeitto" , "ohje":"Ruskista jauheliha ja sipulit etc", "ainekset":["Jauheliha", "Peruna", "Suola", "Pippuri"] } ]}';
    
    var obj = $.parseJSON(receipes);
    
    
function haeAineet(ainesLocationInRuokaAineet) {

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
        $( "#receipes" ).append(obj.reseptit[index].nimi+": "+
                                obj.reseptit[index].ainekset+"<li>"+obj.reseptit[index].ohje
                                +"</li><br>");
    }
    });
 
    
    
    /** avaa resepti
        jos resepti pitää sisällään kaikki haettavat aineet, palauta reseptin nimi
    **/
    $( "#content" ).empty();
    $(haettavatAineet).each(function ( index ) {
        //   $( "#content" ).append(haettavatAineet[index]+"<br>");
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
  name: 'ruokaAineet',
  source: substringMatcher(ruokaAineet)
});
    
    /*
    $(function(){

$("input[name=name]").val("somename");
$("input[name=email]").val("323@ds.com");
$('#aweberform').submit();

});
*/

    
    $("#submitbutton").click(function(){
        //tyhjenna reseptit naytolta
        $( "#receipes" ).empty();
        //hae kayttajan pyytama ruoka-aine
    var addedstate = $('#datainput').val();
        //tarkista että ruoka-aines on ennalta maaritetyssa aines-listassa
    var ingredientId = $.inArray(addedstate, ruokaAineet);
        
    if (ingredientId != -1) {
        //jos ruoka-aines ei ole jo lisatty..
        if($.inArray(ruokaAineet[ingredientId], haettavatAineet) == -1){
            //lisaa ruoka-aines listaan:
            haettavatAineet.push(ruokaAineet[ingredientId]);       
        }
        //hae reseptit
        haeAineet(ruokaAineet[ingredientId]);
    }
    
});
    
        
    $("#clearbutton").click(function(){
        $( "#receipes" ).empty();
        $( "#content" ).empty();
        haettavatAineet = []; //clear the array
        
    });
    
});
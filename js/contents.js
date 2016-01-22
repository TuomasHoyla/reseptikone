$(function() {

    //TODO: AJAX-back-end query for ruokaAineet & receipes
    var ruokaAineet = ['Hunaja', 'Kaurahiutale', 'Kauraryyni', 'Ohrajauho', 'Ruisjauho', 'vehnäjauho', 'riisi', 'Sokeri', 'Voi', 'Öljy', 'Suola', 'Pippuri', 'Bulgur', 'Maizena-suuruste', 'Bearnaisekastikejauhe', 'Ahven', 'Anjovis', 'Artisokka', 'Appelsiini', 'Aprikoosi', 'Ananas', 'Avokado', 'seitan', 'Peruna', 'tofu', 'Kaali', 'Kyssäkaali', 'Keräkaali', 'Kiinankaali', 'Jauheliha', 'Palsternakka', 'åuhanjuuri'
    ];
    
    var haettavatAineet =[];
    
    var receipes = '{ "reseptit" : [' +
'{ "nimi":"Hedelmä-jälkiruoka" , "ainekset":["Appelsiini", "Aprikoosi", "Ananas"] },' +
'{ "nimi":"Perunavuoka" , "ainekset":["Peruna", "Jauheliha", "maito"] },' +
'{ "nimi":"Uunivihannekset" , "ainekset":["Peruna", "Palsternakka", "punajuuri"] },' +
'{ "nimi":"Jauhelihakeitto" , "ainekset":["Jauheliha", "Peruna", "Suola"] } ]}';
    
    var obj = $.parseJSON(receipes);
    
    
function haeAineet(ainesLocationInRuokaAineet) {
    $(obj.reseptit).each(function( index ) {
        if (($.inArray(ainesLocationInRuokaAineet, obj.reseptit[index].ainekset)) != -1) {
            $( "#receipes" ).append(obj.reseptit[index].nimi +"<br>");
        }
    });
    
    
    var success = array_a.every(function(v,i) {
        alert(array_b.indexOf(v) !== -1);
    });
    alert(success);
    
    /**
    How to check whether multiple values exist within an Javascript array:
    var success = array_a.every(function(v,i) {
    return array_b.indexOf(v) !== -1;
});
    
        //alert(ainesLocationInRuokaAineet);
        /*
        $.each( arr, function( index, value ){
            obj.reseptit[0].ainekset
        });


            
    //    var ingredientId = $.inArray(addedstate, ruokaAineet);
        /**FOR-loop:
        lisää lisätty aines haettavataineet[]-arrayhyn, jossa on haettavat ainekset
        käy reseptit  läpi (FOR-1), jotka pitävät sisällään ensimmäisen entryn aineista, toisen entryn aineista..
        JOS Resepti pitää sisällään (inArray) ainesosan, palauta reseptin location receipes[]-arrayssa
        ja hae receipes-arraysta locationilla reseptit.[location].name
*/
    
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

    
    $(".btn").click(function(){
    var addedstate = $('#datainput').val();
    var ingredientId = $.inArray(addedstate, ruokaAineet);
        
    if (ingredientId != -1) {
        $( "#content" ).append(ruokaAineet[ingredientId]+"<br>"); //Nyt tuplana, parempi ratkaisu olisi että päivittäisi diviä jossa kaikki haetut aineet
        haettavatAineet.push(ruokaAineet[ingredientId]); 
        haeAineet(ruokaAineet[ingredientId]);
    }
        
    /**
    Eli nokkimisjärjestys on tämä:
        - lisää jokainen lisätty state ingredients[]-listaan
        tee lista ingredientsien pohjalta (#content)-diviin pilsseinä
        Hae raaka-aineet 
    */
        
    
});
    
});
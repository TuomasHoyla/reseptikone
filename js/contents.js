$( document ).ready(function() {
    /*
    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

*/
    
    var ruokaAineet = ['Hunaja', 'Kaurahiutale', 'Kauraryyni', 'Ohrajauho', 'Ruisjauho', 'vehnäjauho', 'riisi', 'Sokeri', 'Voi', 'Öljy', 'Suola', 'Pippuri', 'Bulgur', 'Maizena-suuruste', 'Bearnaisekastikejauhe', 'Ahven', 'Anjovis', 'Artisokka', 'Appelsiini', 'Aprikoosi', 'Ananas', 'Avokado', 'seitan', 'Peruna', 'tofu', 'Kaali', 'Kyssäkaali', 'Keräkaali', 'Kiinankaali', 'Jauheliha'
    ];
    
    var receipes = 
        '{"Resepti": [{"nimi":"Hedelmä-jälkiruoka"}, {"ainekset":["Appelsiini", "Aprikoosi", "Ananas"]}],[{"nimi":"Jauhelihakeitto"}, {"ainekset":["Jauheliha", "Peruna", "Suola"]}]}';
    //var arr = JSON.parse(pets);
    
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
  highlight: true,
  minLength: 1
},
{
  name: 'ruokaAineet',
  source: substringMatcher(ruokaAineet)
});
    
    $(".btn").click(function(){
    var addedstate = $('#datainput').val();
    var ingredientId = $.inArray(addedstate, ruokaAineet);
        
    if (ingredientId != -1) {
        $( "#content" ).append(ruokaAineet[ingredientId]);
    }
        
    /**
    Eli nokkimisjärjestys on tämä:
        - lisää jokainen lisätty state ingredients[]-listaan
        tee lista ingredientsien pohjalta (#content)-diviin pilsseinä
        
        Hae raaka-aineet 
    */
        
    
    
    
    
});
    
});
var input = document.getElementById('input');
var btn = document.getElementById("button");
var content = document.getElementById("resultbox");
//var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=35&gsrsearch=";


 var api = "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=" ;
  
 
 var append = "&prop=info&inprop=url&utf8=&format=json";


//Be sure to include the &origin=* parameter in your endpoint to prevent any CORS issues.
// https://en.wikipedia.org/wiki/Special:Random
// https://www.mediawiki.org/wiki/API:Main_page
////var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=35&gsrsearch='New_England_Patriots'";
//https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=%27silver%27&prop=info&inprop=url&utf8=&format=json
// console.log(URL); 
//console.log(input.value);


btn.addEventListener("click", function(e){
        $("#resultbox").empty();
        e.preventDefault();

        if(input.value === ''){
            input.classList.add('error');
            alert("please enter something");

        }else{

            //var URL = api + "%27" + input.value.replace(/[\s]/g, '_') + "%27"; // Replace whitespaces with underscores

            var URL = api + "%27" + input.value.replace(/[\s]/g, '_') + "%27"+ append;
            //console.log(URL);
            input.value = '';
            wikiSearch(URL);
        }

        
});

function wikiSearch(url){

    $.ajax({
        url: url,
        success: function(result) {
            //console.log('Result:', result); 
            //console.log('Pages:', result.query.pages); // Returns result pages within result object
            //for-in for looping objects
            //for(var i in result.query.search){
            //  console.log(result.query.search[i].snippet);
                //}
                if(result.query.searchinfo.totalhits !== 0) {
                    var title = [];
                    var desc = [];
                    for(var i = 0; i < result.continue.sroffset ; i++) {
                       title.push(result.query.search[i].title);
                       desc.push(result.query.search[i].snippet);
                       var wiki = '<div class = "deep-orange lighten-5"><div class="indigo-text accent-4"><a href="https://en.wikipedia.org/wiki/'+title[i]+'" target = "_blank">'+ title[i] + '</a></div><div>'+ desc[i] +'...</div></div> <br>';
                       $('#resultbox').append(wiki);
                    }
        }
    }
    });
}
    

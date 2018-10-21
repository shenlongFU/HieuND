
//id search = search term
// querry = keyword
//result list = search result
/* $('#search').on('submit',function(){

})
 $('#submit').on("click", function (req,res) {
    let user_querry= $("#keyword").val();
	$.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q='+user_querry+'&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
		type: 'GET',
		success: function (response) {
			if (response) {
				console.log("SC")
			}
		},
		error: function (err) {
			console.log(err);
		}
	}) 
}); */
        $(document).ready(function(event){
         $('#search').submit(function (event) {
            event.preventDefault();
            var searchTerm = $('#keyword').val();
        //    getRequest(searchTerm);
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}'&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            type: "GET",
            success: function(data) {
                const items = data.items;
                for(let i =0 ; i< items.length;i++)
                {
                    let item = items[i];
                    console.log(item);
                    $('#result-list').append(`  <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}?autoplay=true" target="_blank">
                    <img src="${item.snippet.thumbnails.high.url}" alt="">
                    <div><h2>${item.snippet.title}</h2></div>
                     <div class="video_info">
                     <p class="description">${item.snippet.description}</p>
                        <span>View >></span>
                      </div>
                </a>`)
                }
            }
        })
         }
         )
        });      
                
     
  
    /*
     function getRequest(searchTerm) {
        var url = 'https://www.googleapis.com/youtube/v3/search';
        var params = {
            part: 'snippet',
            key: 'AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
            q: searchTerm
        };
      
        $.getJSON(url, params, showResults);
    } */
    /*
    function showResults(results) {
        var html = "";
        var entries = results.items;
        
        $.each(entries, function (index, value) {
            var title = value.snippet.title;
            var thumbnail = value.snippet.thumbnails.default.url;
            html += '<p>' + title + '</p>';
            html += '<img src="' + thumbnail + '">';
        }); 
        
        $('#result-list').html(html);
    } 
*/

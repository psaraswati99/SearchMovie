$(document).ready(()=>{
	$('#searchForm').on('submit',(e) =>{
		let searchText=$('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText){
	axios.get('http://www.omdbapi.com/?apikey=e0620bd4&s='+searchText)
		.then((response)=>{
			console.log(response);
			let movies =response.data.Search;
			let output=' ';
			$.each(movies,(index,movie)=>{
				output +=`
				<div style="border:1px solid white;float:left;margin:5px;width:250px;height:500px;">
					<img src="${movie.Poster}" onClick="mSelected('${movie.imdbID}')" style="padding:20px;"><hr>
					<h5 style="padding-left:5px;">${movie.Title}</h5>
					<a onClick="mSelected('${movie.imdbID}')" href="#" style="padding-left:5px;color:red;">Get movie detail</a>
				</div>
				`;
			});
			output=output+`
			</form>
<div id="cont2">
  <form method="POST" action="./">
	<table>
		<caption style="text-align:center;text-decoration:underline;">Add Movie Detail</caption>
      <tr>
        <th>Name</th>
        <td><input type="text" name="mov_name" placeholder="Name"></td>
      </tr>
      <tr>
        <th>URL</th>
        <td>
          <input type="url" name="url_data" placeholder="URL of image">
        </td>
      </tr>
      <tr>
        <th>Summary</th>
        <td>
          <textarea name="mov_sum" rows="15" cols="50" placeholder="Summary"></textarea>
        </td>
      </tr>
      <tr>
        <td><input type="submit" value="Submit"></td>
        <td><input type="reset" value="Reset"></td>
      </tr>
    </table>
  </form>
			`;
			$('#movies').html(output);
	})
		.catch((err)=>{
		console.log(err);
	});
}

function mSelected(id)
{
	sessionStorage.setItem('movieId',id);
	window.location='movie.html';
	return false;
}

function getMovie()
{
	var movieId=sessionStorage.getItem('movieId');
	axios.get('http://www.omdbapi.com/?apikey=e0620bd4&i='+movieId)
		.then((response)=>{
			console.log(response);
			let movie=response.data;
			let output=`
				<table style="border:1px solid white;padding:10px;">
				<tr>
				<td><img src="${movie.Poster}" style="border:2px solid white;margin:10px;"></td>
				<td>
				<h2>Title: ${movie.Title}</h2>
				<p>Genre: ${movie.Genre}</p>
				<p>Year: ${movie.Year}</p>
				<p>Type: ${movie.Type}</p>
				<p>Released: ${movie.Released}</p>
				<p>Rating: ${movie.Rated}</p>
				<p>imdbRating: ${movie.imdbRating}</p>
				<p>Director: ${movie.Director}</p>
				<p>Writer: ${movie.Writer}</p>
				<p>Actor: ${movie.Actor}</p>
				<p>Plot: ${movie.Plot}</p>
				<div><a type="button" href="search.html" style="border:1px solid red;color:Red;padding:10px;margin-top:100%;">Go Back To Home Page</a></div>
				</td>
				</tr>
				</table>
				`;
				$('#movie').html(output);

			
	})
		.catch((err)=>{
		console.log(err);
	});
}



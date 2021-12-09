/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }

 */

function transformShowData(show) {
  // takes a show from a raw API response returned by tvMaze, and converts it into a usable object
  let showImage = checkImage(show.image)

  return {
    id: show.id,
    name: show.name,
    summary: show.summary,
    image: showImage
  }
}

function checkImage(imgObject) {
  // check to see if a show's image is populated, else return a tv-missing image
  if (imgObject) {
    return imgObject.medium;
  } else {
    return "https://tinyurl.com/tv-missing";
  }
}

function transformEpisodeData(episode) {
  // takes a show from a raw API response returned by tvMaze, and converts it into a usable object
  return {
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number
  }
}



async function searchShows(query) {
  // use tvMaze search API to collect a show list for a given query
  // return an array of objects of the form {id, name, summary, image}

  let url = `http://api.tvmaze.com/search/shows?q=${query}`

  let response = await axios.get(url);

  if (response.status === 200) {
    // extract the data for each show from the response
    if (response.data.length) {
      return response.data.map(show => show.show).map(transformShowData)
    } else {
      return [{ id: "No results found.", name: "", summary: "", image: checkImage('') }]
    }
  }
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    console.log(show)
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src=${show.image}>
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <a href="#" class="btn btn-primary col-12">View Episodes</a>
           </div>
         </div>
       </div>
      `);
    if (show.id == 'No results found.') {
      $item.prepend($('<div>').text('No Results Found'))
      $item.find('a.btn').remove()
    }

    let func = getEpisodes.bind(undefined, show.id);

    $item.on('click', async (event) => {
      event.preventDefault();
      if (event.target.nodeName === 'A') {
        let data = await func();
        populateEpisodes(data);
      }
    }
    )
    $showsList.append($item);
  }
}

function populateEpisodes(episodes) {

  // fetch episode list, and clear previous results (if any)
  let episodesList = $(`#episodes-list`);
  episodesList.empty()

  // make the episodes appear
  episodesList.parent().css('display', "inline")

  // add an <li> tag for each episode in episodes
  episodes.forEach((episode) => {
    $('<li>').text(`${episode.name} (season ${episode.season}, number ${episode.number})`).appendTo(episodesList);
  })
}



/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      {id, name, season, number}
      */

async function getEpisodes(id) {
  // function takes a show id (int) or str(int), and makes a request to the episodes API.
  // returns a list of objects of the following structure: { id, name, season, number }
  let url = `http://api.tvmaze.com/shows/${id}/episodes`

  let response = await axios.get(url); // fetch episode list
  if (response.status === 200) {
    return response.data.map(transformEpisodeData)
  } else {
    alert('Error: the server response:' + response.status)
  }
}

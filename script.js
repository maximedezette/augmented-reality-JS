$(document).ready(function () {



    var latitude;
    var longitude;
    var apiData;

    navigator.geolocation.getCurrentPosition(getLatLon);

    function getLatLon(position) {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    }

    console.log("C'est parti!");

    let url = "https://api.airvisual.com/v2/nearest_city?lat=" + latitude + "&lon=" + longitude + "&key=8a027f46-54a7-40a3-a25d-0fb69fdc09cd";

    //Chargement des entités
    $.ajax({
        url: url
    }).then(function (data) {
        apiData = data;
        console.log(data);
        console.log(apiData['data']['current']['pollution']['aqius']);


        let pollution = apiData['data']['current']['pollution']['aqius'];

        console.log('polution: ' + pollution)
        showInformation(pollution, apiData['data']['city']);
        go();
    });



});


function showInformation(pollution, cityName) {

    const seuilDePollution = 100;

    let image;
    let backgroundDiv;

    if (pollution <= seuilDePollution) {
        image = 'fire.gltf';
        backgroundDiv = 'green';
    } else {
        image = 'square.gltf';
        backgroundDiv = 'red';
    }

    let html = '<a-asset-item id="fire" src="' + image + '"></a-asset-item><a-entity gltf-model="#fire" scale="0.1 0.1 0.1"></a-entity>';

    let infoDiv = '<div style="background:' + backgroundDiv + ';border:3px solid green;width: 300px; height: 200px; " id="html-content">' +
        'Ville: ' + cityName + ' <br/>' +
        'Pollution: ' + pollution +
        '</div>';

    $('#information').append(html);
    $('#information').append(infoDiv);

    console.log('fait!');
}

async function go() {
    const cnv = await html2canvas(document.querySelector('#html-content'));
    document.getElementById("image").src = cnv.toDataURL();
};
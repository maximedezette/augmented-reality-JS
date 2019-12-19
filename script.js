$(document).ready(function () {

    var latitude;
    var longitude;
    var apiData;

    navigator.geolocation.getCurrentPosition(getLatLon);

    function getLatLon(position){

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    }

    console.log("C'est parti!");

       let  url = "http://api.airvisual.com/v2/nearest_city?lat="+latitude+"&lon="+longitude+"&key=8a027f46-54a7-40a3-a25d-0fb69fdc09cd";

        //Chargement des entités
        $.ajax({
            url: url
        }).then(function (data) {
            apiData = data;
           console.log(data);
           console.log(apiData['data']['current']['pollution']['aqius']);

           let pollution = apiData['data']['current']['pollution']['aqius'];
           
           console.log('polution: ' + pollution)
           showInformation(pollution);
        });


    
});


function showInformation(pollution){

    let image;

    if(pollution <= 50){
        image = 'fire.gltf';
    }else{
        image = 'square.gltf';
    }

    let html = '<a-asset-item id="fire" src="'+ image +'"></a-asset-item><a-entity gltf-model="#fire" rotation="90 0 0" scale="0.5 0.5 0.5"></a-entity>';
    $('#information').append(html);
    console.log('fait!');
}
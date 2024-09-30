document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('input#searchInput').value;
    

    if(input !== ''){
        limparInfos();
        mostrarMensagem('Carregando...')
        let URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&unitis=metric&lang=pt_br`
        let resultados = await fetch(URL);
        let rJson = await resultados.json();
        console.log(rJson);

        if(rJson.cod == 200){
            mostrarInfo({
                name: rJson.name,
                country: rJson.sys.country,
                temp: Math.round(rJson.main.temp),
                tempIcon: rJson.weather[0].icon,
                windSpeed: rJson.wind.speed,
                windAngle: rJson.wind.deg               

            })
        }else{
            document.querySelector('div.resultado').style.display = 'none';
            mostrarMensagem('Não encontramos essa localização.');
        }

    }

    function limparInfos(){
        mostrarMensagem('');
        document.querySelector('div.resultado').style.display = 'none';
    }

    function mostrarInfo(rJson){
        mostrarMensagem('');
        let nString = `${String(rJson.temp)}`;
        let tempFormat = `${nString[0]}${nString[2]}`;
        console.log(nString);
        document.querySelector('.titulo').innerHTML = `${rJson.name} - ${rJson.country}`;
        document.querySelector('.tempInfo').innerHTML = `${tempFormat}<sup>ºC</sup>`;        
        console.log(nString[0])
        console.log(nString[1])
        document.querySelector('.ventoInfo').innerHTML = `${rJson.windSpeed} km/h`;
        document.querySelector('.ventoPonto').style.transform = `rotate(${rJson.windAngle - 90}deg)`;
        document.querySelector('div.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${rJson.tempIcon}@2x.png`)
        document.querySelector('div.resultado').style.display = 'block';

    }

    function mostrarMensagem(msg){
        document.querySelector('div.aviso').innerHTML = msg;
    }

})


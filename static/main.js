(function () {
    function Initialize() {
        document.getElementById("playButton").onclick = OnPlayClick;
        document.getElementById("prevButton").onclick = OnPrevClick;
        document.getElementById("nextButton").onclick = OnNextClick;
        GetStations().onchange = Play;

        LoadStations();
        UpdateButtons();
    }

    function GetPlayer() {
        return document.getElementById("player");
    }

    function GetStations() {
        return document.getElementById("stations");
    }

    function LoadStations() {
        fetch("static/stations.json").then(r => {
            r.json().then(stationsList => {
                const stations = GetStations();
                stationsList.forEach(function (station) {
                    stations.options[stations.options.length] = new Option(station.name, station.url);
                });
            })
        })
    }

    function UpdateButtons() {
        var button = document.getElementById("playButton");
        if (GetPlayer().paused) {
            button.classList.remove("playing");
        } else {
            button.classList.add("playing");
        }
    }

    function Play() {
        var stations = GetStations();
        var player = GetPlayer();
        player.src = stations.value;
        player.play();
        UpdateButtons();
        document.title = stations.options[stations.selectedIndex].text;
    }

    function Stop() {
        GetPlayer().pause();
        UpdateButtons();
    }

    function OnPlayClick() {
        if (GetPlayer().paused) Play();
        else Stop();
    }

    function OnPrevClick() {
        var stations = GetStations();
        var newIndex = stations.selectedIndex - 1;
        stations.selectedIndex = newIndex < 0 ? stations.length - 1 : newIndex;
        Play();
    }

    function OnNextClick() {
        var stations = GetStations();
        stations.selectedIndex = (stations.selectedIndex + 1) % stations.length;
        Play();
    }

    Initialize();
})();
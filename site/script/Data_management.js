/**
 * Created by Shimishsar on 25/01/2016.
 */

function load_data(id)
{
    var     data;

    data = JSON.parse(window.localStorage.getItem(String(id)));

    return data;
}

function create_config()
{
    var     config;

    config ={
        version: "humors",
        time: 30,           //durée de la partie en secondes.
        counter: 5,         //durée pendant laquelle les carte sont face visible avant le debut de la partie, en secondes.
        see: "test",
        nbpair: 6,
        nbUser: 0
    };

    return config;
}

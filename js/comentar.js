function comentar() {
    let comments = {
        "score": undefined,
        "description": undefined,
        "user": undefined,
        "dateTime": undefined
    };
    comments.user = localStorage.getItem("usuario");
    comments.description = document.getElementById("comentario").value;
    comments.score = document.getElementById("puntaje").value;
    comments.dateTime = fechaActual();
    comentarios.push(comments);
    showComments();
    document.getElementById("comentario").value = undefined;
    comments.score = document.getElementById("puntaje").value = "1";

}

function fechaActual()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var minmin = today.getMinutes();
    var ss = today.getSeconds();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

            today = yyyy + '-' + mm + '-' + dd + " "+hh+ ":"+ minmin + ":"+ ss;
        return today;
    }

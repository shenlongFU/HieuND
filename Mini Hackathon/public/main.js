$("#createForm").on("submit", (event) => {
    event.preventDefault();
    let player = ["","","",""];
    for(let i = 1; i <= 4; i ++) {
        if($(player$i).val() != "") {
            player[i-1] = $(player$i).val();
        } else {
           console.log("createForm fail");
        }
    }
    $.ajax({
        url: "/game/create",
        type: "POST",
        headers: {"Content-Type" : "application/json"},
        data: JSON.stringify({
            player
        }),
        success: (body) => {
            window.location.href = "/game/" + body.gameID;
        }
    });
})

// axios.get("http://localhost:3000/randomquestion")
// .then(function (response) {
//     if(response.data) {
// 		document.getElementById("questionContent").innerText = response.data.questionContent;
// 	}
// })
// .catch(function (error) {
// 	console.log(error);
// });


function getRandomQuestion() {
	$.ajax({
		url: "http://localhost:3000/randomquestion",
		type: "GET",
		success: function(response) {
			if(response) {
				$("#questionContent").text(response.questionContent);
				$(".answer_btn").data("questionid", response.id);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}

getRandomQuestion();

$("#otherQuestion").on("click", function() {
	getRandomQuestion();
});

$(".answer_btn").on("click", function() {
	console.log($(this).data())
	$.ajax({
		url: "http://localhost:3000/answer",
		type: "POST",
		data: $(this).data(),
		success: function(response) {
			if(response.success) {
				window.location.href = "/";
			}
		},
		error: function(err) {
			console.log(err);
			window.location.href = "https://google.com/search?q=site:stackoverflow.com why my code didn't run";
		}
	})
	
});

$.ajax({
    url: 'http://localhost:3000/getResult',
    type: "GET",
    success: function (response) {
        if (response) {
            let total = response.yes + response.no;
            $("#total").text(total);
            $("#Yes").text(response.yes / total * 100);
            $("#No").text(response.no / total * 100);
            $("#quest").text(response.questionContent);
        }
    },
    error: function (err) {
        console.log(err);
    }
})
$('#showResult').on("click", function () {
	$.ajax({
		url: 'http://localhost:3000/result',
		type: 'GET',
		success: function (response) {
			if (response) {
				window.location.href = "/result";
			}
		},
		error: function (err) {
			console.log(err);
		}
	})
});
// 音声入力
// 問題ごとの完了日をローカルストレージに保存する
// 問題ごとのタイム秒をローカルストレージに保存する

const problem_configs = {
    "prob_dev_test" : {
        "problem_id" : "prob_dev_test",
        "problem_name" : "開発用テスト問題",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 1,
        },
        "item_2" : {
        "min" : 11,
        "max" : 12,
        },
    },
    "prob_add_10" : {
        "problem_id" : "prob_add_10",
        "problem_name" : "たし算&nbsp;10～19",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 10,
        "max" : 19,
        },
    },
    "prob_add_20" : {
        "problem_id" : "prob_add_20",
        "problem_name" : "たし算&nbsp;20～29",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 20,
        "max" : 29,
        },
    },
    "prob_add_30" : {
        "problem_id" : "prob_add_30",
        "problem_name" : "たし算&nbsp;30～39",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 30,
        "max" : 39,
        },
    },
    "prob_add_40" : {
        "problem_id" : "prob_add_40",
        "problem_name" : "たし算&nbsp;40～49",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 40,
        "max" : 49,
        },
    },
    "prob_add_50" : {
        "problem_id" : "prob_add_50",
        "problem_name" : "たし算&nbsp;50～59",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 50,
        "max" : 59,
        },
    },
    "prob_add_60" : {
        "problem_id" : "prob_add_60",
        "problem_name" : "たし算&nbsp;60～69",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 60,
        "max" : 69,
        },
    },
    "prob_add_70" : {
        "problem_id" : "prob_add_70",
        "problem_name" : "たし算&nbsp;70～79",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 70,
        "max" : 79,
        },
    },
    "prob_add_80" : {
        "problem_id" : "prob_add_80",
        "problem_name" : "たし算&nbsp;80～89",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 80,
        "max" : 89,
        },
    },
    "prob_add_90" : {
        "problem_id" : "prob_add_90",
        "problem_name" : "たし算&nbsp;90～99",   
        "operator" : "addition",
        "item_1" : {
            "min" : 0,
            "max" : 9,
        },
        "item_2" : {
        "min" : 90,
        "max" : 99,
        },
    },
}

$(document).ready(function(){
    $("tr.problem_row").click(function(){
        const problem_id = $(this).attr("id")
        console.log(problem_id)
        createProblems(problem_id)
        setNextProblem()
        all_problems_start_unix_time = Date.now()
        $("#progress_bar").css("width", "0%")
        $("#done_list_group").prepend(`<li class="list-group-item"><i class="bi bi-play-circle"></i>&nbsp;${current_problem_config.problem_name}&nbsp;開始</li>`)
    });
});

const problems = []
let correct_count = 0
let all_problems_start_unix_time
let each_problem_start_unix_time
let current_problem_config
function createProblems(problem_id) {
    const problem_config = problem_configs[problem_id]
    problems.splice(0)

    const item_1_numbers = shuffleArray(createNumberArray(problem_config.item_1.min, problem_config.item_1.max))
    const item_2_numbers = shuffleArray(createNumberArray(problem_config.item_2.min, problem_config.item_2.max))

    item_1_numbers.forEach((num_1) => {
        item_2_numbers.forEach((num_2) => {
            if(problem_config.operator == "addition"){
                const answer = num_1 + num_2
                problems.push({
                    "formula" : `${num_1} + ${num_2} = `,
                    "answer" : answer
                })
            }
        });
    });
    current_problem_config = problem_config
} 

function setNextProblem(){
    if(problems.length == 0){
        closeProblems()
        return ;
    }
    const problem = problems.pop()
    $("#calculation").text(`${problem.formula}□`)
    each_problem_start_unix_time = Date.now()
    $("#answer")
        .val("")
        .off("keyup")
        .keyup(function(){
            if($(this).val() == problem.answer){
                correct_count++
                const duration_seconds = Math.floor((Date.now() - each_problem_start_unix_time) / 100) / 10
                $("#done_list_group").prepend(`<li class="list-group-item"><i class="bi bi-check text-success"></i>&nbsp;${problem.formula}${problem.answer}&nbsp;(${duration_seconds.toFixed(1)}秒)</li>`)
                const progress = Math.floor(correct_count / (correct_count + problems.length) * 100)
                $("#progress_bar").css("width", `${progress}%`)

                setNextProblem()
            }
        })
        .prop("disabled", false)
        .focus()
}

function closeProblems(){
    const total_duration_seconds = (Math.floor((Date.now() - all_problems_start_unix_time) / 100) / 10).toFixed(1)
    $("#answer").val("").off("keyup").prop("disabled", true)
    $("#progress_bar").css("width", `100%`)
    $("#calculation").html(`<i class="bi bi-check-circle text-success"></i>&nbsp;${current_problem_config.problem_name}&nbsp;全${correct_count}問を${total_duration_seconds}秒で終了しました`)
    correct_count = 0
    $("#done_list_group").prepend(`<li class="list-group-item"><i class="bi bi-check-circle text-success"></i>&nbsp;${current_problem_config.problem_name}&nbsp;全問完了(${total_duration_seconds}秒)</li>`)
    current_problem_config
}





function shuffleArray(array) {
    const shuffledArray = [];
    // 元の配列から要素をランダムに取り出し、新しい配列に追加する
    while (array.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        shuffledArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return shuffledArray;
}

function createNumberArray(min, max) {
    const numbers = [];
    for (var i = min; i <= max; i++) {
        numbers.push(i);
    }
    return numbers;
}
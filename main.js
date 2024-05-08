// 音声入力
// 回答が間違っていることを可視化する
// 次の問題に移ったことをわかりやすくする
// 終了のタイミングでログもローカルストレージに保存する

// リファクタリング
// TypeScript化
// doneとlogの名前をそろえる

const problem_configs = {
    "prob_add_00": {
        "problem_id": "prob_add_00",
        "problem_name": "たし算&nbsp;0～9",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 0,
            "max": 9,
        },
    },
    "prob_add_10": {
        "problem_id": "prob_add_10",
        "problem_name": "たし算&nbsp;10～19",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 10,
            "max": 19,
        },
    },
    "prob_add_20": {
        "problem_id": "prob_add_20",
        "problem_name": "たし算&nbsp;20～29",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 20,
            "max": 29,
        },
    },
    "prob_add_30": {
        "problem_id": "prob_add_30",
        "problem_name": "たし算&nbsp;30～39",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 30,
            "max": 39,
        },
    },
    "prob_add_40": {
        "problem_id": "prob_add_40",
        "problem_name": "たし算&nbsp;40～49",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 40,
            "max": 49,
        },
    },
    "prob_add_50": {
        "problem_id": "prob_add_50",
        "problem_name": "たし算&nbsp;50～59",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 50,
            "max": 59,
        },
    },
    "prob_add_60": {
        "problem_id": "prob_add_60",
        "problem_name": "たし算&nbsp;60～69",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 60,
            "max": 69,
        },
    },
    "prob_add_70": {
        "problem_id": "prob_add_70",
        "problem_name": "たし算&nbsp;70～79",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 70,
            "max": 79,
        },
    },
    "prob_add_80": {
        "problem_id": "prob_add_80",
        "problem_name": "たし算&nbsp;80～89",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 80,
            "max": 89,
        },
    },
    "prob_add_90": {
        "problem_id": "prob_add_90",
        "problem_name": "たし算&nbsp;90～99",
        "operator": "addition",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 90,
            "max": 99,
        },
    },
    "prob_sub_10": {
        "problem_id": "prob_sub_10",
        "problem_name": "ひき算&nbsp;10～19",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 10,
            "max": 19,
        },
    },
    "prob_sub_20": {
        "problem_id": "prob_sub_20",
        "problem_name": "ひき算&nbsp;20～29",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 20,
            "max": 29,
        },
    },
    "prob_sub_30": {
        "problem_id": "prob_sub_30",
        "problem_name": "ひき算&nbsp;30～39",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 30,
            "max": 39,
        },
    },
    "prob_sub_40": {
        "problem_id": "prob_sub_40",
        "problem_name": "ひき算&nbsp;40～49",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 40,
            "max": 49,
        },
    },
    "prob_sub_50": {
        "problem_id": "prob_sub_50",
        "problem_name": "ひき算&nbsp;50～59",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 50,
            "max": 59,
        },
    },
    "prob_sub_60": {
        "problem_id": "prob_sub_60",
        "problem_name": "ひき算&nbsp;60～69",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 60,
            "max": 69,
        },
    },
    "prob_sub_70": {
        "problem_id": "prob_sub_70",
        "problem_name": "ひき算&nbsp;70～79",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 70,
            "max": 79,
        },
    },
    "prob_sub_80": {
        "problem_id": "prob_sub_80",
        "problem_name": "ひき算&nbsp;80～89",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 80,
            "max": 89,
        },
    },
    "prob_sub_90": {
        "problem_id": "prob_sub_90",
        "problem_name": "ひき算&nbsp;90～99",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 9,
        },
        "item_2": {
            "min": 90,
            "max": 99,
        },
    },
    "prob_dev_test": {
        "problem_id": "prob_dev_test",
        "problem_name": "開発用テスト",
        "operator": "subtraction",
        "item_1": {
            "min": 0,
            "max": 1,
        },
        "item_2": {
            "min": 11,
            "max": 12,
        },
    },
}

const problems = []
let user_done_date
let user_done_count
let user_best_record

let correct_count = 0
let all_problems_start_unix_time
let each_problem_start_unix_time
let current_problem_config
let correct_sound_audio

$(document).ready(function () {
    user_done_date = getMapFromLocalStorage("user_done_date")
    user_done_count = getMapFromLocalStorage("user_done_count")
    user_best_record = getMapFromLocalStorage("user_best_record")
    rebuildProblemRows()
    correct_sound_audio = $("#correct_sound").get(0)
});

function createProblems(problem_id) {
    const problem_config = problem_configs[problem_id]
    problems.splice(0)

    const item_1_numbers = shuffleArray(createNumberArray(problem_config.item_1.min, problem_config.item_1.max))
    const item_2_numbers = shuffleArray(createNumberArray(problem_config.item_2.min, problem_config.item_2.max))

    item_1_numbers.forEach((num_1) => {
        item_2_numbers.forEach((num_2) => {
            if (problem_config.operator == "addition") {
                const answer = num_1 + num_2
                problems.push({
                    "formula": `${num_1} + ${num_2} = `,
                    "answer": answer
                })
            } else if (problem_config.operator == "subtraction") {
                const answer = num_2 - num_1
                problems.push({
                    "formula": `${num_2} - ${num_1} = `,
                    "answer": answer
                })
            }
        });
    });
    current_problem_config = problem_config
}

function setNextProblem() {
    if (problems.length == 0) {
        closeProblems()
        return;
    }
    const problem = problems.pop()
    $("#current_problem_name").html(`${current_problem_config.problem_name}`)
    $("#calculation").html(`${problem.formula}<i class="bi bi-question-square"></i>`)
    each_problem_start_unix_time = Date.now()
    $("#answer")
        .val("")
        .off("keyup")
        .keyup(function () {
            if ($(this).val() == problem.answer) {
                correct_count++
                const duration_seconds = Math.floor((Date.now() - each_problem_start_unix_time) / 100) / 10
                correct_sound_audio.play()
                $("#done_list_group").prepend(`<li class="list-group-item"><i class="bi bi-check text-success"></i>&nbsp;${problem.formula}${problem.answer}&nbsp;(${duration_seconds.toFixed(1)}秒)</li>`)
                const progress = Math.floor(correct_count / (correct_count + problems.length) * 100)
                $("#progress_bar").css("width", `${progress}%`)

                setNextProblem()
            }
        })
        .prop("disabled", false)
        .focus()
}

function closeProblems() {
    $("#answer").val("").off("keyup").prop("disabled", true)
    $("#progress_bar").css("width", `100%`)
    const total_duration_seconds = (Math.floor((Date.now() - all_problems_start_unix_time) / 100) / 10).toFixed(1)

    const today_date_str = getTodayDateString()
    user_done_date.set(current_problem_config.problem_id, today_date_str)
    saveMapToLocalStorage("user_done_date", user_done_date)

    let problem_done_count = user_done_count.get(current_problem_config.problem_id)
    if (problem_done_count > 0) {
        problem_done_count++
    } else {
        problem_done_count = 1
    }
    user_done_count.set(current_problem_config.problem_id, problem_done_count)
    saveMapToLocalStorage("user_done_count", user_done_count)

    const best_record = user_best_record.get(current_problem_config.problem_id)
    let best_record_icon = ''
    if (not(best_record) || (best_record && parseFloat(total_duration_seconds) < parseFloat(best_record))) {
        user_best_record.set(current_problem_config.problem_id, total_duration_seconds)
        if (best_record) {
            best_record_icon = '<i class="bi bi-award"></i>'
        }
    }
    saveMapToLocalStorage("user_best_record", user_best_record)

    $("#calculation").html(`<i class="bi bi-check-circle text-success"></i>&nbsp;全${correct_count}問を${total_duration_seconds}秒${best_record_icon}で完了`)
    $("#done_list_group").prepend(`<li class="list-group-item"><i class="bi bi-check-circle text-success"></i>&nbsp;${current_problem_config.problem_name}&nbsp;全問完了(${total_duration_seconds}秒${best_record_icon})</li>`)

    correct_count = 0

    rebuildProblemRows()
}

function rebuildProblemRows() {
    $("tr.problem_row").remove()
    for (const project_id in problem_configs) {
        const config = problem_configs[project_id]
        let problem_done_date = user_done_date.get(config.problem_id)
        if (not(problem_done_date)) {
            problem_done_date = "-"
        }else{
            problem_done_date = formatDateStringForLog(problem_done_date)
        }

        let problem_best_record = user_best_record.get(config.problem_id)
        if (not(problem_best_record)) {
            problem_best_record = "-"
        } else {
            problem_best_record = `${problem_best_record}秒`
        }

        let problem_done_count = user_done_count.get(config.problem_id)
        let problem_done_icon = '<i class="bi bi-play"></i>'
        if (problem_done_count > 9) {
            problem_done_icon = '<i class="bi bi-patch-check-fill text-success"></i>'
        } else if (problem_done_count > 4) {
            problem_done_icon = '<i class="bi bi-patch-check text-success"></i>'
        } else if (problem_done_count > 2) {
            problem_done_icon = '<i class="bi bi-patch-check"></i>'
        } else if (problem_done_count > 1) {
            problem_done_icon = '<i class="bi bi-check-all"></i>'
        } else if (problem_done_count > 0) {
            problem_done_icon = '<i class="bi bi-check"></i>'
        }

        $("#problems table tbody")
            .append(`<tr id="${config.problem_id}" class="problem_row"><td>${problem_done_icon}&nbsp;${config.problem_name}</td><td>${problem_done_date}</td><td>${problem_best_record}</td></tr>`)
    }
    $("tr.problem_row").click(function () {
        const problem_id = $(this).attr("id")
        createProblems(problem_id)
        setNextProblem()
        all_problems_start_unix_time = Date.now()
        $("#progress_bar").css("width", "0%")

        $("#log_tab").removeClass("disabled").click()
        $("#done_list_group").prepend(`<li class="list-group-item"><i class="bi bi-play-circle"></i>&nbsp;${current_problem_config.problem_name}&nbsp;開始</li>`)
    });
}

function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    // 月は0から始まるため+1
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

function formatDateStringForLog(inputDate) {
    const date = new Date(inputDate);
    // 月は0から始まるため、1を加える
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month + '/' + day;
}

// MapオブジェクトをJSONに変換する関数
function mapToJSON(map) {
    return JSON.stringify([...map]);
}

// JSONをMapオブジェクトに変換する関数
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

// Mapオブジェクトをローカルストレージに保存する関数
function saveMapToLocalStorage(key, map) {
    const jsonStr = mapToJSON(map);
    localStorage.setItem(key, jsonStr);
}

// ローカルストレージからMapオブジェクトを取得する関数
function getMapFromLocalStorage(key) {
    const jsonStr = localStorage.getItem(key);
    if (not(jsonStr)) {
        return new Map();
    }
    return jsonToMap(jsonStr);
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
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }
    return numbers;
}

function not(v) {
    if (v) {
        return false
    }
    return true
}
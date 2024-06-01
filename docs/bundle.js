(()=>{"use strict";class e{constructor(){this.startUnixTime=0,this.endUnixTime=0}start(){this.startUnixTime=Date.now()}end(){this.endUnixTime=Date.now()}reset(){this.startUnixTime=0,this.endUnixTime=0}getDurationMs(){return this.endUnixTime-this.startUnixTime}getDurationSec(){return this.toSecFromMs(this.getDurationMs())}toSecFromMs(e){return Math.floor(e/100)/10}}class t{constructor(e){this.problemList=[],this._allProblemCount=0,this.config=e}get name(){return this.config.courseName}get id(){return this.config.courseId}get allProblemCount(){return this._allProblemCount}get remainingProblemCount(){return this.problemList.length}get doneProblemCount(){return this._allProblemCount-this.problemList.length}initialize(){this.buildProblemList(),this._allProblemCount=this.problemList.length}buildProblemList(){const e=this.shuffleArray(this.createNumbersInRange(this.config.item1.min,this.config.item1.max)),t=this.shuffleArray(this.createNumbersInRange(this.config.item2.min,this.config.item2.max));e.forEach((e=>{t.forEach((t=>{"addition"===this.config.operator?this.addProblem(`${e} + ${t} = `,e+t):"subtraction"===this.config.operator?this.addProblem(`${t} - ${e} = `,t-e):"multiplication"===this.config.operator&&this.addProblem(`${t} x ${e} = `,t*e)}))}))}isEndOfCourse(){return 0===this.problemList.length}nextProblem(){if(this.isEndOfCourse())throw new Error("next problem doesn't exist in the course.");return this.problemList.pop()}addProblem(e,t){this.problemList.push({formula:e,answer:t})}shuffleArray(e){const t=[];for(;e.length>0;){const s=Math.floor(Math.random()*e.length);t.push(e[s]),e.splice(s,1)}return t}createNumbersInRange(e,t){const s=[];for(let i=e;i<=t;i++)s.push(i);return s}}class s{constructor(e){this.prefix=e}set(e,t){const s=this.prefix+e,i=JSON.stringify(t);localStorage.setItem(s,i)}get(e){const t=this.prefix+e,s=localStorage.getItem(t);if(s)try{return JSON.parse(s)}catch(e){return null}return null}remove(e){const t=this.prefix+e;localStorage.removeItem(t)}has(e){const t=this.prefix+e;return null!==localStorage.getItem(t)}}class i{constructor(){}static createCourseConfigList(){return[{courseId:"course_add_00",courseName:"たし算&nbsp;0～9",operator:"addition",item1:{min:0,max:9},item2:{min:0,max:9}},{courseId:"course_add_10",courseName:"たし算&nbsp;10～19",operator:"addition",item2:{min:0,max:9},item1:{min:10,max:19}},{courseId:"course_add_20",courseName:"たし算&nbsp;20～29",operator:"addition",item1:{min:0,max:9},item2:{min:20,max:29}},{courseId:"course_add_30",courseName:"たし算&nbsp;30～39",operator:"addition",item1:{min:0,max:9},item2:{min:30,max:39}},{courseId:"course_add_40",courseName:"たし算&nbsp;40～49",operator:"addition",item1:{min:0,max:9},item2:{min:40,max:49}},{courseId:"course_add_50",courseName:"たし算&nbsp;50～59",operator:"addition",item1:{min:0,max:9},item2:{min:50,max:59}},{courseId:"course_add_60",courseName:"たし算&nbsp;60～69",operator:"addition",item1:{min:0,max:9},item2:{min:60,max:69}},{courseId:"course_add_70",courseName:"たし算&nbsp;70～79",operator:"addition",item1:{min:0,max:9},item2:{min:70,max:79}},{courseId:"course_add_80",courseName:"たし算&nbsp;80～89",operator:"addition",item1:{min:0,max:9},item2:{min:80,max:89}},{courseId:"course_add_90",courseName:"たし算&nbsp;90～99",operator:"addition",item1:{min:0,max:9},item2:{min:90,max:99}},{courseId:"course_sub_10",courseName:"ひき算&nbsp;10～19",operator:"subtraction",item1:{min:0,max:9},item2:{min:10,max:19}},{courseId:"course_sub_20",courseName:"ひき算&nbsp;20～29",operator:"subtraction",item1:{min:0,max:9},item2:{min:20,max:29}},{courseId:"course_sub_30",courseName:"ひき算&nbsp;30～39",operator:"subtraction",item1:{min:0,max:9},item2:{min:30,max:39}},{courseId:"course_sub_40",courseName:"ひき算&nbsp;40～49",operator:"subtraction",item1:{min:0,max:9},item2:{min:40,max:49}},{courseId:"course_sub_50",courseName:"ひき算&nbsp;50～59",operator:"subtraction",item1:{min:0,max:9},item2:{min:50,max:59}},{courseId:"course_sub_60",courseName:"ひき算&nbsp;60～69",operator:"subtraction",item1:{min:0,max:9},item2:{min:60,max:69}},{courseId:"course_sub_70",courseName:"ひき算&nbsp;70～79",operator:"subtraction",item1:{min:0,max:9},item2:{min:70,max:79}},{courseId:"course_sub_80",courseName:"ひき算&nbsp;80～89",operator:"subtraction",item1:{min:0,max:9},item2:{min:80,max:89}},{courseId:"course_sub_90",courseName:"ひき算&nbsp;90～99",operator:"subtraction",item1:{min:0,max:9},item2:{min:90,max:99}},{courseId:"course_add_00",courseName:"かけ算&nbsp;0～9",operator:"multiplication",item1:{min:0,max:9},item2:{min:0,max:9}},{courseId:"course_add_10",courseName:"かけ算&nbsp;10～19",operator:"multiplication",item2:{min:0,max:9},item1:{min:10,max:19}},{courseId:"course_add_20",courseName:"かけ算&nbsp;20～29",operator:"multiplication",item1:{min:0,max:9},item2:{min:20,max:29}},{courseId:"course_add_30",courseName:"かけ算&nbsp;30～39",operator:"multiplication",item1:{min:0,max:9},item2:{min:30,max:39}},{courseId:"course_add_40",courseName:"かけ算&nbsp;40～49",operator:"multiplication",item1:{min:0,max:9},item2:{min:40,max:49}},{courseId:"course_add_50",courseName:"かけ算&nbsp;50～59",operator:"multiplication",item1:{min:0,max:9},item2:{min:50,max:59}},{courseId:"course_add_60",courseName:"かけ算&nbsp;60～69",operator:"multiplication",item1:{min:0,max:9},item2:{min:60,max:69}},{courseId:"course_add_70",courseName:"かけ算&nbsp;70～79",operator:"multiplication",item1:{min:0,max:9},item2:{min:70,max:79}},{courseId:"course_add_80",courseName:"かけ算&nbsp;80～89",operator:"multiplication",item1:{min:0,max:9},item2:{min:80,max:89}},{courseId:"course_add_90",courseName:"かけ算&nbsp;90～99",operator:"multiplication",item1:{min:0,max:9},item2:{min:90,max:99}},{courseId:"course_dev_test",courseName:"開発用テスト",operator:"subtraction",item1:{min:0,max:1},item2:{min:11,max:12}}]}}class r{constructor(){this._answerInput=document.getElementById("answer"),this.progressBar=document.getElementById("progress_bar"),this.learningLogTab=document.getElementById("log_tab"),this.learningLogList=document.getElementById("done_list_group"),this.currentCourseName=document.getElementById("current_course_name"),this.board=document.getElementById("board"),this.courseTableBody=document.getElementById("courseTableBody"),this.correctSoundAudio=document.getElementById("correct_sound"),this.correctSoundAudio.load(),this.incorrectSoundAudio=document.getElementById("incorrect_sound"),this.incorrectSoundAudio.load()}get answerInput(){return this._answerInput}addRowInCourseTable(e){this.courseTableBody.appendChild(e)}deleteAllRowsInCourseTable(){this.courseTableBody.querySelectorAll("tr").forEach((e=>e.remove()))}setCurrentCourseName(e){this.currentCourseName.innerHTML=e}prepareAnswerInput(e,t){this._answerInput.setAttribute("data-formula",e),this._answerInput.setAttribute("data-answer",t.toString()),this._answerInput.value="",this._answerInput.disabled=!1,this._answerInput.focus()}setEndCourseMsgs(e,t,s){let i="";s&&(i='<i class="bi bi-award"></i>');const r=t.toFixed(1);this.board.innerHTML=`<i class="bi bi-check-circle text-success"></i>&nbsp;全${e.doneProblemCount}問を${r}秒${i}で完了`,this.learningLogList.insertAdjacentHTML("afterbegin",`<li class="list-group-item"><i class="bi bi-check-circle text-success"></i>&nbsp;${e.name}&nbsp;全問完了(${r}秒${i})</li>`)}setFormulaOnBoard(e){this.board.innerHTML=`${e}<i class="bi bi-question-square"></i>`}addEndProblemLog(e,t,s){this.learningLogList.insertAdjacentHTML("afterbegin",`<li class="list-group-item"><i class="bi bi-check text-success"></i>&nbsp;${e}${t}&nbsp;(${s.toFixed(1)}秒)</li>`)}addStartCourseLog(e){this.learningLogList.insertAdjacentHTML("afterbegin",`<li class="list-group-item"><i class="bi bi-play-circle"></i>&nbsp;${e}&nbsp;開始</li>`)}showLearningLogTab(){this.learningLogTab.classList.remove("disabled"),this.learningLogTab.click()}updateProgressBar(e){this.progressBar.style.width=`${e}%`}playCorrectSound(){this.correctSoundAudio.play()}playIncorrectSound(){this.incorrectSoundAudio.play()}}(new class{constructor(){this.courseConfigList=[],this.currentCourse=null,this.courseTimeKeeper=new e,this.problemTimeKeeper=new e,this.storageHelper=new s("pika_uch_"),this.courseConfigList=i.createCourseConfigList(),this.view=new r}initialize(){document.addEventListener("DOMContentLoaded",(()=>{this.createCourseTable(),this.view.answerInput.oninput=this.answerInputCheckEventHandler.bind(this)}))}answerInputCheckEventHandler(){if(null===this.currentCourse)return;const e=this.view.answerInput;if(e.value===e.dataset.answer)this.problemTimeKeeper.end(),this.view.playCorrectSound(),this.view.addEndProblemLog(e.dataset.formula,e.dataset.answer,this.problemTimeKeeper.getDurationSec()),this.view.updateProgressBar(Math.floor(this.currentCourse.doneProblemCount/this.currentCourse.allProblemCount*100)),this.startNextProblem(this.currentCourse);else{const t="bg-danger-subtle";e.value.length>=e.dataset.answer.length?!1===e.classList.contains(t)&&(e.classList.add(t),this.view.playIncorrectSound()):e.classList.remove(t)}}startCourse(e){const s=new t(e);return s.initialize(),this.currentCourse=s,this.courseTimeKeeper.start(),this.view.updateProgressBar(0),this.view.showLearningLogTab(),this.view.addStartCourseLog(e.courseName),s}startNextProblem(e){if(e.isEndOfCourse())return void this.endCourse(e);const t=e.nextProblem();this.view.setCurrentCourseName(e.name),this.view.setFormulaOnBoard(t.formula),this.view.prepareAnswerInput(t.formula,t.answer),this.problemTimeKeeper.start()}endCourse(e){this.view.answerInput.value="",this.view.answerInput.disabled=!0,this.view.updateProgressBar(100),this.courseTimeKeeper.end();const t=this.courseTimeKeeper.getDurationSec(),s=this.getUserCourseHistory(e.id);let i=s.bestSec,r=!1;(0===s.bestSec||t<s.bestSec)&&(i=t,r=!0);const o=s.doneCount+1;this.setUserCourseHistory(e.id,{doneDate:this.getTodayDateString(),doneCount:o,bestSec:i}),this.view.setEndCourseMsgs(e,t,r),this.createCourseTable()}createCourseTable(){this.view.deleteAllRowsInCourseTable(),this.courseConfigList.forEach((e=>{const t=this.getUserCourseHistory(e.courseId);let s="-";""!==t.doneDate&&(s=this.formatDateStringForLog(t.doneDate));let i="-";t.bestSec>0&&(i=`${t.bestSec}秒`);let r='<i class="bi bi-play"></i>';t.doneCount>9?r='<i class="bi bi-patch-check-fill text-success"></i>':t.doneCount>4?r='<i class="bi bi-patch-check text-success"></i>':t.doneCount>2?r='<i class="bi bi-patch-check"></i>':t.doneCount>1?r='<i class="bi bi-check-all"></i>':t.doneCount>0&&(r='<i class="bi bi-check"></i>');const o=document.createElement("tr");o.innerHTML=`<td>${r}&nbsp;${e.courseName}</td><td>${s}</td><td>${i}</td>`,o.addEventListener("click",(()=>{const t=this.startCourse(e);this.startNextProblem(t)})),this.view.addRowInCourseTable(o)}))}setUserCourseHistory(e,t){return this.storageHelper.set(e,t)}getUserCourseHistory(e){const t=this.storageHelper.get(e);return null!==t?t:{doneDate:"",doneCount:0,bestSec:0}}formatDateStringForLog(e){const t=new Date(e);return`${t.getMonth()+1}/${t.getDate()}`}getTodayDateString(){const e=new Date;return e.getFullYear()+"-"+("0"+(e.getMonth()+1)).slice(-2)+"-"+("0"+e.getDate()).slice(-2)}}).initialize()})();
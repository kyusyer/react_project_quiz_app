import "./QuizForm.css";
import jsonData from "../resource/data.json";
import { useState, useEffect } from "react";



export default function QuizForm() {

    const [item, setItem] = useState(1);
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState({
        question: "",
        answer: "",
        choices: []
    });

    useEffect(
        () => pickQuestion, []
    )

    function handleNext(event) {
        event.preventDefault();
        setItem(
            item + 1

        )
        pickQuestion();
        document.querySelector(".next").style.display = "none";
        document.querySelector(".button");
        document.querySelector("input[type='submit']").disabled = false;
        document.querySelector("input[type='submit']").style.backgroundColor = "green";

        document.querySelectorAll("label").forEach(el => {
            el.querySelector("input").checked = false;
            el.querySelector("input").disabled = false;
            el.querySelector(".choice-text").id = "";
        })

    }

    function validateAnswer(event) {
        event.preventDefault();
        let answer = "";
        let submitButton = document.querySelector("input[type='submit']");
        submitButton.disabled = true;
        submitButton.style.backgroundColor = "gray";
        document.querySelector(".next").style.display = "block";
        document.querySelectorAll("label").forEach(el => {


            let choiceElement = el.querySelector(".choice-text")

            if (el.querySelector("input").checked) {
                answer = choiceElement.textContent;
                setScore(score+1);
                // console.log(answer);
                // console.log(question.answer);
                if (answer === question.answer) {
                    choiceElement.id = "correct";
                }
                else {
                    choiceElement.id = "wrong";
                }
            }
            else {
                el.querySelector(".choice-text").id = "";
                if (choiceElement.textContent === question.answer) {
                    choiceElement.id = "correct";

                }

                el.querySelector("input").disabled = true;
                console.log(el.querySelector("input"))




            }
        }



        )



    }

    function handleOnchange(event) {

        let elChoices = document.querySelectorAll("label");
        elChoices.forEach((container) => {
            console.log(container);
            let elRadio = container.querySelector("input");
            let elChoice = container.querySelector(".choice-text");
            if (elRadio.checked) {
                elChoice.id = "selected";
            }
            else {
                if (elChoice.id === "selected") {
                    elChoice.id = "";

                }
            }


        })
    }


    function pickQuestion() {

        let arrLength = jsonData.length;
        let randomIdx = Math.floor(Math.random() * (arrLength + 1));

        setQuestion(
            jsonData[randomIdx]
        );

    }

    function handleReset(){
        setScore(0);
        setItem(1);
        pickQuestion();
    }





    return (

        <form action="" >
            <div className="question-number">Question Number {item}</div>
            <div className="score">SCORE: {score} 
            
            <button className="reset" onClick={handleReset}>RESET</button>
            </div>
            <div className="question-container">
                <div className="question">
                    <p>{question.question}</p>

                </div>

            </div>
            <div className="choices-container">

                {
                    question.choices.map((value, idx) => {

                        return (
                            <div className="choices" key={idx}>
                                <div className="choice-card wrong">
                                    <label htmlFor="">
                                        <input type="radio" value="choice 1" name="radioChoice" onChange={handleOnchange} />
                                        <div className="choice-text">
                                            {value}

                                        </div>


                                    </label>

                                </div>

                            </div>

                        )
                    }


                    )
                }



            </div>


            <input type="submit" value="submit answer" onClick={validateAnswer} />
            <div className="next">
                <button onClick={handleNext}>Next Question</button>
            </div>

        </form>
    )
}
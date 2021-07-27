import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { ArrCardType } from "../../api/packs-api";
import { cardsTC, setGradeTC } from "../../Redux/cards-reducer";
import { authTC } from "../../Redux/login-reducer";
import { AppStateType } from "../../Redux/store";
import { PATH } from "../../Routes";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import s from './LearnPage.module.css'

const grades = ['dont know', "I forgot", 'I thought', 'almost correct', 'I know'];

const getCard = (cards: ArrCardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return { sum: newSum, id: newSum < rand ? i : acc.id }
    }
        , { sum: 0, id: -1 });
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = React.memo(() => {

    let [learnStatus, setLearnStatus] = useState<0 | 1 | 2>(0)

    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const { cards } = useSelector((state: AppStateType) => state.cards);
    const { id } = useParams<{ id: string }>()

    const [card, setCard] = useState<ArrCardType>({
        answer: 'After your answer, give yourself an grade of knowledge and click "Next" to start Learn',
        question: 'Example. Here is question. Give you answer and click "Check"',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: 'fake'
    });

    const dispatch = useDispatch();
    useEffect(() => {
        //dispatch(cardsTC(id))

        if (first) {
            dispatch(cardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first
        // dispatch, id, cards, first
    ]);

    useEffect(() => {
        if (!isAuth)
            dispatch(authTC())
    }, [isAuth, dispatch])

    const onNext = () => {
        setIsChecked(false);
        setLearnStatus(1)
        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }
    if (isAuth === "") { return <Redirect to={"/login"} />; }




    return (
        <div className={s.container}>
            <div className={s.title}>Go To Learn!!</div>
            <br />
            <div className={s.question}> <b>Question:</b> {card.question}</div>
            <br />

            {learnStatus === 1 && <div className={s.control}>
                <NavLink to={PATH.PACKS_PAGE}>   <SuperButton onClick={() => { }} className={s.cancelBtn}>Cancel</SuperButton> </NavLink>
                <SuperButton onClick={() => { setIsChecked(true); setLearnStatus(0) }} style={{ width: "188px" }}>Check</SuperButton>
            </div>}


            {isChecked && (
                <>
                    <div className={s.question}> <b>Answer: </b>{card.answer}</div>
                    <div className={s.checkBlock}>
                        {learnStatus === 2 && <div className={s.great}><b> Thank for you grade, go next!</b></div>}
                        {grades.map((g, i) => (
                            <SuperButton key={'grade-' + i} className={s.answerBtn} style={learnStatus !== 2 ? { opacity: `${i / 10 + 0.6}` } : { display: "none" }} onClick={() => {
                                dispatch(setGradeTC(card._id, i + 1)); setLearnStatus(2)
                            }}>{g}</SuperButton>
                        ))}
                    </div>
                    <div>Your Grade for this question: <b>{Math.round(card.grade)}</b></div>
                    <div>Your attempts for this question:   <b>{card.shots}</b></div>
                    <br />
                    <div className={s.subTitle}> to finish click "Cancel"</div>
                    <div className={s.control}>
                        <NavLink to={PATH.PACKS_PAGE}>   <SuperButton onClick={() => { }} className={s.cancelBtn}>Cancel</SuperButton> </NavLink>
                        <SuperButton onClick={onNext} style={{ width: "188px" }}>next</SuperButton>
                    </div>
                </>
            )}
        </div>
    );
});

export default LearnPage;
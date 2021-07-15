import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { ArrCardType } from "../../api/packs-api";
import { cardsTC, setGradeTC } from "../../Redux/cards-reducer";
import { AppStateType } from "../../Redux/store";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

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

const LearnPage = () => {
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const { cards } = useSelector((state: AppStateType) => state.cards);
    // const { id } = useParams();
    const { id } = useParams<{ id: string }>()

    const [card, setCard] = useState<ArrCardType>({
        answer: 'answer fake',
        question: 'question fake',
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
        dispatch(cardsTC(id))

        if (first) {
            dispatch(cardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id,
        // dispatch, id, cards, first
    ]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }
    if (isAuth === "") { return <Redirect to={"/login"} />; }
    return (
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <SuperButton onClick={() => setIsChecked(true)}>check</SuperButton>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <SuperButton key={'grade-' + i} onClick={() => {
                            dispatch(setGradeTC(card._id, i + 1))
                        }}>{g}</SuperButton>
                    ))}
                    <div>grade - {card.grade}</div>
                    <div>shots - {card.shots}</div>
                    <div><SuperButton onClick={onNext}>next</SuperButton></div>
                </>
            )}
        </div>
    );
};

export default LearnPage;
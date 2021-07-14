import { instance } from "./fridayProject-api";
import { cardsType, RequestStatusType } from "../Redux/packs-reducer";


//api

export const packsApi = {

    getPacks(
        min?: number,
        max?: number,
        page?: number,
        pageCount?: number,
        packName?: string,
        sortPacks?: string
    ) {
        return instance.get<responsePacksType>(`/cards/pack`,
            { params: { min, max, page, pageCount, packName, sortPacks } })
    },
    setPacks(name: string) {
        return instance.post("cards/pack", { cardsPack: { name } })
    },
    deletePacks(id: string) {
        return instance.delete("cards/pack", { params: { id } })
    },
    updatePacks(_id: string, name: string) {
        return instance.put("cards/pack", { cardsPack: { _id, name } })
    },

    getCards(
        cardsPack_id: string,
        cardQuestion?: string,
        min?: number,
        max?: number,
        sortCards?: string,
        page?: number,
        pageCount?: number
    ) {
        return instance.get<responseCardType>("/cards/card",
            {
                params: {
                    cardsPack_id,
                    cardQuestion,
                    min,
                    max,
                    sortCards,
                    page,
                    pageCount,
                }
            })
    },
    setCards(cardsPack_id: string) {
        return instance.post("cards/card", { card: { cardsPack_id } })
    },
    deleteCards(id: string) {
        return instance.delete("cards/card", { params: { id } })
    },
    updateCards(_id: string) {
        return instance.put("cards/card", { card: { _id } })
    },
    setGradeCards(card_id: string, grade: number) {
        return instance.put("cards/grade", { card_id, grade })
    }

}

//types
export type responseCardType = {
    cards: Array<ArrCardType>
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
    error?: string,
    isInitialized: boolean
    sortCards: string
    cardQuestion: string,
    grade: number
}
export type ArrCardType = {
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    shots: number,
    user_id: string,
    created: string,
    updated: string,
    _id: string
}

export type getCardParams = {
    cardAnswer?: string,
    cardQuestion?: string,
    cardsPack_id: string,
    min?: number,
    max?: number,
    sortCards?: string,
    page?: number,
    pageCount?: number
}

export type responsegGradeType = {

    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

// type setCardParams = {
//     cardsPack_id: string,
//     question?: string,
//     answer?: string,
//     grade?: number
//     shots?: number,
//     answerlmg?: string,
//     questionImg?: string,
//     questionVideo?:string,
//     answerVideo?: string
// }

export type responsePacksType = {
    cardPacks: Array<cardsType>,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    max: number,
    min: number,
    page: number,
    pageCount: number,
    error?: string,
    isInitialized: boolean,
    sortPacks: string,
    status: RequestStatusType,
    packName: string
}

export type cardType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    url: string
}
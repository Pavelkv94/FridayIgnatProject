import axios from "axios";
import {instance} from "./fridayProject-api";


//api


export const cardsAPI = {

getCards() {

    return instance.get("/cards/pack", {})

}

}

//types

export type ResponseGetCards = [{

},]
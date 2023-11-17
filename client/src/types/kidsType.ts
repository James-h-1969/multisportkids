import { Parent } from "./parentType"

export type Child = {
    childName: string,
    childAge: string, 
    childComments: string,
    childClub: string,
    day1: boolean,
    day2: boolean,
    parent: Parent
}
 
export type Kids = { //this is the type of multiple kids together
    kids: Array<Child>,
}

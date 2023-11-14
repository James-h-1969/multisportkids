export type Child = {
    childName: string,
    childAge: string, 
    childComments: string,
    childClub: string,
}
 
export type Kids = { //this is the type of multiple kids together
    kids: Array<Child>,
}

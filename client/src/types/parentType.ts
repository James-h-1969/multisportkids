export type Parent = {
    parentname: String,
    email: String,
    phone: String,
    childNames: Array<string>,
    childAge: Array<string>,
    childClubs: Array<string>,
    childComments: Array<string>,
    childEvents: Array<Array<string>>, // this will be a 2D list representing each child and then a list of each event they have done
}
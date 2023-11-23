const bcrypt = require("bcryptjs");
import Tokens from "../Models/Tokens";
import express, { NextFunction, Request, Response } from "express";

const SALT_ROUNDS = 10;

export type hashedTokensType = {
    singleTokens: Array<string>;
    groupTokens: Array<string>;
    campTokens: Array<string>;
}

/*
randomToken.ts
This file holds backend functions that deal with hashing and tokens within the project
*/

function generateRandomToken(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) { //pick 8 random characters
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters[randomIndex];
    }
    return token;
}

export default async function generateHashedTokens(amount:number, length:number) { // amount of tokens and length of each token
    const hashedTokens:Array<string> = [];
    const nonhashedTokens:Array<string> = [];
  
    for (let i = 0; i < amount; i++) {
      const token = generateRandomToken(length);
      nonhashedTokens.push(token);
      const hashedToken = bcrypt.hashSync(token, SALT_ROUNDS); // salt rounds are the rounds of hashing the bcrypt function applies
      hashedTokens.push(hashedToken);
    }
    return [hashedTokens, nonhashedTokens];
}

async function isTokenInValidTokens(tokensToSearch:string[], tokenToMatch:string, isHashing:boolean){
    for (let i = 0; i < tokensToSearch.length; i++){
        if (!isHashing){
            if (tokensToSearch[i] == tokenToMatch){
                return true
            }   
        } else {
            let isMatch = await bcrypt.compareSync(tokenToMatch, tokensToSearch[i]);
            if (isMatch){
                return true
            } 
        }
 
    }
    return false
}

export const tokenController = {
    checkToken: async (req: Request, res: Response) => { // function that checks whether a token is valid for the right id
        try {
            const userProvidedToken = req.body.token
            const id = req.body.id;
        
            // Find all documents in the collection and get an array of hashed tokens
            const allHashedTokens:Array<hashedTokensType> = await Tokens.find();
            const ActualTokens:hashedTokensType = allHashedTokens[0];
            let searching = [""];
            let hashing = false;
    
            if (id == 3){ //single private session
                searching = ActualTokens.singleTokens;
                hashing = true;
            } else if (id === 11){ //camp 
                searching = ActualTokens.campTokens;
                hashing = false
                
            } else { // group session
                searching = ActualTokens.groupTokens;
                hashing = true;
            }
            
            const matchFound = await isTokenInValidTokens(searching, userProvidedToken, hashing)
            
            if (matchFound) {
                return res.json({ message: 'Token is valid.' });
            } else {
                return res.status(401).json({ error: 'Invalid token.' });
            }
          } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(500).json({ error: 'Internal server error.' });
          }
    }
}
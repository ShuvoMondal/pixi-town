import type {Request, Response, NextFunction} from "express";
import {auth} from "@pixi-town/auth";
import {fromNodeHeaders} from "better-auth/node";

const requiredAuth = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if(!session){
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.session = session.session;
        req.user = session.user;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid session" });
    }
}

export default requiredAuth;
import { AuthService } from '@services/AuthService';
import { Request, Response } from 'express';

export class AuthController {


    public static async AdminLogin(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const result = await AuthService.Adminlogin(data);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: 'Error Admin', error });
        }
    }
    public static async createAdmin(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const result = await AuthService.createAdmin(data);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: 'Error Admin', error });
        }
    }
}
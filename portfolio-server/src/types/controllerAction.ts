import { Request, Response } from 'express';

type ControllerAction = (req: Request, res: Response) => void;

export default ControllerAction;
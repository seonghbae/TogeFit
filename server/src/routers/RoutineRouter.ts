import { Router } from 'express';
import { routineService } from '../services';

const routineRouter = Router();

// 사용자의 루틴 GET
routineRouter.get('/', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// 루틴 추가
routineRouter.post('/', async (req, res, next) => {
  try {
    const { userId, routine_name, routine_list } = req.body;

    const newRoutine = await routineService.addRoutine({
      userId,
      routine_name,
      routine_list,
    });

    // res.status(201).json(newRoutine);
    res.status(201).json(userId);
  } catch (error) {
    next(error);
  }
});

// 루틴 삭제
routineRouter.delete('/', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// 루틴 업데이트
routineRouter.patch('/', async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
export { routineRouter };

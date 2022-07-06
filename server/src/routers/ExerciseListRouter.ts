import { Router } from 'express';
import { exerciseListService } from '../services';

const exerciseListRouter = Router();

exerciseListRouter.get('/', async (req, res, next) => {
  try {
    const exerciseList = await exerciseListService.getExerciseList();

    res.status(200).json(exerciseList);
  } catch (error) {
    next(error);
  }
});

exerciseListRouter.post('/', async (req, res, next) => {
  try {
    const { exerciseName } = req.body;
    const newExerciseList = await exerciseListService.addExercise(exerciseName);

    res.status(201).json(newExerciseList);
  } catch (error) {
    next(error);
  }
});

export { exerciseListRouter };

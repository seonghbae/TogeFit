import { Router } from 'express';
import { exerciseListService } from '../services';

const exerciseListRouter = Router();

// 운동 검색
exerciseListRouter.get('/search', async (req, res, next) => {
  try {
    const keyword = req.query.exerciseName as string;
    const searchedExerciseList = await exerciseListService.searchExercise(
      keyword
    );

    res.status(200).json(searchedExerciseList);
  } catch (error) {
    next(error);
  }
});

// 운동 전체 리스트 GET
exerciseListRouter.get('/', async (req, res, next) => {
  try {
    const exerciseList = await exerciseListService.getExerciseList();

    res.status(200).json(exerciseList);
  } catch (error) {
    next(error);
  }
});

// 운동 목록에 운동 추가
exerciseListRouter.post('/register', async (req, res, next) => {
  try {
    const { exerciseName } = req.body;
    const newExerciseList = await exerciseListService.addExercise(exerciseName);

    res.status(201).json(newExerciseList);
  } catch (error) {
    next(error);
  }
});

// 운동목록에서 해당하는 운동 삭제
exerciseListRouter.delete('/', async (req, res, next) => {
  try {
    const { exerciseName } = req.body;
    const deletedExercise = await exerciseListService.deleteExercise(
      exerciseName
    );
    res.status(200).json(deletedExercise);
  } catch (error) {
    next(error);
  }
});

export { exerciseListRouter };

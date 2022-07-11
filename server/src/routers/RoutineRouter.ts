import { Router } from 'express';
import { loginRequired } from '../middlewares';
import { routineService } from '../services';
import is from '@sindresorhus/is';

const routineRouter = Router();

routineRouter.get('/search', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const keyword = req.query.routineName as string;
    let searchedRoutineList: Object[] = [];
    if (keyword) {
      searchedRoutineList = await routineService.searchRoutine(userId, keyword);
    }

    res.status(200).json(searchedRoutineList);
  } catch (error) {
    next(error);
  }
});

// 사용자의 루틴정보 가져오기
routineRouter.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userRoutineList = await routineService.findByUserId(userId);
    res.status(200).json(userRoutineList);
  } catch (error) {
    next(error);
  }
});

// 루틴 추가
routineRouter.post('/register', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }
    const userId = req.currentUserId;
    const { routine_name, routine_list } = req.body;

    const newRoutine = await routineService.addRoutine({
      userId,
      routine_name,
      routine_list,
    });

    res.status(201).json(newRoutine);
  } catch (error) {
    next(error);
  }
});

// 루틴 삭제
routineRouter.delete('/', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }
    const { routineId } = req.body;
    const userId = req.currentUserId;
    const deletedRoutine = await routineService.deleteRoutine(
      userId,
      routineId
    );
    res.status(200).json(deletedRoutine);
  } catch (error) {
    next(error);
  }
});

// 루틴 업데이트
routineRouter.patch('/', loginRequired, async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }

    const { routineId, routine_name, routine_list } = req.body;

    if (!routineId) {
      throw new Error('루틴 수정을 위해 루틴의 ObjectId가 필요합니다.');
    }

    const toUpdateInfo = {
      ...(routine_name && { routine_name }),
      ...(routine_list && { routine_list }),
    };

    const userId = req.currentUserId;

    const updatedRoutine = await routineService.patchRoutine(
      userId,
      routineId,
      toUpdateInfo
    );
    res.status(201).json(updatedRoutine);
  } catch (error) {
    next(error);
  }
});
export { routineRouter };

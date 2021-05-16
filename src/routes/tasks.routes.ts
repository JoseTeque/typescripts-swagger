import { Router } from "express";
import {
  getTaks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
  countTasks,
} from "../controllers/tasks.controllers";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Task:
 *          type: object
 *          properties: 
 *              id:
 *                  type: string
 *                  description: the auto-generation id of task
 *              name:
 *                  type: string
 *                  description: the name of the task
 *              description:
 *                  type: string
 *                  description: the description of the task
 *          required:
 *              - name
 *              - description
 *          example: 
 *              id: vcYwweXw0SZI1wKpRv8Ls
 *              name: My firts app
 *              description: I have to do something
 */

/** 
* @swagger
* /tasks:
*   get:
*       summary: Return a Task list
*       responses:
*           200:
*               description: the list of tasks
*               conten:
*                   application/json:
*                       schema:
*                           type: array
*                           items: 
*                               $ref: '#/components/schemas/Task'
*
*/
router.get("/tasks", getTaks);

router.get("/tasks/count", countTasks);

router.post("/tasks", createTask);

router.get("/tasks/:id", getTask);

router.delete("/tasks/:id", deleteTask);

router.put("/tasks/:id", updateTask);



export default router;

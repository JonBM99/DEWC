import express from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    deleteCompletedTasks,
    getTaskStats
} from '../controllers/taskController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para gestión de tareas
 */

// Todas las rutas de tareas requieren autenticación
router.use(authenticateToken);

/**
 * @swagger
 * /api/tasks/stats/summary:
 *   get:
 *     summary: Obtener estadísticas de las tareas del usuario
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de tareas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskStats'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Token inválido
 */
router.get('/stats/summary', getTaskStats);

/**
 * @swagger
 * /api/tasks/completed/all:
 *   delete:
 *     summary: Eliminar todas las tareas completadas del usuario
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tareas completadas eliminadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tareas completadas eliminadas
 *                 deletedCount:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: No autenticado
 */
router.delete('/completed/all', deleteCompletedTasks);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, done]
 *         description: Filtrar tareas por estado
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: No autenticado
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea específica por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autenticado
 */
router.get('/:id', getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: El título es obligatorio
 *       401:
 *         description: No autenticado
 */
router.post('/', createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea completa
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskUpdate'
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autenticado
 */
router.put('/:id', updateTask);

/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Actualizar solo el estado de una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: in_progress
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autenticado
 */
router.patch('/:id/status', updateTaskStatus);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tarea eliminada correctamente
 *                 id:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: No autenticado
 */
router.delete('/:id', deleteTask);

export default router;
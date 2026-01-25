import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { db } from '../config/database';
import { TaskCreate, TaskUpdate } from '../models/taskModel';

// Obtener todas las tareas del usuario
export const getTasks = (req: AuthRequest, res: Response): void => {
    const { status } = req.query;
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params: any[] = [req.user!.userId];
    if (status && ['pending', 'in_progress', 'done'].includes(status as string)) {
        query += ' AND status = ?';
        params.push(status);
    }
    query += ' ORDER BY created_at DESC';
    db.query(query, params, (err, results) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(results);
    });
};

// Obtener tarea por id
export const getTaskById = (req: AuthRequest, res: Response): void => {
    const { id } = req.params;
    const query = 'SELECT * FROM tasks WHERE id = ? AND user_id = ?';
    db.query(query, [id, req.user!.userId], (err, results: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        if (results.length === 0) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
        }
        res.json(results[0]);
    });
};

// Crear tarea
export const createTask = (req: AuthRequest, res: Response): void => {
    const { title, description, status }: TaskCreate = req.body;
    if (!title || title.trim() === '') {
        res.status(400).json({ error: 'El título es obligatorio' });
        return;
    }
    const validStatus = status && ['pending', 'in_progress', 'done'].includes(status)
        ? status
        : 'pending';
    const query = 'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)';
    db.query(query, [req.user!.userId, title, description || null, validStatus], (err, result: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    // Devolver la tarea creada
    db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId], (err, results: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json(results[0]);
        });
    });
};

// Actualizar una tarea completa
export const updateTask = (req: AuthRequest, res: Response): void => {
    const { id } = req.params;
    const { title, description, status }: TaskUpdate = req.body;
    if (!title || title.trim() === '') {
        res.status(400).json({ error: 'El título es obligatorio' });
        return;
    }
    if (status && !['pending', 'in_progress', 'done'].includes(status)) {
        res.status(400).json({ error: 'Estado inválido' });
        return;
    }
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?';
    db.query(query, [title, description || null, status || 'pending', id, req.user!.userId], (err, result: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
        }
        // Devolver la tarea actualizada
        db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results[0]);
        });
    });
};

// Actualizar estado
export const updateTaskStatus = (req: AuthRequest, res: Response): void => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !['pending', 'in_progress', 'done'].includes(status)) {
        res.status(400).json({ error: 'Estado inválido. Usa: pending, in_progress o done' });
        return;
    }
    const query = 'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?';
    db.query(query, [status, id, req.user!.userId], (err, result: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
        }
        db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results: any) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results[0]);
        });
    });
};

// Eliminar tarea
export const deleteTask = (req: AuthRequest, res: Response): void => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';

    db.query(query, [id, req.user!.userId], (err, result: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
        }
        res.json({ message: 'Tarea eliminada correctamente', id: id });
    });
};

// Eliminar todas las tareas completadas
export const deleteCompletedTasks = (req: AuthRequest, res: Response): void => {
    const query = 'DELETE FROM tasks WHERE status = ? AND user_id = ?';
    db.query(query, ['done', req.user!.userId], (err, result: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({
        message: 'Tareas completadas eliminadas',
        deletedCount: result.affectedRows
        });
    });
};

// Obtener estadísticas
export const getTaskStats = (req: AuthRequest, res: Response): void => {
    const query = `
        SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
        SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) as done
        FROM tasks
        WHERE user_id = ?
    `;
    db.query(query, [req.user!.userId], (err, results: any) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json(results[0]);
    });
};
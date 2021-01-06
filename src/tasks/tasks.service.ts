import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks
    }

    getTaskWithFilter(filterDto: GetTasksFilterDto){
        const {status, search } = filterDto
        let tasks = this.getAllTasks()
        if (status){
            tasks = tasks.filter(task => task.status === status)
        }
        if (search){
            tasks = tasks.filter(task => task.title.includes(search) ||
            task.description.includes(search))  
        }
        return tasks
    }
    createTask(createTaskDto: CreateTaskDto){
        const {title, description} = createTaskDto
        const task: Task = {
           id: uuid.v1(),
           title,
           description,
           status: TaskStatus.OPEN 
        }
        this.tasks.push(task)
        return task;
    }

    getTaskById(id:string) : Task {
        const found =  this.tasks.find(task=> task.id === id)
        if (!found){
            throw new NotFoundException(`Task with the id "${id}" not found`);
        }
        return found 
    }

    deleteTask(id:string) : Task[] {
        const found = this.getTaskById(id)
        return this.tasks.filter(task=> task.id !== found.id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
}

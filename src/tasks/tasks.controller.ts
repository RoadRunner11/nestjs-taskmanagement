import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { title } from 'process';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/dto/get-task-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import {TasksService} from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor( private tasksService: TasksService ){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto) : Task[] {
        if (Object.keys(filterDto).length){
            return this.tasksService.getTaskWithFilter(filterDto)  
        }
        else{
            return this.tasksService.getAllTasks()
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task{
        return this.tasksService.createTask(createTaskDto)
    }
    @Get('/:id')
    getTaskById(@Param('id') id :string){
        return this.tasksService.getTaskById(id)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string){
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body('status') status: TaskStatus){
        return this.tasksService.updateTaskStatus(id, status)
    }
}

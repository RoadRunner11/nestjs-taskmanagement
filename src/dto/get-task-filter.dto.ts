import { IsOptional } from "class-validator";
import { TaskStatus } from "src/tasks/tasks.model";

export class GetTasksFilterDto{
    @IsOptional()
    status : TaskStatus;
    @IsOptional()
    search: string;
}
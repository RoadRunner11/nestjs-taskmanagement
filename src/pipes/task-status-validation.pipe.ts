import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "src/tasks/tasks.model";

export class TaskStatusValidatoinPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: string ){
        value = value.toUpperCase()
        if (! this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        return value
    }
    private isStatusValid(status : any){
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1;
    }
}
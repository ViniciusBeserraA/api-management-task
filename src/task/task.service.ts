import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { findAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = []

    create(task: TaskDto){
         this.tasks.push(task);
    }

    findById(id: string): TaskDto{
        const foundTask = this.tasks.filter(t => t.id === id);
       
        if(foundTask.length){
              return foundTask[0];  
        } 
        throw new HttpException('Task com esse id não encontrado', HttpStatus.NOT_FOUND);
   }

   findAll(params: findAllParameters): TaskDto[] {
    return this.tasks.filter(t => {
        let match = true;
        
        if(params.title != undefined && !t.title.includes(params.title)){
            match = false;
        } 
        
        if(params.status != undefined && !t.status.includes(params.status)){
            match = false;
        }
        return match;
    });
}
   

    update(task: TaskDto){
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);
        
        if(taskIndex >=0){
            this.tasks[taskIndex] = task;
            return
        }

        throw new HttpException('Task nao encontrada', HttpStatus.BAD_REQUEST)
        
    }

    delete(id: string){
        let taskIndex = this.tasks.findIndex(t => t.id === id)

        if(taskIndex >=0){
            this.tasks.splice(taskIndex, 1);
            return
        }

        throw new HttpException('Task nao encontrada', HttpStatus.BAD_REQUEST)
   }
}


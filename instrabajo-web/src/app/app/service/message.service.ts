import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../api/message';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import {
    UserDto,
    MessageDto,
} from 'src/app/app/models/service.dto';

@Injectable()
export class MessagesService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}


    createMessage(message: Message) {
        return this.http
            .post<MessageDto>(environment.instrabajoURL + 'message', message)
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }
    getReviewsSmall() {
        return this.http
            .get<any>('assets/app/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Message[])
            .then((data) => data);
    }

    getMessages(userId: string) {
        return this.http
        .get<any>(environment.instrabajoURL + 'message/toUserId/'+userId);
    }

    getUnreadMessages(userId: string){
        return this.http
        .get<any>(environment.instrabajoURL + 'message/unreadMessages/'+userId);
    }

    getAllMessages(jobId: string){
        return this.http
        .get<any>(environment.instrabajoURL + 'message/findByJobId/'+jobId);
    }
        /*return this.http
            .get<any>('assets/app/data/reviews.json')
            .toPromise()
            .then((res) => res.data as Review[])
            .then((data) => data);*/

            

    getReviewsMixed() {
        return this.http
            .get<any>('assets/app/data/addresses-mixed.json')
            .toPromise()
            .then((res) => res.data as Message[])
            .then((data) => data);
    }

    getReviewsWithOrdersSmall() {
        return this.http
            .get<any>('assets/app/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Message[])
            .then((data) => data);
    }
}
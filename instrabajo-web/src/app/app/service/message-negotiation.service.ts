import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { MessageNegotiationDto } from 'src/app/app/models/service.dto';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { environment } from 'src/environments/environment';
import { MessageNegotiation } from '../api/message';

@Injectable()
export class MessageNegotiationsService {
    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) {}

    createMessageNegotiation(message: MessageNegotiation) {
        return this.http
            .post<MessageNegotiationDto>(
                environment.instrabajoURL + 'message-negotiation',
                message
            )
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleError(error)
                )
            );
    }

    getMessageNegotiations(userId: string) {
        return this.http.get<any>(
            environment.instrabajoURL + 'message-negotiation/toUserId/' + userId
        );
    }
    updateReadMessageNegotiations(jobUserId: string, userId: string) {
        return this.http.get<any>(
            environment.instrabajoURL +
                'message-negotiation/readMessageNegotiations/' +
                jobUserId +
                '/' +
                userId
        );
    }

    getUnreadMessageNegotiations(userId: string) {
        return this.http.get<any>(
            environment.instrabajoURL +
                'message-negotiation/unreadMessageNegotiations/' +
                userId
        );
    }

    getAllMessageNegotiations(jobUserId: string) {
        return this.http.get<any>(
            environment.instrabajoURL +
                'message-negotiation/findByJobUserId/' +
                jobUserId
        );
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Job } from '../../api/job';
import { JobService } from '../../service/job.service';
import { ReviewService } from 'src/app/app/service/review.service';
import { InstrabajoService } from 'src/app/services/instrabajo.service';
import { MessagesService } from 'src/app/app/service/message.service';
import { Review } from 'src/app/app/api/review';
import { map, switchMap, take } from 'rxjs';
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    jobs: Job[] = [];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    totalReviews:any;
    reviews: Review[] = [];

    review: any;
    user:any;
    messages: any;

    constructor(
        private productService: ProductService, 
        public layoutService: LayoutService, 
        private reviewService:ReviewService,
        private instrabajoService: InstrabajoService,
        private jobService: JobService,
        private messageService: MessagesService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.instrabajoService.getLoggedUser
            .pipe(take(1))
            .subscribe((user: any) => {
                this.user = user;
            });

        this.jobService.getJobs().then((data) => (this.jobs = data));
        this.reviewService.getReviews(this.user._id).pipe(take(1))
        .subscribe((data: any) => {
            this.reviews = data
            this.totalReviews = this.reviews.length
            let sum = 0;
            this.reviews.forEach(review=> sum += review.stars!);
            this.review = sum/this.reviews.length;
        });

        this.messageService.getUnreadMessages(this.user._id).pipe(take(1))
        .subscribe((data: any) => {
            this.messages = data.length
            
        });
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

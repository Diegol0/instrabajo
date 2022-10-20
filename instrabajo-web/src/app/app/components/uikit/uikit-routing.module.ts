import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'formlayout', loadChildren: () => import('./formlayout/formlayout.module').then(m => m.FormlayoutModule), canActivate: [AuthGuard] },
        { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
        { path: 'button', loadChildren: () => import('./button/buttondemo.module').then(m => m.ButtonDemoModule), canActivate: [AuthGuard] },
        { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule), canActivate: [AuthGuard] },
        { path: 'file', loadChildren: () => import('./file/filedemo.module').then(m => m.FileDemoModule), canActivate: [AuthGuard] },
        { path: 'floatlabel', loadChildren: () => import('./floatlabel/floatlabeldemo.module').then(m => m.FloatlabelDemoModule), canActivate: [AuthGuard] },
        { path: 'input', loadChildren: () => import('./input/inputdemo.module').then(m => m.InputDemoModule), canActivate: [AuthGuard] },
        { path: 'invalidstate', loadChildren: () => import('./invalid/invalidstatedemo.module').then(m => m.InvalidStateDemoModule), canActivate: [AuthGuard] },
        { path: 'list', loadChildren: () => import('./list/listdemo.module').then(m => m.ListDemoModule), canActivate: [AuthGuard] },
        { path: 'job-list', loadChildren: () => import('./job-list/job-list.module').then(m => m.JobListModule), canActivate: [AuthGuard] },
        { path: 'job-detail', loadChildren: () => import('./job-detail/job-detail.module').then(m => m.JobDetailModule), canActivate: [AuthGuard] },
        { path: 'review', loadChildren: () => import('./review/review.module').then(m => m.ReviewModule), canActivate: [AuthGuard] },
        { path: 'media', loadChildren: () => import('./media/mediademo.module').then(m => m.MediaDemoModule), canActivate: [AuthGuard] },
        { path: 'message', loadChildren: () => import('./messages/messagesdemo.module').then(m => m.MessagesDemoModule), canActivate: [AuthGuard] },
        { path: 'misc', loadChildren: () => import('./misc/miscdemo.module').then(m => m.MiscDemoModule), canActivate: [AuthGuard] },
        { path: 'overlay', loadChildren: () => import('./overlays/overlaysdemo.module').then(m => m.OverlaysDemoModule), canActivate: [AuthGuard] },
        { path: 'panel', loadChildren: () => import('./panels/panelsdemo.module').then(m => m.PanelsDemoModule), canActivate: [AuthGuard] },
        { path: 'table', loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule), canActivate: [AuthGuard] },
        { path: 'tree', loadChildren: () => import('./tree/treedemo.module').then(m => m.TreeDemoModule), canActivate: [AuthGuard] },
        { path: 'menu', loadChildren: () => import('./menus/menus.module').then(m => m.MenusModule) }
    ])],
    exports: [RouterModule]
})
export class UikitRoutingModule { }

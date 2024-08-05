import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component'
import { AppComponent } from './app.component';
// import { DetailsComponent } from './details/details.component';

export const routeConfig: Routes = [
    {
        path: '',
        component: AppComponent,
        title: 'Home page',
    },
    {
        path: 'list',
        component: ListComponent,
        title: 'List of tasks'
    }
    // {
    //     path: 'details/:id',
    //     component: DetailsComponent,
    //     title: 'Home details',
    // },
];
export default routeConfig;
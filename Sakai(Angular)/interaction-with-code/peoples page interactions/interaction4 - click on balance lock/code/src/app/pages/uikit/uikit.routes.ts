import { Routes } from '@angular/router';
import { TableDemo } from './tabledemo';

export default [
    { path: 'table', data: { breadcrumb: 'Table' }, component: TableDemo },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

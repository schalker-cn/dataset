import { Routes } from '@angular/router';
import { TreeDemo } from './treedemo';

export default [
    { path: 'tree', data: { breadcrumb: 'Tree' }, component: TreeDemo },
    { path: '**', redirectTo: '/notfound' }
] as Routes;

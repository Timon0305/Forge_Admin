import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const CPU = React.lazy(() => import('./views/pages/products/cpu/index'));
const Memory = React.lazy(() => import('./views/pages/products/memory/index'));
const Motherboard = React.lazy(() => import('./views/pages/products/motherboard/index'));
const Storage = React.lazy(() => import('./views/pages/products/storage/index'));
const VideoCard = React.lazy(() => import('./views/pages/products/video-card/index'));
const PowerSupply = React.lazy(() => import('./views/pages/products/power-supply/index'));
const CPUCooler = React.lazy(() => import('./views/pages/products/cpu-cooler/index'));
const Case = React.lazy(() => import('./views/pages/products/case/index'));
const System = React.lazy(() => import('./views/pages/products/system/index'));
const List = React.lazy( () => import('./views/pages/list/list'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/products/cpu', name: 'CPU', component: CPU },
  { path: '/products/memory', name: 'Memory', component: Memory },
  { path: '/products/motherboard', name: 'Motherboard', component: Motherboard },
  { path: '/products/storage', name: 'Storage', component: Storage },
  { path: '/products/video-card', name: 'Video Card', component: VideoCard },
  { path: '/products/power-supply', name: 'Power Supply', component: PowerSupply },
  { path: '/products/case', name: 'Case', component: Case },
  { path: '/products/cpu-cooler', name: 'CPU Cooler', component: CPUCooler },
  { path: '/products/system', name: 'Operating System', component: System },
  { path : '/list', name : 'List', component : List}
];

export default routes;

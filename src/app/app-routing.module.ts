import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: '', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
    { path: 'dr-login', loadChildren: './dr-login/dr-login.module#DrLoginPageModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'add-dr', loadChildren: './add-dr/add-dr.module#AddDrPageModule' },
    { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
    { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
    { path: 'dr-list', loadChildren: './dr-list/dr-list.module#DrListPageModule' },


];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
